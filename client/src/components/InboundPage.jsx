const inboundOrders = [
  {
    id: '#IN-2025-001',
    supplier: 'Tech Distributors Inc.',
    items: 150,
    expectedDate: 'Oct 18, 2025',
    status: 'In Transit',
  },
  {
    id: '#IN-2025-002',
    supplier: 'Global Electronics',
    items: 320,
    expectedDate: 'Oct 17, 2025',
    status: 'Received',
  },
  {
    id: '#IN-2025-003',
    supplier: 'Prime Suppliers LLC',
    items: 95,
    expectedDate: 'Oct 20, 2025',
    status: 'Pending',
  },
];

const statusBadge = (status) => {
  if (status === 'Received') return 'badge-success';
  if (status === 'Pending') return 'badge-warning';
  return 'badge-warning';
};

const InboundPage = () => (
  <div className="page-content">
    <div className="page-header">
      <h2>Inbound Shipments</h2>
      <p>Track incoming deliveries and stock receipts</p>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>Recent Inbound Orders</h3>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Items</th>
              <th>Expected Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inboundOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.supplier}</td>
                <td>{order.items}</td>
                <td>{order.expectedDate}</td>
                <td>
                  <span className={`badge ${statusBadge(order.status)}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default InboundPage;
