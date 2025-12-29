import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
 
import jwt from 'jsonwebtoken';


const createUser = async (req, res) => {
    try{
        const { username, email, password, roles } = req.body;
        
        if(username== await User.findOne({username})){
            return res.status(400).json({ message: 'Username already exists' });
        }

        // This is much cleaner and avoids the "callback hell"
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Now hashedPassword is ready to be saved to the database


        const user = new User({ username, email, password: hashedPassword, roles });
        await user.save();
        let token=jwt.sign({ userId: user._id.toString(),email:user.email},process.env.JWT_SECRET);
            console.log("Generated JWT Token:", token);
        res.status(201).json({ message: 'User created succesfully', token });  
    
  
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message }); 
    }
};

const loginUser=async(req,res)=>{
try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid username or password"});
    }

    bcrypt.compare(password,user.password, function(err,result){
        if(result){
            let token=jwt.sign({ userId: user._id.toString(),email:user.email},process.env.JWT_SECRET);
            res.json({token:token});
          
        }else{
            res.status(400).json({message:"Invalid username or password"});
        }
});
    }catch(error){
    res.status(500).json({message:"Error logging in user",error:error.message});
}
};

const logout =async(req,res)=>{
    // Logout logic can be implemented here if needed
    res.redirect('/login');
    res.send("Logout successful");
}

const profile=async(req,res)=>{
    try{
        const userId=req.userId;
        const user=await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json({user});
    }catch(error){
        res.status(500).json({message:"Error fetching user profile",error:error.message});
    }
}

export { createUser,loginUser, logout, profile };