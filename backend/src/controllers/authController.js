const User = require('../models/User');

// @desc    Registrar usuário
// @route   POST /api/auth/register
// @access  Public

exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const user = await User.create({
            name,
            email,
            password
        });

        sendTokenResponse(user, 201, res);
    }catch (error) {
        res.status(400).json({success: false, error: error.message});
    }
};

// @desc    Login usuário
// @route   POST /api/auth/login
// @access  Public

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validar se email e senha foram enviados
        if(!email || !password){
            return res.status(400).json({success: false, error: 'Por favor, adicione email e senha'});
        }

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({success: false, error: 'Credenciais inválidas'});
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({success: false, error: 'Credenciais inválidas'});
        }
        
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Helper para pegar token e enviar json de resposta
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({
        success: true,
        token
    });
}