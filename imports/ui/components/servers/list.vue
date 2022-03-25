<template name="server">
	<div>
		<div class="w-full flex bg-dark border-b border-white border-opacity-20 pt-5 pb-5">
			<h1 class="text-white ml-5 align-middle self-center content-center font-regular">
				{{ $route.name.charAt(0).toUpperCase() + $route.name.slice(1) }}
			</h1>
		</div>
    <v-serversStatus></v-serversStatus>
		<div v-if="servers.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(server, object) in servers">
				<v-server :server="server"></v-server>
			</div>
		</div>
		<div v-else class="flex justify-center p-24 items-center m-4">
			<mdicon size="31" name="LightningBolt" class="text-white animate-pulse"></mdicon>
		</div>
	</div>
</template>

<script>
import Servers from '../../../../imports/api/collections/Servers.js';
import singleServer from './single.vue';
import ServersStatusBanner from '../ServersStatusBanner.vue';
export default {
	name: 'servers',
	components: {
		'v-server': singleServer,
		'v-serversStatus': ServersStatusBanner
	},
	data() {
		return {
			loadingServers: true,
			msg: ''
		};
	},
	meteor: {
		$subscribe: {
			servers: []
		},
		servers() {
			return Servers.find({});
		}
	}
};
</script>
