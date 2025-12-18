const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
    res.send('API do Finance Tracker está funcionando!');
});

module.exports = app;