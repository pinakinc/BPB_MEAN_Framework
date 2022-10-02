import express from 'express';
import {Request, Response} from "express";
import {body} from 'express-validator';
import {requireAuth, validateRequest, NotFoundErr} from '@pcblog/common';
import {Post} from '../models/posts';
import {Comment} from '../models/comment';
import {PostCreatedPublisher} from '../events/publishers/post-created-publisher';
import {natsWrapper} from '../nats-wrapper';


const router = express.Router();

router.post('/api/posts',requireAuth,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('content').not().isEmpty().withMessage('Content is required')
    
],validateRequest,async (req : Request,res : Response) => 
    {
        const {title,content}=req.body;

        const post = Post.build({
            title,
            content,
            userId: req.currentUser!.id
        });
        await post.save();
        /*new PostCreatedPublisher(natsWrapper.client).publish({
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId
        });*/
        res.status(201).send(post);
//        res.sendStatus(200);
    });

export {router as createPostRouter};