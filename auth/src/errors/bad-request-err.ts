import {CustomErr} from './custom-err';

export class BadRequestErr extends CustomErr{
    statusCode = 400;

    constructor(public message: string){
        super(message);
        Object.setPrototypeOf(this, BadRequestErr.prototype);
    }
    serializeErr(){
        return [{message: this.message}];
    }
}
