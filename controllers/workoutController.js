const asyncHandler = require('express-async-handler');
const Workout = require('../models/Workout');
const User = require('../models/User');

// @desc    Crea una nuova scheda di allenamento
// @route   POST /api/workouts
// @access  Private
const createWorkout = asyncHandler(async (req, res) => {
  // L'ID dell'utente viene aggiunto al corpo della richiesta dal middleware di autenticazione
  if (!req.user || !req.user.id) {
    res.status(401);
    throw new Error('Utente non autorizzato');
  }

  const { name, description, exercises } = req.body;

  if (!name || !exercises || exercises.length === 0) {
    res.status(400);
    throw new Error('Per creare una scheda di allenamento devi specificare un nome e almeno un esercizio.');
  }

  const workout = await Workout.create({
    user: req.user.id,
    name,
    description,
    exercises,
  });

  res.status(201).json(workout);
});

// @desc    Ottiene tutte le schede di allenamento dell'utente
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 });

  if (!workouts) {
    res.status(404);
    throw new Error('Nessuna scheda di allenamento trovata per questo utente.');
  }

  res.status(200).json(workouts);
});

// @desc    Ottiene una singola scheda di allenamento per ID
// @route   GET /api/workouts/:id
// @access  Private
const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(404);
    throw new Error('Scheda di allenamento non trovata.');
  }

  // Verifica che l'utente sia il proprietario della scheda
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Utente non autorizzato a visualizzare questa scheda.');
  }

  res.status(200).json(workout);
});

// @desc    Aggiorna una scheda di allenamento
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(404);
    throw new Error('Scheda di allenamento non trovata.');
  }

  // Verifica che l'utente sia il proprietario della scheda
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Utente non autorizzato ad aggiornare questa scheda.');
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedWorkout);
});

// @desc    Elimina una scheda di allenamento
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    res.status(404);
    throw new Error('Scheda di allenamento non trovata.');
  }

  // Verifica che l'utente sia il proprietario della scheda
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Utente non autorizzato ad eliminare questa scheda.');
  }

  await workout.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};