
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

export interface RootWound {
  id: string;
  name: string;
  description: string;
  affirmation: string;
  startDate: string;
}

export interface DailyCheckIn {
  date: string;
  soilState: SoilState;
  energyLevel: number;
  notes?: string;
  cycleDay: number;
  phase: Archetype;
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

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  cycleDay: number;
  phase: Archetype;
  soilState: SoilState;
}

export interface SavedGuidance {
  id: string;
  date: string;
  prompt: string;
  type: 'daily' | 'requested' | 'affirmation';
  cycleDay: number;
  phase: Archetype;
}

export interface ContentDraft {
  id: string;
  platform: string;
  content: string;
  phase: Archetype;
  status: 'draft' | 'published';
  createdDate: string;
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
  activeRootWounds: string[]; // IDs of root wounds
  pillarNames: string[];
  dailyCheckIns: DailyCheckIn[];
  pillarCompletions: Record<string, boolean[]>; // date string key
  tasks: Task[];
  journalEntries: JournalEntry[];
  savedGuidance: SavedGuidance[];
  contentDrafts: ContentDraft[];
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
}
