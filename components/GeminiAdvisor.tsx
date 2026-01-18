import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { Message } from '../types';
import { Send, Terminal, Loader, Radio, ShieldAlert } from 'lucide-react';

export const GeminiAdvisor: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '> INICIANDO LUMBRE AZUL CORE...\n> SISTEMA EN LÍNEA.\n> IDENTIFIQUE OBJETIVO: ¿SURF EN MANZANILLO, NEVADO O RUTINA MILITAR?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-lumbre-black flex items-center justify-center p-4 pt-32 md:pt-24 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-10 w-px h-64 bg-gradient-to-b from-transparent via-lumbre-blue to-transparent opacity-50"></div>
      <div className="absolute bottom-1/4 right-10 w-px h-64 bg-gradient-to-b from-transparent via-lumbre-green to-transparent opacity-50"></div>

      <div className="w-full max-w-5xl h-[80vh] bg-lumbre-panel border border-white/20 flex flex-col relative shadow-[0_0_50px_rgba(37,99,235,0.1)]">
        
        {/* Terminal Header */}
        <div className="h-12 border-b border-white/20 bg-black/50 flex items-center justify-between px-4 select-none">
          <div className="flex items-center space-x-3">
             <div className="w-3 h-3 rounded-full bg-red-500 opacity-70 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
             <div className="w-3 h-3 rounded-full bg-green-500 opacity-70 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
             <span className="ml-4 font-mono text-[10px] text-gray-400 tracking-widest">ENCRIPTACIÓN: AES-256 // CONEXIÓN: ESTABLE</span>
          </div>
          <div className="flex items-center space-x-2 text-lumbre-blue animate-pulse">
            <Radio className="w-4 h-4" />
            <span className="font-heading text-lg tracking-widest">LumbreAzul_AI</span>
          </div>
        </div>

        {/* Output Screen */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm relative bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 border shadow-lg ${
                  msg.role === 'user' 
                    ? 'border-lumbre-blue/40 bg-lumbre-blue/10 text-gray-100' 
                    : 'border-lumbre-green/40 bg-lumbre-green/5 text-gray-200'
                }`}
              >
                <div className={`text-[10px] opacity-70 mb-2 border-b pb-1 font-bold ${msg.role === 'user' ? 'border-lumbre-blue/30 text-lumbre-blue' : 'border-lumbre-green/30 text-lumbre-green'}`}>
                   {msg.role === 'user' ? 'OPERADOR' : 'LUMBRE_AZUL_AI'} // {new Date().toLocaleTimeString()}
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex items-center space-x-2 text-lumbre-green text-xs font-mono bg-lumbre-green/10 px-3 py-1 border border-lumbre-green/20">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>ANALIZANDO VARIABLES DEL ENTORNO...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <div className="p-4 bg-black border-t border-white/20">
          <div className="flex items-center space-x-2 bg-lumbre-panel border border-white/30 px-4 py-3 focus-within:border-white/60 transition-colors shadow-inner">
            <Terminal className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="SOLICITAR PROTOCOLO..."
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none font-mono text-sm"
              autoFocus
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="text-gray-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest border-l border-white/20 pl-4 ml-2"
            >
              [ENVIAR]
            </button>
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-gray-500 font-mono">
             <span>MEMORIA: 64TB LIBRES</span>
             <span>CPU: OPTIMIZADO PARA MONTAÑA Y MAR</span>
          </div>
        </div>

      </div>
    </div>
  );
};