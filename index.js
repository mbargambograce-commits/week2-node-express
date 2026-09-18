require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Bonus: middleware de log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});