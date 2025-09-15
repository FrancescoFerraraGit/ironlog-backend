const express = require('express');
const router = express.Router();
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

// Rotte protette che richiedono un token di autenticazione
router.route('/')
  .post(protect, createWorkout)
  .get(protect, getWorkouts);

router.route('/:id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;