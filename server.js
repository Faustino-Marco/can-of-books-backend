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
//TO RECEIVE JSON FROM REQUEST!
app.use(express.json());

//DEFINE PORT--VALIDATE ENV IS WORKING
const PORT = process.env.PORT || 3002;

//ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

//GET BOOKS (RETRIEVE FROM SERVER)
app.get('/books', getBooks);

//POST BOOKS (CREATE NEW BOOKS)
app.post('/books', postBooks);

//DELETE ROUTE (MUST HAVE PATH PARAMETER USING ':<VARIABLE>')
app.delete('/books/:id', deleteBooks);

async function deleteBooks(request, response, next) {
  console.log('hey Audrey!')
  let id = request.params.id;
  try {
    await Book.findByIdAndDelete(id);
    response.status(202).send('book deleted');
  } catch(error) {
    next(error);
  } 
  console.log(id);
}

async function postBooks(request, response, next) {
  console.log(request.body);
  try {
    let createdBook = await Book.create(request.body);
    response.status(201).send(createdBook);
  } catch (error) {
    next (error);
  }
}

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
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
