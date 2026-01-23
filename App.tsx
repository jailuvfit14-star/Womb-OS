
import React, { useState, useEffect, useCallback } from 'react';
import { User, Archetype, SoilState, DailyCheckIn, Task } from './types';
import { DEFAULT_PILLARS, ARCHETYPE_DETAILS, DEFAULT_SOMATIC, DEFAULT_HERBAL } from './constants';
import Dashboard from './pages/Dashboard';
import Flow from './pages/Flow';
import Oracle from './pages/Oracle';
import Library from './pages/Library';
import Settings from './pages/Settings';
import Systems from './pages/Systems';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import { Home, Waves, Sparkles, Library as LibraryIcon, Settings as SettingsIcon, Database } from 'lucide-react';

const STORAGE_KEY = 'womb_os_user_data';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'flow' | 'oracle' | 'systems' | 'library' | 'settings'>('home');
  const [loading, setLoading] = useState(true);
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure new structures exist for backward compatibility
        if (!parsed.somaticPractices) parsed.somaticPractices = DEFAULT_SOMATIC;
        if (!parsed.herbalProtocols) parsed.herbalProtocols = DEFAULT_HERBAL;
        if (!parsed.contentCalendar) parsed.contentCalendar = [];
        if (!parsed.products) parsed.products = [];
        if (!parsed.services) parsed.services = [];
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);

    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const saveUser = useCallback((userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sage font-bold uppercase tracking-widest italic animate-pulse">Entering Your Sanctuary...</div>;

  if (!user) {
    if (hash === '#/signup') return <Signup onSignup={(u) => saveUser({ ...u, somaticPractices: DEFAULT_SOMATIC, herbalProtocols: DEFAULT_HERBAL, contentCalendar: [], products: [], services: [] })} />;
    return <Login onLogin={(u) => saveUser({ ...u, somaticPractices: DEFAULT_SOMATIC, herbalProtocols: DEFAULT_HERBAL, contentCalendar: [], products: [], services: [] })} />;
  }

  if (!user.onboarded) {
    return <Onboarding user={user} onComplete={(updated) => saveUser(updated)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard user={user} onUpdateUser={saveUser} />;
      case 'flow': return <Flow user={user} onUpdateUser={saveUser} />;
      case 'oracle': return <Oracle user={user} onUpdateUser={saveUser} />;
      case 'systems': return <Systems user={user} onUpdateUser={saveUser} />;
      case 'library': return <Library user={user} onUpdateUser={saveUser} />;
      case 'settings': return <Settings user={user} onUpdateUser={saveUser} onLogout={() => saveUser(null)} />;
      default: return <Dashboard user={user} onUpdateUser={saveUser} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 overflow-x-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-sage/10 flex justify-around items-center py-4 px-2 z-[90] rounded-t-[2.5rem] shadow-[0_-10px_30px_rgba(168,181,162,0.1)]">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' ? 'text-sage scale-110' : 'text-slate/30 hover:text-sage/60'}`}>
          <Home size={22} />
          <span className="text-[8px] uppercase font-bold tracking-widest">Home</span>
        </button>
        <button onClick={() => setActiveTab('flow')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'flow' ? 'text-sage scale-110' : 'text-slate/30 hover:text-sage/60'}`}>
          <Waves size={22} />
          <span className="text-[8px] uppercase font-bold tracking-widest">Ritual</span>
        </button>
        <button onClick={() => setActiveTab('oracle')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'oracle' ? 'text-sage scale-110' : 'text-slate/30 hover:text-sage/60'}`}>
          <Sparkles size={22} />
          <span className="text-[8px] uppercase font-bold tracking-widest">Oracle</span>
        </button>
        <button onClick={() => setActiveTab('systems')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'systems' ? 'text-sage scale-110' : 'text-slate/30 hover:text-sage/60'}`}>
          <Database size={22} />
          <span className="text-[8px] uppercase font-bold tracking-widest">Vault</span>
        </button>
        <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'library' ? 'text-sage scale-110' : 'text-slate/30 hover:text-sage/60'}`}>
          <LibraryIcon size={22} />
          <span className="text-[8px] uppercase font-bold tracking-widest">Log</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'settings' ? 'text-sage scale-110' : 'text-slate/30 hover:text-sage/60'}`}>
          <SettingsIcon size={22} />
          <span className="text-[8px] uppercase font-bold tracking-widest">Self</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
