const express = require('express');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes')
const cors = require('cors');

// Carica le variabili d'ambiente
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connessione al database
connectDB();

// Middleware 
app.use(express.json()); //Middleware per il parsing del body JSON
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //Middleware CORS per permettere richieste dal frontend

// Definizione delle route
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts',workoutRoutes);

app.get('/', (req, res) => {
  res.send('Server backend di IronLog in esecuzione!');
});

app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});
