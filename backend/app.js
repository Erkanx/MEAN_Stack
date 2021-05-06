const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); //CORS fix to allow to go to different localhost
    res.setHeader(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
    "Access-Control-Allow-Methonds", 
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})
//3BHJwvC2HVUjX5vW
app.post("/api/posts", (req, res, next) =>{
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added succesful'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
    {   id: 'Test12', 
        title: 'First server-side post', 
        content: "This is coming from the server"
    },
    {   id: 'Woohoo92', 
        title: 'Second server-side post', 
        content: "This is coming from the server!@"
    },

    ]
    res.status(200).json({
        message: 'Post fetched successfully!',
        posts: posts
    });
});

module.exports = app; 