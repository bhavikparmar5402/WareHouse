const ItemDetailsModal = ({ isOpen, item, barcode, onClose }) => (
  <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={(event) => event.target === event.currentTarget && onClose()}>
    <div className="modal">
      <div className="modal-header">
        <h3>Item Details</h3>
      </div>
      <div className="modal-body">
        {item ? (
          <div style={{ background: 'var(--bg-light)', padding: '20px', borderRadius: '12px' }}>
            <DetailRow label="Barcode" value={item.barcode ?? barcode} />
            <DetailRow label="Name" value={item.name} />
            <DetailRow label="Weight" value={item.weight} />
            <DetailRow label="Brand" value={item.brand} />
            <DetailRow label="Quantity" value={`${item.quantity} boxes`} />
            <DetailRow label="Location" value={item.location} />
            <DetailRow label="Expiry Date" value={item.expiry} isLast />
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--danger)', fontWeight: 600, marginBottom: '10px' }}>Item not found in inventory</p>
            <p style={{ color: 'var(--text-light)' }}>
              The barcode &quot;{barcode}&quot; does not exist in the system.
            </p>
          </div>
        )}
      </div>
      <div className="modal-actions">
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value, isLast = false }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
    }}
  >
    <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{label}:</span>
    <span style={{ color: 'var(--text-light)' }}>{value}</span>
  </div>
);

export default ItemDetailsModal;
