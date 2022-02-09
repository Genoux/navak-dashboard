 <template name="server">
   <div>
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

 export default {
   name: 'servers',
   components: {
     'v-server': singleServer
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
