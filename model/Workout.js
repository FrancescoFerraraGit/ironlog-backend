const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  exercises: [{
    name: String,
    muscleGroups: [String],
    sets: Number,
    reps: Number,
    weight: Number,
    technique: String,
    rest: Number,
    notes: String,
    volume: Number
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
