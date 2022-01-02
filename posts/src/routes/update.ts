import express, { Request, Response } from 'express';
import {body} from 'express-validator';
import {
    validateRequest,
    NotFoundErr,
    requireAuth,
    NotAuthErr
} from '@pcblog/common';
import {Post} from '../models/posts';

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
    const post = await Post.findById(req.params.id);

    if (!post) {
        throw new NotFoundErr();
    }

    if (post.userId !== req.currentUser!.id) {
        throw new NotAuthErr();
    }

    post.set({
        title: req.body.title,
        content: req.body.price
    });

    await post.save();
    res.send(post);
});

export {router as updatePostRouter};