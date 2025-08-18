import express from 'express'
import User from '../Schema/user.js'
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/register',async (req,res)=>{
    const {regFname,regLname,regEmail,regPhno,regPassword} = req.body;

    try{
    const existinguser = await User.findOne({email:regEmail})
    if(existinguser){
        return res.status(400).json({message:'user already exists'})
    }
    const newUser = new User({
        firstname:regFname,
        lastname:regLname,
        email:regEmail,
        phno:regPhno,
        password:regPassword
    })
    await newUser.save()
    res.status(200).json({ message: 'User registered successfully' });
    console.log('the user has been added')
    }catch(err){
        console.error(err)
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/login',async (req,res)=>{
    console.log(req.body)
    const {loginEmail,loginPassword} = req.body;
    console.log(`the user is ${loginEmail}`)
    try{
        const user = await User.findOne({email:loginEmail});
        if(!user){ 
            return res.status(400).json({errors:[{msg:'Invalid email or password'}]})
        }
        const isMatch = await bcrypt.compare(loginPassword,user.password);
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid email or password'}]})
        }
        console.log("login success")
        res.status(200).json({ message: 'Login successful' });
    }catch(err){
        console.error(err)
        res.status(500).json({message:'server error'});
    }
})

export default router;