import React from 'react';
import { ShoppingBag, Plus, Tag } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'PLAYERA TÁCTICA // MAR',
    price: '$450 MXN',
    desc: 'Algodón pesado. Corte Oversized. Estampado de alta densidad.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop',
    tag: 'NUEVO DROP'
  },
  {
    id: 2,
    name: 'HOODIE // FUEGO',
    price: '$850 MXN',
    desc: 'Tejido térmico para montaña. Resistencia al viento ligero.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2000&auto=format&fit=crop',
    tag: 'BEST SELLER'
  },
  {
    id: 3,
    name: 'GORRA OPERATIVA',
    price: '$350 MXN',
    desc: 'Visera curva. Material ripstop. Ajuste de velcro.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2000&auto=format&fit=crop',
    tag: 'ACCESORIO'
  },
  {
    id: 4,
    name: 'TERMO 1.2L',
    price: '$600 MXN',
    desc: 'Acero inoxidable doble pared. Mantiene 24h frío / 12h caliente.',
    image: 'https://images.unsplash.com/photo-1602143407151-11115cdbf6e0?q=80&w=2000&auto=format&fit=crop',
    tag: 'EQUIPO'
  },
  {
    id: 5,
    name: 'PARCHE MORAL',
    price: '$150 MXN',
    desc: 'PVC con velcro. Logo Lumbre Azul. 5x5cm.',
    image: 'https://images.unsplash.com/photo-1616405234186-0775d78df142?q=80&w=2000&auto=format&fit=crop',
    tag: 'ACCESORIO'
  },
  {
    id: 6,
    name: 'PLAN ENTRENAMIENTO DIGITAL',
    price: '$200 MXN',
    desc: 'PDF Interactivo. 12 Semanas de preparación híbrida.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2000&auto=format&fit=crop',
    tag: 'DIGITAL'
  }
];

export const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-lumbre-black text-white pt-32 md:pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/20 pb-8 flex flex-col md:flex-row justify-between items-end">
            <div>
                <span className="text-lumbre-blue font-mono text-xs tracking-widest mb-2 block">
                    LOGÍSTICA & SUMINISTROS
                </span>
                <h1 className="font-heading text-6xl md:text-8xl uppercase leading-none">
                    TIENDA OFICIAL
                </h1>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0 text-gray-400 font-mono text-xs">
                <ShoppingBag className="w-4 h-4" />
                <span>ESTADO DEL INVENTARIO: 94%</span>
            </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map((product) => (
                <div key={product.id} className="group relative">
                    
                    {/* Image Container */}
                    <div className="aspect-[4/5] bg-lumbre-panel border border-white/10 relative overflow-hidden mb-4 group-hover:border-lumbre-blue/50 transition-colors">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        
                        {/* Tag */}
                        <div className="absolute top-4 left-4 bg-lumbre-blue/90 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            {product.tag}
                        </div>

                        {/* Quick Action Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                             <button className="w-full bg-white text-black font-heading text-xl uppercase py-3 hover:bg-lumbre-blue hover:text-white transition-colors flex items-center justify-center space-x-2">
                                <Plus className="w-5 h-5" />
                                <span>Añadir al Equipo</span>
                             </button>
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-heading text-2xl uppercase text-white group-hover:text-lumbre-blue transition-colors">
                                {product.name}
                            </h3>
                            <span className="font-mono text-sm text-lumbre-green font-bold">
                                {product.price}
                            </span>
                        </div>
                        <p className="font-mono text-xs text-gray-400">
                            {product.desc}
                        </p>
                    </div>

                </div>
            ))}
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