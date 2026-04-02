import React from 'react';

interface CardsSectionProps {
  card1Titulo: string;
  card1Imagem: string | null;
  card2Titulo: string;
  card2Imagem: string | null;
}

const CardsSection: React.FC<CardsSectionProps> = ({ card1Titulo, card1Imagem, card2Titulo, card2Imagem }) => {
  const cards = [
    { id: 1, title: card1Titulo, img: card1Imagem },
    { id: 2, title: card2Titulo, img: card2Imagem }
  ];

  return (
    <div className="flex flex-wrap w-full justify-center lg:justify-between py-16 px-6 md:px-12 lg:px-20 gap-8 lg:gap-16 relative" style={{ backgroundImage: 'linear-gradient(in oklab 170deg, oklab(46.8% 0.027 0.016) 0%, oklab(48.2% 0.027 0.015) 45%, oklab(44.9% 0.022 0.014) 100%)' }}>
      {cards.map((card) => (
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
  );
};

export default CardsSection;
