require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;  // Ensure this line is correct

// Debug log to verify the MongoDB URI
console.log('MongoDB URI:', mongoURI);

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Init Middleware
app.use(express.json());

// Define Routes
app.get('/api/auth', require('./routes/api/auth'));
app.use('/api/music', require('./routes/api/music'));
app.use('/api/playlists', require('./routes/api/playlists'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
