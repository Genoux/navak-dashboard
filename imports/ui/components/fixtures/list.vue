<template>
	<div class="bg-gray-dark pb-24">
		<div class="flex flex-col lg:flex-row bg-dark border-b border-white border-opacity-20 pt-5 lg:pb-5 md:pb-5 pb-8  pr-5">
			<h1 class="text-white ml-5 align-middle self-center content-center font-regular">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }}
			</h1>
<div @click="openDialog()" class="border h-8 rounded-sm flex md:w-auto pl-2 pr-2 pt-1 pb-1 ml-auto border-white hover:opacity-60 cursor-pointer focus:bg-white">
  <mdicon class="text-white mt-auto mb-auto" name="Plus" size="18"></mdicon>
</div>
		</div>
  
		<v-serversStatus></v-serversStatus>
		<div v-if="fixtures.length > 0" class="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(fixture, object) in fixtures">
				<v-fixture :fixture="fixture"></v-fixture>
			</div>
		</div>
		<div v-else class="flex justify-center p-24 items-center borderm-4">
			<mdicon name="LightningBolt" size="48" class="animate-pulse text-white" />
		</div>
		<div v-if="activeDialog" class="fixed w-full m-auto h-full top-0 left-0 flex z-50 items-center justify-center">
			<div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
			<div class="bg-black border border-white border-opacity-25 sm:w-3/4 md:w-3/4 lg:w-3/6 pt-5 pb-8 px-10 shadow-lg z-50">
				<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading">
					<svg fill="white" class="animate-spin h-8 w-8" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
						<path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
					</svg>
				</div>
				<div
					@click="closeDialog"
					class="float-right text-white hover:opacity-80 cursor-pointer relative bottom-1 left-6"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
					<mdicon name="Close"></mdicon>
				</div>
				<form
					class="md:grid-cols-2 gap-6 w-full lg:grid-cols-3 grid grid-cols-2"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
         <div :key="i" v-for="(value, key, i) in filteredFixture">
						<p class="text-sm text-white pb-2">{{ key }}</p>
						<input
        
							v-model="defaultValue[key]"
							:placeholder="JSON.stringify(defaultValue[key])"
							class="rounded-sm w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 focus:outline-none focus:border-opacity-60"
						/>
					</div>
					<div class="h-full">
						<p class="text-sm text-white pb-2">Area</p>
						<v-dropdown
							style="height: 42px"
							@filterSelection="filterSelection($event)"
							CustomClass="w-full px-4 py-2 h-full rounded-md"
							:setAll="false"
							:selection="areas"
							:default="areas[0].name"
							filterBy="name"
						></v-dropdown>
					</div>
				</form>
				<div
					class="grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-2 pt-2 mt-6"
					v-bind:class="{
						'opacity-10': loading,
						'pointer-events-none': loading
					}"
				>
					<button @click="createNewPosition(defaultValue)" class="rounded-sm py-2 px-6 flex text-center drop-shadow-lg bg-green text-white hover:opacity-90">
						<mdicon class="m-auto" name="CheckBold"></mdicon>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Fixtures from '../../../../imports/api/collections/Fixtures';
import Areas from '../../../../imports/api/collections/Areas';
import singleFixture from './single.vue';
import ServersStatusBanner from '../ServersStatusBanner.vue';
export default {
  computed: {
    filteredFixture: function () {
      const filtered = Object.keys(this.defaultValue)
        .filter((key) => key !== '_id' && key !== '__v' && key !== 'area')
        .reduce((obj, key) => {
          obj[key] = this.defaultValue[key];
          return obj;
        }, {});
      return filtered;
    }
  },
	methods: {
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
    filterSelection(e) {
      this.selected = e;
      this.defaultValue.area = e;
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
				universe: 0,
				address: 0,
				area: ' ',
				fixtureType: 0
			};
			this.activeDialog = false;
		},
		async createNewPosition(elm) {
			if (elm.name == null || elm.name == '') {
				this.openNotification('top-center', 'danger', '❌ Error', 'Name is required');
				return;
			}
			try {
				this.loading = true;
				await this.$http.post(`http://${this.$param.api}/api/fixtures/`, this.defaultValue);
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
	name: 'fixtures',
	components: {
		'v-serversStatus': ServersStatusBanner,
		'v-fixture': singleFixture,
		'v-dropdown': () => import('../dropdown.vue')
	},
	data() {
		return {
			activeDialog: false,
			activeDialog: false,
			loading: false,
			defaultValue: {
        id: (((1 + Math.random()) * 0x10000) | 0),
        name: null,
        universe: 0,
        address: 0,
        area: ' ',
        fixtureType: 0
			}
		};
	},
	meteor: {
		$subscribe: {
			fixtures: [],
      areas: []
		},
    areas() {
      return Areas.find({});
    },
		fixtures() {
			return Fixtures.find({});
		}
	}
};
</script>
