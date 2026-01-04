import { useEffect, useState } from 'react';

const initialFormState = {
  barcode: '',
  name: '',
  weight: '',
  brand: '',
  quantity: '',
  location: '',
  expiry: '',
};

const AddItemModal = ({ isOpen, item, barcode, onClose, onSave }) => {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (isOpen) {
      if(item){
        setForm({
        ...item,
        quantity: 0,
        location: ''
      });
      }else{

        setForm((prev) => ({
          ...prev,
          barcode: barcode ?? '',
        }));
      }
    } else {
      setForm(initialFormState);
    }
  }, [isOpen, barcode, item]);

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
          <h3>Add New Item to Inventory</h3>
        </div>
        <div className="modal-body">
          <form id="add-item-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Barcode / Item Code*</label>
              <input
                type="text"
                required
                value={form.barcode}
                onChange={(event) => updateField('barcode', event.target.value.toUpperCase())}
              />
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
                  <option value="">Select Brand</option>
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
              <input type="date" required value={form.expiry} onChange={(event) => updateField('expiry', event.target.value)} />
            </div>
          </form>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success" form="add-item-form">
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
