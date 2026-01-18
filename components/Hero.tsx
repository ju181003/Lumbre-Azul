import React, { useState } from 'react';
import { ViewState } from '../types';
import { MoveRight, ArrowDown } from 'lucide-react';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  const [hoverSide, setHoverSide] = useState<'none' | 'left' | 'right'>('none');

  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden pt-28 md:pt-16 border-b border-white/10">
      
      {/* LEFT SIDE: MAR (Blue) */}
      <div 
        className={`relative md:w-1/2 w-full h-1/2 md:h-full transition-all duration-700 ease-out border-r border-white/10 ${hoverSide === 'right' ? 'md:w-[40%] opacity-40' : 'md:w-[60%] opacity-100'}`}
        onMouseEnter={() => setHoverSide('left')}
        onMouseLeave={() => setHoverSide('none')}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2652&auto=format&fit=crop')] bg-cover bg-center filter grayscale contrast-125 brightness-75"></div>
        <div className="absolute inset-0 bg-lumbre-blue/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 pb-20">
          <div className="text-lumbre-blue font-mono text-xs mb-2 tracking-[0.3em]">SECTOR 01</div>
          <h2 className="font-heading text-7xl md:text-9xl text-white leading-none uppercase mix-blend-overlay">
            Mar
          </h2>
          <p className="font-mono text-xs md:text-sm text-gray-300 max-w-sm mt-4 border-l border-lumbre-blue pl-4">
            Surf de agua fría. Pesca submarina. Buceando en arrecifes. La calma antes de la tormenta.
          </p>
          <div className="mt-8">
             <button 
                onClick={() => setView(ViewState.ADVISOR)}
                className="group flex items-center space-x-3 text-white hover:text-lumbre-blue transition-colors"
             >
                <span className="font-heading text-xl uppercase tracking-widest">Iniciar Inmersión</span>
                <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: FUEGO (Green) */}
      <div 
        className={`relative md:w-1/2 w-full h-1/2 md:h-full transition-all duration-700 ease-out ${hoverSide === 'left' ? 'md:w-[40%] opacity-40' : 'md:w-[60%] opacity-100'}`}
        onMouseEnter={() => setHoverSide('right')}
        onMouseLeave={() => setHoverSide('none')}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center filter grayscale contrast-125 brightness-75"></div>
        <div className="absolute inset-0 bg-lumbre-green/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 pb-20 md:items-end md:text-right">
          <div className="text-lumbre-green font-mono text-xs mb-2 tracking-[0.3em]">SECTOR 02</div>
          <h2 className="font-heading text-7xl md:text-9xl text-white leading-none uppercase mix-blend-overlay">
            Fuego
          </h2>
          <p className="font-mono text-xs md:text-sm text-gray-300 max-w-sm mt-4 border-r md:border-r border-l md:border-l-0 border-lumbre-green pl-4 md:pr-4 md:pl-0">
            Senderismo técnico. Atletas híbridos. Supervivencia. La chispa que enciende el espíritu.
          </p>
           <div className="mt-8 flex justify-start md:justify-end">
             <button 
                onClick={() => {
                   const element = document.getElementById('activities');
                   element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center space-x-3 text-white hover:text-lumbre-green transition-colors"
             >
                <span className="font-heading text-xl uppercase tracking-widest">Ver Protocolos</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-2 transition-transform" />
             </button>
          </div>
        </div>
      </div>

      {/* CENTER OVERLAY ABSOLUTE */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-difference">
         <h1 className="font-heading text-[10vw] md:text-[12vw] text-white leading-none tracking-tighter opacity-100 whitespace-nowrap">
           LUMBRE AZUL
         </h1>
      </div>
      
      {/* HUD Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
         <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>

    </div>
  );
};