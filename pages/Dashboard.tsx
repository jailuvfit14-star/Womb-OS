
import React, { useState, useEffect, useMemo } from 'react';
import { User, Archetype, SoilState, DailyCheckIn, SomaticPractice, HerbalProtocol } from '../types';
import { ARCHETYPE_DETAILS, SOIL_STATE_DETAILS } from '../constants';
import { Settings, User as UserIcon, Sparkles, Plus, TrendingUp, Calendar, Box, Activity, Droplets, Zap } from 'lucide-react';
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

  // Filtered Recommendations
  const recommendedSomatic = useMemo(() => 
    user.somaticPractices.filter(p => p.phases.includes(currentPhase)), [user.somaticPractices, currentPhase]);
  
  const recommendedHerbal = useMemo(() => 
    user.herbalProtocols.filter(p => p.soilStates.includes(latestSoil)), [user.herbalProtocols, latestSoil]);

  const thisWeeksContent = useMemo(() => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return user.contentCalendar.filter(c => {
      const d = new Date(c.scheduledDate);
      return d >= now && d <= nextWeek;
    });
  }, [user.contentCalendar]);

  useEffect(() => {
    if (!guidance && !loadingGuidance) handleRefreshGuidance();
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
    onUpdateUser({ ...user, dailyCheckIns: [newCheckIn, ...user.dailyCheckIns].slice(0, 30) });
    setShowCheckInModal(false);
  };

  return (
    <div className="px-6 py-10 space-y-10 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-end border-b border-sage/20 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-sage italic">Womb OS</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate/40">Established in Sovereignty</span>
            <div className="w-1 h-1 bg-gold rounded-full"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Moon: Waxing Gibbous</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate/60">{user.name}</p>
            <p className="text-[10px] uppercase text-sage">Soft Millionaire</p>
          </div>
          <button className="glass p-3 rounded-full hover:bg-sage/10 transition-all"><UserIcon size={20} className="text-sage" /></button>
        </div>
      </header>

      {/* Dynamic Top Stat Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-[2.5rem] flex items-center gap-5 border-l-4 border-l-gold">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold"><Droplets /></div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate/40">Current Phase</p>
            <h3 className="font-bold text-lg text-slate">{phaseInfo.label}</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-[2.5rem] flex items-center gap-5 border-l-4 border-l-sage">
          <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center text-sage"><Activity /></div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate/40">Soil Health</p>
            <h3 className="font-bold text-lg text-slate">{latestSoil}</h3>
          </div>
        </div>
        <div className="glass p-6 rounded-[2.5rem] flex items-center gap-5 border-l-4 border-l-rose-300">
          <div className="w-14 h-14 rounded-2xl bg-rose-300/10 flex items-center justify-center text-rose-400"><Zap /></div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate/40">Energy Quotient</p>
            <h3 className="font-bold text-lg text-slate">Radiant (8/10)</h3>
          </div>
        </div>
      </div>

      {/* AI Intelligence Strip */}
      <div className="glass p-8 rounded-[3rem] bg-gradient-to-r from-sage/5 to-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles size={120} /></div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-3">
             <div className="flex items-center gap-2 text-gold">
               <Sparkles size={18} />
               <span className="text-xs font-bold uppercase tracking-widest">Oracle Guidance</span>
             </div>
             <p className="text-xl serif italic text-slate/80 leading-relaxed">
               {loadingGuidance ? "Whispering truths from the ancestors..." : guidance || "Focus your radiance on high-impact projects today."}
             </p>
          </div>
          <button onClick={handleRefreshGuidance} className="bg-sage text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-sage/20 hover:scale-105 transition-all text-sm uppercase tracking-widest">Recalibrate</button>
        </div>
      </div>

      {/* Middle Grid: The Alignment Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Tasks */}
        <section className="glass p-8 rounded-[3rem] space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sage flex items-center gap-2">
            <Activity size={16} /> Today's Sacred Work
          </h2>
          <div className="space-y-4">
            {user.tasks.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/30 border border-sage/10 group cursor-pointer hover:bg-white/50 transition-all">
                <div className="w-5 h-5 rounded-full border-2 border-sage/30"></div>
                <span className="text-sm font-medium text-slate/70">{task.name}</span>
              </div>
            ))}
            <button className="w-full py-3 rounded-2xl border-2 border-dashed border-sage/20 text-xs font-bold uppercase text-sage/60 hover:text-sage transition-all">+ Manifest Task</button>
          </div>
        </section>

        {/* Column 2: Somatic Recommendations */}
        <section className="glass p-8 rounded-[3rem] space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sage flex items-center gap-2">
            <Zap size={16} /> Somatic Medicine
          </h2>
          <div className="space-y-4">
            {recommendedSomatic.length > 0 ? recommendedSomatic.map(p => (
              <div key={p.id} className="p-4 rounded-2xl bg-[#D4A5A5]/10 border border-[#D4A5A5]/20 space-y-2">
                <h4 className="font-bold text-sm text-[#D4A5A5]">{p.name}</h4>
                <p className="text-[10px] italic text-slate/60 leading-relaxed">{p.description}</p>
                <span className="text-[10px] font-bold text-slate/40">{p.duration} MIN</span>
              </div>
            )) : <p className="text-xs italic text-slate/40">No specific practices found for this phase.</p>}
          </div>
        </section>

        {/* Column 3: Herbal Protocols */}
        <section className="glass p-8 rounded-[3rem] space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sage flex items-center gap-2">
            <Droplets size={16} /> Herbal Infusion
          </h2>
          <div className="space-y-4">
            {recommendedHerbal.length > 0 ? recommendedHerbal.map(h => (
              <div key={h.id} className="p-4 rounded-2xl bg-gold/5 border border-gold/20 space-y-2">
                <h4 className="font-bold text-sm text-gold uppercase">{h.herb}</h4>
                <p className="text-[10px] italic text-slate/60 leading-relaxed">{h.purpose}</p>
                <div className="text-[8px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full inline-block">FOR {latestSoil} STATE</div>
              </div>
            )) : <p className="text-xs italic text-slate/40">Enjoy a simple nettle tea for nourishment.</p>}
          </div>
        </section>
      </div>

      {/* Bottom Grid: The Business Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: Revenue Snapshot */}
        <section className="glass p-8 rounded-[3rem] space-y-6 bg-gradient-to-br from-gold/5 to-white/0">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sage flex items-center gap-2">
            <TrendingUp size={16} /> Cycle Abundance
          </h2>
          <div className="space-y-2">
             <p className="text-[10px] uppercase text-slate/40">Current Revenue</p>
             <h3 className="text-4xl font-bold text-sage">${user.businessMetrics.currentCycleRevenue.toLocaleString()}</h3>
          </div>
          <div className="h-2 w-full bg-sage/10 rounded-full overflow-hidden">
             <div className="h-full bg-sage transition-all duration-1000" style={{ width: '65%' }}></div>
          </div>
          <p className="text-[10px] text-slate/40 italic">65% of your $10k seasonal goal manifested.</p>
        </section>

        {/* Column 2: Content Calendar */}
        <section className="glass p-8 rounded-[3rem] space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sage flex items-center gap-2">
            <Calendar size={16} /> Content Alchemy
          </h2>
          <div className="space-y-3">
            {thisWeeksContent.length > 0 ? thisWeeksContent.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 rounded-xl bg-white/30 border border-sage/5">
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-slate/70">{item.title}</h5>
                  <p className="text-[8px] uppercase text-sage font-bold">{item.platform} • {new Date(item.scheduledDate).toLocaleDateString()}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-gold"></div>
              </div>
            )) : <p className="text-xs italic text-slate/40">No content scheduled for this window.</p>}
            <button className="text-[10px] font-bold uppercase text-sage border-b border-sage/20">Open Full Planner</button>
          </div>
        </section>

        {/* Column 3: Products/Services */}
        <section className="glass p-8 rounded-[3rem] space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sage flex items-center gap-2">
            <Box size={16} /> Product Ecosystem
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {user.products.slice(0, 4).map(p => (
              <div key={p.id} className="p-3 rounded-2xl glass border-sage/10 space-y-1">
                <h5 className="text-[10px] font-bold text-slate/70 truncate">{p.name}</h5>
                <p className="text-[10px] text-sage font-bold">${p.price}</p>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-sage/5 rounded-2xl text-[10px] font-bold uppercase text-sage tracking-widest">Inventory Management</button>
        </section>
      </div>

      {/* Floating Check-In Trigger */}
      <button 
        onClick={() => setShowCheckInModal(true)}
        className="fixed bottom-28 right-8 w-16 h-16 bg-sage text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-40 gold-glow"
      >
        <Plus size={32} />
      </button>

      {/* Check-In Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-slate/40 backdrop-blur-xl" onClick={() => setShowCheckInModal(false)}></div>
          <div className="relative w-full max-w-lg glass border-2 border-white/40 rounded-[3rem] p-10 animate-slide-up space-y-8">
            <h3 className="text-3xl serif text-sage italic">How is your soil tending today?</h3>
            <div className="grid grid-cols-1 gap-4 overflow-y-auto no-scrollbar max-h-[60vh]">
              {Object.entries(SOIL_STATE_DETAILS).map(([state, details]) => (
                <button 
                  key={state}
                  onClick={() => handleSaveCheckIn(state as SoilState, 8)}
                  className="flex items-center gap-6 p-6 rounded-[2rem] glass border border-sage/10 hover:border-gold/50 hover:bg-gold/5 transition-all text-left group"
                >
                  <span className="text-4xl group-hover:scale-125 transition-transform">{details.icon}</span>
                  <div>
                    <h5 className="font-bold text-lg text-slate uppercase tracking-widest">{details.label}</h5>
                    <p className="text-xs text-slate/50 mt-1">{details.guidance}</p>
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
