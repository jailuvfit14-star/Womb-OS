
import React, { useState } from 'react';
import { User, Archetype, SoilState } from '../types';
// Added Zap to imports
import { Plus, Search, Filter, Box, Calendar, Activity, Droplets, CreditCard, ChevronRight, Zap } from 'lucide-react';

interface SystemsProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

type DatabaseTab = 'somatic' | 'herbal' | 'content' | 'products' | 'services';

const Systems: React.FC<SystemsProps> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<DatabaseTab>('somatic');
  const [searchQuery, setSearchQuery] = useState('');

  const renderSomatic = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {user.somaticPractices.map(p => (
        <div key={p.id} className="glass p-8 rounded-[2.5rem] space-y-4 hover:border-sage/50 transition-all group">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center text-sage"><Zap size={24} /></div>
            <span className="text-[10px] font-bold text-sage bg-sage/10 px-3 py-1 rounded-full uppercase">{p.duration} MIN</span>
          </div>
          <h3 className="text-xl font-bold text-slate italic">{p.name}</h3>
          <p className="text-sm text-slate/60 leading-relaxed">{p.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {p.phases.map(ph => (
              <span key={ph} className="text-[8px] font-bold text-gold uppercase tracking-tighter border border-gold/20 px-2 py-0.5 rounded-full">{ph}</span>
            ))}
          </div>
        </div>
      ))}
      <button className="glass p-8 rounded-[2.5rem] border-2 border-dashed border-sage/20 flex flex-col items-center justify-center gap-4 text-sage/40 hover:text-sage transition-all">
        <Plus size={40} />
        <span className="text-sm font-bold uppercase tracking-widest">Add Practice</span>
      </button>
    </div>
  );

  const renderHerbal = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {user.herbalProtocols.map(h => (
        <div key={h.id} className="glass p-8 rounded-[2.5rem] space-y-4 hover:border-gold/50 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold"><Droplets size={24} /></div>
          <h3 className="text-xl font-bold text-slate italic uppercase tracking-wider">{h.herb}</h3>
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-slate/40">Protocol Name</p>
            <p className="text-sm font-bold text-slate/70">{h.name}</p>
          </div>
          <p className="text-sm text-slate/60 italic">"{h.purpose}"</p>
          <div className="flex flex-wrap gap-2 pt-2">
             {h.soilStates.map(s => (
               <span key={s} className="text-[8px] font-bold text-slate bg-slate/5 px-2 py-0.5 rounded-full uppercase">{s}</span>
             ))}
          </div>
        </div>
      ))}
      <button className="glass p-8 rounded-[2.5rem] border-2 border-dashed border-gold/20 flex flex-col items-center justify-center gap-4 text-gold/40 hover:text-gold transition-all">
        <Plus size={40} />
        <span className="text-sm font-bold uppercase tracking-widest">New Protocol</span>
      </button>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="glass rounded-[2rem] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sage/5 border-b border-sage/10 text-[10px] uppercase tracking-[0.2em] text-sage">
              <th className="px-6 py-4 font-bold">Post Title</th>
              <th className="px-6 py-4 font-bold">Platform</th>
              <th className="px-6 py-4 font-bold">Phase</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage/5 text-sm">
            {user.contentCalendar.map(item => (
              <tr key={item.id} className="hover:bg-sage/5 transition-all cursor-pointer">
                <td className="px-6 py-4 font-bold text-slate/70">{item.title}</td>
                <td className="px-6 py-4 text-slate/50">{item.platform}</td>
                <td className="px-6 py-4">
                  <span className="text-[8px] font-bold border border-gold/20 text-gold px-2 py-0.5 rounded-full uppercase">{item.phase.split(' ').pop()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${item.status === 'Published' ? 'bg-sage text-white' : 'bg-slate/5 text-slate/60'}`}>{item.status}</span>
                </td>
                <td className="px-6 py-4 text-right text-slate/40">{new Date(item.scheduledDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="w-full glass py-6 rounded-[2rem] border-2 border-dashed border-sage/20 text-sm font-bold uppercase tracking-widest text-sage/40 hover:text-sage transition-all">+ Schedule Content Alchemistry</button>
    </div>
  );

  const renderCommerce = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in">
      {/* Products */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl serif text-sage italic">Offerings</h2>
          <button className="text-[10px] font-bold text-gold uppercase tracking-widest">+ Add Product</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {user.products.map(p => (
            <div key={p.id} className="glass p-6 rounded-[2rem] flex justify-between items-center border-l-4 border-l-sage">
              <div>
                <h4 className="font-bold text-slate/70">{p.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate/40">{p.type} • {p.status}</p>
              </div>
              <span className="text-xl font-bold text-sage">${p.price}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Services */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl serif text-sage italic">Services</h2>
          <button className="text-[10px] font-bold text-gold uppercase tracking-widest">+ Add Service</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {user.services.map(s => (
            <div key={s.id} className="glass p-6 rounded-[2rem] space-y-3 border-l-4 border-l-rose-300">
               <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate/70">{s.name}</h4>
                  <span className="text-lg font-bold text-rose-400">${s.price}</span>
               </div>
               <p className="text-xs text-slate/50 italic leading-relaxed">{s.description}</p>
               <div className="flex justify-between items-center pt-2">
                 <span className="text-[8px] uppercase tracking-widest text-slate/40">Delivery: {s.deliveryTime}</span>
                 <ChevronRight size={16} className="text-slate/20" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-6 py-10 space-y-10 animate-fade-in max-w-7xl mx-auto pb-32">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-sage italic">The Sacred Vault</h1>
        <p className="text-xs uppercase tracking-[0.3em] text-slate/40">18 Integrated Databases of Cyclical Business Intelligence</p>
      </header>

      {/* Database Tabs */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-4 border-y border-sage/10">
        {[
          { id: 'somatic', label: 'Body Wisdom', icon: <Zap size={16} /> },
          { id: 'herbal', label: 'Protocol Lab', icon: <Droplets size={16} /> },
          { id: 'content', label: 'Alchemy Calendar', icon: <Calendar size={16} /> },
          { id: 'products', label: 'Offerings', icon: <Box size={16} /> },
          { id: 'services', label: 'Services', icon: <CreditCard size={16} /> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as DatabaseTab)}
            className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-sage text-white shadow-lg shadow-sage/20' : 'glass text-sage/60 hover:text-sage'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Global Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sage/40" size={18} />
            <input 
              type="text" 
              placeholder="Search the archives..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full glass py-4 pl-12 pr-6 rounded-full focus:outline-none focus:border-sage/40 transition-all text-sm"
            />
         </div>
         <button className="glass px-8 py-4 rounded-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-sage">
           <Filter size={18} /> Filter by Phase
         </button>
      </div>

      {/* Content Area */}
      <main>
        {activeTab === 'somatic' && renderSomatic()}
        {activeTab === 'herbal' && renderHerbal()}
        {activeTab === 'content' && renderContent()}
        {(activeTab === 'products' || activeTab === 'services') && renderCommerce()}
      </main>
    </div>
  );
};

export default Systems;
