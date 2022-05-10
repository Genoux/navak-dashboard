<template name="lanterns">
	<div class="bg-gray-dark pb-24">
		<div class="flex flex-col lg:flex-row bg-dark border-b border-white border-opacity-20 pt-5 lg:pb-5 md:pb-5 pb-8 pl-5 pr-5">
			<h1 class="text-white text-left mr-auto self-center font-regular lg:flex-1 lg:mb-0 mb-4">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }}
				<span class="opacity-50">({{ filteredList.length }})</span>
			</h1>
			<div class="lg:mr-3 lg:mb-0 lg:ml-0 flex">
				<v-dropdown
					@filterSelection="filterSelection($event)"
					CustomClass="w-full px-4 py-2 rounded-md h-10 "
					:setAll="true"
					:selection="[{status: 'On'}, {status: 'Off'}, {status: 'Picked'}]"
					default="All"
					filterBy="status"
				></v-dropdown>
				<div
					@click="openDialog('reset', 'You\'re about to reset ALL lanterns, are you sure?')"
					class="border h-10 ml-4 rounded-md flex self-center md:w-auto pl-4 pr-4 pb-1 pt-1 border-red-500 hover:opacity-60 cursor-pointer focus:bg-white"
				>
					<p class="mt-auto mb-auto text-red-500"><mdicon name="refresh" size="18"></mdicon></p>
				</div>
				<div
					@click="openDialog('randomIgnite', 'This will ignite all lanterns! Continue?')"
					class="border h-10 ml-4 rounded-md flex self-center md:w-auto pl-4 pr-4 pb-1 pt-1 border-yellow hover:opacity-60 cursor-pointer focus:bg-white"
				>
					<p class="text-yellow mt-auto mb-auto"><mdicon name="AlarmLight" size="18"></mdicon></p>
				</div>
			</div>
		</div>

		<v-serversStatus></v-serversStatus>
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(lantern, object) in filteredList">
				<v-lantern :lantern="lantern"></v-lantern>
			</div>
		</div>
		<div v-else class="flex justify-center p-24 items-center borderm-4">
			<mdicon name="LightningBolt" size="31" class="animate-pulse text-white" />
		</div>
		<div v-if="activeDialog" class="fixed w-full h-full top-0 left-0 flex z-50 items-center justify-center">
			<div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
			<div class="bg-black border border-white border-opacity-25 w-full lg:w-2/6 md:w-96 sm:w-2/4 pt-5 pb-8 px-10 shadow-lg z-50 ml-5 mr-5 rounded-md">
				<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading">
					<svg fill="white" class="animate-spin h-8 w-8" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
						<path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
					</svg>
				</div>
				<div
					class="text-center"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
					<div>
						<div class="align-center flex pt-5">
							<mdicon name="danger" size="44" class="text-white align-center m-auto" />
						</div>
						<h1 class="text-white text-center pb-10 pt-5">{{ message }}</h1>
					</div>
					<div class="grid grid-flow-col gap-6">
						<button @click="authorization()" class="rounded-md py-2 px-6 text-center drop-shadow-lg bg-red-500 text-white hover:opacity-90">
							<div class="m-auto align-middle content-center">
								<span class="mr-1">Do it!</span>
							</div>
						</button>
						<button @click="closeDialog()" class="rounded-md py-2 px-6 text-center drop-shadow-lg bg-black border text-white hover:opacity-90">
							<div class="m-auto align-middle content-center">
								<span class="mr-1">Nevermind</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Lanterns from '../../../../imports/api/collections/Lanterns.js';
import singleLantern from './single.vue';
import dropdown from '../dropdown.vue';
import ServersStatusBanner from '../ServersStatusBanner.vue';
export default {
	name: 'lanterns',
	components: {
		'v-dropdown': dropdown,
		'v-lantern': singleLantern,
		'v-serversStatus': ServersStatusBanner
	},
	data() {
		return {
			showBigBrainTool: false,
			selected: 'All',
			activeDialog: false,
			loading: false,
			request: null,
			message: null
		};
	},
	mounted() {},
	computed: {
		filteredList() {
			// return this.computed_items(this.lanterns)
			return this.computed_items.filter((post) => {
				return post;
			});
		},
		computed_items: function () {
			if (this.selected == 'All') {
				return this.lanterns;
			}
			let filterSize = this.selected;
			let filter;
			switch (filterSize) {
				case 'On':
					filter = {
						status: true
					};
					break;
				case 'Off':
					filter = {
						status: false
					};
					break;
				default:
					filter = {};
					break;
			}
			if (filterSize == 'On' || filterSize == 'Off') {
				return this.lanterns.filter((lantern) => {
					return lantern.status == filter.status;
				});
			}
			if (filterSize == 'Picked') {
				return this.lanterns.filter((lantern) => {
					return lantern.picked == true;
				});
			}
		}
	},
	methods: {
		authorization() {
			this.requestCall();
		},
		openDialog(request, message) {
			this.activeDialog = true;
			this.request = request;
			this.message = message;
		},
		closeDialog() {
			if (this.loading == true) {
				return;
			}
			this.activeDialog = false;
		},
		filterSelection(e) {
			this.selected = e;
		},
		filterSelection(e) {
			this.selected = e;
		},
		openNotification(position = null, color, title, text) {
			if (this.noti === undefined) {
				this.noti = this.$vs.notification({
					color,
					position,
					square: true,
					title: title,
					text: text
				});
				return;
			}
			if (this.noti !== null && this.noti !== undefined) {
				this.noti.close();
				this.noti = this.$vs.notification({
					color,
					position,
					square: true,
					title: title,
					text: text
				});
			}
		},
		async requestCall() {
			try {
				this.$http.post(`http://${this.$param.api}/api/lanterns/${this.request}/`).then((response) => {
					this.loading = false;
					this.closeDialog();
					this.openNotification('top-center', 'success', '🔥 Reset! ', `Lanterns are reset successfully!`);
				});
			} catch (error) {
				console.log(error);
				this.openNotification('top-center', 'danger', '❌ Oups! ', `${error}`);
				this.loading = false;
			}
		}
	},
	meteor: {
		$subscribe: {
			lanterns: []
		},
		lanterns() {
			return Lanterns.find({});
		}
	}
};
</script>
