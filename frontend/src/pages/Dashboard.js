import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [transactions, setTransactions] = useState([]); // Guarda as transações
    const [loading, setLoading] = useState(true); // Controla o "Carregando..."
    const navigate = useNavigate();

    // Função para deslogar (Apaga o token e volta pro login)
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // useEffect roda assim que a tela abre
    useEffect(() => {
        const loadTransactions = async () => {
            const token = localStorage.getItem('token');

            // Se não tiver token, tchau! 👋
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Configuramos o header com o Token manualmente
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const response = await api.get('/transactions', config);

                setTransactions(response.data.data); // O array está dentro de .data.data
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
                // Se o token for inválido (expirou), desloga
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        loadTransactions();
    }, [navigate]);

    if (loading) return <p>Carregando...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Meu Extrato</h1>
                <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '10px' }}>
                    Sair
                </button>
            </div>

            {transactions.length === 0 ? (
                <p>Nenhuma transação encontrada.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {transactions.map((transaction) => (
                        <li key={transaction._id} style={{
                            background: '#f4f4f4',
                            margin: '10px 0',
                            padding: '10px',
                            borderLeft: transaction.amount > 0 ? '5px solid green' : '5px solid red', // Verde se ganhou, vermelho se gastou
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
            )}
        </div>
    );
}

export default Dashboard;