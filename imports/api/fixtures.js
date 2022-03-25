import { Meteor } from 'meteor/meteor';
import Servers from './collections/Servers.js';
import Lanterns from './collections/Lanterns.js';
import Stations from './collections/Stations.js';
import ping from 'ping';
import tcpp from 'tcp-ping';
var cron = require('node-cron');

Meteor.startup(async (e) => {
  cron.schedule('*/3 * * * * *', () => {
    pingStation();
    pingLanterns();
    pingServer();
  });
});

function pingLanterns() {
  var lanterns = Lanterns.find().fetch();
  lanterns.forEach(async function (host) {
    let res = await ping.promise.probe(host.ipAddress);
    Lanterns.update({ ipAddress: host.ipAddress }, { $set: { status: res.alive } })
  });
}

function pingStation() {
  var stations = Stations.find().fetch();
  stations.forEach(async function (host) {
   tcpp.probe(resolveIP(host.ipAddress), resolvePORT(host.ipAddress), async function (err, available) {
     Stations.update({ ipAddress: host.ipAddress }, { $set: { status: available } })
   });
 });
}

function pingServer() {
  var servers = Servers.find().fetch();
  console.log("🚀 ~ file: fixtures.js ~ line 41 ~ pingServer ~ servers", servers);
  servers.forEach(async function (host) {
    tcpp.probe(resolveIP(host.ipAddress), resolvePORT(host.ipAddress), async function (err, available) {
      console.log(resolveIP(host.ipAddress) + ':' + resolvePORT(host.ipAddress) + ' ' + available);
      Servers.update({ ipAddress: host.ipAddress }, { $set: { status: available } })
    });
  });
}

function resolveIP(data) {
  if (data) {
    if (data.match(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/g)) {
      if (data.match(/:/g)) {
        var split = data.split(':');
        return split[0];
      }
      return data;
    }
  }
  return null;
}

function resolvePORT(data) {
  if (data) {
    if (data.match(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/g)) {
      if (data.match(/:/g)) {
        var split = data.split(':');
        return split[1];
      }
      return data;
    }
  }
  return null;
}