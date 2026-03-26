import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Input from '../../components/formulario/Input';
import Button from '../../components/formulario/Button';
import useFlashMessage from '../../hooks/useFlashMessage';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const resposta = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao realizar login.');
            }

            localStorage.setItem('token', dados.token);
            localStorage.setItem('adminId', dados.adminId);

            setFlashMessage('login realizado com sucesso!', 'success');
            navigate('/criar-registro');

        } catch (error) {
            setFlashMessage(error instanceof Error ? error.message : String(error), 'error');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 font-sans"
            style={{
                background: 'linear-gradient(135deg, oklab(39.2% -0.041 0.011) 6.19%, oklab(34.1% 0.061 -0.010) 46.77%, oklab(47.8% 0.026 0.015) 90.53%)',
            }}
        >
            <div className="w-full max-w-[400px] flex flex-col items-center">

                <h1 className="text-[42px] text-[#FCFCFC] font-bold mb-1 text-center drop-shadow-md">
                    Bem Vindo
                </h1>
                <div className="text-[15px] text-[#FCFCFC] mb-6 text-center drop-shadow-md opacity-90">
                    Faça login para continuar!
                </div>

                <div className="bg-white w-full p-[30px] shadow-lg rounded-[40px] border border-white/10">

                    <form onSubmit={handleLogin} className="flex flex-col gap-[15px]">

                        <div>
                            <label htmlFor="email" className="sr-only">Usuário ou E-mail</label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Usuário ou E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="senha" className="sr-only">Senha</label>
                            <Input
                                type="password"
                                id="senha"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit">
                            Entrar
                        </Button>

                        <div className="text-center mt-3">
                            <a
                                href="#"
                                className="text-[#512B3C] text-[14px] font-medium hover:underline transition-colors"
                            >
                                Perdeu a Senha?
                            </a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
