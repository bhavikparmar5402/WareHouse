const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'inventory', label: 'Inventory', icon: '📦' },
  { key: 'inbound', label: 'Inbound', icon: '📥' },
  { key: 'outbound', label: 'Outbound', icon: '📤' },
  { key: 'scanner', label: 'Scan Items', icon: '📷' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
];

const Sidebar = ({ activePage, onNavigate }) => (
  <aside className="sidebar">
    <ul className="sidebar-menu">
      {NAV_ITEMS.map((item) => (
        <li key={item.key}>
          <a
            href="#!"
            className={activePage === item.key ? 'active' : ''}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.key);
            }}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
