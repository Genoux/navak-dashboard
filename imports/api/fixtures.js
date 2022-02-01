import { Meteor } from 'meteor/meteor';
import Lanterns from './collections/Lanterns.js';
import fakeData from '../../data/users.json'


Meteor.startup((e) => {

// if the Links collection is empty
 if (Lanterns.find().count() === 0) {
  const data = fakeData;

   data.forEach(lantern => {
    console.log('lantern', lantern);
    Lanterns.insert(lantern)
  });
 }
  
});