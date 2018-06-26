const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://igna:Lm6DKaGZbpGfe58X@cluster0-hgrxo.mongodb.net/node-angular?retryWrites=true")
    .then((resp) => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Connection failed');
        // console.log(err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
// Lm6DKaGZbpGfe58X
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documets => {
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: documets
        });
    });
});

// Mia prova:
// app.get('/api/posts/:id', (req, res, next) => {
//     Post.findOne({
//         _id: req.params.id
//     }).then(document => {
//         res.status(200).json({
//             doc: document
//         });
//     });
// });

app.delete("/api/posts/:id", (req, res, next) => {
    // console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: 'Post deleted!' });
    });
});

module.exports = app;