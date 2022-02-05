<template>
	<div>
	
		<div class="relative bg-dark">
			<nav class="bg-gray-800 h-screen justify-between flex flex-col p-2 border-r border-white border-opacity-20" v-model="active">
				<div>
					<ul>
						<li v-for="item in items" :key="item.title">
							<router-link class="hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-2 p-2 rounded-lg" :to="{name: item.title}">
								<mdicon size="21" class="m-auto" v-bind:name="item.icon" />
							</router-link>
						</li>
					</ul>
				</div>
				<div  type="button" v-for="item in servers" :key="item.status" class="w-4 h-4 flex align-middle text-center ml-auto mr-auto" v-bind:class="{'bg-status-green': item.status, 'bg-status-red': !item.status}"></div>
			</nav>
		</div>
	</div>
</template>

<script>
import Servers from '../../../imports/api/collections/Servers.js';
export default {
	
	data() {
		return {
			active: 'home',
			items: [
				{
					title: 'Home',
					icon: 'Home'
				},
				{
					title: 'lanterns',
					icon: 'Lightbulb'
				}
			]
		};
	},
	meteor: {
		$subscribe: {
			servers: []
		},
		servers() {  
			return Servers.find({});

		}
	},
};
</script>
