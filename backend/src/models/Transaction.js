const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Por favor, adicione um título para a transação'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Por favor, adicione um valor para a transação']
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        maxlength: 500,
    },
}, {timestamps: true});

module.exports = mongoose.model('Transaction', CategorySchema);