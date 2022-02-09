import Servers from '/imports/ui/components/servers/list.vue'
import Lanterns from '/imports/ui/components/lanterns/list.vue'
import Positions from '/imports/ui/components/positions/list.vue'
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
  },
  {
    path: '/positions',
    name: 'positions',
    component: Positions
  }
];