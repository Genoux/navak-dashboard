// Client-side demo data store - no database needed
import Vue from 'vue';

// Reactive demo data store  
export const demoStore = Vue.observable({
  lanterns: [
    {
      _id: "1", id: "001", name: "Bridge_L_001", area: "Bridge_1", status: true, picked: true,
      lastSeen: new Date(), ipAddress: "192.168.1.101", pulse: 72, rgb: "255,100,150,100",
      hostName: "Bridge-L-001.navak.local", macAddress: "AA:BB:CC:DD:EE:01", 
      startUniverse: 1, group: "Bridge", wifiSignal: 85, temperature: 22.5,
      assignedUser: "Marie", userBPM: 72, assignedStation: "s001", 
      colorAssigned: "Rose", userPresent: true
    },
    {
      _id: "2", id: "002", name: "Bridge_L_002", area: "Bridge_1", status: true, picked: true,
      lastSeen: new Date(Date.now() - 30000), ipAddress: "192.168.1.102", pulse: 68, rgb: "100,200,255,75",
      hostName: "Bridge-L-002.navak.local", macAddress: "AA:BB:CC:DD:EE:02",
      startUniverse: 1, group: "Bridge", wifiSignal: 78, temperature: 22.1,
      assignedUser: "Thomas", userBPM: 68, assignedStation: "s002",
      colorAssigned: "Bleu", userPresent: true
    },
    {
      _id: "3", id: "003", name: "Stage_L_001", area: "Main_Stage", status: true, picked: true,
      lastSeen: new Date(Date.now() - 15000), ipAddress: "192.168.1.103", pulse: 85, rgb: "255,200,0,90",
      hostName: "Stage-L-001.navak.local", macAddress: "AA:BB:CC:DD:EE:03",
      startUniverse: 2, group: "Stage", wifiSignal: 91, temperature: 24.1,
      assignedUser: "Sophie", userBPM: 85, assignedStation: "s003",
      colorAssigned: "Jaune", userPresent: true
    },
    {
      _id: "4", id: "004", name: "Stage_L_002", area: "Main_Stage", status: true, picked: false,
      lastSeen: new Date(Date.now() - 10000), ipAddress: "192.168.1.104", pulse: 0, rgb: "50,50,50,20",
      hostName: "Stage-L-002.navak.local", macAddress: "AA:BB:CC:DD:EE:04",
      startUniverse: 2, group: "Stage", wifiSignal: 88, temperature: 23.8,
      assignedUser: null, userBPM: 0, assignedStation: null,
      colorAssigned: "Disponible", userPresent: false
    },
    {
      _id: "5", id: "005", name: "Audience_L_001", area: "Audience_Zone", status: true, picked: true,
      lastSeen: new Date(Date.now() - 25000), ipAddress: "192.168.1.105", pulse: 78, rgb: "150,255,100,70",
      hostName: "Audience-L-001.navak.local", macAddress: "AA:BB:CC:DD:EE:05",
      startUniverse: 3, group: "Audience", wifiSignal: 82, temperature: 23.2,
      assignedUser: "Lucas", userBPM: 78, assignedStation: "s004",
      colorAssigned: "Vert", userPresent: true
    },
    {
      _id: "6", id: "006", name: "Backstage_L_001", area: "Backstage", status: true, picked: false,
      lastSeen: new Date(Date.now() - 5000), ipAddress: "192.168.1.106", pulse: 0, rgb: "50,50,50,20",
      hostName: "Backstage-L-001.navak.local", macAddress: "AA:BB:CC:DD:EE:06",
      startUniverse: 4, group: "Backstage", wifiSignal: 79, temperature: 21.7,
      assignedUser: null, userBPM: 0, assignedStation: null,
      colorAssigned: "Disponible", userPresent: false
    }
  ],

  stations: [
    {
      _id: "1", id: "s001", name: "Station_Bridge", location: "Bridge_1", status: true,
      ipAddress: "192.168.1.201", ip: "192.168.1.201", bpm: 72, pulse: 72, 
      state: 1, timer: "00:02:15", presence: true, 
      message: "Utilisateur détecté - BPM: 72", 
      rgb: "255,100,150,100", lantern: "001",
      polarState: 3, polarStatus: "Capteur connecté",
      presenceState: 3, presenceStatus: "Utilisateur présent"
    },
    {
      _id: "2", id: "s002", name: "Station_Stage", location: "Main_Stage", status: true,
      ipAddress: "192.168.1.202", ip: "192.168.1.202", bpm: 68, pulse: 68,
      state: 1, timer: "00:01:45", presence: true,
      message: "Utilisateur détecté - BPM: 68",
      rgb: "100,200,255,100", lantern: "002",
      polarState: 3, polarStatus: "Capteur connecté",
      presenceState: 3, presenceStatus: "Utilisateur présent"
    },
    {
      _id: "3", id: "s003", name: "Station_Audience", location: "Audience_Zone", status: true,
      ipAddress: "192.168.1.203", ip: "192.168.1.203", bpm: 85, pulse: 85,
      state: 1, timer: "00:00:58", presence: true,
      message: "Utilisateur détecté - BPM: 85",
      rgb: "255,200,0,100", lantern: "003",
      polarState: 3, polarStatus: "Capteur connecté",
      presenceState: 3, presenceStatus: "Utilisateur présent"
    },
    {
      _id: "4", id: "s004", name: "Station_Backstage", location: "Backstage", status: true,
      ipAddress: "192.168.1.204", ip: "192.168.1.204", bpm: 0, pulse: 0,
      state: 0, timer: "00:00:00", presence: false,
      message: "En attente d'utilisateur",
      rgb: "50,50,50,50", lantern: "-",
      polarState: 3, polarStatus: "Capteur connecté", 
      presenceState: 1, presenceStatus: "Aucune présence"
    }
  ],

  servers: [
    {
      _id: "1", id: "srv001", name: "Main_Server", ipAddress: "127.0.0.1:8080", status: true,
      uptime: "5d 12h 34m", cpu: "15%", memory: "2.4GB / 8GB", type: "API Server"
    },
    {
      _id: "2", id: "srv002", name: "Backup_Server", ipAddress: "192.168.1.200:8081", status: true,
      uptime: "5d 12h 30m", cpu: "8%", memory: "1.8GB / 4GB", type: "Backup Server"
    },
    {
      _id: "3", id: "srv003", name: "MQTT_Broker", ipAddress: "192.168.1.201:1883", status: true,
      uptime: "5d 12h 35m", cpu: "8%", memory: "512MB / 2GB", type: "Message Broker"
    }
  ],

  areas: [
    { _id: "1", name: "Bridge_1", description: "Zone pont principal", lanternCount: 2, activeCount: 2, usersActive: 2, status: "active" },
    { _id: "2", name: "Main_Stage", description: "Scène centrale", lanternCount: 2, activeCount: 1, usersActive: 1, status: "active" },
    { _id: "3", name: "Audience_Zone", description: "Zone audience", lanternCount: 1, activeCount: 1, usersActive: 1, status: "active" },
    { _id: "4", name: "Backstage", description: "Coulisses", lanternCount: 1, activeCount: 0, usersActive: 0, status: "standby" }
  ],

  fixtures: [
    { _id: "1", name: "Bridge_L", universe: 100, address: 1, area: "Bridge_1", fixtureType: 2 },
    { _id: "2", name: "Stage_L", universe: 101, address: 10, area: "Main_Stage", fixtureType: 3 },
    { _id: "3", name: "Audience_L", universe: 102, address: 20, area: "Audience_Zone", fixtureType: 1 },
    { _id: "4", name: "Backstage_L", universe: 103, address: 30, area: "Backstage", fixtureType: 2 }
  ]
});

