import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';
import SkeletonCard from '../components/SkeletonCard';

const EMPTY_FILTERS = { category: [], type: [], experience: [], minSalary: 0 };

function toggleInArray(arr, value) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export default function Jobs() {
  const { jobs, isLoading } = useJobs();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply category coming in from a Home page link, once jobs are loaded.
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: [categoryParam] }));
    }
  }, [searchParams]);

  const categories = useMemo(() => {
    const counts = {};
    jobs.forEach((job) => { counts[job.category] = (counts[job.category] || 0) + 1; });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [jobs]);

  const jobTypes = useMemo(() => {
    const counts = {};
    jobs.forEach((job) => { counts[job.type] = (counts[job.type] || 0) + 1; });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [jobs]);

  const experienceLevels = useMemo(() => {
    const counts = {};
    jobs.forEach((job) => { counts[job.experience] = (counts[job.experience] || 0) + 1; });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let result = jobs.filter((job) => {
      const matchesTerm =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.category.toLowerCase().includes(term) ||
        job.skills.some((s) => s.toLowerCase().includes(term));

      const matchesCategory = !filters.category.length || filters.category.includes(job.category);
      const matchesType = !filters.type.length || filters.type.includes(job.type);
      const matchesExperience = !filters.experience.length || filters.experience.includes(job.experience);
      const matchesSalary = job.salaryMax >= filters.minSalary;

      return matchesTerm && matchesCategory && matchesType && matchesExperience && matchesSalary;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'salary') return b.salaryMax - a.salaryMax;
      return a.postedDaysAgo - b.postedDaysAgo;
    });

    return result;
  }, [jobs, searchTerm, filters, sortBy]);

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);
    setSearchTerm('');
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Browse Jobs</h1>
          <p>Entry-level roles and internships from companies actively hiring in Pune.</p>
        </div>
      </div>

      <div className="page-body container">
        <div className="jobs-layout">
          <FilterSidebar
            className={mobileFiltersOpen ? 'filter-sidebar--open' : ''}
            categories={categories}
            jobTypes={jobTypes}
            experienceLevels={experienceLevels}
            filters={filters}
            onToggleCategory={(name) => setFilters((p) => ({ ...p, category: toggleInArray(p.category, name) }))}
            onToggleType={(name) => setFilters((p) => ({ ...p, type: toggleInArray(p.type, name) }))}
            onToggleExperience={(name) => setFilters((p) => ({ ...p, experience: toggleInArray(p.experience, name) }))}
            onMinSalaryChange={(value) => setFilters((p) => ({ ...p, minSalary: value }))}
            onClear={handleClear}
          />

          <div>
            <div className="jobs-toolbar">
              <div className="jobs-toolbar__search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by title, company, or skill"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn--outline jobs-filter-toggle"
                onClick={() => setMobileFiltersOpen((o) => !o)}
              >
                Filters
              </button>
              <span className="jobs-toolbar__count">
                {isLoading ? 'Loading…' : `${filteredJobs.length} jobs found`}
              </span>
              <select className="jobs-toolbar__sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest first</option>
                <option value="salary">Salary: High to Low</option>
              </select>
            </div>

            {isLoading ? (
              <div className="jobs-grid">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>No jobs match your filters</h3>
                <p>Try widening your search or clearing a few filters.</p>
                <button type="button" className="btn btn--outline" onClick={handleClear}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="jobs-grid">
                {filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
