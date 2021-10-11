import {CustomErr} from './custom-err';

export class NotFoundErr extends CustomErr{
    statusCode=400;
    constructor(){
        super('Route not found');
        Object.setPrototypeOf(this,NotFoundErr.prototype);
    }

    serializeErr(){
        return [{
            message: 'Not Found'
        }];
    }
}