'use strict';
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      BookSchema = new Schema({
        title         : String,
        description   : String,
        isbn          : {type: String, unique: true},
        author        : String,
        pub_date      : Date,
        genre         : { type: String, enum: ['Science fiction', 'Satire', 'Drama', 'Action', 'Romance', 'Mystery', 'Horror']},
        price         : Number,
      });

module.exports = mongoose.model('books', BookSchema );
