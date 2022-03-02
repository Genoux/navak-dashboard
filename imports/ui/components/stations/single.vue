<template>
  <div >
    <div progress="30"
      class="hover:border-current duration-75 ease-in bg-black text-white border rounded-sm border-white border-opacity-20"
      v-bind:class="{'opacity-20': !station.status, 'pointer-events-none': !station.status}">
      <div class="flex flex-grow px-4 py-4 items-center gap-2 border-b border-white border-opacity-20">
        <div class="flex-1">
          <h4 class="font-medium">
            {{ station.id }}
          </h4>
        </div>
      </div>
      <div class="grid grid-cols-2 p-5 gap-5 self-end">
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">IP address</h5>
          <h4 readonly 
          :value="text" @click="copy(station.ipAddress)" class="text-sm hover:underline cursor-pointer">{{ station.ip }}</h4>
        </div>
      </div>
      <div :style="{'width': progress +'%'}" class=" h-1 bg-red-600"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        progress: '10',
        text: 'This will get copied!'
      };
    },
    mounted() {
     // var identity = setInterval(scene, 10);
       var width = 1;
      setInterval(() => {
          if (this.progress >= 100) {
            return
          } else {
            this.width++; 
            this.progress +=1; 
          }
      }, 1000);
     
      function scene() {
       
      }
    },
    methods: {
      openNotification(position = null, color, title, text) {
        this.noti = this.$vs.notification({
          color,
          position,
          square: true,
          title: title,
          text: text
        });
      },
    },
    props: {
      station: Object
    },
  };
</script>