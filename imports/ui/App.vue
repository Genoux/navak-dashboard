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
import { version } from '../../package.json'


export default {
  data() {
    return {
      version: version
    };
  },
  components: {
    Sidebar
  },
  mounted() {
    this.$vs.notification({
      duration: 'none',
      square: true,
      title:  `Navak Dashboard ${version}`,
      text: `Dashboard for controle over Navak physical project 👹 -
      <a style="text-decoration:underline"; href="https://github.com/navak-project/navak-dashboard">Check out the github</a>`,
    })
  }
};
</script>