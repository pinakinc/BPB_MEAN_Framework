export abstract class CustomErr extends Error{
    abstract statusCode: number;

    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this,CustomErr.prototype);

    }

    abstract serializeErr(): {message: string,field?: string}[];
}