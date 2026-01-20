
import React, { useState } from 'react';
import { User, JournalEntry } from '../types';
// Added Sparkles to the imports
import { Plus, PenTool, BookOpen, Instagram, Layout, Mail, MoreHorizontal, Sparkles } from 'lucide-react';

interface LibraryProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Library: React.FC<LibraryProps> = ({ user, onUpdateUser }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [journalText, setJournalText] = useState('');

  const handleSaveJournal = () => {
    if (!journalText.trim()) return;
    const latestCheckIn = user.dailyCheckIns[0];
    const newEntry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      content: journalText,
      cycleDay: latestCheckIn?.cycleDay || 1,
      phase: latestCheckIn?.phase || 'THE MAIDEN' as any,
      soilState: latestCheckIn?.soilState || 'NUTRIENT_DENSE' as any
    };
    onUpdateUser({ ...user, journalEntries: [newEntry, ...user.journalEntries] });
    setJournalText('');
    setShowEditor(false);
  };

  return (
    <div className="px-5 py-8 space-y-8">
      <header>
        <h1 className="text-3xl serif text-gold">Sacred Library</h1>
        <p className="text-xs uppercase tracking-widest text-gold/40 mt-1">Your Womb-Led Writing & Insights</p>
      </header>

      {/* Journal Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60 flex items-center gap-2">
            <BookOpen size={14} /> Inner Chronicles
          </h2>
          <button onClick={() => setShowEditor(true)} className="text-[10px] font-bold text-amber-500 uppercase flex items-center gap-1">
            <Plus size={12} /> New Entry
          </button>
        </div>

        <div className="space-y-4">
          {user.journalEntries.length === 0 ? (
            <div className="glass p-8 rounded-3xl text-center space-y-4">
              <PenTool size={32} className="mx-auto text-gold/20" />
              <p className="text-xs text-gold/40 italic">The parchment is clear, Beloved. What stories are rising from your depths?</p>
            </div>
          ) : (
            user.journalEntries.map(entry => (
              <div key={entry.id} className="glass p-5 rounded-2xl border-gold/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] uppercase text-gold/40">{new Date(entry.date).toLocaleDateString()} • Day {entry.cycleDay}</span>
                  <span className="text-[8px] uppercase bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-500 border border-amber-500/20">{entry.phase.split(' ').pop()}</span>
                </div>
                <p className="text-xs leading-relaxed text-cream/70 line-clamp-3">{entry.content}</p>
                <button className="text-[10px] uppercase text-gold/40 border-b border-gold/10">Read More</button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Content Alchemist Section */}
      <section className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60 flex items-center gap-2">
          <Sparkles size={14} /> Content Alchemy
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Instagram', icon: <Instagram size={20} />, count: 3 },
            { label: 'Pinterest', icon: <Layout size={20} />, count: 12 },
            { label: 'Email', icon: <Mail size={20} />, count: 1 },
            { label: 'Other', icon: <MoreHorizontal size={20} />, count: 0 },
          ].map(platform => (
            <div key={platform.label} className="glass p-4 rounded-2xl border-gold/5 space-y-3 group hover:border-gold/30 transition-all">
              <div className="text-gold group-hover:scale-110 transition-transform">{platform.icon}</div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-cream">{platform.label}</h3>
                <p className="text-[10px] text-gold/40 uppercase tracking-widest">{platform.count} Drafts Ready</p>
              </div>
              <button className="text-[10px] font-bold text-amber-500/80 uppercase">Create New</button>
            </div>
          ))}
        </div>
      </section>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-[100] flex flex-col glass bg-black/90 animate-fade-in">
          <header className="px-6 py-6 flex justify-between items-center border-b border-gold/10">
            <h3 className="text-xl serif text-gold">Sacred Scribbles</h3>
            <button onClick={() => setShowEditor(false)} className="text-xs uppercase text-gold/40">Cancel</button>
          </header>
          <div className="flex-1 p-6">
            <textarea 
              autoFocus
              value={journalText}
              onChange={e => setJournalText(e.target.value)}
              placeholder="What's flowing through you, Beloved?"
              className="w-full h-full bg-transparent border-none text-cream/90 text-lg leading-relaxed focus:outline-none italic no-scrollbar"
            />
          </div>
          <footer className="p-6 border-t border-gold/10 flex justify-between items-center">
             <div className="text-[10px] uppercase text-gold/40">Auto-tagging: Day 12 • Mother • Flooded</div>
             <button 
              onClick={handleSaveJournal}
              className="bg-amber-500 text-black px-8 py-2 rounded-full font-bold shadow-xl"
             >
              Save Entry
             </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Library;
