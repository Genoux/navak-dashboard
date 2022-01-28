import { Meteor } from 'meteor/meteor';
import Lanterns from '../collections/Lanterns.js';

Meteor.publish('lanterns', function () {
  return Lanterns.find();
});
