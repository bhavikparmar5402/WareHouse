import { useEffect, useState } from 'react';

const emptyItem = {
  _id: '',
  barcode: '',
  name: '',
  weight: '',
  brand: '',
  quantity: 0,
  location: '',
  expiry: '',
};

const EditItemModal = ({ isOpen, item, onClose, onSave }) => {
  const [form, setForm] = useState(emptyItem);

  useEffect(() => {
    if (isOpen && item) {
      setForm({
        ...item,
        quantity: item.quantity ?? 0,
      });
    }
  }, [isOpen, item]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...form,
      quantity: Number(form.quantity),
    });
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Item Details</h3>
        </div>
        <div className="modal-body">
          <form id="edit-item-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Barcode / Item Code</label>
              <input type="text" value={form.barcode} readOnly style={{ background: 'var(--bg-light)', cursor: 'not-allowed' }} />
            </div>
            <div className="form-group">
              <label>Item Name*</label>
              <input type="text" required value={form.name} onChange={(event) => updateField('name', event.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Weight*</label>
                <input type="text" required value={form.weight} onChange={(event) => updateField('weight', event.target.value)} />
              </div>
              <div className="form-group">
                <label>Brand*</label>
                <select required value={form.brand} onChange={(event) => updateField('brand', event.target.value)}>
                  <option value="MTR">MTR</option>
                  <option value="Parasuit">Parasuit</option>
                  <option value="Dabour">Dabour</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Quantity (Boxes)*</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={form.quantity}
                  onChange={(event) => updateField('quantity', event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Rack Location*</label>
                <input type="text" required value={form.location} onChange={(event) => updateField('location', event.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Expiry Date*</label>
              <input type="text" required value={form.expiry} onChange={(event) => updateField('expiry', event.target.value)} />
            </div>
          </form>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success" form="edit-item-form">
            Update Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
