<template>
  <div >
    <div progress="30"
      class="hover:border-current duration-75 ease-in bg-black text-white border rounded-sm border-red border-opacity-20"
      v-bind:class="{'opacity-20': !station.status, 'pointer-events-none': !station.status}">
      <div class="flex flex-grow px-4 py-4 items-center gap-2 border-b border-red border-opacity-20">
        <div class="flex-1">
          <h4 class="font-medium">
            {{ station.id }}
          </h4>
        </div>
        <div class="flex-2">
          <h4 class="font-medium">
            {{ station.ip }}
          </h4>
        </div>
      </div>
      <div class="grid grid-cols-2 p-5 gap-5 self-end">
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Message</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.metrics.message }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Lantern ID</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.metrics.lantern }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">BPM</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.metrics.bpm }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">State</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.metrics.state }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Timer</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.metrics.timer }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Presence</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.metrics.presence }}</h4>
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
        progress:0,
      };
    },
    mounted() {
    },  
    methods: {
      scanning(){
        let _this = this
        let seconds = 15;
         setInterval(function(){
             _this.progress +=1
            //    console.log("🚀 ~ file: single.vue ~ line 43 ~ setInterval ~ this.progress", _this.progress);
            if (_this.progress >=100){
              _this.progress = 100
               _this.duration = seconds
            }
        }, seconds * 1000 / 100)
      },
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