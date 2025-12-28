const Transaction = require('../models/Transaction');


// @desc    Listar todas as transações (apenas do usuário logado)
// @route   GET /api/transactions
// @access  Private

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Adicionar transação
// @route   POST /api/transactions
// @access  Private

exports.addTransaction = async (req, res) => {
    try {
        const { text, amount } = req.body;

        const transactions = await Transaction.create({
            text,
            amount,
            user: req.user.id

        })

        return res.status(201).json({
            success: true,
            data: transactions
        })

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({ success: false, error: 'Erro no servidor' });
        }
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        // Busca a transação pelo ID que veio na URL
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ success: false, error: 'Transação não encontrada' });
        }
        // Verifica se a transação pertence mesmo a quem está tentando deletar
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Não autorizado' });
        }

        await transaction.deleteOne()

        return res.status(200).json({ success: true, data: {} })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Erro no servidor'
        });
    }
}