import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.js'
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import urlRoutes from './routes/urlRoutes.js';
import cors from 'cors';
const app = express()
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173' 
}));

app.use(express.json()); 


connectDB();


app.use('/api/url', urlRoutes);
app.use('/api/user',userRoutes);

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})