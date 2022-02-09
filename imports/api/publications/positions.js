import { Meteor } from 'meteor/meteor';
import Positions from '../collections/Positions.js';

Meteor.publish('positions', function () {
  return Positions.find();
});
