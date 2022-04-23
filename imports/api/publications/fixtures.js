import { Meteor } from 'meteor/meteor';
import Areas from '../collections/Fixtures.js';

Meteor.publish('fixtures', function () {
  return Areas.find();
});
