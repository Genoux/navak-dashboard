import { Meteor } from 'meteor/meteor';
//import { check } from 'meteor/check';
import Lanterns from '../collections/Lanterns.js';

Meteor.methods({
  'editLantern'(data) {

   // await Lanterns.updateOne({id:id}, req.body, { useFindAndModify: false })

    //check(url, String);
   // check(title, String);
    //return Lanterns.findOne({ id: id });
 return Lanterns.update({ _id: data._id }, data.data);
   // console.log('lantern', lantern);
   // return lantern.update({data});
  },
});
