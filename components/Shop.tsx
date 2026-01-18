import React from 'react';
import { ShoppingBag, Plus, Tag, ExternalLink, Waves, Flame, ArrowDown } from 'lucide-react';

const products = [
  // --- MAR PRODUCTS ---
  {
    id: 1,
    name: 'PLAYERA TÁCTICA // MAR',
    price: '$450 MXN',
    desc: 'Algodón pesado. Corte Oversized. Estampado de alta densidad.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop',
    tag: 'NUEVO DROP',
    category: 'mar'
  },
  {
    id: 4,
    name: 'TERMO 1.2L',
    price: '$600 MXN',
    desc: 'Acero inoxidable doble pared. Mantiene 24h frío / 12h caliente.',
    image: 'https://images.unsplash.com/photo-1602143407151-11115cdbf6e0?q=80&w=2000&auto=format&fit=crop',
    tag: 'EQUIPO',
    category: 'mar'
  },
  {
    id: 7, // New ID for logic
    name: 'PONCHO DE SURF',
    price: '$950 MXN',
    desc: 'Toalla técnica de secado rápido. Cambio discreto en playa.',
    image: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=2000&auto=format&fit=crop',
    tag: 'ESENCIAL',
    category: 'mar'
  },

  // --- FUEGO PRODUCTS ---
  {
    id: 2,
    name: 'HOODIE // FUEGO',
    price: '$850 MXN',
    desc: 'Tejido térmico para montaña. Resistencia al viento ligero.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop',
    tag: 'BEST SELLER',
    category: 'fuego'
  },
  {
    id: 3,
    name: 'GORRA OPERATIVA',
    price: '$350 MXN',
    desc: 'Visera curva. Material ripstop. Ajuste de velcro.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2000&auto=format&fit=crop',
    tag: 'ACCESORIO',
    category: 'fuego'
  },
  {
    id: 5,
    name: 'PARCHE MORAL',
    price: '$150 MXN',
    desc: 'PVC con velcro. Logo Lumbre Azul. 5x5cm.',
    image: 'https://images.unsplash.com/photo-1616405234186-0775d78df142?q=80&w=2000&auto=format&fit=crop',
    tag: 'ACCESORIO',
    category: 'fuego'
  },
  {
    id: 6,
    name: 'PLAN ENTRENAMIENTO DIGITAL',
    price: '$200 MXN',
    desc: 'PDF Interactivo. 12 Semanas de preparación híbrida.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop',
    tag: 'DIGITAL',
    category: 'fuego'
  }
];

