const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    // 1. Verifica se o cabeçalho tem o token (Formato: "Bearer eyJhbG...")
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ success: false, error: 'Token inválido, acesso negado' });
        }
    }
    if (!token) {
        return res.status(401).json({ success: false, error: 'Sem token, acesso negado' });
    }
}