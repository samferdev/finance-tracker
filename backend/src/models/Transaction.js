const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Por favor, adicione uma descrição'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Por favor, adicione um valor para a transação']
    },
    /*type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },*/
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);