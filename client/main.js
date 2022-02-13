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

const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: "bg-gray-dark-light",
})

Meteor.startup(() => {
  Vue.prototype.$http = axios;
  Vue.use(mdiVue, {
    icons: mdijs
  }) 
  Vue.use(VueRouter)
  Vue.use(Vuesax)
  new Vue({
    router,
    render: h => h(App)
    }).$mount("#app");
})
