import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import '../imports/ui/plugins'
import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  Vue.use(Vuesax, {
    colors: {
    primary:'#1e1e1e',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(36, 33, 69)'
  }})
  new Vue({
    el: '#app',
    ...App,
  })
})
