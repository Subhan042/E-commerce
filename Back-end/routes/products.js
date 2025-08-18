import express from 'express'
import Product from '../Schema/product.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import {v4 as uuid} from 'uuid'

const router = express.Router();

if(!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}


const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=> cb(null,Date.now()+'-'+file.originalname)
});

const upload = multer({storage})

router.delete('/', async (req, res) => {
  try {

    const products = await Product.find();

    
    products.forEach(product => {
      const filename = path.basename(product.photoUrl);
      const filePath = path.join('uploads', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Product.deleteMany({});

    res.json({ message: 'All products and images deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/',async (req,res)=>{
    const products = await Product.find();
    res.json(products);
});

router.post('/',upload.single('photo'),async (req,res)=>{
    console.log('file initiated')
    try{
        const {name,price,id} = req.body;
        if(!name || !price || !req.file){
            return res.status(400).json({message:'All fields are required'});
        }
        const photoUrl = `http://localhost:3000/uploads/${req.file.filename}`
        const newproducts = new Product({
            id:uuid(),
            name,
            price: parseFloat(price),
            photoUrl
        });
        await newproducts.save();
        res.json(newproducts);
    }catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
})


export default router;