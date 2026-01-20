
import React, { useState, useEffect, useMemo } from 'react';
import { User, Archetype, SoilState, DailyCheckIn } from '../types';
import { ARCHETYPE_DETAILS, ROOT_WOUNDS, SOIL_STATE_DETAILS } from '../constants';
import { Settings, User as UserIcon, Sparkles, Plus, Share2, RefreshCcw, Save } from 'lucide-react';
import { generateDailyGuidance } from '../geminiService';

interface DashboardProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateUser }) => {
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [guidance, setGuidance] = useState<string | null>(null);
  const [loadingGuidance, setLoadingGuidance] = useState(false);

  const cycleDay = useMemo(() => {
    const diff = Math.floor((new Date().getTime() - new Date(user.cycleInfo.lastPeriodStart).getTime()) / (1000 * 60 * 60 * 24));
    return (diff % user.cycleInfo.cycleLength) + 1;
  }, [user.cycleInfo]);

  const currentPhase = useMemo(() => {
    if (cycleDay <= 12) return Archetype.MAIDEN;
    if (cycleDay <= 16) return Archetype.MOTHER;
    if (cycleDay <= 28) return Archetype.WILD_WOMAN;
    return Archetype.WISE_WOMAN;
  }, [cycleDay]);

  const phaseInfo = ARCHETYPE_DETAILS[currentPhase];
  const latestSoil = user.dailyCheckIns[0]?.soilState || SoilState.NUTRIENT_DENSE;

  useEffect(() => {
    if (!guidance && !loadingGuidance) {
      handleRefreshGuidance();
    }
  }, []);

  const handleRefreshGuidance = async () => {
    setLoadingGuidance(true);
    const msg = await generateDailyGuidance(user);
    setGuidance(msg);
    setLoadingGuidance(false);
  };

  const handleSaveCheckIn = (soil: SoilState, energy: number) => {
    const newCheckIn: DailyCheckIn = {
      date: new Date().toISOString(),
      soilState: soil,
      energyLevel: energy,
      cycleDay,
      phase: currentPhase
    };
    onUpdateUser({
      ...user,
      dailyCheckIns: [newCheckIn, ...user.dailyCheckIns].slice(0, 30)
    });
    setShowCheckInModal(false);
  };

