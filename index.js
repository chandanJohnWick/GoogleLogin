const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Create a secret key for JWT
const JWT_SECRET_KEY = 'my_secret_key';

// MongoDB connection URL and database name
const MONGODB_URL = 'mongodb://0.0.0.0:27017/mydb';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB.');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Admin login API endpoint
app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username) {
    return res.status(400).json({ error: 'Username  is required.' });
  }

  try {
    // Find the user with the provided username and isAdmin true
    const user = await User.findOne({ username, isAdmin: true });
    console.log(user);

    // Check if the user exists and the password is correct
    if (!user ) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Create a JWT token with admin role
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET_KEY);

    // Return the token as response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Sample protected API endpoint accessible only to admins


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000.');
});
