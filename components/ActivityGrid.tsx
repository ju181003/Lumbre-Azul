import React, { useState } from 'react';
import { Activity as ActivityType, ViewState } from '../types';
import { askNutritionAI } from '../services/geminiService';
import { ChevronRight, Mountain, Waves, Flame, Tent, Fish, Clock, Calendar, ShoppingBag, Music, Package, Apple, Bot, Loader2, Camera, MapPin, Compass, Dumbbell, Zap, Users, ExternalLink, Play, Monitor, Trophy, Target, ArrowUpRight, Activity, BarChart3, Plane, ArrowRight } from 'lucide-react';

const activities: ActivityType[] = [
  {
    id: 'surf',
    title: 'SURF_MANZANILLO',
    description: 'Lectura de mareas en la costa. Conexión con la fuerza bruta del océano. Resiliencia en olas de fondo.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2670&auto=format&fit=crop',
    type: 'water'
  },
  {
    id: 'camp',
    title: 'ACAMPAR_ATEMAJAC',
    description: 'Refugio móvil en bosque de coníferas. Desconexión de la red. Fuego bajo constelaciones.',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2670&auto=format&fit=crop',
    type: 'land'
  },
  {
    id: 'trek',
    title: 'SENDERISMO_NEVADO',
    description: 'Ascenso al Nevado de Colima. Navegación en altura. Oxígeno reducido. Voluntad de hierro.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop',
    type: 'land'
  },
  {
    id: 'fish',
    title: 'PESCA_CHAPALA',
    description: 'Sustento y paciencia en la laguna. Conexión directa con el entorno lacustre.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2670&auto=format&fit=crop',
    type: 'water'
  }
];

const schedule = [
  { time: '06:00', task: 'MOVILIDAD + LUZ SOLAR DIRECTA' },
  { time: '07:00', task: 'ENTRENAMIENTO (FUERZA/RESISTENCIA)' },
  { time: '09:00', task: 'TRABAJO PROFUNDO (SIN DISTRACCIONES)' },
  { time: '14:00', task: 'ALIMENTACIÓN + DESCANSO TÁCTICO' },
  { time: '18:00', task: 'ACTIVIDAD RECREATIVA (COMUNIDAD)' },
  { time: '22:00', task: 'DESCANSAR DISPOSITIVOS' },
  { time: '22:30', task: 'SUEÑO REPARADOR' },
];

const calendar2026 = [
  { month: 'FEB', day: '01', event: 'MEDIO MARATÓN GDL', type: 'RUN', loc: 'GUADALAJARA' },
  { month: 'FEB', day: '6-8', event: 'HYROX GDL', type: 'HYBRID', loc: 'GUADALAJARA' },
  { month: 'FEB', day: '22', event: 'MEDIO MARATÓN MTY', type: 'RUN', loc: 'MONTERREY' },
  { month: 'MAR', day: '01', event: 'IRONMAN 70.3', type: 'HYBRID', loc: 'MONTERREY' },
  { month: 'ABR', day: '19', event: 'MARATÓN PTO VALLARTA', type: 'RUN', loc: 'PTO VALLARTA' },
  { month: 'JUN', day: 'SEM 1', event: 'MEDIO MARATÓN CDMX', type: 'RUN', loc: 'CDMX' },
  { month: 'AGO', day: 'TBC', event: 'MARATÓN CDMX', type: 'RUN', loc: 'CDMX' },
  { month: 'NOV', day: 'TBC', event: 'MARATÓN GDL', type: 'RUN', loc: 'GUADALAJARA' },
];

