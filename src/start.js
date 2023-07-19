const express = require('express');
require('dotenv').config();
// App
const app = express();
app.use(express.json({ limit: '10mb' }));

// DB connection
const db = require('./database');

// Routes
app.use(require('./routes/userRoute'));

// Constants
const HOST = '0.0.0.0';
const PORT = 3001;

app.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);
