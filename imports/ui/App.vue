<template>
  <div>
    <div class="bg-gray-dark flex flex-row darken h-full" vs-theme="dark">
     <v-sidebar class="md:block hidden"></v-sidebar>
     <v-bottombar class="md:hidden block"></v-bottombar>
      <div class="w-full ml-0 md:ml-12 h-screen justify-between">
        <router-view ></router-view>
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
      noti: null,
      version: version,
      windowHeight: window.innerHeight,
      env: Meteor.isDevelopment ? 'Development' : 'Production'
    };
  },
  components: {
    'v-sidebar' : Sidebar,
    'v-bottombar': Bottombar
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  methods:{
    onResize(e) {
      if(window.innerWidth < 768) {
        if(this.noti === null){return}
         this.noti.close()
         console.log("🚀 ~ file: App.vue ~ line 50 ~ onResize ~ this.noti", this.noti);
      }
    }
  },
  mounted() {
    document.body.classList.add('darken')
    if(window.innerWidth > 768) {
     this.noti =  this.$vs.notification({
        duration: 'none',
        square: true,
        title:  `Navak Dashboard ${version} - ${this.env}`,
        text: `Dashboard for controle over Navak physical project 👹 -
        <a style="text-decoration:underline"; href="https://github.com/navak-project/navak-dashboard">Check out the github</a>`,
      })
    }

  }
};
</script>
