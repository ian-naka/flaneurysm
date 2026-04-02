import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import api from '../../services/api';
import HeroSection from '../../components/dashboard/HeroSection';
import HighlightSection from '../../components/dashboard/HighlightSection';
import CardsSection from '../../components/dashboard/CardsSection';

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
              const res = await api.get('/dashboard-config');
              setConfig(res.data);
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

        {/* Hero Section */}
        <HeroSection 
          heroTitulo={heroTitulo} 
          heroSubtitulo={heroSubtitulo} 
          heroImagem={heroImagem} 
        />

        {/* Highlights Fotos */}
        <HighlightSection 
          highlightTitulo={highlightTitulo} 
          highlightImagem={highlightImagem} 
        />

        {/* Bottom Cards Area */}
        <CardsSection 
          card1Titulo={card1Titulo} 
          card1Imagem={card1Imagem} 
          card2Titulo={card2Titulo} 
          card2Imagem={card2Imagem} 
        />
      </main>
    </div>
  );
};

export default Dashboard;
