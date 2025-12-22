const express = require('express');
const router = express.Router();

// Importado as funções do Controller (Note o getMe novo aqui)
const { register, login, getMe } = require('../controllers/authController');

// Importado o Middleware de Proteção
const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;