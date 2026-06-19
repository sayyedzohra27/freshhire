import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'freshhire_saved_jobs_v1';
const SavedJobsContext = createContext(null);

function loadInitial() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.warn('Could not read saved jobs.', err);
    return [];
  }
}

export function SavedJobsProvider({ children }) {
  const [savedIds, setSavedIds] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch (err) {
      console.warn('Could not persist saved jobs.', err);
    }
  }, [savedIds]);

  const isSaved = useCallback((jobId) => savedIds.includes(jobId), [savedIds]);

  const toggleSave = useCallback((jobId) => {
    setSavedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  }, []);

  const value = { savedIds, isSaved, toggleSave };

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>;
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error('useSavedJobs must be used within a SavedJobsProvider');
  return ctx;
}
