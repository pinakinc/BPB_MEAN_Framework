import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundErr,currentUser} from '@pcblog/common';

import {createPostRouter} from './routes/createPost';
import {indexPostRouter} from './routes/index';
import {showPostsRouter} from './routes/showPosts';
import {updatePostRouter} from './routes/update';

const app=express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
})
);

app.use(currentUser);
app.use(createPostRouter);
app.use(indexPostRouter);
app.use(showPostsRouter);
app.use(updatePostRouter);

app.all('*',async(req,res)=>{
    throw new NotFoundErr();
});
app.use(errorHandler);
console.log('tichyayla')
export {app};