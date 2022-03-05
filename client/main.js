import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import '../imports/ui/plugins'
import App from '../imports/ui/App.vue'
import mdiVue from 'mdi-vue'
import * as mdijs from '@mdi/js'
import VueRouter from 'vue-router'
import routes from '/imports/routes';
import axios from 'axios';
import VueProgressBar from 'vue-progressbar'

const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: "bg-gray-dark-light",
})
Meteor.startup(() => {
  Vue.prototype.$http = axios;
  Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
  })
  Vue.use(mdiVue, {
    icons: mdijs
  }) 
  Vue.use(VueRouter)
  Vue.use(Vuesax, {
    colors: {
      primary:'#fff',
      success:'rgb(23, 201, 100)',
      danger:'rgb(242, 19, 93)',
      warning:'rgb(255, 130, 0)',
      dark:'rgb(36, 33, 69)'
    }
  })
  new Vue({
    router,
    render: h => h(App)
    }).$mount("#app");
})
