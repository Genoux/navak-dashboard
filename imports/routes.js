import Home from '/imports/ui/components/Home.vue'
import Lanterns from '/imports/ui/components/Lanterns.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lanterns',
    name: 'Lanterns',
    component: Lanterns
  }
];