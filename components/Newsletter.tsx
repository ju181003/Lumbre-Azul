
import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <section className="bg-lumbre-panel border-t border-white/10 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
         <div className="w-64 h-64 border border-white rounded-full flex items-center justify-center">
            <div className="w-48 h-48 border border-white rounded-full"></div>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-6">
           <span className="px-3 py-1 bg-lumbre-blue/10 border border-lumbre-blue/30 text-lumbre-blue text-[10px] font-mono tracking-[0.2em] uppercase">
              Frecuencia Lumbre
           </span>
        </div>

        <h3 className="font-heading text-4xl md:text-5xl text-white uppercase mb-4">
          Informe Semanal
        </h3>
        
        <p className="font-mono text-sm text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
          Recibe acceso prioritario a nuevos suministros y lecturas diseñadas para el fortalecimiento de la mente. Sin ruido. Solo herramientas para tu mejor versión.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-lumbre-blue to-lumbre-green opacity-0 group-hover:opacity-20 transition-opacity blur-md"></div>
            <div className="relative flex items-center bg-black border border-white/20 p-1 focus-within:border-white/50 transition-colors">
              <div className="pl-4 text-gray-500">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="INGRESA_TU_CORREO"
                className="w-full bg-transparent text-white font-mono text-sm p-4 focus:outline-none placeholder-gray-600 uppercase"
                required
              />
              <button 
                type="submit"
                disabled={subscribed}
                className={`px-6 py-3 font-heading text-xl uppercase transition-all duration-300 flex items-center space-x-2 ${
                  subscribed 
                    ? 'bg-lumbre-green text-white' 
                    : 'bg-white text-black hover:bg-lumbre-blue hover:text-white'
                }`}
              >
                {subscribed ? (
                  <>
                    <span>Unido</span>
                    <Check className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Suscribir</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            * Cero Spam. Solo contenido de alto valor.
          </p>
        </form>

      </div>
    </section>
  );
};
