import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    photoUrl:{
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product',productSchema);
export default Product; 