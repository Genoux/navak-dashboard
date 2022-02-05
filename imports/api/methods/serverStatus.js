
import { Meteor } from 'meteor/meteor';
import Servers from '../collections/Servers.js';

Meteor.methods({
  'serversStatus'(data) {

   // await Lanterns.updateOne({id:id}, req.body, { useFindAndModify: false })

    //check(url, String);
   // check(title, String);
    //return Lanterns.findOne({ id: id });
 return Servers.find({ _id: data._id }, data.data);
   // console.log('lantern', lantern);
   // return lantern.update({data});
  },
});
