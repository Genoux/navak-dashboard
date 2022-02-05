import { Meteor } from 'meteor/meteor';
import Lanterns from './collections/Lanterns.js';
import Servers from './collections/Servers.js';
import fakeData from '../../data/users.json'
const isReachable = require('is-reachable');
var cron = require('node-cron');

Meteor.startup(async (e) => {

  // if the Links collection is empty
 if (Lanterns.find().count() === 0) {
  const data = fakeData;
   data.forEach(lantern => {
    console.log('lantern', lantern);
    Lanterns.insert(lantern)
  });
 }
  
  var servers = Servers.find().fetch();
  cron.schedule('*/3 * * * * *', () => {
    servers.forEach(async function (host) {
      console.log('host', host.ipAddress);
      var status = await isReachable(host.ipAddress);
      console.log('status', status);
      if (status) {
        Servers.update({ ipAddress: host.ipAddress }, { $set: { status: status } })
      } else {
        Servers.update({ ipAddress: host.ipAddress }, { $set: { status: status } })
      }
    });
  });
});