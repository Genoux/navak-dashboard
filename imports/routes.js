import Home from '/imports/ui/components/Home.vue'
import Lanterns from '/imports/ui/components/Lanterns.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/lanterns',
    name: 'lanterns',
    component: Lanterns
  }
];