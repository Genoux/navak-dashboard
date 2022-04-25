<template name="lanterns">
	<div class="bg-gray-dark pb-24">
		<div class="w-full flex bg-dark border-b border-white border-opacity-20 pt-5 pb-5  pl-5 pr-5 ">
			<h1 class="text-white ml-5 align-middle self-center content-center font-regular">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }} <span class="opacity-50">({{ lanterns.length }})</span>
			</h1>
      <div @click="reset()" class="border rounded-sm flex md:w-auto pl-3 pr-3 pb-1 pt-1 ml-auto border-white hover:opacity-60 cursor-pointer focus:bg-white ">
        <p class="text-white">Reset all</p>
      </div>
        <div class="lg:mr-5 lg:mb-0 lg:ml-0 ml-4" ><v-dropdown class="w-full " CustomClass="h-full" style="height: 34px;" :setAll=true  default="All" :selection="lanterns" @filterSelection="filterSelection($event)"></v-dropdown></div>

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
    'v-dropdown': dropdown,
		'v-lantern': singleLantern,
		'v-serversStatus': ServersStatusBanner
	},
  methods: {
    filterSelection(e) {
      this.selected = e;
    },
  },
  computed: {
    computed_items: function () {
      if (this.selected == 'All') {
        return this.lanterns;
      }
      let filterSize = this.selected;
      return this.lanterns.filter(function (item) {
        console.log("🚀 ~ file: list.vue ~ line 50 ~ item", item);
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
        console.log("🚀 ~ file: list.vue ~ line 61 ~ returnthis.computed_items.filter ~ post", post);
        return post.id.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
	data() {
		return {
      search: '',
    };
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
