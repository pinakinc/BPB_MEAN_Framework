import express,{Request,Response} from 'express';
import {Post} from '../models/posts';


const router =express.Router();
router.get('/api/posts', async (req: Request,res:Response) => {
    const posts = await Post.find({});
    res.send(posts);
});

export {router as indexPostRouter};