import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'freshhire_applications_v1';
const ApplicationsContext = createContext(null);

// A couple of seeded demo applications so the tracker feels alive the very
// first time someone opens the prototype, before they've applied to anything.
const DEMO_SEED = [
  {
    id: 'a-demo-1',
    jobId: 'j02',
    jobTitle: 'Business Development Associate',
    company: 'Orbit Fintech Labs',
    appliedDate: '2026-06-10',
    status: 'Interview',
  },
  {
    id: 'a-demo-2',
    jobId: 'j05',
    jobTitle: 'Junior Data Analyst',
    company: 'Pune Analytics Hub',
    appliedDate: '2026-06-08',
    status: 'Under Review',
  },
  {
    id: 'a-demo-3',
    jobId: 'j13',
    jobTitle: 'UI/UX Design Intern',
    company: 'Studio Marigold',
    appliedDate: '2026-06-02',
    status: 'Offer',
  },
];

function loadInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.warn('Could not read applications.', err);
  }
  return DEMO_SEED;
}

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (err) {
      console.warn('Could not persist applications.', err);
    }
  }, [applications]);

  const hasApplied = useCallback(
    (jobId) => applications.some((app) => app.jobId === jobId),
    [applications]
  );

  const addApplication = useCallback((job) => {
    setApplications((prev) => {
      if (prev.some((app) => app.jobId === job.id)) return prev;
      const entry = {
        id: `a-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedDate: new Date().toISOString().slice(0, 10),
        status: 'Applied',
      };
      return [entry, ...prev];
    });
  }, []);

  const value = { applications, addApplication, hasApplied };

  return (
    <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) throw new Error('useApplications must be used within an ApplicationsProvider');
  return ctx;
}
