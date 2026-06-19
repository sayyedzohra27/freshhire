import { Link } from 'react-router-dom';
import { useSavedJobs } from '../context/SavedJobsContext';

function formatSalary(min, max) {
  const fmt = (n) => `₹${Math.round(n / 1000)}k`;
  return `${fmt(min)} - ${fmt(max)}/mo`;
}

function formatPosted(days) {
  if (days === 0) return 'Posted today';
  if (days === 1) return 'Posted yesterday';
  return `Posted ${days} days ago`;
}

export default function JobCard({ job }) {
  const { isSaved, toggleSave } = useSavedJobs();
  const saved = isSaved(job.id);
  const visibleSkills = job.skills.slice(0, 3);
  const extraSkills = job.skills.length - visibleSkills.length;

  return (
    <article className="job-card">
      <div className="job-card__top">
        <div className="job-card__logo">{job.company.charAt(0)}</div>
        <button
          type="button"
          className={`icon-btn ${saved ? 'icon-btn--active' : ''}`}
          aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
          aria-pressed={saved}
          onClick={() => toggleSave(job.id)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'}>
            <path
              d="M6 4h12a1 1 0 0 1 1 1v16l-7-4-7 4V5a1 1 0 0 1 1-1z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <h3 className="job-card__title">
        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
      </h3>
      <div className="job-card__company">{job.company}</div>

      <div className="job-card__meta">
        <span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {job.location}
        </span>
        <span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {job.type}
        </span>
        <span>{job.experience}</span>
      </div>

      <div className="job-card__tags">
        {visibleSkills.map((skill) => (
          <span key={skill} className="tag">{skill}</span>
        ))}
        {extraSkills > 0 && <span className="tag">+{extraSkills} more</span>}
      </div>

      <div className="job-card__footer">
        <div>
          <div className="job-card__salary">{formatSalary(job.salaryMin, job.salaryMax)}</div>
          <div className="job-card__posted">{formatPosted(job.postedDaysAgo)}</div>
        </div>
        <Link to={`/jobs/${job.id}`} className="btn btn--primary">
          View
        </Link>
      </div>
    </article>
  );
}
