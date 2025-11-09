import { useEffect, useMemo, useState } from 'react';
import apiClient from './api/apiClient.js';
import LoginForm from './components/LoginForm.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import DashboardPage from './components/Dashboard/DashboardPage.jsx';
import InventoryPage from './components/Inventory/InventoryPage.jsx';
import InboundPage from './components/InboundPage.jsx';
import OutboundPage from './components/OutboundPage.jsx';
import ScannerPage from './components/Scanner/ScannerPage.jsx';
import SettingsPage from './components/SettingsPage.jsx';
import AddItemModal from './components/Modals/AddItemModal.jsx';
import EditItemModal from './components/Modals/EditItemModal.jsx';
import ItemDetailsModal from './components/Modals/ItemDetailsModal.jsx';
import ToastContainer from './components/Toast/ToastContainer.jsx';

const AUTH_KEY = 'wms-authenticated-user';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem(AUTH_KEY)));
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [items, setItems] = useState([]);
  const [activities, setActivities] = useState([]);
  const [brandFilter, setBrandFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailsBarcode, setDetailsBarcode] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [inventoryLoading, setInventoryLoading] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--bg-light', isDarkMode ? '#1e293b' : '#f8fafc');
    document.documentElement.style.setProperty('--bg-white', isDarkMode ? '#0f172a' : '#ffffff');
    document.documentElement.style.setProperty('--text-dark', isDarkMode ? '#f1f5f9' : '#1e293b');
    document.documentElement.style.setProperty('--text-light', isDarkMode ? '#cbd5e1' : '#64748b');
    document.documentElement.style.setProperty('--border', isDarkMode ? '#334155' : '#e2e8f0');
  }, [isDarkMode]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    fetchInventory();
    fetchActivity();
  }, [isAuthenticated]);

  const fetchInventory = async () => {
    setInventoryLoading(true);
    try {
      const { data } = await apiClient.get('/items');
      setItems(data);
    } catch (error) {
      notify({
        title: 'Error',
        message: extractErrorMessage(error) ?? 'Failed to load inventory',
        type: 'danger',
      });
    } finally {
      setInventoryLoading(false);
    }
  };

  const fetchActivity = async () => {
    try {
      const { data } = await apiClient.get('/activities');
      setActivities(data);
    } catch (error) {
      notify({
        title: 'Error',
        message: extractErrorMessage(error) ?? 'Failed to load activity feed',
        type: 'danger',
      });
    }
  };

  const handleLogin = async (credentials) => {
    setAuthLoading(true);
    try {
      await apiClient.post('/auth/login', credentials);
      localStorage.setItem(AUTH_KEY, JSON.stringify({ username: credentials.username }));
      setIsAuthenticated(true);
      notify({ title: 'Welcome', message: 'Signed in successfully', type: 'success' });
    } catch (error) {
      notify({
        title: 'Login Failed',
        message: extractErrorMessage(error) ?? 'Invalid credentials',
        type: 'danger',
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // ignore logout errors
    } finally {
      localStorage.removeItem(AUTH_KEY);
      setIsAuthenticated(false);
      setItems([]);
      setActivities([]);
      setActivePage('dashboard');
      notify({ title: 'Signed out', message: 'You have been logged out', type: 'info' });
    }
  };

  const handleAddRequest = (barcode) => {
    if (!barcode) {
      notify({ title: 'Error', message: 'Please enter a barcode first', type: 'danger' });
      return;
    }

    const existing = items.find((item) => item.barcode === barcode);
    if (existing) {
      notify({
        title: 'Already Exists',
        message: 'This barcode already exists in inventory. Use edit instead.',
        type: 'danger',
      });
      setEditItem(existing);
      setEditModalOpen(true);
      return;
    }

    setAddModalOpen(true);
  };

  const handleViewRequest = (barcode) => {
    if (!barcode) {
      notify({ title: 'Error', message: 'Please enter a barcode first', type: 'danger' });
      return;
    }

    const item = items.find((entry) => entry.barcode === barcode);
    setSelectedItem(item ?? null);
    setDetailsBarcode(barcode);
    setDetailsModalOpen(true);
  };

  const handleSaveNewItem = async (form) => {
    try {
      const payload = {
        barcode: form.barcode.toUpperCase(),
        name: form.name,
        weight: form.weight,
        brand: form.brand,
        quantity: Number(form.quantity),
        location: form.location,
        expiry: form.expiry,
      };

      const { data } = await apiClient.post('/items', payload);
      setItems((prev) => [data, ...prev]);
      setAddModalOpen(false);
      setBarcodeInput('');
      notify({ title: 'Success', message: 'Item added to inventory successfully', type: 'success' });
      fetchActivity();
    } catch (error) {
      notify({
        title: 'Error',
        message: extractErrorMessage(error) ?? 'Unable to add item',
        type: 'danger',
      });
    }
  };

  const handleUpdateItem = async (form) => {
    try {
      const payload = {
        name: form.name,
        weight: form.weight,
        brand: form.brand,
        quantity: Number(form.quantity),
        location: form.location,
        expiry: form.expiry,
      };

      const { data } = await apiClient.put(`/items/${form._id}`, payload);
      setItems((prev) => prev.map((item) => (item._id === data._id ? data : item)));
      setEditModalOpen(false);
      notify({ title: 'Updated', message: 'Item updated successfully', type: 'success' });
      fetchActivity();
    } catch (error) {
      notify({
        title: 'Error',
        message: extractErrorMessage(error) ?? 'Unable to update item',
        type: 'danger',
      });
    }
  };

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`Delete ${item.name}?`)) {
      return;
    }
    try {
      await apiClient.delete(`/items/${item._id}`);
      setItems((prev) => prev.filter((entry) => entry._id !== item._id));
      notify({ title: 'Deleted', message: 'Item removed successfully', type: 'success' });
      fetchActivity();
    } catch (error) {
      notify({
        title: 'Error',
        message: extractErrorMessage(error) ?? 'Unable to delete item',
        type: 'danger',
      });
    }
  };

  const filteredItems = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      if (brandFilter && item.brand !== brandFilter) {
        return false;
      }

      if (!lowerSearch) {
        return true;
      }

      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        item.brand.toLowerCase().includes(lowerSearch) ||
        item.location.toLowerCase().includes(lowerSearch)
      );
    });
  }, [items, brandFilter, searchTerm]);

  const statsByBrand = useMemo(() => {
    const totals = { MTR: 0, Parasuit: 0, Dabour: 0, '': 0 };
    items.forEach((item) => {
      totals[item.brand] = (totals[item.brand] ?? 0) + Number(item.quantity ?? 0);
      totals[''] += Number(item.quantity ?? 0);
    });
    return totals;
  }, [items]);

  const notify = ({ title, message, type }) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <>
        <LoginForm onLogin={handleLogin} loading={authLoading} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  return (
    <div className="app-shell">
      <Navbar onToggleTheme={() => setIsDarkMode((prev) => !prev)} isDarkMode={isDarkMode} onLogout={handleLogout} />
      <div className="main-wrapper">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="content">
          {activePage === 'dashboard' && (
            <DashboardPage
              statsByBrand={statsByBrand}
              activities={activities}
              onSelectBrand={(brand) => {
                setBrandFilter(brand);
                setActivePage('inventory');
                notify({
                  title: 'Filter Applied',
                  message: `Showing ${brand ? `${brand} items` : 'all items'}`,
                  type: 'success',
                });
              }}
            />
          )}
          {activePage === 'inventory' && (
            <InventoryPage
              items={filteredItems}
              brandFilter={brandFilter}
              onBrandFilterChange={setBrandFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onEditItem={(item) => {
                setEditItem(item);
                setEditModalOpen(true);
              }}
              onDeleteItem={handleDeleteItem}
            />
          )}
          {activePage === 'inbound' && <InboundPage />}
          {activePage === 'outbound' && <OutboundPage />}
          {activePage === 'scanner' && (
            <ScannerPage
              barcode={barcodeInput}
              onBarcodeChange={setBarcodeInput}
              onBarcodeDetected={(code) => {
                const clean = code.toUpperCase();
                setBarcodeInput(clean);
                notify({ title: 'Barcode Scanned', message: `Code: ${clean}`, type: 'success' });
              }}
              onAddItem={handleAddRequest}
              onViewDetails={handleViewRequest}
            />
          )}
          {activePage === 'settings' && <SettingsPage />}
          {inventoryLoading && <p>Loading inventory…</p>}
        </main>
      </div>
      <AddItemModal isOpen={isAddModalOpen} barcode={barcodeInput} onClose={() => setAddModalOpen(false)} onSave={handleSaveNewItem} />
      <EditItemModal isOpen={isEditModalOpen} item={editItem} onClose={() => setEditModalOpen(false)} onSave={handleUpdateItem} />
      <ItemDetailsModal
        isOpen={isDetailsModalOpen}
        item={selectedItem}
        barcode={detailsBarcode}
        onClose={() => setDetailsModalOpen(false)}
      />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

const extractErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return null;
};

export default App;
