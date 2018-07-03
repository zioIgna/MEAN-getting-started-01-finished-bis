const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://igna:Lm6DKaGZbpGfe58X@cluster0-hgrxo.mongodb.net/node-angular")
    .then((resp) => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Connection failed');
        // console.log(err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  //questo non serve per il sito, solo esempio
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
// Lm6DKaGZbpGfe58X

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;