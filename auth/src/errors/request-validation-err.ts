import {ValidationError} from 'express-validator';
import {CustomErr} from './custom-err';

export class RequestValidationErr extends CustomErr{
    statusCode=400;
    constructor(public errors: ValidationError[] ){
        super('Invalid request parameters');
        Object.setPrototypeOf(this,RequestValidationErr.prototype);
    }
    serializeErr(){
        return this.errors.map(err=> {
            return {message: err.msg,field:err.param};
        })
    }
}