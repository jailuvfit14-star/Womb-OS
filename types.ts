
export enum SoilState {
  PARCHED = 'PARCHED',
  FLOODED = 'FLOODED',
  FROZEN = 'FROZEN',
  DEPLETED = 'DEPLETED',
  NUTRIENT_DENSE = 'NUTRIENT_DENSE'
}

export enum Archetype {
  MAIDEN = 'THE MAIDEN',
  MOTHER = 'THE MOTHER',
  WILD_WOMAN = 'THE WILD WOMAN',
  WISE_WOMAN = 'THE WISE_WOMAN'
}

export interface SomaticPractice {
  id: string;
  name: string;
  description: string;
  phases: Archetype[];
  duration: number; // minutes
}

export interface HerbalProtocol {
  id: string;
  name: string;
  herb: string;
  purpose: string;
  phases: Archetype[];
  soilStates: SoilState[];
}

export interface ContentItem {
  id: string;
  title: string;
  platform: 'Instagram' | 'TikTok' | 'Email' | 'Pinterest' | 'LinkedIn';
  scheduledDate: string;
  status: 'Idea' | 'Drafting' | 'Scheduled' | 'Published';
  phase: Archetype;
}

export interface Product {
  id: string;
  name: string;
  type: 'Digital' | 'Physical' | 'Course';
  price: number;
  status: 'In Development' | 'Active' | 'Retired';
  launchDate?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  deliveryTime: string;
}

export interface Task {
  id: string;
  name: string;
  phases: Archetype[];
  energyRequired: 'Low' | 'Medium' | 'High';
  category: 'Business' | 'Personal' | 'Creative' | 'Rest';
  completed: boolean;
  completedDate: string | null;
  createdDate: string;
}

export interface DailyCheckIn {
  date: string;
  soilState: SoilState;
  energyLevel: number;
  notes?: string;
  cycleDay: number;
  phase: Archetype;
}

// Added missing JournalEntry interface
export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  cycleDay: number;
  phase: Archetype;
  soilState: SoilState;
}

export interface User {
  id: string;
  name: string;
  email: string;
  onboarded: boolean;
  createdDate: string;
  cycleInfo: {
    lastPeriodStart: string;
    cycleLength: number;
  };
  activeRootWounds: string[];
  pillarNames: string[];
  dailyCheckIns: DailyCheckIn[];
  pillarCompletions: Record<string, boolean[]>;
  tasks: Task[];
  somaticPractices: SomaticPractice[];
  herbalProtocols: HerbalProtocol[];
  contentCalendar: ContentItem[];
  products: Product[];
  services: Service[];
  businessMetrics: {
    currentCycleRevenue: number;
    activeProjects: number;
    notes: string;
    lastUpdated: string;
  };
  notificationPreferences?: {
    dailyGuidance: boolean;
    phaseShifts: boolean;
    pillarReminders: boolean;
  };
  // Updated journalEntries to use JournalEntry interface
  journalEntries: JournalEntry[];
  savedGuidance: any[];
}
