<template>
  <div>
    <div
      progress="30"
      class="hover:border-current duration-75 ease-in bg-black text-white border rounded-sm border-red border-opacity-20"
      v-bind:class="{
        'opacity-20': !station.status,
        'pointer-events-none': !station.status,
      }"
    >
      <div
        class="flex flex-grow px-4 py-4 items-center gap-2 border-b border-red border-opacity-20"
      >
        <div class="flex-1">
          <h4 class="font-medium">{{ station.id }}</h4>
        </div>
        <div class="flex-2">
          <h4 class="font-medium">{{ station.ip }}</h4>
        </div>
      </div>
      <div class="grid grid-cols-2 p-5 gap-5 self-end">
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Message</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.message }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Lantern ID</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.lantern }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">BPM</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.bpm }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">State</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.state }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Timer</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.timer }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">Presence</h5>
          <h4 readonly class="text-sm hover:underline cursor-pointer">{{ station.presence }}</h4>
        </div>
      </div>
      <div id="progress-bar" :style="{ width: '10' + '%' }" class="h-1 bg-red-600"></div>
      <p class="text-white"> {{ null }}</p>
    </div>
  </div>
</template>

<script>
import progress from "progress-it";

export default {
  data() {return {};},
  mounted() {},
  methods: {
    scanning() {},
    openNotification(position = null, color, title, text) {
      this.noti = this.$vs.notification({
        color,
        position,
        square: true,
        title: title,
        text: text,
      });
    },
  },
  props: {
    station: Object,
  },
};
</script>