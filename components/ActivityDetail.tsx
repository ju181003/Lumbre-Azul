import React from 'react';
import { ArrowLeft, Calendar, MapPin, Target, ShieldCheck, CheckSquare, Waves, Flame, ArrowRight, User } from 'lucide-react';

interface ActivityDetailProps {
    activityId: string;
    onBack: () => void;
}

const details: Record<string, any> = {
    'surf': {
        title: 'OPERACIÓN: MAREA ALTA',
        subtitle: 'LECTURA DE OCÉANO & SURF TÁCTICO',
        location: 'Manzanillo, Colima',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2670&auto=format&fit=crop',
        date: '15 - 17 MARZO 2026',
        price: '$4,500 MXN',
        specs: [
            { label: 'NIVEL', val: 'INTERMEDIO' },
            { label: 'AGUA', val: '24°C' },
            { label: 'DURACIÓN', val: '3 DÍAS' },
            { label: 'CUPO', val: '8 PAX' }
        ],
        focus: 'Desarrollar la capacidad de leer las corrientes y mantener la calma bajo presión (hold-down). No se trata solo de pararse en la tabla, sino de entender el lenguaje bruto del océano.',
        includes: [
            'Hospedaje (Bungalow Táctico)',
            'Transporte GDL - Manzanillo',
            '2 Sesiones de Videoanálisis',
            'Comida Post-Sesión (Proteína)'
        ],
        color: 'text-lumbre-blue',
        bg: 'bg-lumbre-blue'
    },
    'camp': {
        title: 'OPERACIÓN: BOSQUE PROFUNDO',
        subtitle: 'SUPERVIVENCIA & DESCONEXIÓN',
        location: 'Atemajac de Brizuela',
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2670&auto=format&fit=crop',
        date: '22 - 23 ABRIL 2026',
        price: '$2,800 MXN',
        specs: [
            { label: 'NIVEL', val: 'PRINCIPIANTE' },
            { label: 'CLIMA', val: 'FRIO (5°C)' },
            { label: 'DURACIÓN', val: '2 DÍAS' },
            { label: 'CUPO', val: '12 PAX' }
        ],
        focus: 'Reconectar con los ritmos circadianos naturales. Aprender a montar un refugio eficiente y cocinar con fuego. Silencio absoluto para limpiar la mente del ruido digital.',
        includes: [
            'Zona de Acampada Privada',
            'Cena (Asado Primitivo)',
            'Taller de Nudos y Fuego',
            'Café de Olla Ilimitado'
        ],
        color: 'text-lumbre-green',
        bg: 'bg-lumbre-green'
    },
     'trek': {
        title: 'OPERACIÓN: CUMBRE NEVADA',
        subtitle: 'ASCENSO ALPINO',
        location: 'Nevado de Colima',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2670&auto=format&fit=crop',
        date: '10 MAYO 2026',
        price: '$1,500 MXN',
        specs: [
            { label: 'NIVEL', val: 'AVANZADO' },
            { label: 'ALTURA', val: '4,260 MSNM' },
            { label: 'DURACIÓN', val: '12 HORAS' },
            { label: 'CUPO', val: '6 PAX' }
        ],
        focus: 'Prueba de resistencia cardiovascular y fortaleza mental ante la falta de oxígeno. Gestión del dolor y ritmo constante. La cima es opcional, el regreso es obligatorio.',
        includes: [
            'Guía de Alta Montaña',
            'Entrada al Parque Nacional',
            'Bastones de Trekking',
            'Snack de Cumbre'
        ],
        color: 'text-lumbre-green',
        bg: 'bg-lumbre-green'
    },
    'fish': {
        title: 'OPERACIÓN: LAGUNA SILENTE',
        subtitle: 'PESCA & PACIENCIA',
        location: 'Laguna de Chapala',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2670&auto=format&fit=crop',
        date: '05 JUNIO 2026',
        price: '$1,200 MXN',
        specs: [
            { label: 'NIVEL', val: 'TODOS' },
            { label: 'CLIMA', val: 'TEMPLADO' },
            { label: 'DURACIÓN', val: '6 HORAS' },
            { label: 'CUPO', val: '4 PAX' }
        ],
        focus: 'Meditación activa a través de la pesca. Entender el ecosistema lacustre y desarrollar la paciencia estratégica. Obtener el propio alimento de manera ética.',
        includes: [
            'Lancha y Capitán',
            'Equipo de Pesca Completo',
            'Cerveza y Ceviche',
            'Permisos Locales'
        ],
        color: 'text-lumbre-blue',
        bg: 'bg-lumbre-blue'
    }
};

