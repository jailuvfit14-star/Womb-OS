
import { Archetype, SoilState, SomaticPractice, HerbalProtocol } from './types';

export const COLORS = {
  GOLD: '#D4AF37',
  DUSTY_ROSE: '#D4A5A5',
  CREAM: '#F5F5DC',
  SAGE: '#A8B5A2',
  DEEP_SAGE: '#4A5D4E',
  SLATE: '#2C3E50',
};

export const ROOT_WOUNDS = [
  { id: 'abandonment', name: 'ABANDONMENT', description: 'If I stop hustling, they\'ll leave me', affirmation: 'My rest does not repel my people' },
  { id: 'unworthiness', name: 'UNWORTHINESS', description: 'I need to earn my value through suffering', affirmation: 'I am worthy of wealth without suffering' },
  { id: 'betrayal', name: 'BETRAYAL', description: 'I can\'t trust my body/people/life', affirmation: 'I am safe in my own being' },
  { id: 'rejection', name: 'REJECTION', description: 'A "no" means I\'m fundamentally unlovable', affirmation: 'I am love regardless of outcome' },
  { id: 'shame', name: 'SHAME', description: 'There\'s something wrong with me I must hide', affirmation: 'My truth is my medicine' },
  { id: 'powerlessness', name: 'POWERLESSNESS', description: 'External forces control my fate', affirmation: 'I am the architect of my reality' },
  { id: 'invisibility', name: 'INVISIBILITY', description: 'My needs don\'t matter, I exist to serve', affirmation: 'I deserve to be seen and supported' },
  { id: 'criticism', name: 'CRITICISM', description: 'I\'m only safe if I\'m perfect', affirmation: 'I am enough in my imperfection' },
  { id: 'scarcity', name: 'SCARCITY', description: 'There\'s not enough for everyone', affirmation: 'Abundance is my natural state' },
  { id: 'enmeshment', name: 'ENMESHMENT', description: 'I don\'t know where I end and others begin', affirmation: 'My boundaries are my devotion' },
  { id: 'performance', name: 'PERFORMANCE', description: 'My worth = my output', affirmation: 'I am valuable just by being' },
  { id: 'perfectionism', name: 'PERFECTIONISM', description: 'If it\'s not perfect, it\'s garbage', affirmation: 'Done is holy, perfect is a cage' },
  { id: 'control', name: 'CONTROL', description: 'If I control everything, I\'ll be safe', affirmation: 'I trust the flow of the universe' },
  { id: 'comparison', name: 'COMPARISON', description: 'Her success = my failure', affirmation: 'Her success is a mirror of my potential' },
  { id: 'repression', name: 'REPRESSION', description: 'My truth is too much', affirmation: 'The world needs my authentic self' },
];

export const SOIL_STATE_DETAILS = {
  [SoilState.PARCHED]: { 
    icon: '🏜️', 
    label: 'PARCHED', 
    color: '#D2B48C', 
    guidance: 'Numbness, apathy. Ground with minerals and oil.' 
  },
  [SoilState.FLOODED]: { 
    icon: '🌊', 
    label: 'FLOODED', 
    color: '#7FB3D5', 
    guidance: 'Anxiety, overwhelm. Limit tasks. Cold water.' 
  },
  [SoilState.FROZEN]: { 
    icon: '❄️', 
    label: 'FROZEN', 
    color: '#AED6F1', 
    guidance: 'Paralysis. Somatic shaking, humming.' 
  },
  [SoilState.DEPLETED]: { 
    icon: '🥀', 
    label: 'DEPLETED', 
    color: '#95A5A6', 
    guidance: 'Exhaustion. Radical rest, 72h minimum.' 
  },
  [SoilState.NUTRIENT_DENSE]: { 
    icon: '🌿', 
    label: 'NUTRIENT-DENSE', 
    color: '#F1C40F', 
    guidance: 'Presence, flow. You have enough time.' 
  },
};

export const ARCHETYPE_DETAILS = {
  [Archetype.MAIDEN]: {
    label: 'MAIDEN / Follicular',
    season: 'Spring',
    energy: 'Rising',
    superpower: 'Mental clarity',
    focus: 'Build, learn, strategize',
    gradient: 'from-[#A8B5A2]/40 to-[#D4A5A5]/20',
    icon: '🌱'
  },
  [Archetype.MOTHER]: {
    label: 'MOTHER / Ovulation',
    season: 'Summer',
    energy: 'Peak',
    superpower: 'Magnetic radiance',
    focus: 'Launch, sales, networking',
    gradient: 'from-[#D4AF37]/30 to-[#D4A5A5]/30',
    icon: '☀️'
  },
  [Archetype.WILD_WOMAN]: {
    label: 'WILD WOMAN / Luteal',
    season: 'Autumn',
    energy: 'Descending',
    superpower: 'BS Detection',
    focus: 'Edit, refine, boundaries',
    gradient: 'from-[#D4A5A5]/40 to-[#4A5D4E]/30',
    icon: '🍂'
  },
  [Archetype.WISE_WOMAN]: {
    label: 'WISE WOMAN / Menstrual',
    season: 'Winter',
    energy: 'Intuitive',
    superpower: 'Deep Vision',
    focus: 'Journal, receive, rest',
    gradient: 'from-[#4A5D4E]/40 to-[#2C3E50]/40',
    icon: '🌑'
  }
};

export const DEFAULT_PILLARS = [
  'Nervous System', 'Movement', 'Journaling', 'Boundaries', 'Rest', 'Nourishment', 'Ritual', 'Mindset'
];

export const DEFAULT_SOMATIC: SomaticPractice[] = [
  { id: '1', name: 'Somatic Shaking', description: 'Release stagnant energy by shaking the limbs.', phases: [Archetype.WILD_WOMAN, Archetype.WISE_WOMAN], duration: 5 },
  { id: '2', name: 'Visual Meditation', description: 'Visualize your next launch.', phases: [Archetype.MAIDEN], duration: 15 },
  { id: '3', name: 'Mirror Work', description: 'Gaze at your radiance.', phases: [Archetype.MOTHER], duration: 10 }
];

export const DEFAULT_HERBAL: HerbalProtocol[] = [
  { id: '1', name: 'Adrenal Support', herb: 'Ashwagandha', purpose: 'Calm the FLOODED state', phases: [Archetype.WILD_WOMAN], soilStates: [SoilState.FLOODED] },
  { id: '2', name: 'Mineral Richness', herb: 'Nettle & Oatstraw', purpose: 'Remineralize PARCHED soil', phases: [Archetype.MAIDEN], soilStates: [SoilState.PARCHED] }
];
