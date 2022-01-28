<template>
	<div>
		<div :key="index" v-for="(lantern, index) in lanterns" >
			<ul class="flex flex-grow">
        <li>ID: {{ lantern.id }}</li>
        <li>STATUS: {{ lantern.status }}</li>
        <li>PULSE: {{ lantern.pulse }}</li>
        <li>COLOR: {{ lantern.rgb }}</li>
        <li>GROUP: {{ lantern.group }}</li>
				<vs-button dark icon @click.stop="openDialog(lantern, $event)">
					<i class="bx bx-edit"></i>
				</vs-button>
			</ul>
		</div>
		<vs-dialog blur v-model="activeDialog" v-bind:loading="loading" v-bind:prevent-close="dialogClose" v-bind:not-close="dialogClose">
			<form>
        <div  v-if="i >= 0 && i <=0" v-for="(value, index, i) in defaultValue">
          <p>{{index.charAt(0).toUpperCase() + index.slice(1)}}</p>
          <vs-input v-model=defaultValue[index] :placeholder="selectedLantern[index]"></vs-input>
        </div>
        <div  v-if="i >=1 && i <= 3" v-for="(value, index, i) in defaultValue">
          <p>{{index.charAt(0).toUpperCase() + index.slice(1)}}</p>
          <vs-input disabled v-model=defaultValue[index] :placeholder="selectedLantern[index]"></vs-input>
        </div>
        <div>
          <p>StarUnivers</p>
          <vs-input type="number" v-model=defaultValue.startUniverse :placeholder="selectedLantern.startUniverse"></vs-input>
        </div>
        <div class="flex">
          <p>Status</p>
          <li>{{defaultValue.status}}</li>
        </div>
        <div>
          <p>Pulse</p>
          <vs-input v-model=defaultValue.pulse :placeholder="selectedLantern.pulse"></vs-input>
        </div>
				<vs-button flat :active="active == 0" @click="updateLantern(selectedLantern, $event)">Active</vs-button>
			</form>
		</vs-dialog>
	</div>
</template>

<script>
import Lanterns from '../../api/collections/Lanterns';
export default {
	data() {
		return {
			myData: null,
			errorMessage: '',
			lanternsList: '',
			selectedLantern: '',
			default: '',
			value1: '',
			activeDialog: false,
			dialogClose: false,
			loading: false,
			active: 0,
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
	meteor: {
		$subscribe: {
			lanterns: []
		},
		lanterns() {
			return Lanterns.find({});
		}
	},
	methods: {
		openNotification(position = null, color, title, text) {
			const noti = this.$vs.notification({
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
			console.log('obj', obj);
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
							this.activeDialog = false;
						}
					}
				);
			}, 500);
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
