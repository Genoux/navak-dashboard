<template name="lanterns">
	<div class="bg-gray-dark pb-24">
		<div class="w-full flex bg-dark border-b border-white border-opacity-20 pt-5 lg:pb-5 md:pb-5 pb-8 pl-5 pr-5">
			<h1 class="text-white text-left mr-auto self-center font-regular flex-1">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }}
				<span class="opacity-50">({{ filteredList.length }})</span>
			</h1>
			<div class="flex-2">
				<v-dropdown
					@filterSelection="filterSelection($event)"
					CustomClass="w-full px-4 py-2 rounded-md "
					:setAll="true"
					:selection="[{status: 'On'}, {status: 'Off'}, {status: 'Picked'}]"
					default="All"
					filterBy="status"
				></v-dropdown>
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
import ServersStatusBanner from '../ServersStatusBanner.vue';
export default {
	name: 'lanterns',
	components: {
		'v-dropdown': () => import('../dropdown.vue'),
		'v-lantern': singleLantern,
		'v-serversStatus': ServersStatusBanner
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
      if(filterSize == 'On' || filterSize == 'Off') {
        return this.lanterns.filter((lantern) => {
          return lantern.status == filter.status;
        });
      }
      if(filterSize == 'Picked') {
        return this.lanterns.filter((lantern) => {
          return lantern.picked == true;
        });
      }

		/*	return this.lanterns.filter(function (item) {
				let filtered;
				if (filterSize) {
					filtered = item.status == filter.status;
				}
				return filtered;
			});*/
		}
	},
	methods: {
		filterSelection(e) {
			this.selected = e;
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