const visualLog = [
    { src: 'https://images.unsplash.com/photo-1415931633537-351070d20b81?q=80&w=2600&auto=format&fit=crop', cat: 'SURF', loc: 'PASCUALES' },
    { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2670&auto=format&fit=crop', cat: 'PESCA', loc: 'CHAPALA' },
    { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2600&auto=format&fit=crop', cat: 'CAMP', loc: 'MAZAMITLA' },
    { src: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2600&auto=format&fit=crop', cat: 'BUCEO', loc: 'COZUMEL' },
    { src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2600&auto=format&fit=crop', cat: 'MAR', loc: 'PACÍFICO' },
    { src: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2600&auto=format&fit=crop', cat: 'RUN', loc: 'PRIMAVERA' },
    { src: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2600&auto=format&fit=crop', cat: 'FUEGO', loc: 'VOLCÁN' },
    { src: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2670&auto=format&fit=crop', cat: 'SURF', loc: 'NAYARIT' },
];

const videoSelection = [
  { 
      title: 'MENTALIDAD DE ACERO', 
      duration: '10:14', 
      img: 'https://img.youtube.com/vi/-eS14mBhnhA/hqdefault.jpg', 
      url: 'https://youtu.be/-eS14mBhnhA?si=6kZEz5TBmfZYwaIh',
      views: 'IMPACTO' 
  },
  { 
      title: 'EL CAMINO DEL GUERRERO', 
      duration: '08:45', 
      img: 'https://img.youtube.com/vi/_e--tk58Lvo/hqdefault.jpg', 
      url: 'https://youtu.be/_e--tk58Lvo?si=04MVZ2roPNY6HE4e',
      views: 'TACTICO' 
  },
  { 
      title: 'RESILIENCIA TOTAL', 
      duration: '12:20', 
      img: 'https://img.youtube.com/vi/VVXZfI_P7-0/hqdefault.jpg', 
      url: 'https://youtu.be/VVXZfI_P7-0?si=aJXeL9eLkpNKLeSb',
      views: 'FUERZA' 
  },
  { 
      title: 'DISCIPLINA ES LIBERTAD', 
      duration: '06:30', 
      img: 'https://img.youtube.com/vi/lBVfExPgyKU/hqdefault.jpg', 
      url: 'https://youtu.be/lBVfExPgyKU?si=MqFu_GG3Q7UJDMJJ',
      views: 'ENFOQUE' 
  },
];

interface ActivityGridProps {
    setView: (view: ViewState) => void;
    onActivitySelect: (id: string) => void;
}

export const ActivityGrid: React.FC<ActivityGridProps> = ({ setView, onActivitySelect }) => {
  const [nutriQuery, setNutriQuery] = useState('');
  const [nutriResponse, setNutriResponse] = useState('');
  const [isNutriLoading, setIsNutriLoading] = useState(false);

  const handleNutriAsk = async () => {
    if(!nutriQuery.trim()) return;
    setIsNutriLoading(true);
    const res = await askNutritionAI(nutriQuery);
    setNutriResponse(res);
    setIsNutriLoading(false);
    setNutriQuery('');
  }

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="activities" className="min-h-screen bg-lumbre-black py-12 md:py-20 border-t border-white/10 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* === MÓDULOS OPERATIVOS (THE 3 PILLARS) === */}
        <div className="mb-24">
             <div className="flex items-center space-x-2 mb-8 border-b border-white/10 pb-2">
                <Compass className="w-4 h-4 text-lumbre-blue" />
                <span className="text-lumbre-blue font-mono text-xs tracking-widest uppercase">SISTEMA LUMBRE AZUL // SELECCIONA MÓDULO</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 
                 {/* CARD 1: CORE SYSTEM (Highlight) */}
                 <div className="group relative bg-lumbre-panel border border-lumbre-blue/30 overflow-hidden flex flex-col justify-between min-h-[320px] shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] transition-shadow">
                     <div className="absolute inset-0 bg-gradient-to-br from-lumbre-blue/10 to-transparent opacity-50"></div>
                     <div className="p-8 relative z-10">
                         <div className="flex justify-between items-start mb-6">
                             <div className="w-12 h-12 bg-lumbre-blue text-white flex items-center justify-center">
                                 <BarChart3 className="w-6 h-6" />
                             </div>
                             <span className="bg-lumbre-blue/20 text-lumbre-blue text-[10px] font-bold px-2 py-1 uppercase tracking-widest border border-lumbre-blue/30">
                                 RECOMENDADO
                             </span>
                         </div>
                         <h3 className="font-heading text-4xl text-white uppercase mb-2">CORE SYSTEM</h3>
                         <p className="font-mono text-sm text-gray-400 mb-4">
                             Seguimiento diario. Rachas. Consistencia. <br/>
                             <span className="text-white italic">"Lo que no se registra, no existe."</span>
                         </p>
                         <div className="font-heading text-2xl text-lumbre-blue mb-1">$159 MXN <span className="text-sm text-gray-500 font-mono">/ MES</span></div>
                     </div>
                     <button 
                        onClick={() => setView(ViewState.TRACKING)}
                        className="w-full py-4 bg-lumbre-blue hover:bg-white hover:text-black text-white font-heading text-xl uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 relative z-10"
                     >
                         <span>Activar Sistema</span>
                         <ArrowRight className="w-5 h-5" />
                     </button>
                 </div>

                 {/* CARD 2: VIAJES OUTDOOR */}
                 <div className="group relative bg-white/5 border border-white/10 hover:border-lumbre-green/50 overflow-hidden flex flex-col justify-between min-h-[320px] transition-colors">
                     <div className="p-8 relative z-10">
                         <div className="flex justify-between items-start mb-6">
                             <div className="w-12 h-12 bg-white/10 text-lumbre-green flex items-center justify-center border border-white/10 group-hover:bg-lumbre-green group-hover:text-white transition-colors">
                                 <Plane className="w-6 h-6" />
                             </div>
                         </div>
                         <h3 className="font-heading text-4xl text-white uppercase mb-2">VIAJES OUTDOOR</h3>
                         <p className="font-mono text-sm text-gray-400">
                             Inmersiones reales: surf, camp, trail, buceo. <br/>
                             Tribu en naturaleza.
                         </p>
                     </div>
                     <button 
                        onClick={() => handleScrollTo('expeditions')}
                        className="w-full py-4 bg-white/5 hover:bg-lumbre-green hover:text-white text-gray-300 font-heading text-xl uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 relative z-10 border-t border-white/10"
                     >
                         <span>Ver Expediciones</span>
                         <ArrowRight className="w-5 h-5" />
                     </button>
                 </div>

                 {/* CARD 3: TIENDA OFICIAL */}
                 <div className="group relative bg-white/5 border border-white/10 hover:border-white/30 overflow-hidden flex flex-col justify-between min-h-[320px] transition-colors">
                     <div className="p-8 relative z-10">
                         <div className="flex justify-between items-start mb-6">
                             <div className="w-12 h-12 bg-white/10 text-gray-200 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                                 <ShoppingBag className="w-6 h-6" />
                             </div>
                         </div>
                         <h3 className="font-heading text-4xl text-white uppercase mb-2">TIENDA OFICIAL</h3>
                         <p className="font-mono text-sm text-gray-400">
                             Equipo probado. Drops limitados. <br/>
                             Operativo y sobrio.
                         </p>
                     </div>
                     <button 
                        onClick={() => setView(ViewState.SHOP)}
                        className="w-full py-4 bg-white/5 hover:bg-white hover:text-black text-gray-300 font-heading text-xl uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 relative z-10 border-t border-white/10"
                     >
                         <span>Ir a Tienda</span>
                         <ArrowRight className="w-5 h-5" />
                     </button>
                 </div>

             </div>
        </div>

        {/* IDENTITY BLOCK (Smaller now) */}
        <div className="mb-20 bg-lumbre-panel border border-white/10 p-8 relative overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="font-heading text-3xl text-white uppercase leading-none mb-2">
                        LUMBRE AZUL <span className="text-gray-600">// MANIFIESTO</span>
                    </h2>
                </div>
                <div className="font-mono text-xs text-gray-400 leading-relaxed border-l border-white/10 pl-4">
                    <p>
                        Buscamos generar experiencias crudas. Salir al aire libre es un mandato biológico. Nos importa habitar el <strong>presente</strong> con intensidad radical.
                    </p>
                </div>
            </div>
        </div>

        {/* === VIAJES OUTDOOR LIST (Old Protocolos) === */}
        <div id="expeditions" className="flex flex-col md:flex-row justify-between items-end mb-16 scroll-mt-24 pt-12 border-t border-white/20">
          <div>
            <h3 className="text-lumbre-green font-mono text-xs tracking-widest mb-2">PRÓXIMAS SALIDAS & EXPERIENCIAS</h3>
            <h2 className="font-heading text-5xl md:text-6xl text-white uppercase leading-none">
              Viajes Outdoor <br/> Disponibles
            </h2>
          </div>
          <div className="text-right hidden md:block">
              <span className="text-gray-500 font-mono text-xs">SOLICITA TU LUGAR EN LA MISIÓN</span>
          </div>
        </div>

        <div className="flex flex-col border-t border-white/10 mb-32">
          {activities.map((activity, index) => (
            <button 
              key={activity.id} 
              onClick={() => onActivitySelect(activity.id)}
              className="group relative border-b border-white/10 overflow-hidden hover:bg-white/5 transition-all duration-300 cursor-pointer text-left w-full bg-lumbre-black"
            >
              <div className="flex flex-col md:flex-row items-stretch min-h-[140px]">
                <div className="w-full md:w-24 border-r border-white/10 flex items-center justify-center bg-white/5 z-10 transition-colors group-hover:bg-lumbre-blue">
                   <span className="font-mono text-xs text-gray-500 group-hover:text-white transition-colors">0{index + 1}</span>
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between relative z-10">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                       {activity.type === 'water' ? (
                          activity.id === 'fish' ? <Fish className="w-5 h-5 text-lumbre-blue group-hover:text-white"/> : <Waves className="w-5 h-5 text-lumbre-blue group-hover:text-white" />
                       ) : (
                          activity.id === 'camp' ? <Tent className="w-5 h-5 text-lumbre-green group-hover:text-white" /> : <Mountain className="w-5 h-5 text-lumbre-green group-hover:text-white" />
                       )}
                       <h3 className="font-heading text-3xl md:text-5xl text-white uppercase tracking-wide group-hover:text-white group-hover:translate-x-4 transition-all duration-300">
                         {activity.title}
                       </h3>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="bg-white/10 px-2 py-0.5 text-[9px] font-mono text-gray-400 uppercase tracking-widest">Ver Detalles</span>
                        <p className="font-mono text-sm text-gray-500 group-hover:text-white max-w-lg truncate hidden md:block">
                        {activity.description}
                        </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-lumbre-blue uppercase opacity-0 group-hover:opacity-100 transition-opacity">Aplicar</span>
                      <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <img src={activity.image} className="w-full h-full object-cover filter grayscale contrast-125 brightness-50" alt="" />
                    <div className={`absolute inset-0 mix-blend-multiply ${activity.type === 'water' ? 'bg-lumbre-blue' : 'bg-lumbre-green'}`}></div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* === INTEL / SUPPORT CONTENT === */}
        <div id="intel" className="mb-12">
            <div className="flex items-center space-x-2 mb-8 border-b border-white/10 pb-2">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500 font-mono text-xs tracking-widest uppercase">INTEL & SOPORTE OPERATIVO</span>
             </div>
        </div>

        {/* NUTRITION & ROUTINE GRID */}
        <div id="nutrition" className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 scroll-mt-24">
            
            {/* NUTRITION */}
            <div className="border border-white/10 bg-white/5 shadow-sm p-8 relative flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-50"><Apple className="text-lumbre-green w-6 h-6"/></div>
                <h3 className="font-heading text-4xl text-white mb-6 uppercase">Combustible <br/> Natural</h3>
                
                <div className="space-y-6 font-mono text-sm text-gray-400 mb-8">
                    <div>
                        <span className="text-lumbre-green font-bold text-xs block mb-1">>> DESAYUNO</span>
                        <p className="text-gray-500">Huevos de campo, aguacate, café negro sin azúcar.</p>
                    </div>
                    <div>
                        <span className="text-lumbre-green font-bold text-xs block mb-1">>> COMIDA (POST-ENTRENO)</span>
                        <p className="text-gray-500">Carne de res/pescado salvaje, camote asado, ensalada verde abundante.</p>
                    </div>
                    <div>
                        <span className="text-lumbre-green font-bold text-xs block mb-1">>> CENA</span>
                        <p className="text-gray-500">Caldo de huesos, verduras al vapor, proteína ligera.</p>
                    </div>
                </div>

                {/* NUTRITION AI WIDGET */}
                <div className="mt-auto border-t border-white/10 pt-4">
                    <div className="flex items-center space-x-2 mb-2 text-lumbre-green text-xs font-bold uppercase">
                        <Bot className="w-4 h-4" />
                        <span>Consultar Nutricionista IA</span>
                    </div>
                    <div className="bg-black/30 border border-white/10 p-2">
                        {nutriResponse ? (
                             <div className="mb-2 p-2 bg-lumbre-green/10 text-gray-300 text-xs border-l-2 border-lumbre-green animate-in fade-in">
                                {nutriResponse}
                                <button onClick={() => setNutriResponse('')} className="block mt-2 text-[10px] underline text-gray-500">[NUEVA CONSULTA]</button>
                             </div>
                        ) : (
                            <div className="flex">
                                <input 
                                    type="text" 
                                    value={nutriQuery}
                                    onChange={(e) => setNutriQuery(e.target.value)}
                                    placeholder="¿Qué opina de las sardinas?"
                                    className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                                    onKeyDown={(e) => e.key === 'Enter' && handleNutriAsk()}
                                />
                                <button onClick={handleNutriAsk} disabled={isNutriLoading} className="text-lumbre-green hover:text-white">
                                    {isNutriLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <ChevronRight className="w-4 h-4"/>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ROUTINE */}
            <div id="schedule" className="border border-white/10 bg-white/5 shadow-sm p-8 relative scroll-mt-24">
                <div className="absolute top-0 right-0 p-4 opacity-50"><Clock className="text-lumbre-blue w-6 h-6"/></div>
                <h3 className="font-heading text-4xl text-white mb-6 uppercase">Horario <br/> Operativo</h3>
                <div className="space-y-0 font-mono text-xs text-gray-400">
                    {schedule.map((slot, idx) => (
                        <div key={idx} className="flex border-b border-white/10 py-3 hover:bg-white/5 px-2 transition-colors">
                            <span className="w-16 text-lumbre-blue font-bold">{slot.time}</span>
                            <span className="text-gray-300 uppercase tracking-wide">{slot.task}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* CALENDAR & VISUAL LOG & VIDEOS (GROUPED) */}
        <div id="calendar" className="mb-32">
             <div className="flex items-center space-x-3 mb-8">
                <Calendar className="w-6 h-6 text-white"/>
                <h3 className="font-heading text-5xl text-white uppercase">Calendario Táctico 2026</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                {calendar2026.map((event, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 shadow-sm p-6 hover:border-lumbre-blue transition-colors group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <span className="text-4xl font-heading text-white">{event.day}</span>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-400 mb-1">{event.month}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest text-right leading-tight">{event.loc}</span>
                            </div>
                        </div>
                        <h4 className="font-mono text-sm text-gray-300 uppercase leading-tight h-10 flex items-center relative z-10">
                            {event.event}
                        </h4>
                        <div className="mt-4 w-full h-1 bg-white/10 relative z-10">
                            <div className={`h-full ${event.type === 'RUN' ? 'bg-lumbre-green' : event.type === 'HYBRID' ? 'bg-yellow-500' : 'bg-lumbre-blue'} w-1/3 group-hover:w-full transition-all duration-500`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visual Log Grid reused from before */}
            <div className="mb-20">
                <div className="flex items-center space-x-3 mb-8 border-b border-white/10 pb-4">
                    <Camera className="w-5 h-5 text-gray-400"/>
                    <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Bitácora Visual // Registro de Campo</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {visualLog.map((item, idx) => (
                        <div key={idx} className="group relative aspect-square bg-lumbre-panel overflow-hidden border border-white/10">
                            <img src={item.src} alt={item.cat} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:filter-none group-hover:scale-110 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Videos */}
            <div className="mb-20">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-3">
                        <Monitor className="w-5 h-5 text-gray-400"/>
                        <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Transmisiones // Motivación</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {videoSelection.map((video, idx) => (
                        <a href={video.url} target="_blank" rel="noopener noreferrer" key={idx} className="group block bg-white/5 border border-white/10">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={video.img} alt={video.title} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"/>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-full bg-lumbre-blue/90 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white fill-white ml-1"/>
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-white">
                                    {video.duration}
                                </div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-heading text-lg text-white uppercase truncate">{video.title}</h4>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{video.views}</span>
                                    <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-lumbre-blue transition-colors" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};