// Helper functions to simulate Meteor collection API
export const DemoCollections = {
  Lanterns: {
    find: (query = {}) => {
      return {
        fetch: () => demoStore.lanterns.filter(item => {
          if (Object.keys(query).length === 0) return true;
          return Object.keys(query).every(key => item[key] === query[key]);
        })
      };
    }
  },
  
  Stations: {
    find: (query = {}) => {
      return {
        fetch: () => demoStore.stations.filter(item => {
          if (Object.keys(query).length === 0) return true;
          return Object.keys(query).every(key => item[key] === query[key]);
        })
      };
    }
  },
  
  Servers: {
    find: (query = {}) => {
      return {
        fetch: () => demoStore.servers.filter(item => {
          if (Object.keys(query).length === 0) return true;
          return Object.keys(query).every(key => item[key] === query[key]);
        })
      };
    }
  },
  
  Areas: {
    find: (query = {}) => {
      return {
        fetch: () => demoStore.areas.filter(item => {
          if (Object.keys(query).length === 0) return true;
          return Object.keys(query).every(key => item[key] === query[key]);
        })
      };
    }
  },
  
  Fixtures: {
    find: (query = {}) => {
      return {
        fetch: () => demoStore.fixtures.filter(item => {
          if (Object.keys(query).length === 0) return true;
          return Object.keys(query).every(key => item[key] === query[key]);
        })
      };
    }
  }
};

// Simulate realistic data updates for demo
export function startDemoUpdates() {
  setInterval(() => {
    // Simulate BPM fluctuations
    demoStore.lanterns.forEach(lantern => {
      if (lantern.picked && lantern.userBPM > 0) {
        // Add slight BPM variation (±3 BPM)
        const variation = (Math.random() - 0.5) * 6;
        lantern.userBPM = Math.max(60, Math.min(100, lantern.userBPM + variation));
        lantern.pulse = Math.round(lantern.userBPM);
        
        // Update station BPM to match
        const station = demoStore.stations.find(s => s.lantern === lantern.id);
        if (station) {
          station.bpm = Math.round(lantern.userBPM);
          station.pulse = Math.round(lantern.userBPM);
        }
      }
    });
    
    // Update last seen times
    demoStore.lanterns.forEach(lantern => {
      if (lantern.status) {
        lantern.lastSeen = new Date(Date.now() - Math.random() * 30000);
      }
    });
  }, 2000);
}