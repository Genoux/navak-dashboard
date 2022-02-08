<template name="lanterns">
	<div>
		<p class="text-white">{{ lanterns.length }}</p>
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(lantern, object) in lanterns">
				<v-lantern :lantern="lantern"></v-lantern>
			</div>
		</div>
		<div v-if="!loadingLanterns && lanterns.length < 1" class="text-white flex justify-center p-24 items-center">{{ lanterns.length }}{{ msg }}</div>
		<div v-if="loadingLanterns" class="flex justify-center p-24 items-center border border-white border-opacity-25 border-dashed m-4">
			<div class="inset-0 border">
				<h1 class="text-white">Loading Lanterns...</h1>
			</div>
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
	data() {
		return {
			loadingLanterns: true,
			msg: ''
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
