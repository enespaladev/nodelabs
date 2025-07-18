const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user, expiresIn = '1h') => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) return res.status(400).json({ message: 'Kullanıcı zaten var.' });

    const user = await User.create({ username, email, password });
    const token = generateToken(user);
    const refreshToken = generateToken(user, process.env.JWT_REFRESH_EXPIRATION);

    res.status(201).json({ token, refreshToken });
  } catch (err) {
    const error = new Error('Sunucu hatası');
    error.statusCode = 500;
    next(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Geçersiz giriş bilgileri' });

    const token = generateToken(user);
    const refreshToken = generateToken(user, process.env.JWT_REFRESH_EXPIRATION);

    res.json({ token, refreshToken });
  } catch (err) {
    const error = new Error('Sunucu hatası');
    error.statusCode = 500;
    next(error);
  }
};

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.logout = async (req, res) => {
  // Gerçek hayatta refresh token invalidasyonu yapılmalı (Redis/DB vs.)
  res.json({ message: 'Başarıyla çıkış yapıldı.' });
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Geçersiz refresh token' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    const error = new Error('Refresh token hatalı veya süresi dolmuş');
    error.statusCode = 500;
    next(error);
  }
};
