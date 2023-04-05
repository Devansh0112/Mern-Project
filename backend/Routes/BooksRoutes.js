const express = require('express');
const {Book} = require('../Models/BookModel.js');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        if (!req.body.title || !req.body.author || !req.body.publisher) {
            return res.status(400).send({message:'Send all required fields: title, author and publisher'});
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.get('/', async (req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});        
    }
});

router.get('/:id', async (req,res) => {
    try {

        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});        
    }
});

router.put('/:id', async (req,res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publisher) {
            return res.status(400).send({message:'Send all required fields: title, author and publisher'});
        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200).send({message: "book update successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});        
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) res.status(404).json({message: 'book not found'});

        return res.status(200).send({message: 'successfully deleted!'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

module.exports = router;