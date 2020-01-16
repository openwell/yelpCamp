const mongoose = require('mongoose');
const camp = require('./src/models/camp');
const comment = require('./src/models/comment').default;

const data = [
  {
    name: 'tayo',
    image: 'profile-1.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit nisi ducimus suscipit, esse ',
  },
  {
    name: 'bumi',
    image: 'profile-2.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit nisi ducimus suscipit, esse ',
  },
  {
    name: 'yetunde',
    image: 'profile-3.jpeg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit nisi ducimus suscipit, esse ',
  },
];

// remove campground
// function seed() {
//   camp.remove({}, function(err) {
    //     if(err){
    //         console.log("failed")
    //     }else{
    //        console.log("removed camp");
    //     }
    // });
    //     data.forEach(function(seed){
    //         camp.create(seed, function(err, respond1){
    //             if(err){
    //                 console.log("failed");
    //             }else{
    //                 console.log("responds");
    //                 //comments
    //                 comment.create({text: "new commeent by admin",  author: "hernomine"}, function (err, responds2) {
    //                         if (err) {
    //                             console.log("failed")
    //                         } else {
    //                             respond1.comment.push(responds2);
    //                             respond1.save();
    //                             console.log("added");
    //                         }
    //                     });
    //         }
    //     });
  // });
}

module.exports = seed;
