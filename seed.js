// import mongoose from 'mongoose';
// import camp from './src/models/camp';
// import comment from './src/models/comment';
const mongoose = require('mongoose');
const camp = require('./src/models/camp').default;
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
const seeder = async () => {
  try {
    const delRes = await camp.deleteMany({});
    data.forEach(async elem => {
      const newCamp = await camp.create(elem);
      const newComment = await comment.create({
        text: 'new comment by admin',
        author: 'hernomine',
      });
      newCamp.comment.push(newComment);
      newCamp.save();
    });
  } catch (err) {
    throw err;
  }
};
module.exports = seeder;
