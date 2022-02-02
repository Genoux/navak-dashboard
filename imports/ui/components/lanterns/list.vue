<template name="lanterns">
	<div>
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 shadow-lg">
			<div v-bind:key="object" v-for="(lantern, object) in lanterns">
				<v-lantern  :lantern="lantern"></v-lantern>
			</div>
		</div>
		<div v-else class="text-white text-center flex ">Lantern empty</div>
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
