import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundErr,currentUser} from '@pcblog/common';
import {deleteCommentsRouter} from './routes/delete_comments';
import {displayCommentsRouter} from './routes/display_comment';
import {indexCommentsRouter} from './routes/index';
import { createCommentsRouter } from './routes/create_comment';
import {natsWrapper} from './nats-wrapper'


const app=express();
app.set('trust proxy', true);
const port = process.env.PORT || 3100;
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
})
);

app.use(currentUser);

app.use(createCommentsRouter);
app.use(displayCommentsRouter);
app.use(indexCommentsRouter);
app.use(deleteCommentsRouter)

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
    if(!process.env.NATS_CLIENT_ID){
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if(!process.env.NATS_URL){
        throw new Error('NATS_URL must be defined');
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    try{
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL);
        natsWrapper.client.on('close',()=>{
            console.log('NATS connection closed!');
            process.exit();
        });

        process.on('SIGINT',()=>natsWrapper.client.close());
        process.on('SIGTERM',()=>natsWrapper.client.close());

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
