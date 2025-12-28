import axios from 'axios';
// Cria uma instância do Axios (como se fosse um objeto de conexão do banco)

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export default api;