<template name="lanterns">
	<div>
		<div v-if="lanterns.length > 0">
			<div :key="index" v-for="(lantern, index) in lanterns">
				<ul class="flex flex-grow pr-10">
					<li class="mr-3">
						ID:
						<b>{{ lantern.id }}</b>
					</li>
					<li class="mr-3">
						STATUS:
						<b>{{ lantern.status }}</b>  <span :class=lantern.status class="px-2 py-0 rounded-lg drop-shadow-2xl"></span> 
					</li>
					<li class="mr-3">
						PULSE:
						<b>{{ lantern.pulse }}</b>
					</li>
					<li class="mr-3">
						COLOR:
						<b>{{ lantern.rgb }}</b>
					</li>
					<li class="mr-3">
						GROUP:
						<b>{{ lantern.group }}</b>
					</li>
					<vs-button dark icon @click.stop="openDialog(lantern, $event)">
						<i class="bx bx-edit"></i>
					</vs-button>
					<vs-button danger icon @click.stop="verification(lantern, $event)">
						<i class="bx bx-x"></i>
					</vs-button>
				</ul>
			</div>
		</div>
		<div v-else>Lantern empty</div>
		<vs-dialog
		width="800"
		class="bg-darken-4 z-auto" 
		internal-activator
		v-model="activeDialog" v-bind:loading="loading" v-bind:prevent-close="dialogClose" v-bind:not-close="dialogClose">
			<form class="p-10">
					<div  v-if="i >= 1 && i <= 3" v-for="(value, index, i) in defaultValue">
						<p>{{ index.charAt(0).toUpperCase() + index.slice(1) }}</p>
						<vs-input disabled v-model="defaultValue[index]" :placeholder="selectedLantern[index]"></vs-input>
					</div>
					
					<div md="12" v-if="i >= 0 && i <= 0" v-for="(value, index, i) in defaultValue">
						<p>{{ index.charAt(0).toUpperCase() + index.slice(1) }}</p>
						<vs-input v-model="defaultValue[index]" :placeholder="selectedLantern[index]"></vs-input>
					</div>
					<div>
						<p>StarUnivers</p>
						<vs-input type="number" v-model="defaultValue.startUniverse" :placeholder="toString(selectedLantern.startUniverse)"></vs-input>
					</div>
					<div class="flex">
						<p class="pr-4">Status</p>
						<li>{{ defaultValue.status }}</li>
					</div>
					<div>
						<p>Pulse</p>
						<vs-input v-model="defaultValue.pulse" :placeholder="toString(selectedLantern.pulse)"></vs-input>
					</div>
					<div>
						<p>Group</p>
						<vs-input type="number" v-model="defaultValue.group" :placeholder="toString(selectedLantern.group)"></vs-input>
					</div>
					<div>
						<p>Color</p>
						<vs-input v-model="defaultValue.rgb" :placeholder="selectedLantern.rgb"></vs-input>
					</div>
					<vs-button text :active="active == 0" @click="updateLantern(selectedLantern, $event)">Updated</vs-button>
			</form>
		</vs-dialog>
	</div>
</template>

<script>
import Lanterns from '../../api/collections/Lanterns';

export default {
	name: "lanterns",
	components: {
	},
	data() {
		return {
			alert:false,
			noti: null,
			myData: null,
			errorMessage: '',
			lanternsList: '',
			selectedLantern: '',
			default: '',
			value1: '',
			confirmationDialog: false,
			activeDialog: false,
			dialogClose: false,
			loading: false,
			active: 0,
			active2: false,
			storeValue: '',
			defaultValue: {
				id: '',
				hostName: '',
				macAddress: '',
				ipAddress: '',
				startUniverse: '',
				status: false,
				pulse: '',
				group: '',
				rgb: ''
			}
		};
	},
	mounted(){
		this.alert = true;
	},
	meteor: {
		$subscribe: {
			lanterns: []
		},
		lanterns() {
			return Lanterns.find({});
		}
	},
	methods: {
		openColor() {
			this.colorPicker = true;
		},
		deleteItem() {
			this.loading = true;
			this.dialogClose = true;
			setTimeout(() => {
				Meteor.call(
					'deleteLantern',
					{
						_id: this.selectedLantern._id
					},
					(error) => {
						if (error) {
							this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', 'It might be the data passing to the server, please check the console');
							this.loading = false;
						} else {
							this.openNotification('top-center', 'success', '💢 Succelfully deleted lantern!', 'You can check the changes in the list');
							this.loading = false;
							this.confirmationDialog = false;
							this.selectedLantern = '';
							this.noti.close();
						}
					}
				);
			}, 500);
		},
		verification(obj, event) {
			this.selectedLantern = obj;
			this.confirmationDialog = true;
		},
		openNotification(position = null, color, title, text) {
			this.noti = this.$vs.notification({
				color,
				position,
				title: title,
				text: text
			});
		},
		updateLantern(obj, event) {
			event.preventDefault();
			const objJson = {
				id: obj.id,
				hostName: obj.hostName,
				macAddress: obj.macAddress,
				ipAddress: obj.ipAddress,
				startUniverse: obj.startUniverse,
				status: obj.status,
				pulse: obj.pulse,
				group: obj.group,
				rgb: obj.rgb
			};
			// check if obj is same as data
			if (JSON.stringify(objJson) === JSON.stringify(this.defaultValue)) {
				this.openNotification('top-center', '#7d33ff', '😲 Hey!', 'No changes made');
				this.loading = false;
				this.activeDialog = false;
				return;
			}

			this.loading = true;
			this.dialogClose = true;
			setTimeout(() => {
				Meteor.call(
					'editLantern',
					{
						data: this.defaultValue,
						_id: obj._id
					},
					(error) => {
						if (error) {
							this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', 'It might be the data passing to the server, please check the console');
							this.loading = false;
						} else {
							this.openNotification('top-center', 'success', '👍 Succelfully updated lantern!', 'You can check the changes in the list');
							this.loading = false;
							this.dialogClose = false;
							this.activeDialog = false;
						}
					}
				);
			}, 500);
		},
		closeDialog() {
			this.activeDialog = false;
		},
		openDialog(e) {
			this.defaultValue.id = e.id;
			this.defaultValue.hostName = e.hostName;
			this.defaultValue.macAddress = e.macAddress;
			this.defaultValue.ipAddress = e.ipAddress;
			this.defaultValue.startUniverse = e.startUniverse;
			this.defaultValue.status = e.status;
			this.defaultValue.pulse = e.pulse;
			this.defaultValue.group = e.group;
			this.defaultValue.rgb = e.rgb;
			this.selectedLantern = e;
			this.dialogClose = false;
			this.activeDialog = true;
		}
	}
};
</script>
<style scoped>
	.vs-dialog{
	background: red !important;
}
</style>