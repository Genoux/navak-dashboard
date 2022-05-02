<template>
  <div>
    <div
      class="hover:border-current duration-75 ease-in bg-black text-white border rounded-md border-white border-opacity-20"
      v-bind:class="{'opacity-20': !server.status, 'pointer-events-none': !server.status}">
      <div class="flex flex-grow px-4 py-4 items-center gap-2 border-b border-white border-opacity-20">
        <div v-bind:class="{'text-status-green': server.status, 'text-gray': !server.status}">
          <mdicon size="21" class="m-auto" name="Power" />
        </div>
        <div class="flex-1">
          <h4 class="font-medium">
            {{ server.name }}
          </h4>
        </div>
      </div>
      <div class="grid grid-cols-2 p-5 gap-5 self-end">
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">hostName</h5>
          <h4 class="text-sm" >{{ server.name }}</h4>
        </div>
        <div>
          <h5 class="text-xs text-white text-opacity-50 font-light">IP address</h5>
          <h4 readonly 
          :value="text" class="text-sm ">{{ server.ipAddress }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    methods: {
    openNotification(position = null, color, title, text) {
      if(this.noti === undefined){ 
        this.noti = this.$vs.notification({
          color,
          position,
          square: true,
          title: title,
          text: text
        });
        return
      }
    if(this.noti !== null && this.noti !== undefined) {
      this.noti.close();
      this.noti = this.$vs.notification({
        color,
        position,
        square: true,
        title: title,
        text: text
      });
    }
    },
    },
    props: {
      server: Object
    },
  };
</script>