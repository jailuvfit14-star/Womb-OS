
import React, { useState } from 'react';
import { User } from '../types';
import { DEFAULT_PILLARS } from '../constants';

interface SignupProps {
  onSignup: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Fixed newUser to match User interface in types.ts
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      onboarded: false,
      createdDate: new Date().toISOString(),
      cycleInfo: {
        lastPeriodStart: new Date().toISOString(),
        cycleLength: 28
      },
      activeRootWounds: [],
      pillarNames: DEFAULT_PILLARS,
      dailyCheckIns: [],
      pillarCompletions: {},
      tasks: [],
      // Removed non-existent contentDrafts and added missing fields
      somaticPractices: [],
      herbalProtocols: [],
      contentCalendar: [],
      products: [],
      services: [],
      journalEntries: [],
      savedGuidance: [],
      businessMetrics: {
        currentCycleRevenue: 0,
        activeProjects: 0,
        notes: '',
        lastUpdated: new Date().toISOString()
      }
    };
    onSignup(newUser);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-[#1a0b2e] to-[#0d0615] text-cream">
      <div className="text-center mb-8 max-w-sm">
        <h2 className="text-3xl font-bold text-[#D4A5A5] mb-2">Welcome, Beloved</h2>
        <p className="text-sm italic opacity-80 leading-relaxed">"Your sensitivity is your intelligence. Your cycle is your competitive advantage."</p>
      </div>

      <form onSubmit={handleSignup} className="w-full max-w-md glass p-8 rounded-2xl flex flex-col gap-4 gold-glow">
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gold/80">Full Name</label>
          <input 
            type="text" required
            value={name} onChange={e => setName(e.target.value)}
            className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gold/80">Email</label>
          <input 
            type="email" required
            value={email} onChange={e => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gold/80">Password</label>
          <input 
            type="password" required
            value={password} onChange={e => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
          />
        </div>
        
        <label className="flex items-center gap-3 mt-4 group cursor-pointer">
          <input type="checkbox" required className="accent-gold w-4 h-4 bg-transparent border-gold" />
          <span className="text-xs text-gold/60 group-hover:text-gold">I'm ready to become a Soft Millionaire</span>
        </label>

        <button 
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-all mt-4"
        >
          Create My Sacred Space
        </button>

        <a href="#/login" className="text-center text-xs text-gold/40 hover:text-gold mt-2">Already have an account? Sign In</a>
      </form>
    </div>
  );
};

export default Signup;
