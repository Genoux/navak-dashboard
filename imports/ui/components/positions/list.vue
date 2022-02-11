<template name="positions">
	<div>
    <div class="w-full flex bg-dark border-b border-white border-opacity-20 h-14">
      <h1 class="text-white ml-5 align-middle self-center content-center font-regular">
        {{ $route.name }}
      </h1>
    </div>
		<div v-if="positions.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
			<div v-bind:key="object" v-for="(position, object) in positions">
				<v-position :position="position"></v-position>
			</div>
		</div>
		<div v-if="loadingPositions" class="flex justify-center p-24 items-center borderm-4">
      <mdicon name="LightbulbQuestion" size="48" class="animate-pulse" />
		</div>
	</div>
</template>

<script>
import Positions from '../../../../imports/api/collections/Positions';
import singlePosition from './single.vue';


export default {
	name: 'positions',
	components: {
		'v-position': singlePosition
	},
	data() {
		return {
			loadingPositions: true,
			msg: ''
		};
	},
	meteor: {
		$subscribe: {
			positions: []
		},
		positions() {
			return Positions.find({});
		}
	}
};
</script>
