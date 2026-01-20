
import React, { useState } from 'react';
import { User } from '../types';
import { askOracle } from '../geminiService';
import { Sparkles, MessageSquare, History, Bookmark, RefreshCcw } from 'lucide-react';

interface OracleProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Oracle: React.FC<OracleProps> = ({ user, onUpdateUser }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const resp = await askOracle(question, user);
    setAnswer(resp);
    setLoading(false);
  };

  return (
    <div className="px-5 py-8 space-y-8">
      <header>
        <h1 className="text-3xl serif text-gold">Sacred Guidance</h1>
        <p className="text-xs uppercase tracking-widest text-gold/40 mt-1">AI-driven reflections based on your energetic state</p>
      </header>

      {/* Main Oracle Interface */}
      <section className="glass p-6 rounded-3xl border-amber-500/20 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={64} className="text-gold" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase text-gold/60 tracking-widest flex items-center gap-2">
            <MessageSquare size={14} /> Ask for Specific Guidance
          </h2>
          <div className="relative">
            <textarea 
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="What do you need support with today, Beloved?"
              className="w-full h-32 glass bg-white/5 border border-gold/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-gold/40 no-scrollbar"
            />
          </div>
        </div>

        <button 
          onClick={handleAsk}
          disabled={loading || !question}
          className="w-full bg-amber-500 text-black font-bold py-3 rounded-xl gold-glow disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCcw className="animate-spin" size={20} /> : <Sparkles size={20} />}
          Generate Guidance
        </button>

        {answer && (
          <div className="animate-fade-in p-6 bg-gold/5 rounded-2xl border border-gold/20 mt-4">
            <p className="text-sm italic leading-relaxed text-cream/90">{answer}</p>
            <div className="flex gap-4 mt-4">
              <button className="text-[10px] uppercase text-gold/40 flex items-center gap-1 hover:text-gold transition-colors">
                <Bookmark size={12} /> Save to Past Wisdom
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Past Wisdom Section */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60 flex items-center gap-2">
          <History size={14} /> Past Wisdom
        </h2>
        <div className="space-y-3">
          {user.savedGuidance.length === 0 ? (
            <div className="glass p-6 rounded-2xl text-center text-gold/30 text-[10px] uppercase italic">The chronicles of your wisdom are yet to be written.</div>
          ) : (
            user.savedGuidance.map(guidance => (
              <div key={guidance.id} className="glass p-4 rounded-xl border-gold/5">
                <div className="text-[8px] uppercase text-gold/40 mb-1">{new Date(guidance.date).toLocaleDateString()} • {guidance.phase}</div>
                <p className="text-xs italic line-clamp-2 text-gold/70">{guidance.prompt}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Root Wound Deep Dive */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Healing Your Wounds</h2>
        <div className="space-y-3">
          {user.activeRootWounds.map(id => {
            return (
              <div key={id} className="glass p-5 rounded-2xl border-gold/10 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gold uppercase tracking-widest">{id}</h3>
                  <span className="text-[8px] bg-gold/10 px-2 py-0.5 rounded text-gold/60 border border-gold/20">Active</span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase text-gold/40">Business Impact</h4>
                  <p className="text-xs text-cream/70 italic leading-relaxed">This wound can manifest as perfectionism or a fear of being visible in your marketing, leading to slow growth.</p>
                </div>
                <button className="text-[10px] uppercase text-amber-500/80 border-b border-amber-500/20 block pt-1">Mark as Healed</button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Oracle;