export const ActivityDetail: React.FC<ActivityDetailProps> = ({ activityId, onBack }) => {
    const data = details[activityId] || details['surf'];

    return (
        <div className="min-h-screen bg-lumbre-black relative animate-in fade-in slide-in-from-right-4 duration-500">
            
            {/* HERO SECTION */}
            <div className="h-[50vh] md:h-[60vh] relative overflow-hidden border-b border-white/20">
                <img src={data.image} className="w-full h-full object-cover filter grayscale contrast-125 brightness-75" alt={data.title} />
                <div className={`absolute inset-0 opacity-40 mix-blend-multiply ${data.bg}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-lumbre-black via-transparent to-transparent"></div>
                
                {/* Navigation */}
                <button 
                    onClick={onBack}
                    className="absolute top-32 md:top-24 left-6 z-50 flex items-center space-x-2 text-white hover:text-gray-300 bg-black/50 px-4 py-2 border border-white/20 backdrop-blur-md transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-mono text-xs uppercase tracking-widest">Abortar Misión / Volver</span>
                </button>

                {/* Title Block */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                     <div className={`inline-flex items-center space-x-2 border border-white/30 bg-black/50 backdrop-blur-md px-3 py-1 mb-4 ${data.color}`}>
                        <Target className="w-4 h-4" />
                        <span className="font-mono text-xs tracking-[0.2em] uppercase">{data.subtitle}</span>
                     </div>
                     <h1 className="font-heading text-5xl md:text-8xl text-white uppercase leading-none max-w-4xl">
                        {data.title}
                     </h1>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* LEFT COL: SPECS & INFO */}
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* SPECS HUD */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.specs.map((spec: any, idx: number) => (
                            <div key={idx} className="bg-lumbre-panel border border-white/10 p-4 text-center group hover:border-white/30 transition-colors">
                                <span className={`block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1 group-hover:${data.color} transition-colors`}>
                                    {spec.label}
                                </span>
                                <span className="font-heading text-2xl text-white uppercase">
                                    {spec.val}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* FOCUS */}
                    <div className="border-l-2 border-white/20 pl-6 md:pl-8 py-2">
                        <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4 flex items-center">
                            <Target className="w-4 h-4 mr-2" /> Objetivo Principal
                        </h3>
                        <p className="font-mono text-base md:text-lg text-gray-200 leading-relaxed">
                            {data.focus}
                        </p>
                    </div>

                    {/* INCLUDES */}
                    <div>
                         <h3 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6 flex items-center border-b border-white/10 pb-2">
                            <ShieldCheck className="w-4 h-4 mr-2" /> Suministros & Logística
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.includes.map((item: string, idx: number) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-white/5 border border-white/5">
                                    <CheckSquare className={`w-4 h-4 ${data.color}`} />
                                    <span className="text-sm font-mono text-gray-300 uppercase">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COL: ACTION CARD */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-lumbre-panel border border-white/20 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
                            <div>
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">Costo Total</span>
                                <span className={`font-heading text-5xl text-white`}>{data.price}</span>
                            </div>
                            <div className={`p-3 bg-white/5 rounded-full ${data.color}`}>
                                {data.bg.includes('blue') ? <Waves className="w-6 h-6"/> : <Flame className="w-6 h-6"/>}
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-2"/> FECHA</span>
                                <span className="text-white uppercase">{data.date}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                                <span className="flex items-center"><MapPin className="w-3 h-3 mr-2"/> BASE</span>
                                <span className="text-white uppercase">{data.location}</span>
                            </div>
                             <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                                <span className="flex items-center"><User className="w-3 h-3 mr-2"/> DISPONIBILIDAD</span>
                                <span className={`${data.color} uppercase`}>ÚLTIMOS LUGARES</span>
                            </div>
                        </div>

                        <button className={`w-full py-4 font-heading text-xl uppercase tracking-widest text-white border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 flex items-center justify-center space-x-2 group`}>
                            <span>Unirse a la Misión</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <p className="mt-4 text-[9px] text-gray-600 font-mono text-center uppercase">
                            * Al reservar aceptas el riesgo inherente de la actividad.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};