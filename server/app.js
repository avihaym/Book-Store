'use strict';
const app = require('express')(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      bookRoute = require('./routes/book.route.js');
require('dotenv').load();
const PORT = process.env.PORT || 3000;

// Set up mongoose connection
const dbUrl = 'mongodb://avihay:AvihayDB1!@ds147052.mlab.com:47052/books';
const mongoDB = process.env.MONGODB_URI || dbUrl;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`)
    next()
}
app.use(logRequest);

app.use('/books', bookRoute);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

process.on('uncaughtException', (error) => {
  console.error(error.stack);
  process.exit(1);
});
