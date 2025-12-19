const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor, adicione um nome para a categoria'],
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']   
    },
    color: {
        type: String,
        default: '#3b82f6'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);