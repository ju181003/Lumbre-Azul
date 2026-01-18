import React from 'react';
import { ViewState } from '../types';
import { Terminal } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  
  const handleNavigation = (view?: ViewState, sectionId?: string) => {
    if (view) {
      setView(view);
    }
    
    if (sectionId) {
      if (currentView !== ViewState.HOME && !view) {
        setView(ViewState.HOME);
      }
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navItems = [
    { label: 'TRACKING', view: ViewState.TRACKING },
    { label: 'NOSOTROS', view: ViewState.PHILOSOPHY },
    { label: 'TIENDA', view: ViewState.SHOP },
    { label: 'PROTOCOLOS', view: ViewState.HOME, section: 'protocols' },
    { label: 'NUTRICIÓN', view: ViewState.HOME, section: 'nutrition' },
    { label: 'HORARIO', view: ViewState.HOME, section: 'schedule' },
    { label: 'CALENDARIO', view: ViewState.HOME, section: 'calendar' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-lumbre-black/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center">
        
        {/* TOP ROW: LOGO & AI (Mobile) */}
        <div className="flex justify-between items-center h-16 px-6 border-b md:border-b-0 border-white/5 md:w-auto">
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button onClick={() => handleNavigation(ViewState.HOME)} className="flex items-center space-x-3 group">
               <div className="w-3 h-3 md:w-4 md:h-4 bg-lumbre-blue group-hover:bg-lumbre-green transition-colors duration-500 shadow-[0_0_10px_rgba(37,99,235,0.5)] group-hover:shadow-[0_0_10px_rgba(75,83,32,0.5)]"></div>
               <span className="font-heading text-3xl tracking-widest uppercase text-white group-hover:tracking-[0.2em] transition-all whitespace-nowrap">LUMBRE AZUL</span>
            </button>
            <span className="hidden lg:inline text-[10px] text-gray-500 tracking-tighter border-l border-white/20 pl-3 whitespace-nowrap">HECHOS DE MAR Y FUEGO</span>
          </div>

           {/* Mobile AI Button */}
           <div className="md:hidden">
              <button 
                  onClick={() => handleNavigation(ViewState.ADVISOR)}
                  className={`border px-3 py-2 flex items-center space-x-2 text-xs uppercase tracking-widest ${currentView === ViewState.ADVISOR ? 'bg-white text-black border-white' : 'text-lumbre-blue bg-lumbre-blue/5 border-lumbre-blue/20'}`}
              >
                  <Terminal className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* BOTTOM ROW (Mobile) / RIGHT SIDE (Desktop): NAV LINKS */}
        <div 
          className="flex-1 overflow-x-auto py-2 md:py-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar Firefox/IE
        >
             {/* Hide webkit scrollbar via arbitrary class if possible, or rely on overflow-x-auto */}
             <div className="flex items-center px-6 md:px-0 space-x-6 md:space-x-8 md:justify-end md:h-16 min-w-max [&::-webkit-scrollbar]:hidden">
                {navItems.map((item, idx) => (
                   <button 
                      key={idx}
                      onClick={() => handleNavigation(item.view, item.section)} 
                      className="text-[10px] md:text-xs font-mono text-gray-400 hover:text-white uppercase tracking-widest hover:underline decoration-lumbre-blue underline-offset-4 transition-all"
                   >
                      {item.label}
                   </button>
                ))}

                {/* Desktop AI Button */}
                <button 
                  onClick={() => handleNavigation(ViewState.ADVISOR)}
                  className={`hidden md:flex border px-4 py-2 items-center space-x-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 ml-6 ${currentView === ViewState.ADVISOR ? 'bg-white text-black border-white' : 'text-lumbre-blue bg-lumbre-blue/5 border-lumbre-blue/20'}`}
                >
                  <Terminal className="w-4 h-4" />
                  <span>AI_ADVISOR</span>
                </button>
             </div>
        </div>

      </div>
      
      {/* Decorative progress line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-lumbre-blue via-gray-800 to-lumbre-green opacity-50"></div>
    </nav>
  );
};