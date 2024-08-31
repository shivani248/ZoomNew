import express from 'express'
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoute from './routes/authRoute.js';
import meeting from './routes/meeting.js'
import cors from 'cors';

const app = express()


//do configuration 
dotenv.config()

//config database
connectDb();
//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//add routes 
app.use('/api/v1/auth' , authRoute);
app.use('/api/meetings' , meeting);
//creating rest api
app.get('/' , (req , res)=>{
    res.send("<h1>hellooooo shivi </h1>");
}).listen(process.env.PORT, ()=>{
    console.log(`server ruuning on port ${process.env.PORT}`)
});