//const mongoose = require('mongoose');
import mongoose from 'mongoose';

interface UserAttribs{
    email:string;
    password:string;

}

interface UserModel extends mongoose.Model<UserDoc>{
    build(attribs: UserAttribs):UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}
const userSchema = new mongoose.Schema({
 email:{
     type:String,
     required: true
    },    
 password:{
     type:String,
     required: true
    }    
 
    
});
userSchema.statics.build = (attribs:UserAttribs)=>{
    return new User(attribs);
}
const User = mongoose.model<UserDoc, UserModel>('User',userSchema);

export { User};