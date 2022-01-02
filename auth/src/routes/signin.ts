const express = require('express')
import {Request,Response} from 'express';
import {body} from 'express-validator';
import jwt  from 'jsonwebtoken';
import {validateRequest, BadRequestErr} from '@pcblog/common';
import {User} from '../models/user'
import {Password} from '../services/password';
const router = express.Router();
router.post('/api/users/signin',[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply password')
]
,validateRequest,
async (req: Request,res: Response)=>{
    const {email,password} = req.body;

    const existingUsr = await User.findOne({email});
    if (!existingUsr){
        throw new BadRequestErr('Invalid Credentials');
    }

    const passwordsMatching = await Password.comparePass(
        existingUsr.password,
        password
    );
    if (!passwordsMatching){
        throw new BadRequestErr('Invalid Credentials');
    }
    // const errors = validationResult(req);

    //if (!errors.isEmpty()){
    //    throw new RequestValidationErr(errors.array());
    //}

     const userJwt = jwt.sign({
        id: existingUsr.id,
        email: existingUsr.email
    },
        process.env.JWT_KEY!
    );

    req.session = {
        jwt: userJwt
    };
    res.status(200).send(existingUsr);
   }
);

export {router as signinRouter};