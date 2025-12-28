import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Novos estados para o formulário
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');

    const navigate = useNavigate();

    // Carregar dados
    useEffect(() => {
        const loadTransactions = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await api.get('/transactions', config);
                setTransactions(response.data.data);
                setLoading(false);
            } catch (error) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        };
        loadTransactions();
    }, [navigate]);

    // Função para ADICIONAR nova transação
    const handleAddTransaction = async (e) => {
        e.preventDefault(); // Não recarregar a página

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const body = {
                text,
                amount: Number(amount) // Converte string para número
            };

            const response = await api.post('/transactions', body, config);

            // Adiciona a nova transação na lista visual imediatamente
            setTransactions([...transactions, response.data.data]);

            // Limpa os campos
            setText('');
            setAmount('');

        } catch (error) {
            alert('Erro ao adicionar transação');
            console.error(error);
        }
    };

    // Função para SAIR
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Cálculo do Saldo Total (Matemática simples)
    // O reduce passa item por item somando ao acumulador (acc)
    const balance = transactions.reduce((acc, item) => acc + item.amount, 0);

    if (loading) return <p>Carregando...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>

            {/* Cabeçalho com Saldo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h1>Minhas Finanças</h1>
                    <h3>Saldo: <span style={{ color: balance >= 0 ? 'green' : 'red' }}>R$ {balance.toFixed(2)}</span></h3>
                </div>
                <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                    Sair
                </button>
            </div>

            {/* Formulário de Adição */}
            <form onSubmit={handleAddTransaction} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h4>Nova Transação</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Descrição (ex: Aluguel)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        style={{ flex: 2, padding: '8px' }}
                    />
                    <input
                        type="number"
                        placeholder="Valor (- p/ gasto)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        style={{ flex: 1, padding: '8px' }}
                    />
                    <button type="submit" style={{ flex: 1, background: '#2ecc71', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Adicionar
                    </button>
                </div>
                <small style={{ color: '#666' }}>* Use valores negativos para despesas (ex: -50)</small>
            </form>

            {/* Lista de Transações */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {transactions.map((transaction) => (
                    <li key={transaction._id} style={{
                        background: 'white',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        margin: '10px 0',
                        padding: '15px',
                        borderRight: transaction.amount > 0 ? '5px solid #2ecc71' : '5px solid #e74c3c',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <span>{transaction.text}</span>
                        <span style={{ fontWeight: 'bold' }}>
                            R$ {transaction.amount.toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;