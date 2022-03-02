<template>
  <div>
    <p class="text-white">{{stations}}</p>
    <div class="w-full flex bg-dark border-b border-white border-opacity-20 h-14">
      <h1 class="text-white ml-5 align-middle self-center content-center font-regular">
        {{ $route.name }}
      </h1>
    </div>
    <h1 class="text-white"></h1>
  </div>
</template>
<script>
import Stations from '../../../../imports/api/collections/Stations.js';
export default {
  
	name: 'stations',
	components: {
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