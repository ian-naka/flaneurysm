import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';

const API_URL = import.meta.env.VITE_API_URL;

interface DashboardConfigData {
    heroTitulo: string;
    heroSubtitulo: string;
    heroImagem: string | null;
    highlightTitulo: string;
    highlightImagem: string | null;
    card1Titulo: string;
    card1Imagem: string | null;
    card2Titulo: string;
    card2Imagem: string | null;
}

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [config, setConfig] = useState<DashboardConfigData | null>(null);

  useEffect(() => {
      const fetchConfig = async () => {
          try {
              const res = await fetch(`${API_URL}/dashboard-config`);
              if (res.ok) {
                  const data = await res.json();
                  setConfig(data);
              }
          } catch (error) {
              console.error("Erro ao carregar configurações da dashboard:", error);
          }
      };
      fetchConfig();
  }, []);

  const heroTitulo = config?.heroTitulo || "TEXTO EM DESTAQUE";
  const heroSubtitulo = config?.heroSubtitulo || "subtitulo, descrição, data, bla bla bla";
  const heroImagem = config?.heroImagem ? `${API_URL}/uploads/${config.heroImagem}` : null;

  const highlightTitulo = config?.highlightTitulo || "GRUPO DE FOTOS EM DESTAQUE";
  const highlightImagem = config?.highlightImagem ? `${API_URL}/uploads/${config.highlightImagem}` : null;

  const card1Titulo = config?.card1Titulo || "TEXTO EM DESTAQUE MENOR 1";
  const card1Imagem = config?.card1Imagem ? `${API_URL}/uploads/${config.card1Imagem}` : null;

  const card2Titulo = config?.card2Titulo || "TEXTO EM DESTAQUE MENOR 2";
  const card2Imagem = config?.card2Imagem ? `${API_URL}/uploads/${config.card2Imagem}` : null;

  return (
    <div className="flex bg-[#2c1d26] h-[100dvh] w-full font-['Inter',system-ui,sans-serif] overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main 
        className="flex-1 flex flex-col relative antialiased text-xs/4 overflow-y-auto"
        style={{ backgroundImage: 'linear-gradient(in oklab 180deg, oklab(28.6% 0.022 0.007) 0%, oklab(29.6% 0.023 0.008) 50%, oklab(27.7% 0.020 0.007) 100%)' }}
      >
        {/* Ícone de ativação da Sidebar (Hamburger) isolado para o mobile */}
        <button 
          className="flex fixed top-6 left-6 p-2 rounded-lg border border-white/20 z-30 hover:opacity-80 transition-opacity focus:outline-none shadow-lg"
          style={{ backgroundImage: 'linear-gradient(in oklab 160deg, oklab(38% 0.061 -0.011) 0%, oklab(40.2% 0.065 -0.011) 45%, oklab(36.9% 0.058 -0.011) 100%)' }}
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 drop-shadow-md">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Hero Section (Design extraído via MCP J-0) */}
        <div className="flex w-full h-auto min-h-[420px] relative overflow-hidden shadow-xl shrink-0 flex-col md:flex-row">
          <div className="flex flex-col justify-end w-full md:w-1/2 h-full py-16 pl-24 pr-12 md:py-20 md:pl-32" style={{ backgroundImage: 'linear-gradient(in oklab 160deg, oklab(38% 0.061 -0.011) 0%, oklab(40.2% 0.065 -0.011) 45%, oklab(36.9% 0.058 -0.011) 100%)' }}>
            <h1 className="uppercase tracking-[2px] whitespace-pre-wrap text-white font-black text-3xl sm:text-[42px] leading-tight drop-shadow-lg">
              {heroTitulo}
            </h1>
            <p className="mt-3 tracking-[0.5px] text-[#C9B3BE] text-base">
              {heroSubtitulo}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center min-h-[300px] border-l border-white/5 shadow-inner overflow-hidden" style={{ backgroundImage: 'linear-gradient(in oklab 170deg, oklab(22.8% 0.009 -0.037) 0%, oklab(24.7% 0.009 -0.040) 60%, oklab(21.7% 0.007 -0.030) 100%)' }}>
            {heroImagem ? (
                <img src={heroImagem} alt="Hero" className="w-full h-full object-cover" />
            ) : (
                <span className="text-white/40 text-sm font-semibold tracking-widest uppercase border border-dashed border-white/20 p-4 rounded-xl">Espaço para Foto</span>
            )}
          </div>
        </div>

        {/* Highlights Fotos */}
        <div className="flex flex-col-reverse md:flex-row w-full h-auto min-h-[300px] overflow-hidden relative shadow-lg shrink-0">
          <div className="w-full md:w-1/2 h-[300px] sm:h-[400px] bg-black/30 border-r border-white/5 flex items-center justify-center overflow-hidden">
            {highlightImagem ? (
                <img src={highlightImagem} alt="Highlight" className="w-full h-full object-cover" />
            ) : (
                <span className="text-white/40 text-sm font-semibold tracking-widest uppercase border border-dashed border-white/20 p-4 rounded-xl">Espaço para Foto</span>
            )}
          </div>
          <div className="w-full md:w-1/2 h-auto min-h-[250px] md:min-h-[400px] flex items-center justify-center p-12" style={{ backgroundImage: 'linear-gradient(in oklab 160deg, oklab(38.2% -0.040 0.010) 0%, oklab(40.1% -0.039 0.009) 50%, oklab(36.7% -0.039 0.012) 100%)' }}>
            <h2 className="uppercase text-center tracking-[2px] text-white font-black text-2xl md:text-3xl lg:text-4xl leading-tight max-w-lg">
              {highlightTitulo}
            </h2>
          </div>
        </div>

        {/* Bottom Cards Area */}
        <div className="flex flex-wrap w-full justify-center lg:justify-between py-16 px-6 md:px-12 lg:px-20 gap-8 lg:gap-16 relative" style={{ backgroundImage: 'linear-gradient(in oklab 170deg, oklab(46.8% 0.027 0.016) 0%, oklab(48.2% 0.027 0.015) 45%, oklab(44.9% 0.022 0.014) 100%)' }}>
          {[{ id: 1, title: card1Titulo, img: card1Imagem }, { id: 2, title: card2Titulo, img: card2Imagem }].map((card) => (
            <div key={card.id} className="flex flex-col w-full sm:w-80 md:w-[360px] rounded-2xl overflow-hidden shadow-2xl shrink-0 cursor-pointer hover:-translate-y-2 hover:shadow-3xl transition-all duration-300">
               <div className="w-full h-[220px] flex items-center justify-center overflow-hidden" style={{ backgroundImage: 'linear-gradient(in oklab 155deg, oklab(36.6% 0.022 0.007) 0%, oklab(38.8% 0.021 0.007) 50%, oklab(35.7% 0.020 0.007) 100%)' }}>
                   {card.img ? (
                       <img src={card.img} alt={`Card ${card.id}`} className="w-full h-full object-cover" />
                   ) : (
                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#888888" strokeWidth="1.5">
                         <rect x="3" y="3" width="18" height="18" rx="2" />
                         <circle cx="8.5" cy="8.5" r="1.5" />
                         <path d="M21 15l-5-5L5 21" />
                       </svg>
                   )}
               </div>
               <div className="w-full py-5 px-6" style={{ backgroundImage: 'linear-gradient(in oklab 90deg, oklab(38.2% -0.040 0.010) 0%, oklab(39.7% -0.039 0.009) 50%, oklab(37.5% -0.039 0.010) 100%)' }}>
                 <h3 className="uppercase tracking-[1px] text-white font-bold text-sm">{card.title}</h3>
               </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
