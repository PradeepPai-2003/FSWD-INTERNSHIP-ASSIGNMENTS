const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Publication year is required']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
