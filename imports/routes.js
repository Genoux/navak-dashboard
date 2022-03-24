import Servers from '/imports/ui/components/servers/list.vue'
import Lanterns from '/imports/ui/components/lanterns/list.vue'
import Areas from '/imports/ui/components/areas/list.vue'
import Stations from '/imports/ui/components/stations/list.vue'
export default [
  {
    path: '/',
    name: 'lanterns',
    component: Lanterns
  },
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
    path: '/areas',
    name: 'areas',
    component: Areas
  },
  {
    path: '/stations',
    name: 'stations',
    component: Stations
  }
];