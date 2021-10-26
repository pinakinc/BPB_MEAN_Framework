import {CustomErr} from '../errors/custom-err';
export class NotAuthErr extends CustomErr{
    statusCode=401;
    constructor(){
        super('Not Authorized');
        Object.setPrototypeOf(this, NotAuthErr.prototype);
    }
    serializeErr(){
        return [{message: 'Not Authorized'}]
    }
}