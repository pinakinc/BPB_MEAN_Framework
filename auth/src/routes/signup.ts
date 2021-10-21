const express = require('express');
import {Request,Response} from 'express';
import {body,validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import {User} from '../models/user'
import {RequestValidationErr} from '../errors/request-validation-err';
import {BadRequestErr} from '../errors/bad-request-err';
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
       throw new BadRequestErr('Email is in use');
    }
    
    const user = User.build({
        email,password
    })
    await user.save();


    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    },'asdf');

    req.session = {
        jwt: userJwt
    };
    res.status(201).send(user);
});

export {router as signupRouter};