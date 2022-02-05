import { Meteor } from 'meteor/meteor';
import Servers from '../collections/Servers.js';

Meteor.publish('servers', function () {
  return Servers.find();
});
