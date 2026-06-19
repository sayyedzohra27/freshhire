import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="footer__brand">FreshHire</div>
          <p className="footer__about">
            A Pune-based job board built for freshers stepping out of diploma and degree
            colleges, and for companies that want to hire them well.
          </p>
        </div>

        <div>
          <div className="footer__heading">For Job Seekers</div>
          <Link className="footer__link" to="/jobs">Browse Jobs</Link>
          <Link className="footer__link" to="/saved-jobs">Saved Jobs</Link>
          <Link className="footer__link" to="/my-applications">My Applications</Link>
        </div>

        <div>
          <div className="footer__heading">For Companies</div>
          <Link className="footer__link" to="/post-job">Post a Job</Link>
        </div>

        <div>
          <div className="footer__heading">Reach Us</div>
          <span className="footer__link">Pune, Maharashtra, India</span>
          <span className="footer__link">hello@freshhire.example</span>
          <span className="footer__link">+91 98XXX XXXXX</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} FreshHire. Prototype build, not a live product.</span>
        <span>Made in Pune for Pune's freshers.</span>
      </div>
    </footer>
  );
}
