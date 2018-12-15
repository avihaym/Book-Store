const BookModel = require('../models/book.model'),
      mongoose = require('mongoose');

exports.getBooks = function (req, res) {
  var Book = mongoose.model("books");
  Book.find({}).exec( (err, books) => {
    if (err) {
      console.error(err.message);
      res.json({status: "error", msg: err.message});
    } else {
      console.log(books);
      res.json({status: "success", msg: books});
    }
  });
};

exports.createBook = function (req, res) {
  // remove all non numeric chars
  req.body.isbn = req.body.isbn.replace(/[^0-9X]/gi, '');
  const Book = new BookModel(req.body);
  Book.save( (err, newBook) => {
    if (err) {
      console.error(err.message);
      res.json({status: "error", msg: err.message});
    } else {
      console.log("Book created successfully");
      res.json({status: "success", msg: newBook});
    }
  });
};

exports.deleteBook = function (req, res) {
  var Book = mongoose.model("books");
  Book.findOneAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.error(err.message);
      res.json({status: "error", msg: err.message});
    } else {
      console.log("Book deleted successfully");
      res.json({status: "success", msg: "Book deleted successfully"});
    }
  });
};
