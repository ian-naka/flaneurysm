import React from 'react';

interface HighlightSectionProps {
  highlightTitulo: string;
  highlightImagem: string | null;
}

const HighlightSection: React.FC<HighlightSectionProps> = ({ highlightTitulo, highlightImagem }) => {
  return (
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
  );
};

export default HighlightSection;
