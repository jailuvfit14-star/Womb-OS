
import React, { useState } from 'react';
// Added DailyCheckIn to the imports
import { User, SoilState, Archetype, DailyCheckIn } from '../types';
import { ROOT_WOUNDS, DEFAULT_PILLARS, SOIL_STATE_DETAILS } from '../constants';
import { Check, Calendar, Thermometer, Flower2, Droplets, Snowflake, Wind, Heart } from 'lucide-react';

interface OnboardingProps {
  user: User;
  onComplete: (user: User) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<User>(user);

  const nextStep = () => setStep(s => s + 1);

  const calculatePhase = (lastPeriod: string, length: number) => {
    const diff = Math.floor((new Date().getTime() - new Date(lastPeriod).getTime()) / (1000 * 60 * 60 * 24));
    const day = (diff % length) + 1;
    if (day <= 12) return Archetype.MAIDEN;
    if (day <= 16) return Archetype.MOTHER;
    if (day <= 28) return Archetype.WILD_WOMAN;
    return Archetype.WISE_WOMAN;
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Welcome
        return (
          <div className="flex flex-col items-center justify-center text-center animate-fade-in p-8 space-y-8">
            <h2 className="text-4xl font-bold text-cream serif">Welcome to Womb OS, {user.name}</h2>
            <p className="text-lg opacity-80 max-w-sm">Let's build your cyclical operating system. This takes 5 minutes.</p>
            <div className="w-48 h-48 bg-gold/10 rounded-full flex items-center justify-center animate-pulse">
               <Droplets size={64} className="text-gold" />
            </div>
            <button onClick={nextStep} className="bg-amber-500 text-black px-8 py-3 rounded-full font-bold gold-glow transform hover:scale-105 transition-all">Begin Sacred Setup</button>
          </div>
        );

      case 1: // Cycle Info
        return (
          <div className="space-y-8 animate-fade-in p-6">
            <h3 className="text-2xl font-bold serif text-gold">Step 1: Your Cycle Foundation</h3>
            <div className="space-y-4">
              <label className="block text-sm">When did your last period start?</label>
              <input 
                type="date"
                className="w-full glass p-3 rounded-lg"
                defaultValue={new Date().toISOString().split('T')[0]}
                onChange={e => setFormData({ ...formData, cycleInfo: { ...formData.cycleInfo, lastPeriodStart: e.target.value } })}
              />
            </div>
            <div className="space-y-4">
              <label className="block text-sm">What's your average cycle length?</label>
              <select 
                className="w-full glass p-3 rounded-lg"
                defaultValue={28}
                onChange={e => setFormData({ ...formData, cycleInfo: { ...formData.cycleInfo, cycleLength: parseInt(e.target.value) } })}
              >
                {[...Array(15)].map((_, i) => (
                  <option key={i + 21} value={i + 21}>{i + 21} days</option>
                ))}
              </select>
            </div>
            <button onClick={nextStep} className="w-full bg-amber-500 text-black py-3 rounded-lg font-bold mt-4">Continue</button>
          </div>
        );

      case 2: // Soil State
        return (
          <div className="space-y-6 animate-fade-in p-6">
            <h3 className="text-2xl font-bold serif text-gold">Step 2: Know Your Soil State</h3>
            <p className="text-sm opacity-70">Your nervous system is your business foundation. How's your soil today?</p>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(SOIL_STATE_DETAILS).map(([state, details]) => (
                <button 
                  key={state}
                  onClick={() => {
                    const checkIn: DailyCheckIn = {
                      date: new Date().toISOString(),
                      soilState: state as SoilState,
                      energyLevel: 5,
                      cycleDay: 1, // Will recalulate
                      phase: Archetype.MAIDEN // Will recalculate
                    };
                    setFormData({ ...formData, dailyCheckIns: [checkIn] });
                  }}
                  className={`p-4 rounded-xl text-left glass border-2 transition-all ${formData.dailyCheckIns[0]?.soilState === state ? 'border-amber-500' : 'border-transparent'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{details.icon}</span>
                    <div>
                      <h4 className="font-bold">{details.label}</h4>
                      <p className="text-xs opacity-60">{details.guidance}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button 
              disabled={!formData.dailyCheckIns[0]}
              onClick={nextStep} 
              className="w-full bg-amber-500 text-black py-3 rounded-lg font-bold disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        );

      case 3: // Root Wounds
        return (
          <div className="space-y-6 animate-fade-in p-6">
            <div className="sticky top-0 bg-[#0d0615] py-4 z-10 border-b border-gold/10">
              <h3 className="text-2xl font-bold serif text-gold">Step 3: Your Root Wounds</h3>
              <p className="text-xs opacity-70 mt-1">Choose up to 3 Root Wounds you're actively working on.</p>
              <div className="mt-2 text-xs text-amber-500">{formData.activeRootWounds.length}/3 selected</div>
            </div>
            <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto no-scrollbar pb-10">
              {ROOT_WOUNDS.map((wound) => {
                const isSelected = formData.activeRootWounds.includes(wound.id);
                return (
                  <button 
                    key={wound.id}
                    onClick={() => {
                      if (isSelected) {
                        setFormData({ ...formData, activeRootWounds: formData.activeRootWounds.filter(id => id !== wound.id) });
                      } else if (formData.activeRootWounds.length < 3) {
                        setFormData({ ...formData, activeRootWounds: [...formData.activeRootWounds, wound.id] });
                      }
                    }}
                    className={`p-4 rounded-xl text-left glass border transition-all ${isSelected ? 'border-amber-500 bg-amber-500/10' : 'border-gold/10'}`}
                  >
                    <h4 className="font-bold text-sm">{wound.name}</h4>
                    <p className="text-[10px] opacity-60 mt-1 italic">"{wound.description}"</p>
                  </button>
                );
              })}
            </div>
            <button 
              disabled={formData.activeRootWounds.length === 0}
              onClick={nextStep} 
              className="w-full bg-amber-500 text-black py-3 rounded-lg font-bold disabled:opacity-50 mt-4"
            >
              Continue
            </button>
          </div>
        );

      case 4: // Final
        const phase = calculatePhase(formData.cycleInfo.lastPeriodStart, formData.cycleInfo.lastPeriodStart);
        const day = Math.floor((new Date().getTime() - new Date(formData.cycleInfo.lastPeriodStart).getTime()) / (1000 * 60 * 60 * 24)) % formData.cycleInfo.cycleLength + 1;
        
        return (
          <div className="flex flex-col items-center justify-center text-center animate-fade-in p-8 space-y-8">
            <h2 className="text-4xl font-bold text-cream serif">✨ Your Sacred Space Is Ready ✨</h2>
            <div className="glass p-6 rounded-2xl w-full space-y-4 border-amber-500/30">
              <div className="flex justify-between items-center border-b border-gold/10 pb-2">
                <span className="text-xs uppercase text-gold">Current Phase</span>
                <span className="font-bold">{phase}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gold/10 pb-2">
                <span className="text-xs uppercase text-gold">Cycle Day</span>
                <span className="font-bold">{day}</span>
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-xs uppercase text-gold">Tending Wounds</span>
                <div className="flex flex-wrap gap-2">
                  {formData.activeRootWounds.map(id => (
                    <span key={id} className="text-[10px] bg-gold/20 px-2 py-1 rounded-full border border-gold/30">
                      {ROOT_WOUNDS.find(w => w.id === id)?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={() => onComplete({ ...formData, onboarded: true })}
              className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold gold-glow text-lg"
            >
              Enter Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] flex flex-col justify-center max-w-md mx-auto relative">
      {/* Progress bar */}
      {step > 0 && (
        <div className="absolute top-10 left-6 right-6 h-1 bg-white/5 rounded-full">
          <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>
      )}
      {renderStep()}
    </div>
  );
};

export default Onboarding;
