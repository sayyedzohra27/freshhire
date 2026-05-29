function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>FreshHire</h1>
        </div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/find-jobs">Find Jobs</a>
          <a href="/post-job">Post a Job</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
