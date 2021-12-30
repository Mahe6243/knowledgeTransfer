require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('DB connected.');
    }
    catch (e) {
        console.log('DB not connected');
        console.log(e);
    }
}

connectDB();

app.use('/api', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})