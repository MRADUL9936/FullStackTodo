import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectToMongoDB from './db/connectToMongoDB.js';
import todoRoute from './routes/todo.routes.js';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use('/todos',todoRoute)

const PORT=process.env.PORT || 3000;

connectToMongoDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})