import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import '../imports/ui/plugins'
import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  Vue.use(Vuesax, {
    // options here
  })
  new Vue({
    el: '#app',
    ...App,
  })
})
