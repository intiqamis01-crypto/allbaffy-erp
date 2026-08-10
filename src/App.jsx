import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Əsas Hissə */}
        <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Sifarişlər Səhifəsi</div>} />
            <Route path="/stock/products" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Məhsul Stoku</div>} />
            <Route path="/stock/yarns" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>İplər Stoku</div>} />
            <Route path="/stock/packaging" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Paketləmə və Promo</div>} />
            <Route path="/purchases" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Alınanlar Səhifəsi</div>} />
            <Route path="/expenses" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Xərclər Səhifəsi</div>} />
            <Route path="/barcode" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Barkod Səhifəsi</div>} />
            <Route path="/reports" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Hesabatlar Səhifəsi</div>} />
            <Route path="/settings" element={<div style={{ color: '#2C1D11', fontWeight: 'bold' }}>Tənzimləmələr Səhifəsi</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;