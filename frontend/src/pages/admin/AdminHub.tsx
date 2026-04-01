import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CriarPostagem from '../postagem/CriarPostagem';
import ConfiguracoesDashboard from './ConfiguracoesDashboard';

type TabAtiva = 'publicacoes' | 'configuracoes';

const AdminHub: React.FC = () => {
    const [tabAtiva, setTabAtiva] = useState<TabAtiva>('publicacoes');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminId');
        navigate('/login');
    };

    return (
        <div
            className="min-h-screen font-['Inter',system-ui,sans-serif]"
            style={{
                background: 'linear-gradient(135deg, #f8f6f7 0%, #ede8ea 50%, #f5f2f3 100%)',
            }}
        >
            {/* Header */}
            <header className="bg-[#2c1d26] shadow-lg border-b border-white/10">
                <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 rounded-full bg-gradient-to-b from-[#a5002c] to-[#512B3C]"></div>
                        <h1 className="text-white font-bold text-xl tracking-wide">Painel Administrativo</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="text-[#C9B3BE] hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                            </svg>
                            Ver Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-[#C9B3BE] hover:text-red-300 text-sm font-medium transition-colors flex items-center gap-1.5"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            {/* Tabs de Navegação */}
            <div className="max-w-5xl mx-auto px-6 pt-8">
                <div className="flex gap-2">
                    <button
                        onClick={() => setTabAtiva('publicacoes')}
                        className={`px-6 py-3 rounded-t-[12px] font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
                            tabAtiva === 'publicacoes'
                                ? 'bg-white text-[#512B3C] shadow-sm border border-b-0 border-gray-200'
                                : 'bg-[#512B3C]/10 text-[#512B3C]/60 hover:bg-[#512B3C]/20 border border-transparent'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Publicações
                        </span>
                    </button>
                    <button
                        onClick={() => setTabAtiva('configuracoes')}
                        className={`px-6 py-3 rounded-t-[12px] font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
                            tabAtiva === 'configuracoes'
                                ? 'bg-white text-[#512B3C] shadow-sm border border-b-0 border-gray-200'
                                : 'bg-[#512B3C]/10 text-[#512B3C]/60 hover:bg-[#512B3C]/20 border border-transparent'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                            Configurações
                        </span>
                    </button>
                </div>
            </div>

            {/* Conteúdo da Tab Ativa */}
            <div className="max-w-5xl mx-auto px-6 pb-12">
                <div className="bg-white rounded-b-[14px] rounded-tr-[14px] shadow-sm border border-gray-200 border-t-0 p-6 md:p-8">
                    {tabAtiva === 'publicacoes' ? (
                        <CriarPostagem />
                    ) : (
                        <ConfiguracoesDashboard />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHub;
