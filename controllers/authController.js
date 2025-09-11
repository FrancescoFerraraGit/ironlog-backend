const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Funzione helper per generare un token JWT
const generateToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn: '30d',
  });
};

// @desc    Registra un nuovo utente
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const {username,email,password} = req.body;

  try{
    const userExists = await User.findOne({email});

    if(userExists){
      return res.status(400).json({message: 'Utente già creato'});
    }

    const user = User.create({
      username,
      email,
      password,
    });

    if(user){
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }else{
      res.status(400).json({ message: 'Dati utente non validi' });
    }
  }catch (error){
      res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Autentica un utente e ottiene un token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }else{
      res.status(401).json({ message: 'Password o email non valide' });
    }
  }catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
