import { Meteor } from 'meteor/meteor';
import Servers from './collections/Servers.js';
const isReachable = require('is-reachable');
var cron = require('node-cron');

Meteor.startup(async (e) => {
  var servers = Servers.find().fetch();
  cron.schedule('*/7 * * * * *', () => {
    servers.forEach(async function (host) {
      var status = await isReachable(host.ipAddress);
      if (status) {
        Servers.update({ ipAddress: host.ipAddress }, { $set: { status: status } })
      } else {
        Servers.update({ ipAddress: host.ipAddress }, { $set: { status: status } })
      }
    });
  });
});