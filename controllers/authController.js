const User = require('../models/User');

// @desc    Registra un nuovo utente
// @route   POST /api/auth/register
// @access  Public
const registerUser = (req, res) => {
  res.send('Registrazione utente');
};

// @desc    Autentica un utente e ottiene un token
// @route   POST /api/auth/login
// @access  Public
const loginUser = (req, res) => {
  res.send('Login utente');
};

module.exports = {
  registerUser,
  loginUser
};
