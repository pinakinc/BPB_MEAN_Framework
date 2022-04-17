import express, { Request, Response } from 'express';
import {body} from 'express-validator';
import {
    validateRequest,
    NotFoundErr,
    requireAuth,
    NotAuthErr
} from '@pcblog/common';
import {Post} from '../models/posts';
import {PostUpdatedPublisher} from '../events/publishers/post-updated-publisher';
import {natsWrapper} from '../nats-wrapper';

const router = express.Router();
router.put('/api/posts/:id',requireAuth, [
    body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    body('content')
    .not()
    .isEmpty()
    .withMessage('Content is required')
], validateRequest,
async (req: Request,res: Response)=>{
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);

    if (!post) {
        throw new NotFoundErr();
    }

    if (post.userId !== req.currentUser!.id) {
        throw new NotAuthErr();
    }

    post.set({
        title: req.body.title,
        content: req.body.content
    });

    await post.save();
    new PostUpdatedPublisher(natsWrapper.client).publish({
        id:post.id,
        title:post.title,
        content: post.content,
        userId: post.userId
    })
    res.send(post);
});

export {router as updatePostRouter};