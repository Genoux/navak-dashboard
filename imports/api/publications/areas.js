import { Meteor } from 'meteor/meteor';
import Areas from '../collections/Areas.js';

Meteor.publish('areas', function () {
  return Areas.find();
});
