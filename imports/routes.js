import Home from '/imports/ui/components/Home.vue'
import Lanterns from '/imports/ui/components/lanterns/list.vue'

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