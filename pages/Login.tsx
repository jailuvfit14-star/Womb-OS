
import React, { useState } from 'react';
import { User } from '../types';
import { DEFAULT_PILLARS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication: In a real app, verify credentials.
    // For now, check if user exists in local storage by email or just create new.
    // Fixed mockUser to match User interface in types.ts
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
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
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-[#1a0b2e] to-[#0d0615] animate-fade-in text-cream">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-amber-500 mb-2 italic">Womb OS</h1>
        <p className="text-sm tracking-[0.2em] uppercase text-gold/60">Your Cyclical Life Command Center</p>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-md glass p-8 rounded-2xl flex flex-col gap-6 gold-glow">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold">Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            placeholder="beloved@wombos.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-gold/20 rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-xl shadow-amber-500/20"
        >
          Enter Your Sacred Space
        </button>

        <div className="text-center space-y-2 mt-4">
          <a href="#/signup" className="block text-xs text-gold/60 hover:text-gold transition-colors">New here? Create Account</a>
          <button type="button" className="text-xs text-gold/40 hover:text-gold transition-colors">Forgot Password?</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
