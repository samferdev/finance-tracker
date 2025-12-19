const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Montar as rotas
app.use('/api/auth', authRoutes);

// Rotas
app.get('/', (req, res) => {
    res.send('API do Finance Tracker está funcionando!');
});

module.exports = app;