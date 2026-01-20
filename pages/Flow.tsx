
import React, { useState } from 'react';
import { User, Archetype, Task } from '../types';
import { ARCHETYPE_DETAILS } from '../constants';
import { CheckCircle2, Circle, Plus, Filter } from 'lucide-react';

interface FlowProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const Flow: React.FC<FlowProps> = ({ user, onUpdateUser }) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [filterPhase, setFilterPhase] = useState<Archetype | 'all'>('all');

  const latestCheckIn = user.dailyCheckIns[0];
  const currentPhase = latestCheckIn?.phase || Archetype.MAIDEN;

  const togglePillar = (index: number) => {
    const today = new Date().toISOString().split('T')[0];
    const completions = { ...user.pillarCompletions };
    if (!completions[today]) {
      completions[today] = new Array(8).fill(false);
    }
    completions[today][index] = !completions[today][index];
    onUpdateUser({ ...user, pillarCompletions: completions });
  };

  const todayCompletions = user.pillarCompletions[new Date().toISOString().split('T')[0]] || new Array(8).fill(false);
  const completedCount = todayCompletions.filter(c => c).length;

  const filteredTasks = user.tasks.filter(t => filterPhase === 'all' || t.phases.includes(filterPhase));

  return (
    <div className="px-5 py-8 space-y-8">
      <header>
        <h1 className="text-3xl serif text-gold">Sacred Systems</h1>
        <p className="text-xs uppercase tracking-widest text-gold/40 mt-1">Alignment Across All Dimensions</p>
      </header>

      {/* 8 Pillars */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Vitality Pillars</h2>
          <span className="text-[10px] font-bold text-amber-500 uppercase">{completedCount}/8 Complete Today</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {user.pillarNames.map((name, i) => (
            <button 
              key={i}
              onClick={() => togglePillar(i)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${todayCompletions[i] ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' : 'glass border-gold/20 text-gold/30 group-hover:border-gold/50'}`}>
                <CheckCircle2 size={24} className={todayCompletions[i] ? 'opacity-100' : 'opacity-20'} />
              </div>
              <span className="text-[8px] text-center uppercase tracking-tighter text-gold/60 group-hover:text-gold transition-colors">{name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Phase Tasks */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Sacred Work</h2>
          <button onClick={() => setFilterPhase(filterPhase === 'all' ? currentPhase : 'all')} className="flex items-center gap-1 text-[10px] uppercase text-amber-500">
            <Filter size={12} /> {filterPhase === 'all' ? 'Filter Phase' : 'Show All'}
          </button>
        </div>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="glass p-6 rounded-2xl text-center text-gold/40 text-xs italic">No tasks aligned with this phase yet. Add one below.</div>
          ) : (
            filteredTasks.map(task => (
              <div key={task.id} className="glass p-4 rounded-xl border-gold/5 flex items-center gap-4 group">
                <button 
                  onClick={() => {
                    const tasks = user.tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed, completedDate: !t.completed ? new Date().toISOString() : null } : t);
                    onUpdateUser({ ...user, tasks });
                  }}
                  className={`flex-shrink-0 transition-colors ${task.completed ? 'text-amber-500' : 'text-gold/20'}`}
                >
                  {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <div className="flex-1">
                  <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-gold/30' : 'text-cream'}`}>{task.name}</h4>
                  <div className="flex gap-2 mt-1">
                    {task.phases.map(p => (
                      <span key={p} className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-gold/5 border border-gold/10 text-gold/60">{p.split(' ').pop()}</span>
                    ))}
                    <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-cream/40">{task.energyRequired} Energy</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={() => setShowTaskModal(true)}
          className="w-full glass py-3 rounded-xl flex items-center justify-center gap-2 text-gold/40 hover:text-gold border-dashed border-gold/20"
        >
          <Plus size={16} /> <span className="text-xs uppercase font-bold">Add Sacred Task</span>
        </button>
      </section>

      {/* Business Metrics */}
      <section className="glass p-6 rounded-3xl border-gold/10 space-y-6">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Cyclical Revenue</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-gold/40">Projects in Motion</span>
            <div className="text-2xl font-bold text-cream">{user.businessMetrics.activeProjects}</div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-gold/40">Cycle Revenue</span>
            <div className="text-2xl font-bold text-amber-500">${user.businessMetrics.currentCycleRevenue}</div>
          </div>
        </div>
        <div className="p-4 bg-gold/5 rounded-xl border border-gold/10">
          <h4 className="text-[10px] font-bold text-gold/60 uppercase mb-1">Seasonal Focus</h4>
          <p className="text-xs italic leading-relaxed text-cream/80">
            {ARCHETYPE_DETAILS[currentPhase].focus}
          </p>
        </div>
        <button className="w-full bg-gold/10 hover:bg-gold/20 text-gold text-xs font-bold py-3 rounded-xl transition-all uppercase tracking-widest">Update Metrics</button>
      </section>

      {/* Task Modal Mock */}
      {showTaskModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowTaskModal(false)}></div>
          <div className="relative glass p-6 rounded-3xl w-full max-w-sm border border-gold/20">
            <h3 className="text-xl serif text-gold mb-6">New Sacred Task</h3>
            <input 
              type="text" 
              placeholder="What needs birthing?" 
              className="w-full glass bg-transparent border-gold/20 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-gold"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const newTask: Task = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: (e.target as HTMLInputElement).value,
                    phases: [currentPhase],
                    energyRequired: 'Medium',
                    category: 'Business',
                    completed: false,
                    completedDate: null,
                    createdDate: new Date().toISOString()
                  };
                  onUpdateUser({ ...user, tasks: [...user.tasks, newTask] });
                  setShowTaskModal(false);
                }
              }}
            />
            <p className="text-[10px] text-gold/40 italic text-center">Press Enter to manifest this task.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
