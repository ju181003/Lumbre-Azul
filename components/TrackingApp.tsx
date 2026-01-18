import React, { useState, useMemo, useEffect } from 'react';
import { Activity, Bell, Upload, Scan, CheckCircle, Target, Clock, Flame, Scale, Droplets, Plus, CheckSquare, Square, Brain, Zap, Dumbbell, User as UserIcon, LogOut, Key, X, Save, Loader2, BarChart3, Trash2, Settings2, PlusCircle, Lock } from 'lucide-react';
import { analyzeFoodImage } from '../services/geminiService';
import { auth, db, User, timestamp } from '../services/firebase';

interface Habit {
  id: string;
  label: string;
  category: 'fisico' | 'espiritual' | 'mental';
}

interface TrackingAppProps {
    user: User;
}

const DEFAULT_HABITS: Habit[] = [
    { id: 'h1', label: 'EJERCICIO DIARIO', category: 'fisico' },
    { id: 'h2', label: 'COMIDA NATURAL', category: 'fisico' },
    { id: 'h3', label: '8 HORAS DE SUEÑO', category: 'fisico' },
    { id: 'h4', label: 'RESPIRACIÓN TÁCTICA', category: 'espiritual' },
    { id: 'h5', label: 'AGRADECIMIENTO', category: 'espiritual' },
    { id: 'h6', label: 'LECTURA TÉCNICA', category: 'mental' },
    { id: 'h7', label: 'ORDEN EN EL ENTORNO', category: 'mental' },
];

