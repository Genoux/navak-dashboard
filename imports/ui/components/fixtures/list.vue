<template name="fixtures">
	<div class="bg-gray-dark pb-24">
		<div class="w-full flex bg-dark border-b border-white border-opacity-20 pt-5 pb-5">
			<h1 class="text-white ml-5 align-middle self-center content-center font-regular">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }}
			</h1>
		</div>
		<v-serversStatus></v-serversStatus>
		<div v-if="fixtures.length > 0" class="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(fixtures, object) in fixtures">
				<v-fixture :fixture="fixture"></v-fixture>
			</div>
		</div>
		<div v-else class="flex justify-center p-24 items-center borderm-4">
			<mdicon name="LightningBolt" size="48" class="animate-pulse text-white" />
		</div>
	</div>
</template>

<script>
import Fixtures from '../../../../imports/api/collections/Fixtures.js';
import ServersStatusBanner from '../ServersStatusBanner.vue';
export default {
	name: 'fixtures',
	components: {
		'v-serversStatus': ServersStatusBanner
	},
	data() {
		return {};
	},
	meteor: {
		$subscribe: {
			fixtures: []
		},
		fixtures() {
			return fixtures.find({});
		}
	}
};
</script>
