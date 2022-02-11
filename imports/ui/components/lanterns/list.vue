<template name="lanterns">
	<div>
     <div class="w-full flex bg-dark border-b border-white border-opacity-20 h-14">
       <h1 class="text-white ml-5 align-middle self-center content-center font-regular">
         {{ $route.name }}
       </h1>
     </div>
		<div v-if="lanterns.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
			<div v-bind:key="object" v-for="(lantern, object) in lanterns">
				<v-lantern :lantern="lantern"></v-lantern>
			</div>
		</div>
		<div v-if="loadingLanterns" class="flex justify-center p-24 items-center borderm-4">
      <mdicon name="LightbulbQuestion" size="48" class="animate-pulse" />
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
