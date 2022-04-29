import { Meteor } from 'meteor/meteor';
import Servers from './collections/Servers.js';
import Lanterns from './collections/Lanterns.js';
import Stations from './collections/Stations.js';
import ping from 'ping';
import tcpp from 'tcp-ping';
import { clientConnect } from './mqtt.js';
const client = await clientConnect();


Meteor.startup(async (e) => {
  setInterval(async () => {
    await pingStation();
    await pingLanterns();
    await pingServer();
  }, 5000);
});

async function pingLanterns(obj) {
  let lanterns = Lanterns.find().fetch();
  lanterns.forEach(async function (host) {
    //console.log("🚀 ~ file: fixtures.js ~ line 26 ~ pingLanterns ~ obj", host.id);
    let res = await ping.promise.probe(host.ipAddress);
    client.publish('/lanterns/update', JSON.stringify(host));
    Lanterns.update({ ipAddress: host.ipAddress }, { $set: { status: res.alive } })
    if (!res.alive) {
      client.publish(`/${host.id}/status`, `{ "status": ${res.alive} }`);
      Lanterns.update({ ipAddress: host.ipAddress }, { $set: { picked: false } })
    }
  });
}

async function pingStation() {
  let stations = Stations.find().fetch();
  stations.forEach(async function (host) {
    tcpp.probe(host.ipAddress, 5000, async function (err, available) {
      Stations.update({ ipAddress: host.ipAddress }, { $set: { status: available, presence: false } })
   });
 });
}

async function pingServer() {
  let servers = Servers.find().fetch();
  servers.forEach(async function (host) {
    tcpp.probe(resolveIP(host.ipAddress), resolvePORT(host.ipAddress), async function (err, available) {
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