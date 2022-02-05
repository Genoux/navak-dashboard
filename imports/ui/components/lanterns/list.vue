<template name="lanterns">
	<div >
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(lantern, object) in lanterns">
				<v-lantern  :lantern="lantern"></v-lantern>
			</div>
		</div>
		<div v-else class="text-white text-center flex ">Lantern empty</div>
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
      loadingPage: true,
		};
	},
	meteor: {
		$subscribe: {
			lanterns: []
		},
		lanterns() {  
			return Lanterns.find({});
		
		}
	},
	methods: {

    }
};
</script>
