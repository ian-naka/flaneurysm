//este arquivo renderiza a seção principal superior da home page, com textos e um carrossel fotográfico dinâmico.
import React from 'react';
import useSeamlessCarousel from '../../hooks/useSeamlessCarousel';

interface HeroSectionProps {
  heroTitulo: string;
  heroSubtitulo: string;
  heroImagem: string[] | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroTitulo, heroSubtitulo, heroImagem }) => {
  //utiliza o hook global para controlar o loop perfeito do carrossel
  const { currentIndex, isTransitioning, imagesToRender } = useSeamlessCarousel(heroImagem);

  return (
    <div className="flex w-full min-h-[420px] relative overflow-hidden shadow-xl shrink-0 flex-col md:flex-row md:items-stretch">
      {/* md:items-stretch garante que as duas metades cresçam juntas para a mesma altura */}

      {/* metade esquerda: Textos */}
      <div className="flex flex-col justify-end w-full md:w-1/2 py-16 pl-24 pr-12 md:py-20 md:pl-32 z-10" style={{ backgroundImage: 'linear-gradient(in oklab 160deg, oklab(38% 0.061 -0.011) 0%, oklab(40.2% 0.065 -0.011) 45%, oklab(36.9% 0.058 -0.011) 100%)' }}>
        <h1 className="uppercase tracking-[2px] whitespace-pre-wrap text-white font-black text-3xl sm:text-[42px] leading-tight drop-shadow-lg">
          {heroTitulo}
        </h1>
        <p className="mt-3 tracking-[0.5px] text-[#C9B3BE] text-base">
          {heroSubtitulo}
        </p>
      </div>

      {/* metade direita: Imagens */}
      {/* h-[300px] no mobile, md:h-auto no desktop (se estica para igualar ao texto) */}
      <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-black/30 flex items-center justify-center overflow-hidden">
        {imagesToRender.length > 0 ? (
          <div
            className={`flex w-full h-full absolute inset-0 ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {imagesToRender.map((img, idx) => (
              <img
                key={idx}
                src={`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/uploads/${img}`}
                alt={`Hero ${idx}`}
                className="w-full h-full shrink-0 object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ) : (
          <span className="text-white/40 text-sm font-semibold tracking-widest uppercase border border-dashed border-white/20 p-4 rounded-xl z-10">
            Espaço para Foto
          </span>
        )}
      </div>

    </div>
  );
};

export default HeroSection;
