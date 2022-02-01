<template name="lanterns">
	<div>
		<button class="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 ...">
			Save changes
		</button>
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 shadow-lg">
			<div v-bind:key="object" v-for="(lantern, object) in lanterns">
				<v-lantern  :lantern="lantern"></v-lantern>
			</div>
		</div>
		<div v-else class="text-white text-center flex ">Lantern empty</div>
		<!-- <div v-if="activeDialog" class="fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-y-scroll">
			<div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
			<div class="bg-black border border-white border-opacity-25 pt-5 pb-8 px-10 rounded-lg shadow-lg z-50 overflow-y-auto">
        <div @click="closeDialog" class="float-right text-white hover:opacity-80 cursor-pointer relative bottom-1 left-6"><mdicon name="Close"></mdicon></div>
				<form class="grid md:grid-cols-2 gap-6 w-full sm:grid-cols-2">
					<div >
						<p class="text-sm text-white pb-2">StartUnivers</p>
            <input v-model="defaultValue.startUniverse" :placeholder="toString(selectedLantern.startUniverse)" class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60">
					</div>
					<div>
						<p class="text-sm text-white pb-2">Pulse</p>
            <input v-model="defaultValue.pulse" :placeholder="toString(selectedLantern.pulse)" class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60">
					</div>
					<div>
						<p class="text-sm text-white pb-2">Group</p>
            <input v-model="defaultValue.group" :placeholder="toString(selectedLantern.group)" class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60">
					</div>
					<div>
						<p class="text-sm text-white pb-2">Color</p>
            <input v-model="defaultValue.rgb" :placeholder="selectedLantern.rgb" class="w-auto px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60">
					</div>
				</form>
        <div class="grid grid-flow-row grid-cols-5 gap-3 pt-2 mt-6">
          <button @click="updateLantern(selectedLantern, $event)" class="px-4 drop-shadow-lg bg-blue p-3 rounded-lg text-white hover:opacity-90">Action</button>
          <button @click="deleteItem" class="flex text-center px-4 drop-shadow-lg bg-red-500 p-3 rounded-lg text-white hover:opacity-90"><mdicon class="m-auto" name="Delete" /></button>
        </div>
			</div>
		</div> -->
	</div>
</template>

<script>
import Lanterns from '../../../../imports/api/collections/Lanterns.js';
import singleLantern from './single.vue';

export default {
	name: 'lanterns',
	components: {
		'v-lantern': singleLantern
	},
	data() {
		return {

			selectedLantern: '',
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
							this.selectedLantern = '';
							this.noti.close();
						}
					}
				);
			}, 500);
		},
		verification(obj, event) {
			this.selectedLantern = obj;
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
