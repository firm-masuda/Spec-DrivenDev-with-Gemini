export const DEFAULT_USER_PROGRESS = {
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
