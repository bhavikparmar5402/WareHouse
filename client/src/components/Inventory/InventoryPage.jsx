const InventoryPage = ({
  items,
  brandFilter,
  onBrandFilterChange,
  searchTerm,
  onSearchChange,
  onEditItem,
  onDeleteItem,
}) => (
  <div className="page-content">
    <div className="page-header">
      <h2>Inventory Management</h2>
      <p>Complete overview of warehouse inventory</p>
    </div>

    <div className="card">
      <div className="card-header">
        <h3>Product Inventory</h3>
      </div>
      <div className="filter-bar">
        <input
          type="text"
          value={searchTerm}
          placeholder="🔍 Search by name, brand, or rack..."
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <select value={brandFilter} onChange={(event) => onBrandFilterChange(event.target.value)}>
          <option value="">All Brands</option>
          <option value="MTR">MTR</option>
          <option value="Parasuit">Parasuit</option>
          <option value="Dabour">Dabour</option>
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Brand Name</th>
              <th>Quantity (Boxes)</th>
              <th>Location</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={8}>No items found.</td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.barcode}</td>
                  <td>{item.name}</td>
                  <td>{item.weight}</td>
                  <td>{item.brand}</td>
                  <td>{item.quantity}</td>
                  <td>{item.location}</td>
                  <td>{item.expiry}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button type="button" className="btn btn-primary btn-small" onClick={() => onEditItem(item)}>
                        Edit
                      </button>
                      {onDeleteItem ? (
                        <button type="button" className="btn btn-danger btn-small" onClick={() => onDeleteItem(item)}>
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default InventoryPage;
