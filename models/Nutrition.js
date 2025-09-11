const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  calories: {
    type: Number,
    required: true
  },
  proteins: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);
module.exports = Nutrition;