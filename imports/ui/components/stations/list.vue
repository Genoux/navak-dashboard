<template>
  <div>
    <div class="w-full flex bg-dark border-b border-white border-opacity-20 h-14">
      <h1 class="text-white ml-5 align-middle self-center content-center font-regular">
        {{ $route.name }}
      </h1>
    </div>
    <v-serversStatus></v-serversStatus>
    <div v-if="stations.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      <div v-bind:key="object" v-for="(station, object) in stations">
        <v-station :station="station"></v-station>
      </div>
    </div>
    <div v-else class="flex justify-center p-24 items-center m-4">
      <mdicon size="31" name="LightningBolt" class="text-white animate-pulse"></mdicon>
    </div>
  </div>
</template>
<script>
import Stations from '../../../../imports/api/collections/Stations.js';
import ServersStatusBanner from '../ServersStatusBanner.vue';
import singleStation from './single.vue';
export default {
  
	name: 'stations',
	components: {
   'v-station': singleStation,
   'v-serversStatus': ServersStatusBanner
 },
	data() {
		return {
		};
	},
	meteor: {
		$subscribe: {
			stations: []
		},
		stations() {
			return Stations.find({});
		}
	}
};
</script>