const express=require('express');
import {json} from 'body-parser';
import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import {signoutRouter} from './routes/signout';
import {signupRouter} from './routes/signup';
const app=express();

const port = process.env.PORT || 3100;
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(port, ()=>{
    console.log('Listening on port 3100',port);
});
