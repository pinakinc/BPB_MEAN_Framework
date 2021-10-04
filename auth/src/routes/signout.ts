const express = require('express');
const router = express.Router();
router.post('/api/users/signout',(req,res)=>{
    res.send('signout user')
});

export {router as signoutRouter};