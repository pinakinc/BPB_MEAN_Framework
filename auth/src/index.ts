const express=require('express');
import {json} from 'body-parser';
const app=express();

const port = process.env.PORT || 3100;
app.use(json());

app.get('/api/users/currentuser',(req,res)=>{
    res.send('hi');
});
app.listen(port, ()=>{
    console.log('Listening on port 3100',port);
});
