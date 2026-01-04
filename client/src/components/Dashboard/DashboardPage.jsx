const STAT_CARDS = [
  {
    key: 'MTR',
    label: 'MTR',
    icon: '📦',
    iconClass: 'blue',
  },
  {
    key: 'Parasuit',
    label: 'Parasuit',
    icon: '⏳',
    iconClass: 'orange',
  },
  {
    key: 'Dabour',
    label: 'Dabour',
    icon: '✅',
    iconClass: 'green',
  },
  {
    key: 'ExpiringSoon',
    label: 'Expring soon',
    icon: '⚠️',
    iconClass: 'red',
  }
];

const STATUS_BADGE_CLASS = {
  Received: 'badge-success',
  Shipped: 'badge-success',
  Alert: 'badge-warning',
  Processing: 'badge-warning',
  Pending: 'badge-warning',
};

const DashboardPage = ({ statsByBrand, onSelectBrand, activities }) => (
  <div className="page-content">
    <div className="page-header">
      <h2>Dashboard Overview</h2>
      <p>Real-time warehouse analytics and monitoring</p>
    </div>

    <div className="stats-grid">
      {STAT_CARDS.map((card) => (
        <div
          key={card.key || 'all'}
          className="stat-card"
          onClick={() => onSelectBrand(card.key)}
          role="button"
          tabIndex={0}
        >
          <div className={`stat-icon ${card.iconClass}`}>{card.icon}</div>
          <div className="stat-content">
            <h3>{statsByBrand[card.key] ?? 0}</h3>
            <p>{card.label}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="card">
      <div className="card-header">
        <h3>Recent Activity</h3>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Activity</th>
              <th>Item</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan={5}>No recent activity found.</td>
              </tr>
            ) : (
              activities.map((activity) => {
                const date = new Date(activity.timestamp);
                const time = date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <tr key={activity._id ?? `${activity.item}-${activity.timestamp}`}>
                    <td>{time}</td>
                    <td>{activity.activity}</td>
                    <td>{activity.item}</td>
                    <td>{activity.location}</td>
                    <td>
                      <span className={`badge ${STATUS_BADGE_CLASS[activity.status] ?? 'badge-success'}`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DashboardPage;
