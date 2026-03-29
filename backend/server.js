require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', require('./routes/url'));
app.use('/api/auth', require('./routes/auth'));

// Health check (optional but useful)
app.get('/', (req, res) => {
  res.send('API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
