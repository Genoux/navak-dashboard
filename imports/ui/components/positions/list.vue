<template name="positions">
	<div>
    <div class="flex  bg-dark border-b border-white border-opacity-20 h-14 pl-5 pr-5">
        <h1 class="text-white self-center font-regular">
        {{ $route.name }}
      </h1>
      <div @click="openDialog()" class="flex-end ml-auto self-center  border border-white hover:opacity-60 cursor-pointer focus:bg-white p-1"><mdicon class="text-white" name="Plus" size="18"></mdicon></div>
    </div>
		<div v-if="positions.length > 0" class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
			<div v-bind:key="object" v-for="(position, object) in positions">
				<v-position :position="position"></v-position>
			</div>
		</div>
		<div v-if="loadingPositions" class="flex justify-center p-24 items-center borderm-4">
      <mdicon name="LightbulbQuestion" size="48" class="animate-pulse" />
		</div>
    <div v-if="activeDialog"
      class="fixed w-full h-full top-0 left-0 flex z-50 items-center justify-center overflow-y-scroll">
      <div @click="closeDialog" class="absolute w-full h-screen bg-dark opacity-75"></div>
      <div
        class="bg-black border border-white border-opacity-25 sm:w-3/4 md:w-3/4 lg:w-3/6 pt-5 pb-8 px-10 rounded-lg shadow-lg z-50">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" v-if="loading">
          <svg fill="white" class="animate-spin h-8 w-8" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            width="24" height="24" viewBox="0 0 24 24">
            <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
        <div @click="closeDialog"
          class="float-right text-white hover:opacity-80 cursor-pointer relative bottom-1 left-6"
          v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading}">
          <mdicon name="Close"></mdicon>
        </div>
        <form class="pt-0 pb-0 grid md:grid-cols-2 gap-6 w-full sm:grid-cols-2 lg:grid-cols-3"
          v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading}">
          <div  :key="i" v-for="(value, key, i) in defaultValue">
              <p  class="text-sm text-white pb-2">{{key}}</p>
              <input v-model="defaultValue[key]" :placeholder="JSON.stringify(defaultValue[key])"
                class="w-full px-4 py-2 text-white bg-dark border border-white border-opacity-25 rounded-md focus:outline-none focus:border-opacity-60" />
          </div>
        </form>
        <div class="grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-2 pt-2 mt-6"
          v-bind:class="{'opacity-10': loading, 'pointer-events-none': loading}">
          <button @click="createNewPosition(defaultValue)"
            class="py-2 px-6 flex text-center drop-shadow-lg bg-green rounded-lg text-white hover:opacity-90">
            <mdicon class="m-auto" name="CheckBold"></mdicon>
          </button>
          <button 
            class="py-2 px-6 flex text-center drop-shadow-lg bg-blue rounded-lg text-white hover:opacity-90">
            <mdicon class="m-auto" name="Camera"></mdicon>
          </button>
        </div>
      </div>
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
      selectedPosition: '',
      activeDialog: false,
      loading: false,
      defaultValue: {
        id: (((1+Math.random())*0x10000)|0).toString(16).substring(1),
        name: null,
        x: 0,
        y: 0,
        z: 0,
        size: 0,
      },
			loadingPositions: true,
			msg: ''
		};
	},
  methods:{
    openDialog() {
      this.activeDialog = true;
    },
    closeDialog() {
      if (this.loading == true) {
        return;
      }
      this.defaultValue.id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      this.activeDialog = false;
    },
    
    openNotification(position = null, color, title, text) {
      this.noti = this.$vs.notification({
        color,
        position,
        title: title,
        text: text
      });
    },
    async createNewPosition(elm){
      try{
        await this.$http.post('http://192.168.1.15:8081/api/positions/', this.defaultValue);
        this.loading = false;
        this.activeDialog = false;
        this.openNotification('top-center', 'success', '👍 Succelfully updated position!',
        'You can check the changes in the list');
      }catch(err){
        console.log('error', err)
        this.openNotification('top-center', 'danger', '💀 Something want wrong, please try again',
          `${error}`);

      }finally{
       
      }
    },
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
