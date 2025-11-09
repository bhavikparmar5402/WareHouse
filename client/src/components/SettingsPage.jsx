const SettingsPage = () => (
  <div className="page-content">
    <div className="page-header">
      <h2>System Settings</h2>
      <p>Configure warehouse management preferences</p>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>General Settings</h3>
      </div>
      <div style={{ padding: '20px 0' }}>
        <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>Warehouse configuration and system preferences</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <SettingRow label="Enable automatic alerts" value={<span style={{ color: 'var(--success)' }}>✓ Enabled</span>} />
          <SettingRow label="Low stock threshold" value={<span style={{ fontWeight: 600 }}>10 units</span>} />
          <SettingRow label="Barcode scanner type" value={<span style={{ fontWeight: 600 }}>Handheld</span>} />
        </div>
      </div>
    </div>
  </div>
);

const SettingRow = ({ label, value }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      background: 'var(--bg-light)',
      borderRadius: '10px',
    }}
  >
    <span>{label}</span>
    {value}
  </div>
);

export default SettingsPage;
