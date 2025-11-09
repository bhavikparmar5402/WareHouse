import { useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { nanoid } from 'nanoid';
import DashboardPage from './pages/DashboardPage.jsx';
import ScannerPage from './pages/ScannerPage.jsx';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5000';

const App = () => {
  const [pairedSession] = useState(() => nanoid(6).toUpperCase());
  const sharedProps = useMemo(() => ({ socketUrl: SOCKET_URL, pairedSession }), [pairedSession]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage {...sharedProps} />} />
      <Route path="/scanner" element={<ScannerPage {...sharedProps} />} />
    </Routes>
  );
};

export default App;
