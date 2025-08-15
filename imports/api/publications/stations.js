import { Meteor } from 'meteor/meteor';
import Stations from '../collections/Stations.js';

Meteor.publish('stations', function () {
  return Stations.find();
});
