<template>
  <div>
    <div class="bg-gray-dark flex flex-row">
      <sidebar />
      <div class="w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
export default {
  components: {
    Sidebar
  },
};
</script>