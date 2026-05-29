import "./app.css";

function Header() {
  return (
    <div className="header-container">
      <div className="logo">
        <h1>FreshHire</h1>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">Find Jobs</a>
        <a href="/">Post a Job</a>
      </div>

    </div>
  );
}

export default Header;