import React from 'react';

interface HeroSectionProps {
  heroTitulo: string;
  heroSubtitulo: string;
  heroImagem: string | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroTitulo, heroSubtitulo, heroImagem }) => {
  return (
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
  );
};

export default HeroSection;
