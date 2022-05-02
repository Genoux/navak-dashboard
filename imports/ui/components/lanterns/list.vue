<template name="lanterns">
	<div class="bg-gray-dark pb-24">
		<div class="w-full flex bg-dark border-b border-white border-opacity-20 pt-5 pb-5">
			<h1 class="text-white ml-5 align-middle self-center content-center font-regular">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }}
        <span class="opacity-50">({{ filteredList.length }})</span>
			</h1>
      <!-- <v-dropdown style="height: 42px;" @filterSelection="filterSelection($event)" CustomClass="w-full px-4 py-2 h-full rounded-md" :setAll="true" :selection="lanterns" default="All" filterBy="status"></v-dropdown> -->
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
      selected: 'All',
    };
	},
  mounted () {
  },
  computed: {
    filteredList() {
      return this.computed_items.filter((post) => {
        return post;
      });
    },
    computed_items: function () {
      if (this.selected == 'All') {
        return this.lanterns;
      }
      let filterSize = this.selected;
      return this.lanterns.filter(function (item) {
        let filtered;
          if (filterSize) {
            filtered = item.status == filterSize;
          }
        return filtered;
      });
    }
  },
  methods: {
    renameStatus: function () {
      const obj = this.lanterns
      function groupArrayOfObjects(list, key) {
        return list.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      return groupArrayOfObjects(obj, "status");
    },
   filterSelection(e) {
     this.selected = e;
   },
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
