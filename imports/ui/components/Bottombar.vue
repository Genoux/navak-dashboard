<template>
	<div>
		<div>
			<nav class="bg-gray-800 fixed bottom-0 left-0 w-full z-50 border-t border-white border-opacity-20">
					<ul class="grid grid-flow-col gap-0 m-auto  bg-black z-50">
						<li class="flex  mb-3 mt-3 ">
							<router-link class="flex h-full mr-auto ml-auto p-4 cursor-pointer text-white text-center rounded-md hover:bg-gray-dark-light" :to="{name: 'lanterns'}">
								<mdicon size="21" class="m-auto " name="Lightbulb" />
							</router-link>
						</li>
            <li class="flex mb-3 mt-3">
              <router-link class="flex h-full m-auto p-4 cursor-pointer text-white text-center hover:bg-gray-dark-light rounded-md" :to="{name: 'servers'}">
                <mdicon size="21" class="m-auto " name="ServerSecurity" />
                <div v-if="servers.length > 0" class="h-3 w-3 bg-status-red absolute right-0 top-0 rounded-xl animate-pulse"></div>
                 </router-link>
             	</li>
             <li class="flex mb-3 mt-3">
               <router-link class="flex h-full m-auto p-4 cursor-pointer text-white text-center rounded-md hover:bg-gray-dark-light " :to="{name: 'areas'}">
                 <mdicon size="21" class="m-auto " name="GoogleMaps" />
               </router-link>
             </li>
             <li class="flex mb-3 mt-3">
               <router-link class="flex h-full m-auto p-4 cursor-pointer text-white  rounded-md hover:bg-gray-dark-light " :to="{name: 'stations'}">
                 <mdicon size="21" class="m-auto " name="HandBackRight" />
               </router-link>
             </li>
					</ul>
	
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
