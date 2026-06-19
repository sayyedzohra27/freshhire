import { Link } from 'react-router-dom';
import { useApplications } from '../context/ApplicationsContext';
import StatusBadge from '../components/StatusBadge';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function MyApplications() {
  const { applications } = useApplications();

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>My Applications</h1>
          <p>Track every role you've applied to and where it stands.</p>
        </div>
      </div>

      <div className="page-body container">
        {applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4M5 6h14v14H5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>No applications yet</h3>
            <p>Once you apply to a job, it'll show up here with its current status.</p>
            <Link to="/jobs" className="btn btn--primary">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app.id} className="application-row">
                <div className="application-row__logo">{app.company.charAt(0)}</div>
                <div className="application-row__main">
                  <Link to={`/jobs/${app.jobId}`} className="application-row__title">
                    {app.jobTitle}
                  </Link>
                  <div className="application-row__company">{app.company}</div>
                </div>
                <div className="application-row__date">Applied {formatDate(app.appliedDate)}</div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
