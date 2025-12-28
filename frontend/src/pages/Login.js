import React, { useState } from 'react';
import api from '../services/api'; // Importamos nossa ponte
import { useNavigate } from 'react-router-dom'; // Para mudar de página

function Login() {
    // LÓGICA: Variáveis para guardar o que é digitado
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Hook para navegar

    // LÓGICA: Função disparada ao clicar em "Entrar"
    const handleLogin = async (e) => {
        e.preventDefault(); // Evita que a página recarregue (padrão do HTML)
        setError(''); // Limpa erros antigos

        try {
            // 1. O Axios bate no Backend (igual ao Postman)
            const response = await api.post('/auth/login', { email, password });

            // 2. Se chegou aqui, deu sucesso! Pegamos o token.
            const { token } = response.data;

            // 3. Guardamos o crachá no navegador
            localStorage.setItem('token', token);

            // 4. Mandamos o usuário para o Dashboard
            navigate('/dashboard');

        } catch (err) {
            // Se deu erro (401, 500, etc), mostramos na tela
            setError(err.response?.data?.error || 'Erro ao fazer login');
        }
    };

    // VISUAL (HTML/CSS simplificado)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <form onSubmit={handleLogin} style={{ width: '300px', padding: '20px', border: '1px solid #ccc' }}>
                <h2>Login</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                        required
                    />
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none' }}>
                    ENTRAR
                </button>
            </form>
        </div>
    );
}

export default Login;