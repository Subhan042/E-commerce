import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required : true,
        trim:true
    },
    lastname:{
        type : String,
        required : true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phno:{
        type:Number,
        required:true,
        validate:{
            validator:function(v){
                return /^\d{10}$/.test(v.toString());
            },
            message: ph => `${ph.value} must contain 10 digits`
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /^(?=.{8,12})(?=.*[A-Za-z])(?=.*\d).*$/.test(v);
            }
        }
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});


const User = mongoose.model('User',userSchema);


export default User