const express = require('express');
const bodyParser = require("body-parser");
const Post = require("./models/post")
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://Erkan:3BHJwvC2HVUjX5vW@cluster0.mnoaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log("Connection failed!");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //CORS fix to allow to go to different localhost
    res.setHeader(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
    "Access-Control-Allow-Methods", 
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})

app.post("/api/posts", (req, res, next) =>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
   post.save();
    res.status(201).json({
        message: 'Post added succesful'
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Post fetched successfully!',
            posts: documents
        });
    });
});

//Keynote: Inside the parenthesis, the order has to be (req, res, next)!!
app.delete("/api/posts/:id", (req, res, next ) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post Deleted"});
    });
});

module.exports = app; 