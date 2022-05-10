<template>
  <div>
    <div class="bg-gray-dark flex flex-row darken h-screen" vs-theme="dark">
     <v-sidebar class="lg:block hidden"></v-sidebar>
     <v-bottombar class="lg:hidden block"></v-bottombar>
 
      <div ref="content" class="w-full ml-0 lg:ml-64 h-screen justify-between" v-bind:class="sideNavigationToggle">
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
      sideNavigationToggle: this.$sideNavigationToggle,
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
    //window.addEventListener("resize", this.onResize);
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
    /*if(window.innerWidth > 768) {
     this.noti =  this.$vs.notification({
        duration: 'none',
        position: 'bottom-left',
        square: true,
        title:  `Navak Dashboard ${version} - ${this.env}`,
        text: `Dashboard for controle over Navak physical project 👹 -
        <a style="text-decoration:underline"; href="https://github.com/navak-project/navak-dashboard">Check out the github</a>`,
      })
    }*/

  }
};
</script>