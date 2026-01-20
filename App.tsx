
import React, { useState, useEffect, useCallback } from 'react';
import { User, Archetype, SoilState, DailyCheckIn, Task } from './types';
import { DEFAULT_PILLARS, ARCHETYPE_DETAILS } from './constants';
import Dashboard from './pages/Dashboard';
import Flow from './pages/Flow';
import Oracle from './pages/Oracle';
import Library from './pages/Library';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import { Home, Waves, Sparkles, Library as LibraryIcon, Settings as SettingsIcon } from 'lucide-react';

const STORAGE_KEY = 'womb_os_user_data';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'flow' | 'oracle' | 'library' | 'settings'>('home');
  const [loading, setLoading] = useState(true);
  const [hash, setHash] = useState(window.location.hash);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);

    // Listen for hash changes for routing
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gold">Loading Sacred Space...</div>;

  if (!user) {
    if (hash === '#/signup') return <Signup onSignup={(u) => saveUser(u)} />;
    return <Login onLogin={(u) => saveUser(u)} />;
  }

  if (!user.onboarded) {
    return <Onboarding user={user} onComplete={(updated) => saveUser(updated)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard user={user} onUpdateUser={saveUser} />;
      case 'flow': return <Flow user={user} onUpdateUser={saveUser} />;
      case 'oracle': return <Oracle user={user} onUpdateUser={saveUser} />;
      case 'library': return <Library user={user} onUpdateUser={saveUser} />;
      case 'settings': return <Settings user={user} onUpdateUser={saveUser} onLogout={() => saveUser(null)} />;
      default: return <Dashboard user={user} onUpdateUser={saveUser} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-gold/20 flex justify-around items-center py-3 px-4 z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-amber-500' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-[10px] uppercase tracking-widest">Home</span>
        </button>
        <button onClick={() => setActiveTab('flow')} className={`flex flex-col items-center gap-1 ${activeTab === 'flow' ? 'text-amber-500' : 'text-gray-400'}`}>
          <Waves size={24} />
          <span className="text-[10px] uppercase tracking-widest">Flow</span>
        </button>
        <button onClick={() => setActiveTab('oracle')} className={`flex flex-col items-center gap-1 ${activeTab === 'oracle' ? 'text-amber-500' : 'text-gray-400'}`}>
          <Sparkles size={24} />
          <span className="text-[10px] uppercase tracking-widest">Oracle</span>
        </button>
        <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center gap-1 ${activeTab === 'library' ? 'text-amber-500' : 'text-gray-400'}`}>
          <LibraryIcon size={24} />
          <span className="text-[10px] uppercase tracking-widest">Library</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-amber-500' : 'text-gray-400'}`}>
          <SettingsIcon size={24} />
          <span className="text-[10px] uppercase tracking-widest">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
