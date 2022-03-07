// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      console.log('Books',books)
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('books/details',{title:"Add Book",books:{}});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    const addBook = new book({
      Title : req.body.title,
    Price : req.body.price,
    Author : req.body.author,
    Genre : req.body.genre
    });

    addBook.save()
    .then(data=>{
      res.redirect('/books')
    })
    .catch(err=>{
      res.status(401).redirect('/books');
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const filter = req.params.id;
    book.findById(filter).exec()
    .then(data=>{
      console.log("data",data)
      res.render('books/details',{title:data.title,books:data})
    })
    .catch(err=>{
      console.log(err)
      res.status(401).redirect('/books');
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const filter = req.params.id;
    book.findByIdAndUpdate(filter,{Title:req.body.title,Price:req.body.price,Author:req.body.author,Genre:req.body.genre}).exec()
    .then(data=>{
      res.redirect('/books')
    })
    .catch(err=>{
      console.log(err)
      res.status(401).redirect('/books');
    })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     const filter = req.params.id;
     book.findByIdAndRemove(filter).exec()
     .then(data=>{
      res.redirect('/books')
     })
     .catch(err=>{
      console.log(err)
      res.status(401).redirect('/books');
    });
});


module.exports = router;
