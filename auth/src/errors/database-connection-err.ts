import {CustomErr} from './custom-err';
export class DatabaseConnectionErr extends CustomErr{
    statusCode=500;
    reason = 'Error connecting to database';
    constructor(){
        super('Error connecting to database');
        Object.setPrototypeOf(this,DatabaseConnectionErr.prototype);
    }

serializeErr(){
    return [
        {message: this.reason}
    ]
}
}