  return (
    <div className="px-5 py-8 space-y-6">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gold italic">Womb OS</h1>
          <p className="text-xs text-gold/60 mt-1 uppercase tracking-widest">Welcome back, Beloved</p>
        </div>
        <div className="flex gap-3">
          <button className="glass p-2 rounded-full text-gold"><Settings size={20} /></button>
          <button className="glass p-2 rounded-full text-gold"><UserIcon size={20} /></button>
        </div>
      </header>

      {/* Date & Moon Phase Mock */}
      <div className="text-[10px] text-gold/40 flex items-center gap-2 uppercase tracking-[0.2em]">
        <span>January 23, 2024</span>
        <span className="w-1 h-1 bg-gold/40 rounded-full"></span>
        <span className="flex items-center gap-1"><Sparkles size={10} /> Waxing Gibbous</span>
      </div>

      {/* Hero Archetype Card */}
      <div className={`relative p-6 rounded-3xl overflow-hidden glass border-amber-500/30 bg-gradient-to-br ${phaseInfo.gradient} shadow-2xl`}>
        <div className="absolute -top-4 -right-4 text-8xl opacity-10">{phaseInfo.icon}</div>
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-amber-500">{phaseInfo.label}</h2>
              <p className="text-xs italic opacity-80">Season: {phaseInfo.season} | Energy: {phaseInfo.energy}</p>
            </div>
            <div className="bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/40">
              <span className="text-xs font-bold text-amber-400">Day {cycleDay} of {user.cycleInfo.cycleLength}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase text-gold/70">
              <span>Energy Flow</span>
              <span>8 / 10</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[80%]"></div>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-bold text-gold/90 uppercase mb-1">Superpower</h3>
            <p className="text-sm leading-relaxed">{phaseInfo.superpower}</p>
          </div>

          <button className="text-[10px] uppercase tracking-tighter text-amber-500 border-b border-amber-500/30 pb-0.5">Edit Cycle Info</button>
        </div>
      </div>

      {/* Quick Check-In Button */}
      <button 
        onClick={() => setShowCheckInModal(true)}
        className="w-full glass py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gold/5 transition-colors group"
      >
        <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
          <Plus size={18} />
        </span>
        <span className="font-bold text-gold uppercase tracking-widest text-sm">How's your soil today?</span>
      </button>

      {/* Daily Soil State Details */}
      <div className="space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-gold/60">Honoring Your Soil State</h4>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {Object.entries(SOIL_STATE_DETAILS).map(([state, details]) => (
            <button 
              key={state}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${latestSoil === state ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'glass border-gold/10 text-gold/50'}`}
            >
              {state.replace('_', ' ')}
            </button>
          ))}
        </div>
        <p className="text-xs italic opacity-70 px-1 leading-relaxed">
          {SOIL_STATE_DETAILS[latestSoil as SoilState].guidance}
        </p>
      </div>

      {/* AI Guidance Card */}
      <div className="glass p-6 rounded-2xl relative border-amber-500/20 space-y-4 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/40"></div>
        <div className="flex items-center gap-2 text-gold">
          <Sparkles size={16} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Sacred Guidance</span>
        </div>
        
        {loadingGuidance ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-full"></div>
            <div className="h-4 bg-white/5 rounded w-3/4"></div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed italic text-cream/90">
            {guidance || "Focus your energy on what matters most today."}
          </p>
        )}

        <div className="flex gap-4 pt-2">
          <button className="text-gold/40 hover:text-gold transition-colors flex items-center gap-1 text-[10px] uppercase">
            <Save size={14} /> Save to Journal
          </button>
          <button 
            onClick={handleRefreshGuidance}
            className="text-gold/40 hover:text-gold transition-colors flex items-center gap-1 text-[10px] uppercase"
          >
            <RefreshCcw size={14} className={loadingGuidance ? 'animate-spin' : ''} /> Refresh
          </button>
          <button className="text-gold/40 hover:text-gold transition-colors flex items-center gap-1 text-[10px] uppercase ml-auto">
            <Share2 size={14} />
          </button>
        </div>
      </div>

      {/* Tending Wounds */}
      <div className="glass p-6 rounded-2xl space-y-4 border-gold/10">
        <h4 className="text-[10px] uppercase tracking-widest text-gold/60">What You're Tending</h4>
        <div className="space-y-4">
          {user.activeRootWounds.map(id => {
            const wound = ROOT_WOUNDS.find(w => w.id === id);
            return (
              <div key={id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-bold text-gold">{wound?.name}</h5>
                  <span className="text-[8px] uppercase text-gold/30">Shadow into Light</span>
                </div>
                <p className="text-[11px] leading-relaxed italic text-gold/60">"{wound?.affirmation}"</p>
              </div>
            );
          })}
        </div>
        <button className="text-[10px] uppercase text-amber-500 border-b border-amber-500/20 block pt-2">Change Root Wounds</button>
      </div>

      {/* Modal - Check In */}
      {showCheckInModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCheckInModal(false)}></div>
          <div className="relative w-full max-w-md glass border-t border-gold/20 sm:border rounded-t-3xl sm:rounded-3xl p-8 animate-slide-up">
            <div className="w-12 h-1 bg-gold/20 rounded-full mx-auto mb-6 sm:hidden"></div>
            <h3 className="text-2xl serif text-gold mb-6">How's your soil right now?</h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(SOIL_STATE_DETAILS).map(([state, details]) => (
                <button 
                  key={state}
                  onClick={() => handleSaveCheckIn(state as SoilState, 5)}
                  className="flex items-center gap-4 p-4 rounded-xl glass border border-gold/10 hover:border-gold/30 transition-all text-left group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{details.icon}</span>
                  <div>
                    <h5 className="font-bold text-sm text-gold">{details.label}</h5>
                    <p className="text-[10px] opacity-60 leading-tight">{details.guidance}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
