//este arquivo renderiza a seção secundária da home page, focada em uma vitrine fotográfica contínua.
import React from 'react';
import useSeamlessCarousel from '../../hooks/useSeamlessCarousel';

interface HighlightSectionProps {
  highlightTitulo: string;
  highlightImagem: string[] | null;
}

const HighlightSection: React.FC<HighlightSectionProps> = ({ highlightTitulo, highlightImagem }) => {
  //utiliza o hook global para controlar o loop perfeito do carrossel
  const { currentIndex, isTransitioning, imagesToRender } = useSeamlessCarousel(highlightImagem);

  return (
    <div className="flex w-full min-h-[420px] relative overflow-hidden shadow-xl shrink-0 flex-col-reverse md:flex-row md:items-stretch">
      {/* md:items-stretch garante que as duas metades cresçam juntas para a mesma altura */}

      {/* metade esquerda: Imagens */}
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
                alt={`Highlight ${idx}`}
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

      {/* metade direita: Textos */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-12 z-10" style={{ backgroundImage: 'linear-gradient(in oklab 160deg, oklab(38.2% -0.040 0.010) 0%, oklab(40.1% -0.039 0.009) 50%, oklab(36.7% -0.039 0.012) 100%)' }}>
        <h2 className="uppercase text-center tracking-[2px] text-white font-black text-2xl md:text-3xl lg:text-4xl leading-tight max-w-lg drop-shadow-lg">
          {highlightTitulo}
        </h2>
      </div>

    </div>
  );
};

export default HighlightSection;
