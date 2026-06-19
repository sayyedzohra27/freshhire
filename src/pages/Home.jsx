import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import JobCard from '../components/JobCard';
import SkeletonCard from '../components/SkeletonCard';

const CATEGORY_ICONS = {
  'Software Development': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Sales & Marketing': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l18-7-7 18-2-8-9-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  'Customer Support': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 1 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M4 17v-5h4v6H6a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  Operations: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-1 2-2s-.5-1.5-.5-2.3c0-1.2 1-2.2 2.2-2.2H17a4 4 0 0 0 4-4c0-5.2-4.5-9.5-9-9.5z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
      <circle cx="11" cy="7" r="1.2" fill="currentColor" />
    </svg>
  ),
  'Human Resources': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 8a3 3 0 1 1 0 6M22 20c0-2.5-1.7-4.4-4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  'Content & Media': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16v12H8l-4 3V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 9h10M7 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  'Finance & Accounts': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20M17 6H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

export default function Home() {
  const { jobs, isLoading } = useJobs();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const categories = useMemo(() => {
    const counts = {};
    jobs.forEach((job) => {
      counts[job.category] = (counts[job.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [jobs]);

  const featuredJobs = useMemo(() => jobs.filter((job) => job.featured).slice(0, 6), [jobs]);
  const companyCount = useMemo(() => new Set(jobs.map((job) => job.company)).size, [jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (location.trim()) params.set('location', location.trim());
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <span className="eyebrow hero__eyebrow">Built for Pune's first-job seekers</span>
          <h1>
            Your first job is closer than you <span>think</span>.
          </h1>
          <p className="hero__sub">
            FreshHire connects diploma and degree graduates with companies across Pune that
            are genuinely hiring for entry-level roles — no experience gatekeeping, no spam.
          </p>

          <form className="hero__search" onSubmit={handleSearch}>
            <div className="hero__search-field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="hero__search-divider" />
            <div className="hero__search-field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22z" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <input
                type="text"
                placeholder="Location in Pune"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn--primary btn--lg">
              Search Jobs
            </button>
          </form>

          <div className="hero__chips">
            {['Internships', 'Software Development', 'Sales & Marketing', 'Design'].map((chip) => (
              <Link key={chip} to={`/jobs?q=${encodeURIComponent(chip)}`} className="hero__chip">
                {chip}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="stats-bar">
          <div className="stats-bar__item">
            <div className="stats-bar__number">{jobs.length || '—'}</div>
            <div className="stats-bar__label">Active openings</div>
          </div>
          <div className="stats-bar__item">
            <div className="stats-bar__number">{companyCount || '—'}</div>
            <div className="stats-bar__label">Companies hiring</div>
          </div>
          <div className="stats-bar__item">
            <div className="stats-bar__number">1,240+</div>
            <div className="stats-bar__label">Freshers placed</div>
          </div>
          <div className="stats-bar__item">
            <div className="stats-bar__number">9 days</div>
            <div className="stats-bar__label">Avg. time to hire</div>
          </div>
        </div>
      </div>

      <section className="section container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Browse by category</span>
            <h2 className="section-heading">Find roles that match where you're starting from</h2>
          </div>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/jobs?category=${encodeURIComponent(cat.name)}`} className="category-card">
              <span className="category-card__icon">{CATEGORY_ICONS[cat.name] || null}</span>
              <span>
                <div className="category-card__title">{cat.name}</div>
                <div className="category-card__count">{cat.count} open roles</div>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Hand-picked for freshers</span>
            <h2 className="section-heading">Featured openings this week</h2>
          </div>
          <Link to="/jobs" className="btn btn--outline">
            View all jobs
          </Link>
        </div>
        <div className="jobs-grid">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : featuredJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </section>

      <section className="section container">
        <div className="cta-banner">
          <div>
            <h2>Hiring freshers in Pune?</h2>
            <p>Post a role in under five minutes and reach candidates straight out of college.</p>
          </div>
          <Link to="/post-job" className="btn btn--marigold btn--lg">
            Post a Job — It's Free
          </Link>
        </div>
      </section>
    </>
  );
}
