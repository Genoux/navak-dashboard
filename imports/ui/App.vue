<template>
    <div>
      <div class="flex flex-grow">
        <sidebar />
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
export default {
  components: {
    Sidebar,
  }
};
</script>
