const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'TrafficGuard API is running' });
});

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/groups', require('./src/routes/groupRoutes'));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`TrafficGuard backend running on port ${PORT}`);
});

