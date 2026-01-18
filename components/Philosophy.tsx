
import React from 'react';
import { Flame, MapPin } from 'lucide-react';

export const Philosophy: React.FC = () => {
  return (
    <div className="min-h-screen bg-lumbre-black text-white py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-24 border-b border-white/20 pb-10">
           <h1 className="font-heading text-[12vw] leading-[0.8] opacity-10 select-none text-center lg:text-left text-white">
              NOSOTROS
           </h1>
           <div className="flex flex-col md:flex-row justify-between items-end mt-[-4vw] px-4">
              <span className="text-lumbre-blue font-mono text-sm tracking-widest bg-lumbre-black px-2">
                 DOC.REF: MANIFIESTO_01
              </span>
              <h2 className="font-heading text-5xl md:text-6xl uppercase max-w-xl text-right leading-none relative z-10">
                 Identidad <span className="text-lumbre-blue">Lumbre Azul</span>
              </h2>
           </div>
        </div>

        {/* NEW MANIFESTO BLOCK */}
        <div className="mb-40 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-lumbre-blue via-white to-lumbre-green opacity-30"></div>
            <div className="pl-6 md:pl-12 space-y-16">
                
                {/* 01: THE PRINCIPLE */}
                <div className="max-w-4xl">
                    <div className="flex items-center space-x-3 mb-6">
                        <Flame className="w-6 h-6 text-lumbre-blue" />
                        <span className="font-mono text-xs tracking-[0.2em] text-lumbre-blue uppercase">Principio de Combustión</span>
                    </div>
                    <p className="font-mono text-base md:text-lg text-gray-200 leading-relaxed text-justify border-l border-lumbre-blue/30 pl-6">
                        <strong className="text-white">Lumbre Azul nace de un principio real: el fuego azul</strong>, la combustión más pura, más caliente y más eficiente que existe. En química, una flama azul significa que no hay humo, no hay impurezas y no hay desperdicio. Solo energía controlada, precisa y disciplinada.
                        <br/><br/>
                        Ese concepto define quiénes somos.
                    </p>
                </div>

                {/* 02: THE IDENTITY */}
                <div className="max-w-4xl ml-auto text-right">
                    <div className="flex items-center justify-end space-x-3 mb-6">
                        <span className="font-mono text-xs tracking-[0.2em] text-lumbre-green uppercase">Identidad Nacional</span>
                        <MapPin className="w-6 h-6 text-lumbre-green" />
                    </div>
                    <p className="font-mono text-base md:text-lg text-gray-200 leading-relaxed text-justify md:text-right border-r border-lumbre-green/30 pr-6">
                        Somos una marca mexicana que toma la fuerza de nuestra propia tierra: el mar que nos rodea, el fuego que nos formó y la disciplina que distingue a quienes trabajan, entrenan y viven con intención. 
                        <span className="text-white block mt-4">
                            No imitamos culturas ajenas; construimos una identidad auténtica, hecha desde México y para México, con el carácter directo, firme y sencillo que nos representa.
                        </span>
                    </p>
                </div>

                {/* 03: THE DEFINITION (BOX) */}
                <div className="bg-white/5 border border-white/10 p-8 md:p-12 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Flame className="w-48 h-48" />
                     </div>
                     
                     <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="font-heading text-4xl md:text-5xl text-white uppercase leading-none mb-6">
                                Evolución <br/> Sin Humo
                            </h3>
                            <p className="font-mono text-sm text-gray-400">
                                En Lumbre Azul creemos en la transformación diaria: cuerpo, mente y espíritu alineados como una combustión perfecta.
                            </p>
                        </div>
                        <div className="space-y-4 font-mono text-sm text-gray-300 border-l border-white/10 pl-6">
                            <p>
                                Aquí el fuego no es desorden —es <span className="text-lumbre-blue">dirección</span>.
                            </p>
                            <p>
                                El mar no es calma pasiva —es <span className="text-lumbre-blue">adaptación inteligente</span>.
                            </p>
                            <p className="pt-4 text-white font-bold">
                                Lumbre Azul es eso: fuerza sin exceso, disciplina sin ruido y evolución sin humo.
                            </p>
                        </div>
                     </div>
                </div>

                {/* CLOSING */}
                <div className="text-center pt-8 border-t border-white/10">
                    <p className="font-heading text-2xl md:text-3xl text-white uppercase tracking-widest">
                        Bienvenido a Lumbre Azul.
                    </p>
                    <p className="font-mono text-xs text-lumbre-blue mt-2 uppercase tracking-[0.3em]">
                        Hechos en México. Hechos de mar y fuego.
                    </p>
                </div>

            </div>
        </div>

        {/* Existing Grid Content (The Columns) */}
        <div className="space-y-32 border-t border-white/20 pt-24">
           
           <div className="text-center mb-16">
                <span className="bg-white/10 px-3 py-1 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    Componentes del Sistema
                </span>
           </div>

           {/* Block 1: FUEGO */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                 <span className="font-mono text-lumbre-green text-xs tracking-widest mb-2 block">01 // VOLUNTAD</span>
                 <h3 className="font-heading text-4xl uppercase mb-4 text-white">El Fuego en Nosotros</h3>
                 <p className="font-mono text-sm text-gray-300 leading-relaxed text-justify">
                    El fuego representa nuestra pasión, la disciplina inquebrantable y el calor de la comunidad. Es la chispa que nos levanta antes del amanecer para entrenar y la llama que compartimos alrededor de una fogata al final de una expedición. Es la parte terrenal, la montaña, el esfuerzo crudo.
                 </p>
              </div>
              <div className="order-1 md:order-2 h-80 w-full bg-gray-900 relative overflow-hidden group border border-white/10">
                 <img src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" alt="Campfire" />
                 <div className="absolute inset-0 bg-lumbre-green/20 mix-blend-overlay"></div>
              </div>
           </div>

           {/* Block 2: MAR */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-80 w-full bg-gray-900 relative overflow-hidden group border border-white/10">
                 <img src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=2652&auto=format&fit=crop" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" alt="Ocean" />
                 <div className="absolute inset-0 bg-lumbre-blue/20 mix-blend-overlay"></div>
              </div>
              <div>
                 <span className="font-mono text-lumbre-blue text-xs tracking-widest mb-2 block">02 // ADAPTABILIDAD</span>
                 <h3 className="font-heading text-4xl uppercase mb-4 text-white">El Mar en Nosotros</h3>
                 <p className="font-mono text-sm text-gray-300 leading-relaxed text-justify">
                    El mar es la calma en el caos. Es la capacidad de fluir, de adaptarse a las condiciones cambiantes y de mantener la mente fría bajo presión. Representa nuestra conexión con lo profundo, la paciencia del pescador y la resiliencia ante las olas que la vida nos lanza.
                 </p>
              </div>
           </div>

           {/* Block 3: HYBRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="order-2 md:order-1">
                 <span className="font-mono text-white text-xs tracking-widest mb-2 block">03 // INGENIERÍA CORPORAL</span>
                 <h3 className="font-heading text-4xl uppercase mb-4 text-white">Atleta Híbrido</h3>
                 <p className="font-mono text-sm text-gray-300 leading-relaxed text-justify">
                    No nos especializamos. Somos generalistas de la supervivencia. Tenemos la fuerza para mover rocas y la capacidad aeróbica para cruzar sierras. Usamos la tecnología no para evadirnos, sino para optimizar nuestra biología y reconectar con nuestro entorno natural.
                 </p>
              </div>
              <div className="order-1 md:order-2 h-80 w-full bg-gray-900 relative overflow-hidden group border border-white/10">
                 <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" alt="Training" />
                 <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
              </div>
           </div>
           
           {/* Block 4: SYNERGY */}
           <div className="border border-lumbre-blue/30 bg-lumbre-panel/50 p-8 md:p-12 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-8">
                 <div className="flex-1">
                     <span className="font-mono text-white text-xs tracking-widest mb-2 block">04 // SINERGIA HUMANA</span>
                     <h3 className="font-heading text-4xl uppercase mb-4 text-white">Seres Complementarios</h3>
                     <p className="font-mono text-sm text-gray-300 leading-relaxed text-justify">
                        El verdadero sentido de nuestra existencia radica en la complementariedad. No estamos diseñados para ser islas, sino para construir puentes. En conjunto, tenemos el poder de detonar el gran cambio. Creemos firmemente en tratar a las personas con honor y en la búsqueda implacable de nuestra mejor versión: 
                        <span className="text-white font-bold"> física, mental y espiritual</span>.
                     </p>
                 </div>
                 <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 border border-white/20 rounded-full flex items-center justify-center animate-pulse">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-lumbre-blue to-lumbre-green rounded-full opacity-80 blur-sm"></div>
                 </div>
              </div>
           </div>

        </div>

        {/* Footer Quote */}
        <div className="mt-32 p-10 border border-white/10 bg-white/5 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lumbre-blue to-lumbre-green"></div>
           <p className="font-heading text-3xl md:text-5xl uppercase tracking-wide z-10 relative text-white">
              "La comodidad es un veneno lento. <br/> Sal afuera."
           </p>
           <p className="mt-6 font-mono text-xs text-gray-400 uppercase tracking-widest">
              — Comando Lumbre
           </p>
        </div>

      </div>
    </div>
  );
};
