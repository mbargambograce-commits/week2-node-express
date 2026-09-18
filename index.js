require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to parse JSON
app.use(express.json());

// Bonus: request middleware to log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// GET /
app.get('/', (req, res) => {
  res.send('My Week 2 API!');
});

// POST /user
app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name et email sont requis' });
  }
  res.send(`Hello, ${name}!`);
});


// GET /user/:id
app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// Serve static files from the public folder (after the routes)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});