import Servers from '/imports/ui/components/servers/list.vue'
import Lanterns from '/imports/ui/components/lanterns/list.vue'

export default [
  {
    path: '/servers',
    name: 'servers',
    component: Servers
  },
  {
    path: '/lanterns',
    name: 'lanterns',
    component: Lanterns
  }
];