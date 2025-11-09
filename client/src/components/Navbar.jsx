const Navbar = ({ onToggleTheme, isDarkMode, onLogout }) => (
  <nav className="navbar">
    <div className="navbar-brand">
      <div className="logo">W</div>
      <h1>Warehouse Management System</h1>
    </div>
    <div className="navbar-right">
      <button type="button" className="theme-toggle" onClick={onToggleTheme}>
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <div className="user-profile" role="button" tabIndex={0} onClick={onLogout}>
        <div className="user-avatar">A</div>
        <span>Admin</span>
      </div>
    </div>
  </nav>
);

export default Navbar;
