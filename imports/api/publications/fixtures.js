import { Meteor } from 'meteor/meteor';
import Fixtures from '../collections/Fixtures.js';

Meteor.publish('fixtures', function () {
  return Fixtures.find();
});
