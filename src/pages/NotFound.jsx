import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <h1>This page took a wrong turn.</h1>
      <p>
        The page you're looking for doesn't exist or may have moved.
        Let's get you back to finding your next job.
      </p>
      <div className="flex-gap-3">
        <Link to="/" className="btn btn--outline">Go Home</Link>
        <Link to="/jobs" className="btn btn--primary">Browse Jobs</Link>
      </div>
    </div>
  );
}
