import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundErr} from '@pcblog/common';

import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import {signoutRouter} from './routes/signout';
import {signupRouter} from './routes/signup';

const app=express();
app.set('trust proxy', true);
const port = process.env.PORT || 3100;
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
})
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async(req,res)=>{
    throw new NotFoundErr();
});
app.use(errorHandler);

const startup = async()=>{
    if(!process.env.JWT_KEY){
        throw new Error('Jwt key must be defined');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo DB');
    } catch(err){
        console.error(err);
    }
    app.listen(port, ()=>{
    console.log('Listening on port 3100',port);
    });

}
startup();
