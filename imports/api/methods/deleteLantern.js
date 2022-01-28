import { Meteor } from 'meteor/meteor';
//import { check } from 'meteor/check';
import Lanterns from '../collections/Lanterns.js';

Meteor.methods({
  'deleteLantern'(data) {

   // await Lanterns.updateOne({id:id}, req.body, { useFindAndModify: false })

    //check(url, String);
   // check(title, String);
    //return Lanterns.findOne({ id: id });
 return Lanterns.remove({ _id: data._id });
   // console.log('lantern', lantern);
   // return lantern.update({data});
  },
});
