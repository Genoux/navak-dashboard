import { Meteor } from 'meteor/meteor';
import Areas from '../collections/Stations.js';

Meteor.publish('stations', function () {
  return Areas.find();
});
