import { Meteor } from 'meteor/meteor';
import Servers from './collections/Servers.js';
import Lanterns from './collections/Lanterns.js';
import Stations from './collections/Stations.js';
import ping from 'ping';
import tcpp from 'tcp-ping';
import mqtt from 'mqtt';
const host = '192.168.1.212'
const port = '1883'
var client = mqtt.connect(`mqtt://${host}:${port}`)
client.port = port;
client.host = host;
client.on('connect', function () {
  console.log(`🔗 Connected to MQTT: mqtt://${client.host}:${client.port}`)
})


Meteor.startup(async (e) => {
  const stations = Stations.find().fetch();
  const lanterns = Lanterns.find().fetch();
  const servers = Servers.find().fetch();
  
  setInterval(async () => {
    pingStation(stations);
    pingLanterns(lanterns);
    pingServer(servers);  
  }, 5000);

});

function pingLanterns(obj) {
  obj.forEach(async function (host) {
    let res = await ping.promise.probe(host.ipAddress);
    Lanterns.update({ ipAddress: host.ipAddress }, { $set: { status: res.alive } })
    client.publish('/lanterns/update', JSON.stringify(host));
  });
}

function pingStation(obj) {
  obj.forEach(async function (host) {
    tcpp.probe(host.ipAddress, 5000, async function (err, available) {
     Stations.update({ ipAddress: host.ipAddress }, { $set: { status: available } })
   });
 });
}

function pingServer(obj) {
  obj.forEach(async function (host) {
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