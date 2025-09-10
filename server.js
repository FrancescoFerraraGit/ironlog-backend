const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connessione al database MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connesso al database MongoDB'))
  .catch(err => console.error('Errore di connessione:', err));

app.get('/', (req, res) => {
  res.send('Server backend di IronLog in esecuzione!');
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});
