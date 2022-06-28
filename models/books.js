//declare schema
// declare data looks like
// like header on table

//bring in mongoose
const mongoose = require('mongoose');


// extract schema property from mongoose obj

const { Schema } = mongoose;

const bookSchema = new Schema ({
  //like the header of our table
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},
});

//define model
// what to give the database functionality
// assign predefined schema to shape data

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
