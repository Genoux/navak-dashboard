<template name="lanterns">
	<div class="bg-gray-dark pb-24">
		<div class="w-full flex bg-dark border-b border-white border-opacity-20 pt-5 pb-5">
			<h1 class="text-white ml-5 align-middle self-center content-center font-regular">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }}
			</h1>
		</div>
		<v-serversStatus></v-serversStatus>
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(lantern, object) in lanterns">
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
		'v-lantern': singleLantern,
		'v-serversStatus': ServersStatusBanner
	},
	data() {
		return {};
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
