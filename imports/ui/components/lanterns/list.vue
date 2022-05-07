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
				<div @click="reset()" class="border h-10 ml-4 rounded-md flex self-center md:w-auto pl-6 pr-6 pb-1 pt-1 border-white hover:opacity-60 cursor-pointer focus:bg-white">
					<p class="text-white mt-auto mb-auto">Reset all</p>
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
		'v-dropdown': () => import('../dropdown.vue'),
		'v-lantern': singleLantern,
		'v-serversStatus': ServersStatusBanner
	},
	computed: {
		computed_items: function () {
			if (this.selected == 'All') {
				return this.lanterns;
			}
			let filterSize = this.selected;
			return this.lanterns.filter(function (item) {
				console.log('🚀 ~ file: list.vue ~ line 50 ~ item', item);
				let filtered = true;
				if (filtered) {
					if (filterSize && filterSize.length > 0) {
						filtered = item.status == true;
					}
				}
				return filtered;
			});
		},
		filteredList() {
			return this.computed_items.filter((post) => {
				return post.id.toLowerCase().includes(this.search.toLowerCase());
			});
		}
	},
	data() {
		return {
			selected: 'All'
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
		},
		reset() {
			try {
				this.$http.post(`http://${this.$param.api}/api/lanterns/reset/`).then((response) => {
					console.log('response', response);
					this.loading = false;
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
