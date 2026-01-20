
import React, { useState } from 'react';
import { User, Archetype } from '../types';
import { ROOT_WOUNDS } from '../constants';
import { 
  LogOut, ChevronLeft, ChevronRight, Trash2, Bell, 
  Calendar, Heart, Sparkles, Save, Check 
} from 'lucide-react';

interface SettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

type SettingsView = 'main' | 'cycle' | 'wounds' | 'pillars' | 'notifications';

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser, onLogout }) => {
  const [view, setView] = useState<SettingsView>('main');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Temporary local states for editing
  const [cycleDate, setCycleDate] = useState(user.cycleInfo.lastPeriodStart);
  const [cycleLen, setCycleLen] = useState(user.cycleInfo.cycleLength);
  const [activeWounds, setActiveWounds] = useState<string[]>(user.activeRootWounds);
  const [tempPillars, setTempPillars] = useState<string[]>([...user.pillarNames]);
  const [notifs, setNotifs] = useState(user.notificationPreferences || {
    dailyGuidance: true,
    phaseShifts: true,
    pillarReminders: true
  });

  const triggerSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      cycleInfo: { lastPeriodStart: cycleDate, cycleLength: cycleLen },
      activeRootWounds: activeWounds,
      pillarNames: tempPillars,
      notificationPreferences: notifs
    };
    onUpdateUser(updatedUser);
    triggerSuccess();
  };

  const handleExportData = () => {
    const data = JSON.stringify(user, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `womb_os_data_${user.name}.json`;
    a.click();
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all sacred data? This cannot be undone.")) {
      localStorage.clear();
      onLogout();
    }
  };

  const renderCycleSettings = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setView('main')} className="text-gold/60"><ChevronLeft size={24} /></button>
        <h2 className="text-xl serif text-gold">Your Sacred Cycle</h2>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gold/60 ml-1">Last Period Start</label>
          <input 
            type="date" 
            value={cycleDate.split('T')[0]} 
            onChange={(e) => setCycleDate(new Date(e.target.value).toISOString())}
            className="w-full glass bg-white/5 border border-gold/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gold/60 ml-1">Average Cycle Length (Days)</label>
          <input 
            type="number" 
            value={cycleLen} 
            onChange={(e) => setCycleLen(parseInt(e.target.value))}
            className="w-full glass bg-white/5 border border-gold/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold"
          />
        </div>
      </div>
      <button onClick={handleSave} className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl gold-glow flex items-center justify-center gap-2">
        {saveSuccess ? <Check size={18} /> : <Save size={18} />}
        {saveSuccess ? 'Saved' : 'Save Changes'}
      </button>
    </div>
  );

  const renderWoundSettings = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setView('main')} className="text-gold/60"><ChevronLeft size={24} /></button>
        <h2 className="text-xl serif text-gold">Tending Wounds</h2>
      </div>
      <p className="text-xs text-gold/40 italic px-1">Select up to 3 active root wounds to work through in your daily guidance.</p>
      <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto no-scrollbar pb-4">
        {ROOT_WOUNDS.map(wound => {
          const isSelected = activeWounds.includes(wound.id);
          return (
            <button 
              key={wound.id}
              onClick={() => {
                if (isSelected) {
                  setActiveWounds(prev => prev.filter(id => id !== wound.id));
                } else if (activeWounds.length < 3) {
                  setActiveWounds(prev => [...prev, wound.id]);
                }
              }}
              className={`p-4 rounded-xl text-left glass border transition-all ${isSelected ? 'border-amber-500 bg-amber-500/10' : 'border-gold/10'}`}
            >
              <h4 className="font-bold text-sm text-gold">{wound.name}</h4>
              <p className="text-[10px] opacity-60 mt-1 italic">"{wound.description}"</p>
            </button>
          );
        })}
      </div>
      <button onClick={handleSave} className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl gold-glow">
        {saveSuccess ? 'Changes Manifested' : 'Confirm Active Wounds'}
      </button>
    </div>
  );

  const renderPillarSettings = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setView('main')} className="text-gold/60"><ChevronLeft size={24} /></button>
        <h2 className="text-xl serif text-gold">Sacred Pillars</h2>
      </div>
      <p className="text-xs text-gold/40 italic px-1">Customize the 8 foundations of your daily ritual.</p>
      <div className="space-y-3">
        {tempPillars.map((name, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-gold/30 text-[10px] font-bold w-4">{i + 1}</span>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => {
                const newPillars = [...tempPillars];
                newPillars[i] = e.target.value;
                setTempPillars(newPillars);
              }}
              className="flex-1 glass bg-white/5 border border-gold/5 rounded-xl px-4 py-2.5 focus:outline-none focus:border-gold/40 text-sm"
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl gold-glow mt-4">
        Save Pillar Names
      </button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setView('main')} className="text-gold/60"><ChevronLeft size={24} /></button>
        <h2 className="text-xl serif text-gold">Notifications</h2>
      </div>
      <div className="glass rounded-2xl overflow-hidden divide-y divide-gold/10">
        {[
          { key: 'dailyGuidance', label: 'Daily Sacred Guidance', desc: 'Receive your cyclical wisdom every morning.' },
          { key: 'phaseShifts', label: 'Phase Shift Alerts', desc: 'Get notified when you move to a new archetype.' },
          { key: 'pillarReminders', label: 'Pillar Devotion Reminders', desc: 'Gentle nudges to complete your daily pillars.' },
        ].map((item) => (
          <div key={item.key} className="p-5 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-medium text-cream">{item.label}</h4>
              <p className="text-[10px] text-gold/40 mt-1">{item.desc}</p>
            </div>
            <button 
              onClick={() => setNotifs(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${notifs[item.key as keyof typeof notifs] ? 'bg-amber-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifs[item.key as keyof typeof notifs] ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl gold-glow mt-4">
        Update Preferences
      </button>
    </div>
  );

  if (view === 'cycle') return <div className="px-5 py-8">{renderCycleSettings()}</div>;
  if (view === 'wounds') return <div className="px-5 py-8">{renderWoundSettings()}</div>;
  if (view === 'pillars') return <div className="px-5 py-8">{renderPillarSettings()}</div>;
  if (view === 'notifications') return <div className="px-5 py-8">{renderNotificationSettings()}</div>;

  return (
    <div className="px-5 py-8 space-y-8 animate-fade-in">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full glass border border-gold/20 flex items-center justify-center text-2xl font-bold text-amber-500 shadow-xl shadow-amber-500/10">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl serif text-gold">{user.name}</h1>
          <p className="text-xs text-gold/40 uppercase tracking-widest">{user.email}</p>
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60 px-1">Sacred Preferences</h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-gold/10">
          <button onClick={() => setView('cycle')} className="w-full px-5 py-4 flex items-center justify-between text-left group">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-gold/40 group-hover:text-gold transition-colors" />
              <span className="text-sm font-medium text-cream/90 group-hover:text-amber-500 transition-colors">Your Sacred Cycle</span>
            </div>
            <ChevronRight size={16} className="text-gold/20" />
          </button>
          <button onClick={() => setView('wounds')} className="w-full px-5 py-4 flex items-center justify-between text-left group">
            <div className="flex items-center gap-3">
              <Heart size={18} className="text-gold/40 group-hover:text-gold transition-colors" />
              <span className="text-sm font-medium text-cream/90 group-hover:text-amber-500 transition-colors">Tending Wounds</span>
            </div>
            <ChevronRight size={16} className="text-gold/20" />
          </button>
          <button onClick={() => setView('pillars')} className="w-full px-5 py-4 flex items-center justify-between text-left group">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-gold/40 group-hover:text-gold transition-colors" />
              <span className="text-sm font-medium text-cream/90 group-hover:text-amber-500 transition-colors">Rename Your Pillars</span>
            </div>
            <ChevronRight size={16} className="text-gold/20" />
          </button>
          <button onClick={() => setView('notifications')} className="w-full px-5 py-4 flex items-center justify-between text-left group">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-gold/40 group-hover:text-gold transition-colors" />
              <span className="text-sm font-medium text-cream/90 group-hover:text-amber-500 transition-colors">Notifications</span>
            </div>
            <ChevronRight size={16} className="text-gold/20" />
          </button>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60 px-1">Data Management</h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-gold/10">
          <button onClick={handleExportData} className="w-full px-5 py-4 flex items-center gap-3 text-left group">
            <div className="flex items-center gap-3">
              <ChevronRight size={16} className="text-gold/20" />
              <span className="text-sm font-medium text-cream/90 group-hover:text-gold transition-colors">Export My Data</span>
            </div>
          </button>
          <button onClick={handleClearData} className="w-full px-5 py-4 flex items-center gap-3 text-left group">
            <div className="flex items-center gap-3">
              <Trash2 size={16} className="text-red-500/50" />
              <span className="text-sm font-medium text-red-500/80">Clear All Data</span>
            </div>
          </button>
        </div>
      </section>

      <section className="text-center pt-4">
        <button 
          onClick={onLogout}
          className="glass border-red-500/20 text-red-400 px-8 py-3 rounded-xl text-xs uppercase font-bold flex items-center justify-center gap-2 mx-auto"
        >
          <LogOut size={16} /> Exit Sacred Space
        </button>
        <p className="text-[8px] uppercase tracking-widest text-gold/20 mt-8">Womb OS v1.1.0 • Crafted with Devotion</p>
      </section>
    </div>
  );
};

export default Settings;
