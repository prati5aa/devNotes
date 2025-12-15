import mongoose from 'mongoose';
import User from '../models/user';

const createUser = async (req, res) => {
    try{
        const { username, email, password, roles } = req.body;
        const newUser = new User({ username, email, password, roles });
        await newUser.save();
        res.status(201).json({ message: 'User createdd succesfully', user: newUser });  
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message }); 
    }
};

export { createUser };