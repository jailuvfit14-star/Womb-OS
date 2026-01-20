
import React from 'react';
import { Archetype, SoilState } from './types';

export const COLORS = {
  GOLD: '#D4AF37',
  DUSTY_PINK: '#D4A5A5',
  CREAM: '#F5F5DC',
  DEEP_BROWN: '#3E2723',
  SOFT_SAGE: '#A8B5A2',
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
    label: 'PARCHED (The Drought)', 
    color: '#D2B48C', 
    guidance: 'Numbness, apathy, dissociation. Hydrate with minerals, oil massage, grounding, rest.' 
  },
  [SoilState.FLOODED]: { 
    icon: '🌊', 
    label: 'FLOODED (The Overwhelm)', 
    color: '#7FB3D5', 
    guidance: 'Anxiety, racing heart, everything urgent. Boundaries. Choose only 3 tasks today. Cold water therapy.' 
  },
  [SoilState.FROZEN]: { 
    icon: '❄️', 
    label: 'FROZEN (The Shutdown)', 
    color: '#AED6F1', 
    guidance: 'Paralysis, can\'t move. Somatic shaking, humming, one micro-movement.' 
  },
  [SoilState.DEPLETED]: { 
    icon: '🥀', 
    label: 'DEPLETED (The Exhaustion)', 
    color: '#95A5A6', 
    guidance: 'Bone-deep weariness, compassion fatigue. Radical rest (72 hrs minimum). Ask for help.' 
  },
  [SoilState.NUTRIENT_DENSE]: { 
    icon: '🌿', 
    label: 'NUTRIENT-DENSE (The Soft State)', 
    color: '#F1C40F', 
    guidance: 'Clarity, presence, flow, \'I have enough time\'. Maintain through your 8 Pillars. You\'re in flow.' 
  },
};

export const ARCHETYPE_DETAILS = {
  [Archetype.MAIDEN]: {
    label: 'MAIDEN / Follicular',
    season: 'Spring',
    energy: 'Rising, expansive, learning',
    superpower: 'Mental clarity, can hold complex concepts',
    focus: 'Build, learn, create content, strategize',
    gradient: 'from-green-900/40 to-pink-900/40',
    icon: '🌱'
  },
  [Archetype.MOTHER]: {
    label: 'MOTHER / Ovulation',
    season: 'Summer',
    energy: 'Peak, magnetic, radiant',
    superpower: 'You\'re irresistible without trying',
    focus: 'Launch, go live, record videos, network, sales',
    gradient: 'from-amber-700/40 to-orange-900/40',
    icon: '☀️'
  },
  [Archetype.WILD_WOMAN]: {
    label: 'WILD WOMAN / Luteal',
    season: 'Autumn',
    energy: 'Descending, discerning, truth-telling',
    superpower: 'BS detector is HIGH, you see what\'s not working',
    focus: 'Edit, refine, organize, admin, set boundaries',
    gradient: 'from-orange-900/40 to-stone-900/40',
    icon: '🍂'
  },
  [Archetype.WISE_WOMAN]: {
    label: 'WISE WOMAN / Menstrual',
    season: 'Winter',
    energy: 'Lowest, intuitive, psychic, rest',
    superpower: 'The veil is thin, your intuition is a GPS',
    focus: 'Vision, journal, receive, REST',
    gradient: 'from-purple-900/40 to-indigo-950/40',
    icon: '🌑'
  }
};

export const DEFAULT_PILLARS = [
  'Nervous System Regulation',
  'Movement',
  'Journaling',
  'Boundaries',
  'Rest',
  'Nourishment',
  'Spiritual Connection',
  'Mindset & Abundance'
];
