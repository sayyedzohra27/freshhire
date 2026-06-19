import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import { useSavedJobs } from '../context/SavedJobsContext';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';

export default function SavedJobs() {
  const { jobs, isLoading } = useJobs();
  const { savedIds } = useSavedJobs();

  const savedJobs = jobs.filter((job) => savedIds.includes(job.id));

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Saved Jobs</h1>
          <p>Roles you've bookmarked to come back to, all in one place.</p>
        </div>
      </div>

      <div className="page-body container">
        {isLoading ? (
          <div className="jobs-grid">
            {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>No saved jobs yet</h3>
            <p>Tap the bookmark icon on any job card to save it here for later.</p>
            <Link to="/jobs" className="btn btn--primary">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="jobs-grid">
            {savedJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </>
  );
}
