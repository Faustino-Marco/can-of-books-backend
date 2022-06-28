'use strict';

//REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//bring in mongoose
const mongoose = require('mongoose');
//bring in a schema to interact with that model
const Book = require('./models/books.js');

// connect mongoose to our MongoDB
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

//USE
//IMPLEMENT EXPRESS
const app = express();

//MIDDLEWARE
app.use(cors());

//DEFINE PORT--VALIDATE ENV IS WORKING
const PORT = process.env.PORT || 3002;

//ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/books', getBooks);

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not available');
});

//Errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
