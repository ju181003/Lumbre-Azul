import React, { useState } from 'react';
import { Activity as ActivityType, ViewState } from '../types';
import { askNutritionAI } from '../services/geminiService';
import { ChevronRight, Mountain, Waves, Flame, Tent, Fish, Clock, Calendar, ShoppingBag, Music, Package, Apple, Bot, Loader2, Camera, MapPin, Compass, Dumbbell, Zap, Users, ExternalLink, Play, Monitor, Trophy, Target, ArrowUpRight, Activity } from 'lucide-react';

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
  { month: 'FEB', day: '15', event: 'MEDIO MARATÓN GDL', type: 'RUN', loc: 'GUADALAJARA' },
  { month: 'MAR', day: '08', event: 'SKY RUN CERRO DE LA SILLA', type: 'TRAIL', loc: 'MONTERREY' },
  { month: 'ABR', day: '22', event: 'ULTRA TRAIL TAPALPA', type: 'TRAIL', loc: 'TAPALPA' },
  { month: 'AGO', day: '10', event: 'CRUCE ACUÁTICO CHAPALA', type: 'SWIM', loc: 'CHAPALA' },
  { month: 'SEP', day: '19', event: 'TRAIL DESIERTO DE LOS LEONES', type: 'TRAIL', loc: 'CDMX' },
  { month: 'NOV', day: '01', event: 'MARATÓN INT. GUADALAJARA', type: 'RUN', loc: 'GUADALAJARA' },
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
  { title: 'LA MENTE ES EL LÍMITE', duration: '12:05', img: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2669&auto=format&fit=crop', views: '20K' },
  { title: 'DISCIPLINA ES DESTINO', duration: '08:45', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2670&auto=format&fit=crop', views: '15K' },
  { title: 'EL ATLETA HÍBRIDO', duration: '15:20', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop', views: '32K' },
  { title: 'NATURALEZA CRUDA', duration: '10:00', img: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2670&auto=format&fit=crop', views: '18K' },
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
    <section id="activities" className="min-h-screen bg-lumbre-black py-20 border-t border-white/10 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* IDENTITY BLOCK */}
        <div className="mb-20 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-lumbre-blue to-lumbre-green opacity-80"></div>
            <div className="bg-lumbre-panel border border-white/10 shadow-sm p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Flame className="w-32 h-32 text-lumbre-blue opacity-20" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
                    <div>
                        <span className="text-lumbre-blue font-mono text-xs tracking-widest mb-2 block">
                            // IDENTIFICACIÓN DEL SISTEMA
                        </span>
                        <h2 className="font-heading text-5xl md:text-7xl text-white uppercase leading-none mb-6">
                            LUMBRE AZUL <br />
                            <span className="text-gray-500">CORE SYSTEM</span>
                        </h2>
                        <div className="flex space-x-2">
                             <span className="px-2 py-1 bg-lumbre-blue/10 border border-lumbre-blue/30 text-lumbre-blue text-[10px] font-mono tracking-widest uppercase">Calidad Humana</span>
                             <span className="px-2 py-1 bg-lumbre-green/10 border border-lumbre-green/30 text-lumbre-green text-[10px] font-mono tracking-widest uppercase">Fitness Táctico</span>
                        </div>
                    </div>
                    <div className="font-mono text-sm text-gray-400 space-y-6">
                        <p className="leading-relaxed text-lg font-light border-b border-white/10 pb-4 text-gray-200">
                            Somos dos amigos mexicanos forjados en la dualidad: <span className="text-lumbre-blue font-bold">MAR</span> y <span className="text-lumbre-green font-bold">FUEGO</span>.
                        </p>
                        <p className="leading-relaxed text-gray-400">
                            Más allá del deporte, buscamos <strong>generar experiencias crudas</strong>. Salir al aire libre no es una opción, es un mandato biológico. Nos importa disfrutar de nuestro planeta, elevar nuestra calidad de vida y, sobre todo, habitar el <strong>presente</strong> con intensidad radical.
                        </p>
                        <p className="leading-relaxed text-gray-400">
                            Lumbre Azul es un sistema de mejoramiento integral: nutrición real, estilo de vida consciente, mentalidad de acero y la calidez de la amistad verdadera.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* NEW OFFERINGS SECTION */}
        <div className="mb-32">
             <div className="flex items-center space-x-2 mb-8 border-b border-white/10 pb-2">
                <Compass className="w-4 h-4 text-lumbre-green" />
                <span className="text-lumbre-green font-mono text-xs tracking-widest uppercase">VECTORES OPERATIVOS // LO QUE OFRECEMOS</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* 01: EXPERIENCIAS */}
                <button onClick={() => handleScrollTo('protocols')} className="bg-white/5 border border-white/10 shadow-sm p-6 hover:border-lumbre-blue transition-colors group text-left w-full relative overflow-hidden">
                   <div className="mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-sm">
                      <Users className="w-6 h-6 text-lumbre-blue transition-colors" />
                   </div>
                   <h3 className="font-heading text-2xl text-white uppercase mb-2">Experiencias de Campo</h3>
                   <p className="font-mono text-xs text-gray-500">
                      Viajes de inmersión total. Acampar, surfear y pescar entre amigos. La tribu se forja en la naturaleza.
                   </p>
                </button>

                {/* 02: LOGÍSTICA */}
                <button onClick={() => handleScrollTo('shop')} className="bg-white/5 border border-white/10 shadow-sm p-6 hover:border-lumbre-blue transition-colors group text-left w-full relative overflow-hidden">
                   <div className="mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-sm">
                      <Package className="w-6 h-6 text-gray-500 transition-colors" />
                   </div>
                   <h3 className="font-heading text-2xl text-white uppercase mb-2">Logística & Equipo</h3>
                   <p className="font-mono text-xs text-gray-500">
                      Kit de recomendaciones Amazon y nuestra línea oficial. Equipamiento probado para resistir.
                   </p>
                </button>

                {/* 03: FITNESS */}
                <button onClick={() => handleScrollTo('nutrition')} className="bg-white/5 border border-white/10 shadow-sm p-6 hover:border-lumbre-green transition-colors group text-left w-full relative overflow-hidden">
                   <div className="mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-sm">
                      <Dumbbell className="w-6 h-6 text-lumbre-green transition-colors" />
                   </div>
                   <h3 className="font-heading text-2xl text-white uppercase mb-2">Ingeniería Humana</h3>
                   <p className="font-mono text-xs text-gray-500">
                      Planes nutricionales naturales y entrenamiento híbrido. Optimizamos la máquina biológica.
                   </p>
                </button>

                {/* 04: MINDSET */}
                <button onClick={() => handleScrollTo('schedule')} className="bg-white/5 border border-white/10 shadow-sm p-6 hover:border-lumbre-green transition-colors group text-left w-full relative overflow-hidden">
                   <div className="mb-4 bg-white/5 w-12 h-12 flex items-center justify-center rounded-sm">
                      <Zap className="w-6 h-6 text-yellow-500 transition-colors" />
                   </div>
                   <h3 className="font-heading text-2xl text-white uppercase mb-2">Mentalidad de Acero</h3>
                   <p className="font-mono text-xs text-gray-500">
                      Disciplina y motivación diaria. Forjamos el carácter necesario para conquistar cualquier entorno.
                   </p>
                </button>

             </div>

             {/* MISSION SUMMARY */}
             <div className="mt-8 p-6 bg-white/5 border-l-2 border-lumbre-blue text-center md:text-left shadow-sm">
                <p className="font-mono text-sm text-gray-400 leading-relaxed">
                   <span className="text-lumbre-blue font-bold">>> MISIÓN:</span> Queremos que toda la gente aspire a ser diariamente su mejor versión. Buscamos la excelencia <span className="text-white font-bold">FÍSICA, ESPIRITUAL Y MENTAL</span> conectando radicalmente con la naturaleza.
                </p>
             </div>
        </div>

        {/* ACTIVITIES LIST */}
        <div id="protocols" className="flex flex-col md:flex-row justify-between items-end mb-16 scroll-mt-24">
          <div>
            <h3 className="text-lumbre-green font-mono text-xs tracking-widest mb-2">BASE DE DATOS DE ACTIVIDAD</h3>
            <h2 className="font-heading text-5xl md:text-6xl text-white uppercase leading-none">
              Protocolos <br/> Disponibles
            </h2>
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
                    <p className="font-mono text-sm text-gray-500 group-hover:text-white max-w-xl">
                      {activity.description}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white group-hover:translate-x-2 transition-all" />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <img src={activity.image} className="w-full h-full object-cover filter grayscale contrast-125 brightness-50" alt="" />
                    <div className={`absolute inset-0 mix-blend-multiply ${activity.type === 'water' ? 'bg-lumbre-blue' : 'bg-lumbre-green'}`}></div>
                </div>
              </div>
            </button>
          ))}
        </div>

         {/* VISUAL LOG (GALLERY) */}
        <div className="mb-32">
             <div className="flex items-center space-x-3 mb-8 border-b border-white/10 pb-4">
                <Camera className="w-5 h-5 text-gray-400"/>
                <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Bitácora Visual // Registro de Campo</h3>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                 {visualLog.map((item, idx) => (
                     <div key={idx} className="group relative aspect-square bg-lumbre-panel overflow-hidden border border-white/10">
                         <img 
                            src={item.src} 
                            alt={item.cat} 
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:filter-none group-hover:scale-110 transition-all duration-500" 
                         />
                         
                         {/* Overlay Data */}
                         <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                             <div className="flex items-center space-x-1 text-[10px] text-lumbre-blue font-mono font-bold uppercase mb-1">
                                <MapPin className="w-3 h-3" />
                                <span>{item.loc}</span>
                             </div>
                             <div className="text-white font-heading text-xl uppercase tracking-widest">{item.cat}</div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        {/* YOUTUBE MOTIVATION SECTION */}
        <div className="mb-32">
             <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                    <Monitor className="w-5 h-5 text-gray-400"/>
                    <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Transmisiones // Motivación</h3>
                </div>
                <span className="text-[10px] text-gray-500 font-mono hidden md:inline-block">ARCHIVO DE ENTRENAMIENTO MENTAL</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videoSelection.map((video, idx) => (
                    <a href="#" key={idx} className="group block bg-white/5 border border-white/10 shadow-sm overflow-hidden hover:border-lumbre-blue transition-colors">
                        <div className="aspect-video relative overflow-hidden">
                             <img src={video.img} alt={video.title} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"/>
                             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <div className="w-12 h-12 rounded-full bg-lumbre-blue/90 backdrop-blur-sm flex items-center justify-center">
                                     <Play className="w-5 h-5 text-white fill-white ml-1"/>
                                 </div>
                             </div>
                             <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-[10px] font-mono text-white">
                                {video.duration}
                             </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-heading text-xl text-white uppercase mb-1 truncate">{video.title}</h4>
                            <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                                <span>YOUTUBE.COM</span>
                                <span>{video.views} VISITAS</span>
                            </div>
                        </div>
                    </a>
                ))}
             </div>
        </div>

         {/* SHOP & LINKS SECTION */}
         <div id="shop" className="border-y border-white/10 py-20 mb-32 bg-white/5 scroll-mt-24">
             <div className="text-center mb-12">
                 <h3 className="font-heading text-5xl text-white uppercase">Logística & Suministros</h3>
                 <p className="font-mono text-gray-500 text-sm mt-2">Equipamiento aprobado para la misión</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* AMAZON */}
                <a href="#" className="group block bg-white/5 border border-white/10 p-8 hover:border-yellow-500 transition-all text-center relative shadow-sm">
                    <Package className="w-10 h-10 text-gray-400 mx-auto mb-4 group-hover:text-yellow-500 transition-colors"/>
                    <h4 className="font-heading text-2xl text-white uppercase mb-2">Kit Táctico</h4>
                    <p className="font-mono text-xs text-gray-500 mb-4">Selección oficial de equipo en Amazon.</p>
                    <span className="inline-block bg-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-white group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                        Ver Lista
                    </span>
                </a>

                {/* SHOP */}
                <button 
                    onClick={() => setView(ViewState.SHOP)}
                    className="w-full group block bg-gradient-to-b from-lumbre-blue/10 to-transparent border border-lumbre-blue/20 p-8 text-center relative overflow-hidden hover:border-lumbre-blue transition-colors cursor-pointer"
                >
                    <div className="absolute top-2 right-2 px-2 py-1 bg-lumbre-blue text-[10px] font-bold text-white uppercase">Nuevo Drop</div>
                    <ShoppingBag className="w-10 h-10 text-lumbre-blue mx-auto mb-4"/>
                    <h4 className="font-heading text-2xl text-white uppercase mb-2">Tienda Oficial</h4>
                    <p className="font-mono text-xs text-gray-500 mb-4">Playeras, Termos y Parches.</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                         <div className="h-16 bg-white/5 rounded flex items-center justify-center text-[10px] text-gray-400 font-mono">
                            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale" />
                         </div>
                         <div className="h-16 bg-white/5 rounded flex items-center justify-center text-[10px] text-gray-400 font-mono">
                            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale" />
                         </div>
                    </div>
                </button>

                {/* SPOTIFY */}
                <a href="#" className="group block bg-white/5 border border-white/10 p-8 hover:border-green-500 transition-all text-center relative shadow-sm">
                    <Music className="w-10 h-10 text-gray-400 mx-auto mb-4 group-hover:text-green-500 transition-colors"/>
                    <h4 className="font-heading text-2xl text-white uppercase mb-2">Frecuencia Lumbre</h4>
                    <p className="font-mono text-xs text-gray-500 mb-4">Playlist para el camino.</p>
                    <span className="inline-block bg-white/10 px-4 py-2 text-[10px] uppercase tracking-widest text-white group-hover:bg-green-500 group-hover:text-white transition-colors">
                        Escuchar
                    </span>
                </a>

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
                     <div>
                        <span className="text-lumbre-green font-bold text-xs block mb-1">>> SNACK TÁCTICO</span>
                        <p className="text-gray-500">Nueces de macadamia, fruta de temporada, cecina natural.</p>
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
                <div className="mt-6 p-4 bg-white/5 border border-white/10 text-center">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Foco Principal</p>
                   <p className="text-white font-bold uppercase">Constancia sobre Intensidad</p>
                </div>
            </div>
        </div>

        {/* CALENDAR */}
        <div id="calendar" className="mb-32 scroll-mt-24">
            <div className="flex items-center space-x-3 mb-8">
                <Calendar className="w-6 h-6 text-white"/>
                <h3 className="font-heading text-5xl text-white uppercase">Calendario Táctico 2026</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {calendar2026.map((event, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 shadow-sm p-6 hover:border-lumbre-blue transition-colors group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <span className="text-4xl font-heading text-white">{event.day}</span>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-400 mb-1">{event.month}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{event.loc}</span>
                            </div>
                        </div>
                        <h4 className="font-mono text-sm text-gray-300 uppercase leading-tight h-10 flex items-center relative z-10">
                            {event.event}
                        </h4>
                        <div className="mt-4 w-full h-1 bg-white/10 relative z-10">
                            <div className={`h-full ${event.type === 'RUN' ? 'bg-lumbre-green' : event.type === 'SWIM' ? 'bg-lumbre-blue' : 'bg-yellow-500'} w-1/3 group-hover:w-full transition-all duration-500`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

         {/* TRAINING CALL TO ACTION */}
         <div className="mb-20">
             <div className="relative overflow-hidden bg-white/5 border border-white/10 shadow-sm p-8 md:p-16 text-center group hover:border-gray-500 transition-colors">
                 
                 <div className="relative z-10 max-w-3xl mx-auto">
                     <div className="flex justify-center space-x-4 mb-6 opacity-60">
                        <Target className="w-6 h-6 text-gray-400" />
                        <Trophy className="w-6 h-6 text-gray-400" />
                        <Activity className="w-6 h-6 text-gray-400" />
                     </div>
                     <h2 className="font-heading text-3xl md:text-5xl text-white uppercase leading-none mb-6">
                         Entrenamiento Especializado
                     </h2>
                     <p className="font-mono text-xs text-gray-400 mb-8 max-w-xl mx-auto">
                         ¿Objetivo en la mira? (Medio Maratón, Hyrox, Ironman). Programación táctica personalizada para misiones de alta resistencia.
                     </p>
                     <button className="bg-transparent border border-white/30 text-white font-heading text-xl uppercase px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 flex items-center space-x-2 mx-auto">
                         <span>Solicitar Intel</span>
                         <ArrowUpRight className="w-5 h-5" />
                     </button>
                 </div>
             </div>
         </div>

      </div>
    </section>
  );
};