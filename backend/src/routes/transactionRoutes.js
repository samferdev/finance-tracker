const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

// Rota raiz: /api/transactions
// GET: Pega todas | POST: Cria nova
// Ambas protegidas pelo middleware 'protect'

router.route('/')
    .get(protect, getTransactions)
    .post(protect, addTransaction);

// Rota com ID: /api/transactions/:id
// DELETE: Apaga transação específica

router.route('/:id')
    .delete(protect, deleteTransaction);

module.exports = router;