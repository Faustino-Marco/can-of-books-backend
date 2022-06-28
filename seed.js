'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

async function seed() {
  await Book.create({
    title: 'Mr. Boston Bartender\'s Guide',
    description: 'A collection of recipes for mixed drinks',
    status: 'Finished',
  });
  console.log('Boston was added');

  await Book.create({
    title: 'Harry Potter',
    description: 'Prisoner of Azkaban',
    status: 'Finished',
  });

  console.log('HP was added');

  await Book.create({
    title: 'SQL for Dummies',
    description: 'Your first aid kit for using SQL for the internet and intranets',
    status: 'Have not started',
  });

  console.log('SQL for Dummies was added');

  mongoose.disconnect();
}

seed();

