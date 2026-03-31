import React, { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isTextosOpen, setIsTextosOpen] = useState(false);
  const [isFotosOpen, setIsFotosOpen] = useState(false);

  return (
    <>
      {/* Overlay Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Principal (Design extraído via MCP) */}
      <div 
        className={`fixed top-0 left-0 z-50 h-screen w-60 flex flex-col py-7 px-6 bg-origin-border border-r border-r-[#FFFFFF0F] antialiased text-xs/4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundImage: 'linear-gradient(in oklab 175deg, oklab(38% 0.061 -0.011) 0%, oklab(39.2% 0.062 -0.009) 50%, oklab(35.6% 0.057 -0.013) 100%)' }}
      >
        <div className="flex pb-8 cursor-pointer" onClick={onClose} title="Fechar menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4C4CC" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 hover:stroke-white transition-colors">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        
        {/* Menu Navigation Centralizada com gap único */}
        <div className="flex flex-col gap-6">
          {/* Item TEXTOS com Accordion */}
          <div className="flex flex-col gap-1">
            <div 
              className="flex items-center justify-between uppercase tracking-[2px] whitespace-pre-wrap text-white font-['Inter',system-ui,sans-serif] font-extrabold text-[15px]/4.5 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsTextosOpen(!isTextosOpen)}
            >
              <span>TEXTOS</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isTextosOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className={`flex flex-col pl-4 overflow-hidden transition-all duration-300 ease-in-out ${isTextosOpen ? 'max-h-40 mt-3 gap-2 opacity-100' : 'max-h-0 opacity-0 m-0'}`}>
              <a href="#" className="uppercase tracking-[1px] text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-medium text-[13px]/4">TEXTO1</a>
              <a href="#" className="uppercase tracking-[1px] text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-medium text-[13px]/4">TEXTO2</a>
              <a href="#" className="uppercase tracking-[1px] text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-medium text-[13px]/4">TEXTO3</a>
            </div>
          </div>

          {/* Item FOTOS com Accordion */}
          <div className="flex flex-col gap-1">
            <div 
              className="flex items-center justify-between uppercase tracking-[2px] whitespace-pre-wrap text-[#C9B3BE] hover:text-white font-['Inter',system-ui,sans-serif] font-extrabold text-[15px]/4.5 cursor-pointer transition-colors"
              onClick={() => setIsFotosOpen(!isFotosOpen)}
            >
              <span>FOTOS</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isFotosOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div className={`flex flex-col pl-4 overflow-hidden transition-all duration-300 ease-in-out ${isFotosOpen ? 'max-h-40 mt-3 gap-2 opacity-100' : 'max-h-0 opacity-0 m-0'}`}>
              <a href="#" className="uppercase tracking-[1px] text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-medium text-[13px]/4">FOTO 1</a>
              <a href="#" className="uppercase tracking-[1px] text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-medium text-[13px]/4">FOTO 2</a>
              <a href="#" className="uppercase tracking-[1px] text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-medium text-[13px]/4">FOTO 3</a>
            </div>
          </div>
          
          {/* Item SOBRE */}
          <a href="#" className="uppercase tracking-[2px] whitespace-pre-wrap text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-extrabold text-[15px]/4.5">
            SOBRE
          </a>

          {/* Item CONTATO */}
          <a href="#" className="uppercase tracking-[2px] whitespace-pre-wrap text-[#C9B3BE] hover:text-white transition-colors font-['Inter',system-ui,sans-serif] font-extrabold text-[15px]/4.5">
            CONTATO
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
