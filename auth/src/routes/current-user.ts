const express = require('express');
const router = express.router();
router.get('/api/users/currentuser',(req,res)=>{
    res.send('current user')
});

export {router as currentUserRouter};