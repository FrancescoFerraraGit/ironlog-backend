const mongoose = require('mongoose');

// Definizione dello schema per i singoli esercizi all'interno di una scheda
const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Il nome dell\'esercizio è obbligatorio'],
    trim: true,
  },
  muscle_groups: {
    type: [String],
    required: [true, 'Almeno un gruppo muscolare è richiesto'],
  },
  sets: {
    type: Number,
    required: [true, 'Il numero di serie è obbligatorio'],
    min: [1, 'Il numero di serie deve essere almeno 1'],
  },
  reps: {
    type: Number,
    required: [true, 'Il numero di ripetizioni è obbligatorio'],
    min: [1, 'Il numero di ripetizioni deve essere almeno 1'],
  },
  weight: {
    type: Number,
    required: [true, 'Il peso è obbligatorio'],
    min: [0, 'Il peso non può essere negativo'],
  },
  rest_time: {
    type: Number,
    required: [true, 'Il tempo di recupero è obbligatorio'],
    min: [0, 'Il tempo di recupero non può essere negativo'],
  },
  intensity_technique: {
    type: String,
    default: 'Nessuna',
  },
  notes: {
    type: String,
    trim: true,
  },
});

// Definizione dello schema per l'intera scheda di allenamento
const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Fa riferimento al modello 'User' per collegare ogni scheda al suo proprietario
  },
  name: {
    type: String,
    required: [true, 'Il nome della scheda di allenamento è obbligatorio'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  exercises: [exerciseSchema],
}, {
  timestamps: true, // Aggiunge automaticamente i campi createdAt e updatedAt
});

// Creazione e esportazione del modello 'Workout'
module.exports = mongoose.model('Workout', workoutSchema);