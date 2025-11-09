const outboundOrders = [
  {
    id: '#OUT-2025-156',
    customer: 'Amazon Fulfillment',
    items: 240,
    shippingDate: 'Oct 17, 2025',
    status: 'Shipped',
  },
  {
    id: '#OUT-2025-157',
    customer: 'Best Buy Distribution',
    items: 185,
    shippingDate: 'Oct 18, 2025',
    status: 'Processing',
  },
  {
    id: '#OUT-2025-158',
    customer: 'Walmart Logistics',
    items: 420,
    shippingDate: 'Oct 19, 2025',
    status: 'Pending',
  },
];

const badgeType = (status) => {
  if (status === 'Shipped') return 'badge-success';
  return 'badge-warning';
};

const OutboundPage = () => (
  <div className="page-content">
    <div className="page-header">
      <h2>Outbound Shipments</h2>
      <p>Manage orders ready for dispatch</p>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>Orders Ready to Ship</h3>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Shipping Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {outboundOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>{order.shippingDate}</td>
                <td>
                  <span className={`badge ${badgeType(order.status)}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default OutboundPage;