export const Shop: React.FC = () => {
  const marProducts = products.filter(p => p.category === 'mar');
  const fuegoProducts = products.filter(p => p.category === 'fuego');

  const ProductCard = ({ product, accentColor }: { product: any, accentColor: string }) => (
    <div className="group relative">
        {/* Image Container */}
        <div className={`aspect-[4/5] bg-lumbre-panel border border-white/10 relative overflow-hidden mb-4 group-hover:border-${accentColor}/50 transition-colors`}>
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            
            {/* Tag */}
            <div className={`absolute top-4 left-4 bg-${accentColor}/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest flex items-center`}>
                <Tag className="w-3 h-3 mr-1" />
                {product.tag}
            </div>

            {/* Quick Action Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className={`w-full bg-white text-black font-heading text-xl uppercase py-3 hover:bg-${accentColor} hover:text-white transition-colors flex items-center justify-center space-x-2`}>
                    <Plus className="w-5 h-5" />
                    <span>Añadir al Equipo</span>
                    </button>
            </div>
        </div>

        {/* Info */}
        <div>
            <div className="flex justify-between items-start mb-1">
                <h3 className={`font-heading text-2xl uppercase text-white group-hover:text-${accentColor} transition-colors`}>
                    {product.name}
                </h3>
                <span className={`font-mono text-sm text-${accentColor} font-bold`}>
                    {product.price}
                </span>
            </div>
            <p className="font-mono text-xs text-gray-400">
                {product.desc}
            </p>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-lumbre-black text-white pt-32 md:pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header */}
        <div className="mb-20 border-b border-white/20 pb-8 flex flex-col md:flex-row justify-between items-end">
            <div>
                <span className="text-lumbre-blue font-mono text-xs tracking-widest mb-2 block">
                    SUMINISTROS OFICIALES
                </span>
                <h1 className="font-heading text-6xl md:text-8xl uppercase leading-none mb-4">
                    TIENDA OFICIAL
                </h1>
                <p className="font-mono text-sm text-gray-400 max-w-lg">
                    Equipo operativo dividido por sector. Drops limitados, estética sobria. 
                    Cada compra alimenta nuevas misiones y el <strong className="text-white">CORE SYSTEM</strong>.
                </p>
            </div>
            <div className="flex flex-col items-end mt-6 md:mt-0">
                <a href="#" className="flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors mb-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-mono text-xs uppercase tracking-widest">Ver Kit Táctico (Amazon)</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-500 font-mono text-[10px]">
                    <ShoppingBag className="w-3 h-3" />
                    <span>ESTADO DEL INVENTARIO: 94%</span>
                </div>
            </div>
        </div>

        {/* --- SECTOR MAR (WATER) --- */}
        <div className="mb-24">
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-lumbre-blue/10 border border-lumbre-blue/30">
                    <Waves className="w-8 h-8 text-lumbre-blue" />
                </div>
                <div>
                    <h2 className="font-heading text-4xl md:text-5xl text-white uppercase leading-none">SECTOR MAR</h2>
                    <span className="text-[10px] font-mono text-lumbre-blue tracking-[0.3em] uppercase">Hidratación // Neoprenos // Protección</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {marProducts.map((product) => (
                    // We hardcode styling here because dynamic tailwind classes in loops can sometimes be purged if not careful, 
                    // but using style attribute or fixed classes works well.
                    // For this example I will use the inline component approach but replace accentColor class logic with explicit conditional rendering if needed, 
                    // but standard 'text-lumbre-blue' works if defined in tailwind config.
                    <div key={product.id} className="group relative">
                        <div className="aspect-[4/5] bg-lumbre-panel border border-white/10 relative overflow-hidden mb-4 group-hover:border-lumbre-blue/50 transition-colors">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute top-4 left-4 bg-lumbre-blue/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest flex items-center">
                                <Tag className="w-3 h-3 mr-1" /> {product.tag}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <button className="w-full bg-white text-black font-heading text-xl uppercase py-3 hover:bg-lumbre-blue hover:text-white transition-colors flex items-center justify-center space-x-2">
                                    <Plus className="w-5 h-5" /> <span>Añadir al Equipo</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-heading text-2xl uppercase text-white group-hover:text-lumbre-blue transition-colors">{product.name}</h3>
                                <span className="font-mono text-sm text-lumbre-blue font-bold">{product.price}</span>
                            </div>
                            <p className="font-mono text-xs text-gray-400">{product.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* DIVIDER */}
        <div className="relative h-px w-full bg-white/10 mb-24 flex items-center justify-center">
             <div className="bg-lumbre-black px-4 text-gray-500">
                 <ArrowDown className="w-6 h-6 animate-bounce" />
             </div>
        </div>

        {/* --- SECTOR FUEGO (LAND) --- */}
        <div className="mb-12">
            <div className="flex items-center space-x-4 mb-8 justify-end text-right">
                <div>
                    <h2 className="font-heading text-4xl md:text-5xl text-white uppercase leading-none">SECTOR FUEGO</h2>
                    <span className="text-[10px] font-mono text-lumbre-green tracking-[0.3em] uppercase">Montaña // Campamento // Táctico</span>
                </div>
                <div className="p-3 bg-lumbre-green/10 border border-lumbre-green/30">
                    <Flame className="w-8 h-8 text-lumbre-green" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {fuegoProducts.map((product) => (
                    <div key={product.id} className="group relative">
                        <div className="aspect-[4/5] bg-lumbre-panel border border-white/10 relative overflow-hidden mb-4 group-hover:border-lumbre-green/50 transition-colors">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                            <div className="absolute top-4 left-4 bg-lumbre-green/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest flex items-center">
                                <Tag className="w-3 h-3 mr-1" /> {product.tag}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <button className="w-full bg-white text-black font-heading text-xl uppercase py-3 hover:bg-lumbre-green hover:text-white transition-colors flex items-center justify-center space-x-2">
                                    <Plus className="w-5 h-5" /> <span>Añadir al Equipo</span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-heading text-2xl uppercase text-white group-hover:text-lumbre-green transition-colors">{product.name}</h3>
                                <span className="font-mono text-sm text-lumbre-green font-bold">{product.price}</span>
                            </div>
                            <p className="font-mono text-xs text-gray-400">{product.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Footer Warning */}
        <div className="mt-20 border-t border-white/10 pt-8 text-center">
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                * El equipo está diseñado para condiciones reales. Úsalo bajo tu propio riesgo.
            </p>
        </div>

      </div>
    </div>
  );
};