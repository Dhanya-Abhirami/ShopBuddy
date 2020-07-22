import mongoose from 'mongoose'
const { String } = mongoose.Schema.Types;

const UserSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false // never return password
    },
    role : {
        type : String,
        required : true,
        default : 'user',
        enum : ['user','admin','root'] 
    }
    // user : buy, 
    // admin : buy , sell 
    // root : buyer , seller & assign roles to others
}, {
    timestamps : true
})

export default mongoose.models.User ||  mongoose.model('User',UserSchema); // For 'User' model, the collection created has name 'users'