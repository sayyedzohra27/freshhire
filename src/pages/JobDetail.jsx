import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import { useSavedJobs } from '../context/SavedJobsContext';
import { useApplications } from '../context/ApplicationsContext';
import ApplicationForm from '../components/ApplicationForm';
import NotFound from './NotFound';

function formatSalary(min, max) {
  const fmt = (n) => `₹${Math.round(n / 1000)}k`;
  return `${fmt(min)} - ${fmt(max)} / month`;
}

function formatPosted(days) {
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export default function JobDetail() {
  const { id } = useParams();
  const { getJobById, isLoading } = useJobs();
  const { isSaved, toggleSave } = useSavedJobs();
  const { hasApplied, addApplication } = useApplications();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSubmitted(false);
  }, [id]);

  if (isLoading) {
    return <div className="container page-body">Loading job details…</div>;
  }

  const job = getJobById(id);
  if (!job) return <NotFound />;

  const saved = isSaved(job.id);
  const applied = hasApplied(job.id) || submitted;

  const handleSubmit = (values) => {
    addApplication(job);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-body container">
      <Link to="/jobs" className="btn btn--ghost" style={{ marginBottom: '1.5rem', paddingLeft: 0 }}>
        ← Back to all jobs
      </Link>

      <div className="job-detail-header">
        <div className="job-detail-header__logo">{job.company.charAt(0)}</div>
        <div>
          <h1 className="job-detail-header__title">{job.title}</h1>
          <div className="job-detail-header__company">{job.company}</div>
          <div className="job-detail-header__meta">
            <span>📍 {job.location}</span>
            <span>🕓 {job.type}</span>
            <span>🎓 {job.experience}</span>
            <span>👥 {job.applicants} applicants</span>
          </div>
          <div className="job-detail-header__tags">
            {job.skills.map((skill) => <span key={skill} className="tag tag--sprout">{skill}</span>)}
          </div>
        </div>

        <div className="job-detail-header__actions">
          <a href="#apply" className="btn btn--primary">
            {applied ? 'Application Submitted' : 'Apply Now'}
          </a>
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => toggleSave(job.id)}
          >
            {saved ? '★ Saved' : '☆ Save Job'}
          </button>
        </div>
      </div>

      <div className="job-detail-layout">
        <div>
          <div className="job-detail-card">
            <h2>About this role</h2>
            <p>{job.description}</p>
          </div>

          <div className="job-detail-card">
            <h2>What you'll do</h2>
            <ul>
              {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="job-detail-card">
            <h2>What we're looking for</h2>
            <ul>
              {job.requirements.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="job-detail-card" id="apply">
            <h2>{applied ? "You're In" : 'Apply for this role'}</h2>
            {applied ? (
              <div className="application-form__success">
                <div className="application-form__success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Application submitted</h3>
                <p>
                  {job.company} will review your profile and reach out if there's a fit.
                  Track this application any time from My Applications.
                </p>
                <Link to="/my-applications" className="btn btn--primary">
                  View My Applications
                </Link>
              </div>
            ) : (
              <ApplicationForm onSubmit={handleSubmit} />
            )}
          </div>
        </div>

        <div className="job-detail-sidebar">
          <div className="job-detail-card">
            <div className="job-detail-sidebar__row">
              <span className="job-detail-sidebar__label">Salary</span>
              <span className="job-detail-sidebar__value">{formatSalary(job.salaryMin, job.salaryMax)}</span>
            </div>
            <div className="job-detail-sidebar__row">
              <span className="job-detail-sidebar__label">Openings</span>
              <span className="job-detail-sidebar__value">{job.openings}</span>
            </div>
            <div className="job-detail-sidebar__row">
              <span className="job-detail-sidebar__label">Category</span>
              <span className="job-detail-sidebar__value">{job.category}</span>
            </div>
            <div className="job-detail-sidebar__row">
              <span className="job-detail-sidebar__label">Posted</span>
              <span className="job-detail-sidebar__value">{formatPosted(job.postedDaysAgo)}</span>
            </div>
            {!applied && (
              <a href="#apply" className="btn btn--primary btn--block">Apply Now</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
