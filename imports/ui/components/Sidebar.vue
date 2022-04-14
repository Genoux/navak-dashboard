<template>
	<div>
		<div class="relative bg-dark">
			<nav class="bg-gray-800 h-screen fixed bg-dark justify-between flex flex-col p-2 border-r border-white border-opacity-20">
				<div>
					<ul>
						<li>
							<router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-2 p-2 rounded-sm" :to="{name: 'lanterns'}">
								<mdicon size="21" class="m-au:to" name="Lightbulb" />
							</router-link>
						</li>
            <li>
              <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-2 p-2 rounded-sm" :to="{name: 'servers'}">
                <mdicon size="21" class="m-auto" name="ServerSecurity" />
                <div v-if="servers.length > 0" class="h-3 w-3 bg-status-red absolute right-0 top-0 rounded-xl animate-pulse"></div>
                 </router-link>
             	</li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-2 p-2 rounded-sm" :to="{name: 'areas'}">
                 <mdicon size="21" class="m-auto" name="GoogleMaps" />
               </router-link>
             </li>
             <li>
               <router-link class="relative hover:translate-x-2 hover:bg-gray-dark-light cursor-pointer text-white flex align-middle text-center my-2 p-2 rounded-sm" :to="{name: 'stations'}">
                 <mdicon size="21" class="m-auto" name="HandBackRight" />
               </router-link>
             </li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
import Servers from '../../../imports/api/collections/Servers.js';
export default {

  meteor: {
    $subscribe: {
      servers: []
    },
    servers() {
      return Servers.find({status: false});
    }
  }
};
</script>
