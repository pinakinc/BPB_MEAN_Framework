const express = require('express');
const {randomBytes}=require('crypto');
//const bodyParser = require('body-parser');
//const http=require('http');

//server=http.createServer();


const app = express();
app.use(express.json());
const posts = {};
app.get('/posts', (req,res)=> {
    res.send("hi");
});
app.post('/posts',(req,res) => {
    console.log('I am in')
    const id = randomBytes(4).toString('hex');
    const blogContents = req.body;
    const title=blogContents.title;
    const content = blogContents.content;
   console.log(content); 
    posts[id]={
        id,title,content
    };
    res.status(201).send(posts[id])
});
app.listen(4000,() => {
    console.log('Listening on 4000')
});