import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ActivityGrid } from './components/ActivityGrid';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { Philosophy } from './components/Philosophy';
import { Shop } from './components/Shop';
import { Newsletter } from './components/Newsletter';
import { TrackingApp } from './components/TrackingApp';
import { Login } from './components/Login';
import { ActivityDetail } from './components/ActivityDetail';
import { ViewState } from './types';
import { auth, User } from './services/firebase';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  useEffect(() => {
    // Compat Auth Listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleActivitySelect = (id: string) => {
    setSelectedActivityId(id);
    setView(ViewState.ACTIVITY_DETAIL);
  };

  const renderView = () => {
    switch (view) {
      case ViewState.ADVISOR:
        return <GeminiAdvisor />;
      case ViewState.PHILOSOPHY:
        return <Philosophy />;
      case ViewState.SHOP:
        return <Shop />;
      case ViewState.ACTIVITY_DETAIL:
        return (
          <ActivityDetail 
            activityId={selectedActivityId || 'surf'} 
            onBack={() => setView(ViewState.HOME)} 
          />
        );
      case ViewState.TRACKING:
        if (isAuthLoading) {
            return (
                <div className="min-h-screen bg-lumbre-black flex items-center justify-center">
                    <div className="text-lumbre-blue animate-pulse font-mono uppercase tracking-widest">
                        Cargando Sistema...
                    </div>
                </div>
            );
        }
        if (user) {
          return <TrackingApp user={user} />;
        } else {
          return <Login onLoginSuccess={() => {}} />;
        }
      case ViewState.HOME:
      default:
        return (
          <>
            <Hero setView={setView} />
            <ActivityGrid setView={setView} onActivitySelect={handleActivitySelect} />
          </>
        );
    }
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="bg-lumbre-black min-h-screen text-gray-200 flex flex-col font-mono selection:bg-lumbre-blue selection:text-white">
      <Navbar currentView={view} setView={setView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Newsletter Section - Always visible except in Advisor/Tracking/Login/Detail mode for immersion */}
      {view !== ViewState.ADVISOR && view !== ViewState.TRACKING && view !== ViewState.ACTIVITY_DETAIL && (
        <Newsletter />
      )}

      {/* Technical Footer - Minimal */}
      {view !== ViewState.ADVISOR && view !== ViewState.TRACKING && view !== ViewState.ACTIVITY_DETAIL && (
        <footer className="bg-lumbre-black py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">
            <div>
              LUMBRE_SYSTEMS © 2024
            </div>
            <div className="flex space-x-4">
               <a href="#" className="hover:text-lumbre-blue transition-colors">[INSTAGRAM]</a>
               <a href="#" className="hover:text-lumbre-blue transition-colors">[STRAVA]</a>
               <a href="#" className="hover:text-lumbre-blue transition-colors">[COMUNIDAD]</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;