<template name="areas">
	<div>
		<div class="flex bg-dark border-b border-white border-opacity-20 pt-5 pb-5 pl-5 pr-5">
			<h1 class="text-white self-center font-regular flex-1">{{ $route.name }} / group: {{ selected }}</h1>
			<div class="flex-2 self-center">
				<div class="flex">
					<input
						class="mr-5 bg-black text-white pl-2 border pr-20 focus:outline-none placeholder-white text-sm placeholder-opacity-50 select"
						type="text"
						v-model="search"
						placeholder="Search areas.."
					/>
					<div class="mr-5 self-center"><v-dropdown :selection="areas" @filterSelection="filterSelection($event)"></v-dropdown></div>
					<div @click="openDialog()" class="ml-auto self-center border border-white hover:opacity-60 cursor-pointer focus:bg-white p-1">
						<mdicon class="text-white" name="Plus" size="18"></mdicon>
					</div>
				</div>
			</div>
		</div>
    <v-serversStatus></v-serversStatus>
		<div v-if="areas.length > 0 && this.selected === 'All'" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
			<div v-bind:key="object" v-for="(area, object) in filteredList">
				<v-area :area="area"></v-area>
			</div>
		</div>
		<div v-else-if="this.selected !== 'All'" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
			<div v-bind:key="object" v-for="(area, object) in filteredList">
				<v-area :area="area"></v-area>
			</div>
		</div>
		<div v-else class="flex justify-center p-24 items-center borderm-4">
			<mdicon name="LightningBolt" size="48" class="animate-pulse text-white" />
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
					<div :key="i" v-for="(value, key, i) in defaultValue">
						<p class="text-sm text-white pb-2">{{ key }}</p>
						<input
							v-model="defaultValue[key]"
							:placeholder="JSON.stringify(defaultValue[key])"
							class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
				</form>
				<div class="grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-2 pt-2 mt-6" v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading}">
					<button @click="createNewPosition(defaultValue)" class="py-2 px-6 flex text-center drop-shadow-lg bg-green text-white hover:opacity-90">
						<mdicon class="m-auto" name="CheckBold"></mdicon>
					</button>
					<button @click="getPosition($event)" class="py-2 px-6 flex text-center drop-shadow-lg bg-blue text-white hover:opacity-90">
						<mdicon class="m-auto" name="Camera"></mdicon>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Areas from '../../../../imports/api/collections/Areas';
import dropdown from '../dropdown.vue';
import singleArea from './single.vue';
import ServersStatusBanner from '../ServersStatusBanner.vue';
import 'dotenv/config'
export default {
	name: 'areas',
	components: {
		'v-dropdown': dropdown,
		'v-area': singleArea,
		'v-serversStatus': ServersStatusBanner
	},
	computed: {
		filteredList() {
			return this.computed_items.filter((post) => {
				return post.name.toLowerCase().includes(this.search.toLowerCase());
			});
		},
		computed_items: function () {
			if (this.selected == 'All') {
				return this.areas;
			}
			let filterSize = this.selected;
			return this.areas.filter(function (item) {
				let filtered = true;
				if (filtered) {
					if (filterSize && filterSize.length > 0) {
						filtered = item.group == filterSize;
					}
				}
				return filtered;
			});
		}
	},
	data() {
		return {
			search: '',
			selected: 'selected',
			value: '',
			api: '127.0.0.1:8081' || process.env.API,
			activeDialog: false,
			loading: false,
			defaultValue: {
				id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
				name: null,
				group: 0,
				x: 0,
				y: 0,
				z: 0,
				size: 0,
				param1: 0,
				param2: 0,
				param3: '0'
			},
			msg: ''
		};
	},
	methods: {
		filterSelection(e) {
			console.log('🚀 ~ file: list.vue ~ line 147 ~ filterSelection ~ e', e);
			this.selected = e;
		},
		getPosition(event) {
			event.preventDefault();
			this.loading = true;
			this.$http
				.get(`http://${this.api}/api/areas/snap`, {id: 'd490'})
				.then((response) => {
					console.log('response', response.data.position);
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
		openDialog() {
			this.activeDialog = true;
		},
		closeDialog() {
			if (this.loading == true) {
				return;
			}
			this.defaultValue = {
				id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
				name: null,
				group: '0',
				x: 0,
				y: 0,
				z: 0,
				size: 0,
				param1: 0,
				param2: 0,
				param3: '0'
			};
			this.activeDialog = false;
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
		async createNewPosition(elm) {
 
			if (elm.name == null || elm.name == '') {
				this.openNotification('top-center', 'danger', '❌ Error', 'Name is required');
				return;
			}
			try {
        this.loading = true;
				await this.$http.post(`http://${this.api}/api/areas/`, this.defaultValue);
				this.openNotification('top-center', 'success', `👍 Succelfully created position ${elm.name}`, 'You can check the changes in the list');
				this.loading = false;
				this.closeDialog();
			} catch (err) {
				console.log('error', err);
				this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again', `${err}`);
			} finally {
        this.loading = false;
			}
		}
	},
	meteor: {
		$subscribe: {
			areas: []
		},
		areas() {
			return Areas.find({});
		}
	}
};
</script>
