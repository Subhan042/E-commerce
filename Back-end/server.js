import express from 'express'
import cors from 'cors'
import connectDb from './db.js'
import authroutes from './routes/auth.js'
import products from './routes/products.js'
import mongoose from 'mongoose'


const PORT = 3000;
const app = express();
connectDb();


app.use(cors());

app.use(express.json())
app.use('/uploads', express.static('uploads'));

app.use('/',authroutes);

app.use('/api/products',products)



app.listen(PORT,()=>console.log(`server is running on ${PORT}`))