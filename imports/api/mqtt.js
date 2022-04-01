import 'dotenv/config';
//import mqtt from 'mqtt';
const mqtt = require('mqtt')
const { MQTTIP } = process.env;

export function clientConnect() {
  return new Promise((resolve, reject) => { 
    try {
      const host = '127.0.0.1';
      const port = '1883';
      client = mqtt.connect(`mqtt://${host}:${port}`);
      client.on('connect', function () {
        console.log(`🚀 ~ Connected to MQTT broker: mqtt://${host}:${port}`);
      });
      resolve(client);
    } catch (err) {
      console.log('🚀 ~ file: mqtt.js ~ line 39 ~ returnnewpromise ~ err', err);
      reject(err);
    }
  });
  
}
