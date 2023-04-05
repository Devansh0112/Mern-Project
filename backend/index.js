const express = require('express');
const {PORT, MongoDbUrl} = require('./config.js');
const mongoose = require('mongoose');
const booksRoute = require('./Routes/BooksRoutes.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log('In home page');
    return res.status(234).send('Welcome to Mern stack project');
});

app.use('/books', booksRoute);

mongoose
    .connect(MongoDbUrl)
    .then(() => {
        console.log('App connected to Database');
        app.listen((PORT), () => {
            console.log(`App is listening on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