export const TrackingApp: React.FC<TrackingAppProps> = ({ user }) => {
  // PAYWALL STATE
  const [isSubscribed, setIsSubscribed] = useState(false); // Default to false to show paywall
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile & Settings State
  const [showProfile, setShowProfile] = useState(false);
  const [showHabitEditor, setShowHabitEditor] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passMessage, setPassMessage] = useState<string | null>(null);

  // Custom Habits Template
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitLabel, setNewHabitLabel] = useState('');
  const [newHabitCat, setNewHabitCat] = useState<'fisico' | 'espiritual' | 'mental'>('fisico');

  // User Biometrics State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [waterIntake, setWaterIntake] = useState('');

  // Daily Checklist State (Completion mapping)
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Global Performance State
  const [globalProgress, setGlobalProgress] = useState(0);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Sync with Firestore
  useEffect(() => {
    if (!user) return;

    // Simulate checking subscription status
    // In a real app, check db.collection('users').doc(uid).subscriptionStatus
    
    // 1. Load Profile (Biometrics & Habit Template)
    const unsubscribeUser = db.collection('users').doc(user.uid).onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();
            // Load Biometrics - PERSISTENT
            if (data?.biometrics) {
                setWeight(data.biometrics.weight || '');
                setHeight(data.biometrics.height || '');
                setBodyFat(data.biometrics.bodyFat || '');
            }
            // Load Habit Protocol Template
            if (data?.habitProtocol && Array.isArray(data.habitProtocol)) {
                setHabits(data.habitProtocol);
            } else {
                // Initialize with defaults if empty
                setHabits(DEFAULT_HABITS);
                db.collection('users').doc(user.uid).set({ habitProtocol: DEFAULT_HABITS }, { merge: true });
            }
        }
    });

    // 2. Load Daily Logs
    const unsubscribeChecklist = db.collection('users').doc(user.uid)
      .collection('daily_logs').doc(todayStr).onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();
            setChecklist(data?.checklist || {});
            setWaterIntake(data?.waterIntake || '');
        } else {
            setChecklist({});
            setWaterIntake('');
        }
    });

    // 3. Calculate Global Average
    const unsubscribeGlobal = db.collection('users').doc(user.uid)
      .collection('daily_logs').onSnapshot((snapshot) => {
        let totalDailyPercentages = 0;
        let validDays = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.checklist && Object.keys(data.checklist).length > 0) {
                const total = Object.keys(data.checklist).length;
                const done = Object.values(data.checklist).filter(Boolean).length;
                totalDailyPercentages += (done / total) * 100;
                validDays++;
            }
        });

        setGlobalProgress(validDays > 0 ? Math.round(totalDailyPercentages / validDays) : 0);
      });

    return () => {
        unsubscribeUser();
        unsubscribeChecklist();
        unsubscribeGlobal();
    };
  }, [user, todayStr]);

  // Save Biometrics to Firestore
  const saveBiometrics = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
        await db.collection('users').doc(user.uid).set({
            biometrics: {
                weight,
                height,
                bodyFat,
                updatedAt: timestamp()
            }
        }, { merge: true });
        setPassMessage("DATOS CORPORALES ACTUALIZADOS.");
        setTimeout(() => setPassMessage(null), 3000);
    } catch (err) {
        console.error("Error saving biometrics", err);
    } finally {
        setIsSaving(false);
    }
  };

  // Add Habit
  const addHabit = async () => {
    if (!user || !newHabitLabel.trim()) return;
    const newHabit: Habit = {
        id: 'h' + Date.now(),
        label: newHabitLabel.toUpperCase(),
        category: newHabitCat
    };
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    await db.collection('users').doc(user.uid).set({ habitProtocol: updatedHabits }, { merge: true });
    setNewHabitLabel('');
  };

  // Remove Habit
  const removeHabit = async (id: string) => {
    if (!user) return;
    const updatedHabits = habits.filter(h => h.id !== id);
    setHabits(updatedHabits);
    await db.collection('users').doc(user.uid).set({ habitProtocol: updatedHabits }, { merge: true });
  };

  // Toggle Completion
  const toggleCheck = async (id: string) => {
    if (!user) return;
    const newChecklist = { ...checklist, [id]: !checklist[id] };
    setChecklist(newChecklist);
    try {
        await db.collection('users').doc(user.uid)
          .collection('daily_logs').doc(todayStr).set({
            checklist: newChecklist,
            updatedAt: timestamp()
        }, { merge: true });
    } catch (err) { console.error(err); }
  };

  const saveWater = async () => {
    if (!user || !waterIntake) return;
    try {
        await db.collection('users').doc(user.uid)
          .collection('daily_logs').doc(todayStr).set({
            waterIntake,
            updatedAt: timestamp()
        }, { merge: true });
    } catch (err) { console.error(err); }
  };

  const dailyProgressStats = useMemo(() => {
    if (habits.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const total = habits.length;
    const completed = habits.filter(h => checklist[h.id]).length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  }, [checklist, habits]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const result = await analyzeFoodImage(base64String, selectedFile.type);
        setAnalysisResult(result);
        setIsAnalyzing(false);
        if (user) {
            await db.collection('users').doc(user.uid).collection('food_scans').add({
                result,
                timestamp: timestamp(),
                mimeType: selectedFile.type
            });
        }
    };
    reader.readAsDataURL(selectedFile);
  };

  // --- PAYWALL LOGIC ---
  const handleSubscribe = () => {
      // Logic for subscription integration (Stripe, etc.)
      setIsSubscribed(true); // Mocking success for UX demo
  }

  return (
    <div className="min-h-screen bg-lumbre-black text-white pt-32 md:pt-24 pb-20 px-4 md:px-8 relative">
      
      {/* PAYWALL OVERLAY */}
      {!isSubscribed && (
          <div className="fixed inset-0 z-40 bg-lumbre-black/80 backdrop-blur-md flex items-center justify-center p-6">
              <div className="max-w-md w-full bg-lumbre-panel border border-lumbre-blue shadow-[0_0_50px_rgba(37,99,235,0.2)] p-8 text-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Lock className="w-24 h-24 text-lumbre-blue" />
                   </div>
                   
                   <div className="relative z-10">
                       <span className="bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1 text-[10px] font-mono uppercase tracking-widest mb-4 inline-block">
                           Acceso Restringido // Nivel Civil
                       </span>
                       <h2 className="font-heading text-4xl text-white uppercase mb-4">
                           Core System
                       </h2>
                       <p className="font-mono text-sm text-gray-300 mb-6 leading-relaxed">
                           El sistema de rastreo, bitácora histórica y escáner IA de nutrición es exclusivo para miembros operativos.
                           <br/><br/>
                           <span className="text-white italic">"Lo que no se registra, no existe."</span>
                       </p>
                       
                       <div className="mb-8 p-4 bg-white/5 border border-white/10">
                           <div className="font-heading text-3xl text-lumbre-blue">$159 MXN <span className="text-sm text-gray-500 font-mono">/ MES</span></div>
                           <p className="text-[10px] text-gray-500 font-mono mt-1">CANCELACIÓN EN CUALQUIER MOMENTO</p>
                       </div>

                       <button 
                         onClick={handleSubscribe}
                         className="w-full py-4 bg-lumbre-blue hover:bg-white hover:text-black text-white font-heading text-xl uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
                       >
                           <Lock className="w-5 h-5" />
                           <span>Suscribirme Ahora</span>
                       </button>

                       <button 
                         onClick={() => window.location.reload()} 
                         className="mt-4 text-[10px] font-mono text-gray-500 underline hover:text-white"
                       >
                           RESTAURAR COMPRA
                       </button>
                   </div>
              </div>
          </div>
      )}

      {/* --- CONTENT BELOW IS BLURRED IF NOT SUBSCRIBED --- */}
      <div className={!isSubscribed ? 'filter blur-sm pointer-events-none select-none opacity-50' : ''}>
      
      {/* PERFORMANCE HUD */}
      <div className="max-w-7xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
         <div className="bg-lumbre-panel border border-white/10 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
             
             <div className="flex items-center space-x-4 relative z-10 mb-4 md:mb-0">
                 <div className="w-12 h-12 bg-lumbre-blue/10 rounded-full flex items-center justify-center border border-lumbre-blue/30">
                     <BarChart3 className="w-6 h-6 text-lumbre-blue" />
                 </div>
                 <div>
                     <h2 className="font-heading text-xl text-white uppercase tracking-widest">Rendimiento Histórico</h2>
                     <p className="font-mono text-[10px] text-gray-500 uppercase">Eficiencia acumulada en base de datos</p>
                 </div>
             </div>

             <div className="flex items-end space-x-6 relative z-10 w-full md:w-auto">
                 <div className="flex-1 md:w-64">
                    <div className="flex justify-between text-[10px] font-mono mb-1 uppercase text-gray-400">
                        <span>Consistencia Global</span>
                        <span className="text-lumbre-blue">{globalProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 border border-white/10 overflow-hidden">
                        <div className="h-full bg-lumbre-blue transition-all duration-1000" style={{ width: `${globalProgress}%` }}></div>
                    </div>
                 </div>
                 <div className="text-center">
                    <span className="block font-heading text-4xl text-white leading-none">{globalProgress}%</span>
                 </div>
             </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
          <div className="flex flex-col">
              <div className="text-white font-heading text-4xl uppercase tracking-widest">
                  Hola, <span className="text-lumbre-blue ml-2">{user?.displayName || 'OPERADOR'}</span>
              </div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                 Misión activa: <span className="text-gray-400 font-bold">{todayStr}</span>
              </div>
          </div>
          <div className="flex space-x-3">
              <button onClick={() => setShowHabitEditor(!showHabitEditor)} className="flex items-center space-x-2 bg-lumbre-panel border border-white/10 shadow-sm px-4 py-2 hover:border-lumbre-blue transition-colors">
                  <Settings2 className="w-4 h-4 text-lumbre-blue" />
                  <span className="text-xs font-mono uppercase text-gray-400 hidden md:inline">Protocolo</span>
              </button>
              <button onClick={() => setShowProfile(!showProfile)} className="flex items-center space-x-2 bg-lumbre-panel border border-white/10 shadow-sm px-4 py-2 hover:bg-white/5 transition-colors">
                  <UserIcon className="w-4 h-4 text-lumbre-blue" />
                  <span className="text-xs font-mono uppercase text-gray-400 hidden md:inline">Operador</span>
              </button>
          </div>
      </div>

      {/* PROTOCOL EDITOR MODAL */}
      {showHabitEditor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
              <div className="bg-lumbre-panel border border-white/10 shadow-xl w-full max-w-2xl p-8 relative max-h-[90vh] flex flex-col">
                  <button onClick={() => setShowHabitEditor(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                  <h3 className="font-heading text-4xl text-white uppercase mb-2">Editor de Protocolos</h3>
                  <p className="font-mono text-[10px] text-gray-500 mb-6 uppercase">Define tus hábitos diarios. El cambio será inmediato.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="space-y-4">
                          <label className="text-[10px] font-mono text-lumbre-blue uppercase block">Nuevo Hábito</label>
                          <input 
                              type="text" 
                              value={newHabitLabel} 
                              onChange={(e) => setNewHabitLabel(e.target.value)} 
                              placeholder="EJ: MEDITAR 10 MIN"
                              className="w-full bg-black/50 border border-white/10 p-3 font-mono text-xs focus:border-lumbre-blue outline-none text-white"
                          />
                          <div className="flex space-x-2">
                             {(['fisico', 'espiritual', 'mental'] as const).map(cat => (
                                <button key={cat} onClick={() => setNewHabitCat(cat)} className={`flex-1 py-2 text-[10px] font-mono uppercase border transition-colors ${newHabitCat === cat ? 'bg-white text-black border-white' : 'border-white/10 text-gray-500 hover:text-white'}`}>
                                    {cat}
                                </button>
                             ))}
                          </div>
                          <button onClick={addHabit} className="w-full bg-lumbre-blue text-white py-3 font-heading text-xl uppercase flex items-center justify-center space-x-2 hover:bg-white hover:text-black transition-colors">
                              <PlusCircle className="w-5 h-5" />
                              <span>Agregar a Misión</span>
                          </button>
                      </div>

                      <div className="flex-1 overflow-y-auto border border-white/10 p-4 bg-black/20 custom-scrollbar">
                           <h4 className="text-[10px] font-mono text-gray-600 mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Habitos actuales</h4>
                           <div className="space-y-2">
                               {habits.map(h => (
                                   <div key={h.id} className="flex items-center justify-between p-2 bg-lumbre-panel border border-white/5 group shadow-sm">
                                       <div>
                                           <span className="text-[9px] font-mono text-lumbre-blue uppercase block">{h.category}</span>
                                           <span className="text-xs font-mono text-gray-300">{h.label}</span>
                                       </div>
                                       <button onClick={() => removeHabit(h.id)} className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                   </div>
                               ))}
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* PROFILE MODAL (AUTH & BIOMETRICS) */}
      {showProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
              <div className="bg-lumbre-panel border border-white/10 shadow-xl w-full max-w-md p-6 relative">
                  <button onClick={() => setShowProfile(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
                  <div className="flex items-center space-x-3 mb-6 border-b border-white/10 pb-4">
                      <div className="w-10 h-10 bg-lumbre-blue rounded-full flex items-center justify-center"><UserIcon className="w-6 h-6 text-white" /></div>
                      <div>
                          <h3 className="font-heading text-2xl uppercase text-white">Ficha Técnica</h3>
                          <p className="text-[10px] font-mono text-gray-500">{user?.email}</p>
                      </div>
                  </div>

                  <div className="space-y-6">
                      <div>
                          <label className="text-[10px] font-mono text-lumbre-green uppercase block mb-2">Clave de Acceso</label>
                          <div className="flex space-x-2">
                              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="NUEVA CLAVE" className="flex-1 bg-black/50 border border-white/10 px-3 py-2 text-sm font-mono focus:border-lumbre-green outline-none text-white" />
                              <button onClick={async () => { try { await user.updatePassword(newPassword); setPassMessage("CLAVE ACTUALIZADA."); setNewPassword(''); } catch(e) { setPassMessage("RE-AUTENTICACIÓN REQUERIDA."); } }} className="bg-lumbre-green/10 border border-lumbre-green/50 text-lumbre-green px-3 hover:bg-lumbre-green hover:text-white transition-colors"><Key className="w-4 h-4" /></button>
                          </div>
                      </div>
                      <button onClick={() => auth.signOut()} className="w-full border border-red-500/50 text-red-500 py-3 font-heading text-xl uppercase hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center space-x-2"><LogOut className="w-5 h-5" /><span>Cerrar Sistema</span></button>
                  </div>
              </div>
          </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMN 1: BIOTELEMETRY */}
        <div className="space-y-8">
           <div className="border border-white/10 bg-lumbre-panel shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-50"><Activity className="w-5 h-5 text-lumbre-blue"/></div>
              <h3 className="font-heading text-3xl uppercase mb-6 text-white flex items-center">
                 <Target className="w-5 h-5 mr-2 text-lumbre-green"/> Biotelemetría
              </h3>
              
              <div className="space-y-6 mb-8">
                 <div className="group">
                    <div className="flex justify-between text-xs font-mono text-gray-500 mb-1 uppercase tracking-widest">
                       <span className="text-white font-bold">COMPLETADO HOY</span>
                       <span className="text-lumbre-blue">{dailyProgressStats.percentage}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/10">
                       <div className="h-full bg-lumbre-blue transition-all duration-1000" style={{ width: `${dailyProgressStats.percentage}%` }}></div>
                    </div>
                 </div>
              </div>

              {/* Biometric Inputs - PERSISTENT IN FIRESTORE */}
              <div className="border-t border-white/10 pt-6 mb-6">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center">
                        <Scale className="w-3 h-3 mr-2" /> Datos Fijos (Base)
                    </h4>
                    <button onClick={saveBiometrics} disabled={isSaving} className="text-[10px] font-mono text-lumbre-green flex items-center space-x-1 hover:text-white transition-colors">
                        {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        <span>SINCRONIZAR</span>
                    </button>
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] text-lumbre-blue font-mono block">PESO (KG)</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-black/50 border border-white/10 p-2 text-sm font-heading text-white focus:border-lumbre-green outline-none text-center" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] text-lumbre-blue font-mono block">ALTURA (CM)</label>
                        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-black/50 border border-white/10 p-2 text-sm font-heading text-white focus:border-lumbre-green outline-none text-center" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] text-lumbre-blue font-mono block">% GRASA</label>
                        <input type="number" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} className="w-full bg-black/50 border border-white/10 p-2 text-sm font-heading text-white focus:border-lumbre-green outline-none text-center" />
                    </div>
                 </div>
                 {passMessage && <p className="text-[9px] font-mono text-lumbre-blue mt-2 animate-pulse">{passMessage}</p>}
              </div>

              <div className="border-t border-white/10 pt-6">
                 <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-4 flex items-center"><Droplets className="w-3 h-3 mr-2" /> Hidratación Diario</h4>
                 <div className="flex items-center space-x-2">
                     <div className="flex-1 relative">
                        <input type="number" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} placeholder="0.0" className="w-full bg-black/50 border border-white/10 p-3 text-sm font-heading text-white focus:border-lumbre-blue outline-none" />
                        <span className="absolute right-3 top-3.5 text-[10px] font-mono text-gray-500">LITROS</span>
                     </div>
                     <button onClick={saveWater} className="bg-lumbre-blue/10 border border-lumbre-blue/30 text-lumbre-blue p-3 hover:bg-lumbre-blue hover:text-white transition-colors"><Save className="w-5 h-5" /></button>
                 </div>
              </div>
           </div>

           <div className="border border-white/10 bg-lumbre-panel shadow-sm p-6">
               <h3 className="font-heading text-3xl uppercase mb-6 flex items-center text-white"><Bell className="w-5 h-5 mr-2 text-yellow-500"/> Notificaciones</h3>
               <div className="bg-white/5 border-l-2 border-gray-500 p-3 text-[10px] font-mono text-gray-400">
                  <p>"EL LÍMITE NO ES FÍSICO, ES MENTAL. REINICIA."</p>
               </div>
           </div>
        </div>

        {/* COLUMN 2 & 3: SCANNER & CHECKLIST */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="border border-white/10 bg-lumbre-panel shadow-sm p-6 min-h-[400px]">
                <h3 className="font-heading text-3xl uppercase text-white flex items-center mb-6"><Scan className="w-5 h-5 mr-2 text-lumbre-blue"/> Escáner IA</h3>
                <div className="space-y-4">
                    <div className="aspect-video border-2 border-dashed border-white/20 flex flex-col items-center justify-center bg-black/20 relative group overflow-hidden">
                        {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Upload className="w-8 h-8 text-gray-400" />}
                        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <button onClick={handleAnalyze} disabled={!selectedFile || isAnalyzing} className="w-full py-3 font-heading text-xl uppercase border border-white/30 text-gray-300 hover:bg-white hover:text-black transition-all">
                        {isAnalyzing ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Analizar Combustible'}
                    </button>
                    <div className="bg-black/20 p-4 font-mono text-[10px] text-gray-400 h-32 overflow-y-auto border border-white/10">
                        {analysisResult || 'ESPERANDO SEÑAL...'}
                    </div>
                </div>
            </div>

            <div className="border border-white/10 bg-lumbre-panel shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-3xl uppercase text-white flex items-center"><CheckSquare className="w-5 h-5 mr-2 text-white"/> Protocolo Diario</h3>
                </div>
                <div className="h-1.5 w-full bg-white/10 mb-6">
                     <div className="h-full bg-lumbre-blue transition-all" style={{ width: `${dailyProgressStats.percentage}%` }}></div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                    {['fisico', 'espiritual', 'mental'].map(cat => (
                        <div key={cat}>
                            <div className="flex items-center space-x-2 mb-3 border-b border-white/10 pb-1">
                                {cat === 'fisico' ? <Dumbbell className="w-4 h-4 text-lumbre-blue" /> : cat === 'espiritual' ? <Zap className="w-4 h-4 text-yellow-500" /> : <Brain className="w-4 h-4 text-lumbre-green" />}
                                <h4 className="font-heading text-xl uppercase tracking-wider text-gray-300">{cat}</h4>
                            </div>
                            <div className="space-y-1">
                                {habits.filter(h => h.category === cat).map(item => (
                                    <button key={item.id} onClick={() => toggleCheck(item.id)} className="w-full flex items-center justify-between p-2 hover:bg-white/5 transition-colors group text-left">
                                        <span className={`font-mono text-xs uppercase ${checklist[item.id] ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{item.label}</span>
                                        {checklist[item.id] ? <CheckCircle className="w-4 h-4 text-lumbre-blue" /> : <Square className="w-4 h-4 text-gray-500" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {habits.length === 0 && <p className="text-[10px] font-mono text-gray-500 text-center py-10 uppercase">Configura tus protocolos en ajustes.</p>}
                </div>
            </div>
        </div>

      </div>
      </div>
    </div>
  );
};