import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import {dbconnect} from '../config/dbconnect.js';
import userRoutes from './routes/user.route.js';
const app=express();

dbconnect();

app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded


app.get("/",(req,res)=>{
    res.send("Server is running............")
});

// Route organization
app.use('/api/users',userRoutes );
// app.use('/api/notes', require('./routes/noteRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});