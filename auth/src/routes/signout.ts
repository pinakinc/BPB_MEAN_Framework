import express from 'express';
const auth_router = express.Router();
auth_router.post('/api/users/signout',(req,res)=>{
    req.session=null;
    res.send({});
});

export {auth_router as signoutRouter};