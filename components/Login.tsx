import React, { useState } from 'react';
import { Lock, ShieldAlert, Key, ArrowRight, Loader, Mail, Zap, UserPlus, RefreshCw, User, Calendar } from 'lucide-react';
import { auth, googleProvider, db, timestamp } from '../services/firebase';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // New Registration Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');

  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await auth.signInWithPopup(googleProvider);
      
      if (result.additionalUserInfo?.isNewUser && result.user) {
          await db.collection('users').doc(result.user.uid).set({
              firstName: result.user.displayName?.split(' ')[0] || 'Operador',
              lastName: result.user.displayName?.split(' ').slice(1).join(' ') || '',
              email: result.user.email,
              uid: result.user.uid,
              provider: 'google',
              createdAt: timestamp()
          }, { merge: true });
      }

      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setError("ERROR: CONEXIÓN INTERRUMPIDA.");
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
        setError("ERROR: CAMPOS INCOMPLETOS.");
        return;
    }

    if (isRegistering) {
        if (!firstName || !lastName || !dob) {
            setError("ERROR: DATOS PERSONALES REQUERIDOS.");
            return;
        }
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        if (user) {
            await user.updateProfile({
                displayName: firstName
            });
            await db.collection('users').doc(user.uid).set({
                firstName,
                lastName,
                dob,
                email,
                uid: user.uid,
                provider: 'password',
                createdAt: timestamp()
            });
        }
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') setError("ERROR: CREDENCIALES INVÁLIDAS.");
      else if (err.code === 'auth/email-already-in-use') setError("ERROR: EL CORREO YA ESTÁ REGISTRADO.");
      else if (err.code === 'auth/weak-password') setError("ERROR: CONTRASEÑA DÉBIL (MIN 6 CARACTERES).");
      else setError("ERROR: FALLO EN EL SISTEMA. REINTENTAR.");
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
        setError("ERROR: INGRESE SU CORREO PARA RESTABLECER.");
        return;
    }
    try {
        await auth.sendPasswordResetEmail(email);
        setInfo("ENLACE DE RECUPERACIÓN ENVIADO AL CORREO.");
        setError(null);
    } catch (err: any) {
        setError("ERROR: NO SE PUDO ENVIAR EL CORREO.");
    }
  }

  return (
    <div className="min-h-screen bg-lumbre-black flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none"></div>
      
      {/* Main Container */}
      <div className="w-full max-w-md bg-lumbre-panel border border-white/20 p-8 md:p-12 relative shadow-xl">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
           <div className="w-16 h-16 bg-lumbre-blue/10 border border-lumbre-blue/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Lock className="w-8 h-8 text-lumbre-blue" />
           </div>
           <h2 className="font-heading text-4xl text-white uppercase tracking-wider mb-2">
               {isRegistering ? 'Alta de Operador' : 'Acceso Restringido'}
           </h2>
           <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              Nivel de Seguridad: Auth + Firestore // Encriptado
           </p>
        </div>

        {/* Google Button */}
        <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mb-6 py-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors"
        >
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>Acceso Rápido [Google]</span>
        </button>

        <div className="flex items-center space-x-2 mb-6 opacity-50">
            <div className="h-px bg-white/20 flex-1"></div>
            <span className="text-[10px] font-mono text-gray-500">O CREDENCIALES MANUALES</span>
            <div className="h-px bg-white/20 flex-1"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
           
           {/* EXTRA FIELDS FOR REGISTRATION */}
           {isRegistering && (
             <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Nombre</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="w-4 h-4 text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-black/50 border border-white/20 py-3 pl-10 pr-3 text-sm font-mono text-white focus:border-lumbre-blue focus:outline-none transition-colors uppercase"
                                placeholder="JULIAN"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Apellido</label>
                        <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 py-3 px-3 text-sm font-mono text-white focus:border-lumbre-blue focus:outline-none transition-colors uppercase"
                            placeholder="PEREZ"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Fecha de Nacimiento</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="w-4 h-4 text-gray-400" />
                        </div>
                        <input 
                            type="date" 
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 py-3 pl-10 pr-3 text-sm font-mono text-white focus:border-lumbre-blue focus:outline-none transition-colors"
                        />
                    </div>
                </div>
             </div>
           )}

           <div className="space-y-2">
              <label className="text-[10px] font-mono text-lumbre-blue uppercase tracking-widest block">Correo Electrónico</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-gray-400" />
                 </div>
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-black/50 border border-white/20 py-3 pl-10 pr-3 text-sm font-mono text-white focus:border-lumbre-blue focus:outline-none transition-colors"
                   placeholder="OPERADOR@LUMBRE.COM"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-mono text-lumbre-green uppercase tracking-widest block">
                  {isRegistering ? 'Crear Contraseña' : 'Contraseña'}
              </label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="w-4 h-4 text-gray-400" />
                 </div>
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-black/50 border border-white/20 py-3 pl-10 pr-3 text-sm font-mono text-white focus:border-lumbre-green focus:outline-none transition-colors"
                   placeholder="••••••••"
                 />
              </div>
           </div>

           {error && (
             <div className="bg-red-500/10 border-l-2 border-red-500 p-3 flex items-start space-x-2 animate-in fade-in slide-in-from-top-2">
                <ShieldAlert className="w-4 h-4 text-red-500 mt-0.5" />
                <span className="text-[10px] font-mono text-red-400 leading-tight">
                   {error}
                </span>
             </div>
           )}

            {info && (
             <div className="bg-lumbre-blue/10 border-l-2 border-lumbre-blue p-3 flex items-start space-x-2 animate-in fade-in slide-in-from-top-2">
                <RefreshCw className="w-4 h-4 text-lumbre-blue mt-0.5" />
                <span className="text-[10px] font-mono text-lumbre-blue leading-tight">
                   {info}
                </span>
             </div>
           )}

           <button 
             type="submit" 
             disabled={isLoading}
             className={`w-full py-4 font-heading text-xl uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 ${
               isLoading ? 'bg-white/10 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-lumbre-blue hover:text-white'
             }`}
           >
              {isLoading ? (
                 <>
                   <Loader className="w-5 h-5 animate-spin" />
                   <span>Procesando...</span>
                 </>
              ) : (
                 <>
                   <span>{isRegistering ? 'Registrar' : 'Autorizar'}</span>
                   <ArrowRight className="w-5 h-5" />
                 </>
              )}
           </button>

        </form>

        <div className="mt-6 flex flex-col space-y-3">
             {!isRegistering && (
                <button onClick={handleResetPassword} type="button" className="text-[10px] font-mono text-gray-400 hover:text-white uppercase tracking-widest text-center">
                    ¿Olvidaste tu contraseña?
                </button>
             )}
             
             <button 
                onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError(null);
                    setInfo(null);
                }}
                className="flex items-center justify-center space-x-2 text-xs font-mono text-lumbre-blue hover:text-white transition-colors uppercase tracking-widest pt-4 border-t border-white/10"
             >
                {isRegistering ? (
                    <><span>Volver a Inicio de Sesión</span></>
                ) : (
                    <><UserPlus className="w-4 h-4" /><span>Registrar Nuevo Operador</span></>
                )}
             </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
           <div className="flex justify-between text-[10px] font-mono text-gray-500 uppercase">
              <span>Encriptación: AES-256</span>
              <span>LUMBRE.OS V.2.1.0</span>
           </div>
        </div>

      </div>
    </div>
  );
};