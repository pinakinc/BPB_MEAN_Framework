const express = require('express');
const router = express.router();
router.post('/api/users/signin',(req,res)=>{
    res.send('signin user')
});

export {router as signinRouter};