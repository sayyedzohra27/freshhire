import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Browse Jobs' },
  { to: '/saved-jobs', label: 'Saved Jobs' },
  { to: '/my-applications', label: 'My Applications' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`;

  return (
    <header className="header">
      <div className="container header__inner flex-between">
        <Link to="/" className="header__logo flex-gap-2" onClick={() => setMenuOpen(false)}>
          <span className="header__logo-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21c0-6.5 4-9.5 8-10-1 5-3.5 8.5-8 10z"
                fill="#2F8F52"
              />
              <path
                d="M12 21c0-7-4.5-10.5-9-11 1 6 4 9.5 9 11z"
                fill="#3DA35D"
              />
            </svg>
          </span>
          FreshHire
        </Link>

        <nav className="header__nav">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <Link to="/post-job" className="btn btn--outline">
            Post a Job
          </Link>
          <button
            className="header__burger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="#16231F"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={`header__mobile-menu ${menuOpen ? 'header__mobile-menu--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={linkClass}
            end={link.to === '/'}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <Link to="/post-job" className="btn btn--primary btn--block" onClick={() => setMenuOpen(false)}>
          Post a Job
        </Link>
      </div>
    </header>
  );
}
