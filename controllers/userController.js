// @desc    Ottieni il profilo utente
// @route   GET /api/users/profile
// @access  Privato
const getProfile = (req, res) => {
  // Il middleware 'protect' aggiunge l'utente all'oggetto req
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  });
};

module.exports = {
  getProfile,
};
