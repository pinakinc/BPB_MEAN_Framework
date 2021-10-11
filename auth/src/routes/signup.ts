const express = require('express');
import {Request,Response} from 'express';
import {body,validationResult} from 'express-validator';
import {User} from '../models/user'
import {RequestValidationErr} from '../errors/request-validation-err';
const router = express.Router();
router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
],async(req: Request,res: Response)=>{

    const errors = validationResult(req);

    if (!errors.isEmpty()){
        throw new RequestValidationErr(errors.array());
    }

    const {email,password} = req.body;
    
    const existingUser = await User.findOne({email});

    if (existingUser){
        console.log ('Email is in use');
        return res.send({});
    }
    
    const user = User.build({
        email,password
    })
    await user.save();
    res.status(201).send(user);
});

export {router as signupRouter};