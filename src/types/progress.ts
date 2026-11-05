export type StepStatus = 'not-started' | 'in-progress' | 'completed';

export interface StepProgressState {
  status: StepStatus;
  completedCheckpoints: string[];
  notes: string;
  updatedAt?: string;
  timeSpentMinutes?: number;
}

export interface UserProgressData {
  userName: string;
  organization: string;
  startedAt: string;
  lastActiveAt: string;
  steps: Record<string, StepProgressState>;
  evaluations: Record<string, boolean>; // id -> checked
}

export const DEFAULT_USER_PROGRESS: UserProgressData = {
  userName: '受講生A',
  organization: '社内AI駆動開発研修',
  startedAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
  steps: {
    'step-01': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-02': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-03': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-04': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-05': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-06': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-ex': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-07': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-08': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-09': { status: 'not-started', completedCheckpoints: [], notes: '' },
    'step-10': { status: 'not-started', completedCheckpoints: [], notes: '' }
  },
  evaluations: {}
};
