<template>
	<div>
		<div class="hover:border-current rounded-sm duration-75 ease-in bg-black text-white border border-white border-opacity-20">
			<div class="flex flex-grow px-4 py-4 items-center gap-2 border-b border-white border-opacity-20">
				<div class="flex-1">
					<h4 class="font-medium">
						{{ area.name }}
						<span class="font-light opacity-50 pl-1">#{{ area.id }}</span>
					</h4>
				</div>
				<div class="flex">
					<div @click="openDialog(area)" class="bg-black border ml-2 p-1 hover:opacity-60 cursor-pointer focus:bg-white focus:text-blue focus:outline-none">
						<mdicon name="Wrench" size="12"></mdicon>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-3 p-5 gap-5 self-end">
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Position</h5>
					<h4 class="text-sm">{{ formatNumber(area.x) }}, {{ formatNumber(area.y) }}, {{ formatNumber(area.z) }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Size</h5>
					<h4 class="text-sm">{{ area.size }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Group</h5>
					<h4 class="text-sm">{{ area.group }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Param 1</h5>
					<h4 class="text-sm">{{ area.param1 }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Param 2</h5>
					<h4 class="text-sm">{{ area.param2 }}</h4>
				</div>
				<div>
					<h5 class="text-xs text-white text-opacity-50 font-light">Param 3</h5>
					<h4 class="text-sm">{{ area.param3 }}</h4>
				</div>
			</div>
		</div>
		<div v-if="activeDialog" class="fixed w-full h-full top-0 left-0 flex z-50 items-center justify-center overflow-y-scroll">
			<div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
			<div class="bg-black border border-white border-opacity-25 sm:w-3/4 md:w-3/4 lg:w-3/6 pt-5 pb-8 px-10 shadow-lg z-50">
				<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading">
					<svg fill="white" class="animate-spin h-8 w-8" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
						<path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
					</svg>
				</div>
				<div @click="closeDialog" class="float-right text-white hover:opacity-80 cursor-pointer relative bottom-1 left-6" v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading}">
					<mdicon name="Close"></mdicon>
				</div>
				<form class="pt-0 pb-0 grid md:grid-cols-2 gap-6 w-full sm:grid-cols-2 lg:grid-cols-3" v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading}">
					<div :key="i" v-for="(value, key, i) in filteredAreas">
						<p class="text-sm text-white pb-2">{{ key }}</p>
						<input
							v-model="defaultValue[key]"
							:placeholder="JSON.stringify(defaultValue[value])"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
				</form>
				<div class="flex w-full gap-3 pt-2 mt-6" v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading}">
					<button @click="updatePosition(selectedArea, $event)" class="py-2 px-10 flex text-center drop-shadow-lg bg-green text-white hover:opacity-90">
						<mdicon class="m-auto" name="CheckBold"></mdicon>
					</button>
					<button @click="getPosition($event)" class="py-2 px-6 flex text-center drop-shadow-lg bg-blue text-white hover:opacity-90">
						<mdicon class="m-auto" name="Camera"></mdicon>
					</button>
					<button @click="deletePosition($event)" class="py-2 px-6 flex ml-auto text-center drop-shadow-lg bg-red-500 text-white hover:opacity-90">
						<mdicon class="m-auto" name="Close"></mdicon>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import 'dotenv/config'
export default {
	computed: {
		filteredAreas: function () {
			const filtered = Object.keys(this.selectedArea)
				.filter((key) => key !== '_id' && key !== '__v')
				.reduce((obj, key) => {
					obj[key] = this.selectedArea[key];
					return obj;
				}, {});
			return filtered;
		}
	},
	data() {
		return {
			api: '192.168.1.209:8081' || process.env.API,
			apiCalling: false,
			clicked: false,
			selectedArea: '',
			activeDialog: false,
			loading: false,
			defaultValue: {
				id: '',
				name: '',
				group: '',
				x: '',
				y: '',
				z: '',
				size: '',
				param1: 0,
				param2: 0,
				param3: '0'
			}
		};
	},
	props: {
		area: Object
	},
	methods: {
		formatNumber(num) {
			return parseFloat(num).toFixed(1);
		},
		async deletePosition(event) {
			event.preventDefault();
			this.loading = true;
			try {
				await this.$http.delete(`http://${this.api}/api/areas/${this.selectedArea.id}`);
				this.openNotification('top-center', 'success', '👍 Succelfully updated position!', 'You can check the changes in the list');
				this.loading = false;
				this.activeDialog = false;
			} catch (err) {
				console.log('error', err);
				this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', `${err}`);
				this.loading = false;
			}
		},
		getPosition(event) {
			event.preventDefault();
			this.loading = true;
			this.$http
				.get(`http://${this.api}/api/areas/snap`)
				.then((response) => {
					console.log('🚀 ~ file: single.vue ~ line 116 ~ .then ~ response', response);
					this.defaultValue.x = response.data.position.x;
					this.defaultValue.y = response.data.position.y;
					this.defaultValue.z = response.data.position.z;
					this.openNotification('top-center', 'success', '👍 Succelfully updated position!', 'You can check the changes in the list');
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
					this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', `${error}`);
					this.loading = false;
				});
		},
		openNotification(position = null, color, title, text) {
			this.noti = this.$vs.notification({
				color,
				position,
				square: true,
				title: title,
				text: text
			});
		},
		updatePosition(obj, event) {
			console.log('🚀 ~ file: single.vue ~ line 138 ~ updatePosition ~ obj', obj.id);
			event.preventDefault();
			const objJson = {
				id: obj.id,
				name: obj.name,
				group: obj.group,
				x: obj.x,
				y: obj.y,
				z: obj.z,
				size: obj.size,
				param1: obj.param1,
				param2: obj.param2,
				param3: obj.param3
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
			this.$http
				.put(`http://${this.api}/api/areas/${obj.id}`, this.defaultValue)
				.then((response) => {
					console.log('response', response);
					this.openNotification('top-center', 'success', '👍 Succelfully updated position!', 'You can check the changes in the list');
					this.loading = false;
					this.activeDialog = false;
					this.showColorPicker = false;
				})
				.catch((error) => {
					console.log(error);
					this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', `${error}`);
					this.loading = false;
					this.activeDialog = false;
					this.showColorPicker = false;
				});
		},
		closeDialog() {
			if (this.loading == true) {
				return;
			}
			this.activeDialog = false;
			this.showColorPicker = false;
		},
		openDialog(e) {
			this.defaultValue.id = e.id;
			this.defaultValue.name = e.name;
			this.defaultValue.group = e.group;
			this.defaultValue.x = e.x;
			this.defaultValue.y = e.y;
			this.defaultValue.z = e.z;
			this.defaultValue.size = e.size;
			(this.defaultValue.param1 = e.param1), (this.defaultValue.param2 = e.param2), (this.defaultValue.param3 = e.param3);

			this.selectedArea = e;
			this.activeDialog = true;
		}
	}
};
</script>
