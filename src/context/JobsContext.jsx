import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import seedJobs from '../data/jobs.json';

const STORAGE_KEY = 'freshhire_jobs_v1';
const JobsContext = createContext(null);

function loadInitialJobs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (err) {
    console.warn('Could not read stored jobs, falling back to seed data.', err);
  }
  return seedJobs;
}

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network fetch so SkeletonCard has somewhere to live.
    const timer = setTimeout(() => {
      setJobs(loadInitialJobs());
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const persist = useCallback((nextJobs) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextJobs));
    } catch (err) {
      console.warn('Could not persist jobs.', err);
    }
  }, []);

  const addJob = useCallback((jobInput) => {
    const newJob = {
      id: `j${Date.now()}`,
      postedDaysAgo: 0,
      applicants: 0,
      featured: false,
      ...jobInput,
    };
    setJobs((prev) => {
      const next = [newJob, ...prev];
      persist(next);
      return next;
    });
    return newJob;
  }, [persist]);

  const getJobById = useCallback(
    (id) => jobs.find((job) => job.id === id),
    [jobs]
  );

  const value = { jobs, isLoading, addJob, getJobById };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used within a JobsProvider');
  return ctx;
}
