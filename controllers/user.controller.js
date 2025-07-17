const User = require('../models/User');

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    const error = new Error('Kullanıcılar alınamadı');
    error.statusCode = 500;
    next(error);
  }
};
