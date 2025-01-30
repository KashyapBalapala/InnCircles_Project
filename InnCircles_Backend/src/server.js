const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');

const app = require('./app');
const connectDB = require('./config/db');




const server = http.createServer(app);

dotenv.config();

connectDB();



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});