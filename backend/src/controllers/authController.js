const User = require('../models/User');

// @desc    Registrar usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Cria o usuário
        const user = await User.create({
            name,
            email,
            password
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Login usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar se email e senha foram enviados
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Por favor, informe email e senha' });
        }

        // Verificar se usuário existe
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
        }

        // Verificar se a senha bate
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Credenciais inválidas' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


const sendTokenResponse = (user, statusCode, res) => {
    // Cria o token
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({
        success: true,
        token
    });
};

// @desc    Obter dados do usuário logado
// @route   GET /api/auth/me
// @access  Private

exports.getMe = async (req, res) => {

    // O user já vem pronto do middleware (req.user)
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
};