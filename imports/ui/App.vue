<template >
  <div>
    <div class="bg-gray-dark flex flex-row darken" vs-theme="dark">
     <v-sidebar></v-sidebar>
      <div class="w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Bottombar from "./components/Bottombar.vue";
import { version } from '../../package.json'

export default {
  data() {
    return {
      version: version,
      env: Meteor.isDevelopment ? 'Development' : 'Production'
    };
  },
  components: {
    'v-sidebar' : Sidebar,
    'v-bottombar': Bottombar
  },
  mounted() {
    document.body.classList.add('darken')
    this.$vs.notification({
      duration: 'none',
      square: true,
      title:  `Navak Dashboard ${version} - ${this.env}`,
      text: `Dashboard for controle over Navak physical project 👹 -
      <a style="text-decoration:underline"; href="https://github.com/navak-project/navak-dashboard">Check out the github</a>`,
    })
  }
};
</script>
