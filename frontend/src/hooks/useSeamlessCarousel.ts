//este hook isola a lógica matemática e de estado do carrossel infinito sem volta (seamless loop)
import { useState, useEffect } from 'react';

export default function useSeamlessCarousel(images: string[] | null, intervalMs = 4000, transitionMs = 1000) {
  //estado para controlar qual imagem está sendo exibida e se a transição está ativa
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  //cria um array com o primeiro item duplicado no final para o efeito de loop infinito
  const imagesToRender = images && images.length > 1
    ? [...images, images[0]]
    : images || [];

  //lógica de avanço contínuo do carrossel
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true); //garante que a transição de slide está ativa
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [images, intervalMs]);

  //lógica de teletransporte invisível no final do array
  useEffect(() => {
    if (!images || images.length <= 1) return;

    //quando chega na imagem clone, esperamos a animação acabar e resetamos escondido
    if (currentIndex === images.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false); //desliga a transição visual
        setCurrentIndex(0); //teletransporta instantaneamente para o início real
      }, transitionMs);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, images, transitionMs]);

  return { currentIndex, isTransitioning, imagesToRender };
}
