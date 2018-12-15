const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/', bookController.getBooks);
router.post('/', bookController.createBook);
router.delete('/:id', bookController.deleteBook);
module.exports = router;
