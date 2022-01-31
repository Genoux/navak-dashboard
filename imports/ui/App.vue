<template>
    <div>
      <div class=" bg-gray-dark flex flex-row">
        <sidebar />
        <div class="w-full">
          <topbar />
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';
export default {
  components: {
    Sidebar,
    Topbar
  }
};
</script>