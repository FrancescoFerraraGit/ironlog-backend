const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connesso al database MongoDB');
  } catch (err) {
    console.error('Errore di connessione:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
