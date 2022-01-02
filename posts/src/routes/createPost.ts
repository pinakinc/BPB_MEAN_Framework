import express from 'express';
import {Request, Response} from "express";
import {body} from 'express-validator';
import {requireAuth, validateRequest} from '@pcblog/common';
import {Post} from '../models/posts';


const router = express.Router();

router.post('/blogapi/posts',requireAuth,[
    body('title').not().isEmpty().withMessage('Title is required'),
    body('content').not().isEmpty().withMessage('Content is required')
    
],validateRequest,async (req:Request,res : Response) => 
    {
        const {title,content}=req.body;
        const post = Post.build({
            title,
            content,
            userId: req.currentUser.id,
            
        });
        await post.save();
        res.status(201).send(post);
    });

export {router as createPostRouter};