<template name="lanterns">
	<div>
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(lantern, object) in lanterns">
				<v-lantern :lantern="lantern"></v-lantern>
			</div>
		</div>
		<div v-else class="flex justify-center p-24 items-center m-4">
			<mdicon size="31" name="LightningBolt" class="text-white animate-pulse"></mdicon>
		</div>
	</div>
</template>

<script>
import Lanterns from '../../../../imports/api/collections/Lanterns.js';
import singleLantern from './single.vue';

export default {
	name: 'lanterns',
	components: {
		'v-lantern': singleLantern
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
