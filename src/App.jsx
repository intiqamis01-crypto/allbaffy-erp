import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#FAF7F2]">
        {/* Sidebar */}
        <Sidebar />

        {/* Əsas Məzmun Hissəsi */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<div className="p-4 text-[#2C1D11] font-medium">Sifarişlər Səhifəsi</div>} />
            <Route path="/stock/products" element={<div className="p-4 text-[#2C1D11] font-medium">Məhsul Stoku</div>} />
            <Route path="/stock/yarns" element={<div className="p-4 text-[#2C1D11] font-medium">İplər Stoku</div>} />
            <Route path="/stock/packaging" element={<div className="p-4 text-[#2C1D11] font-medium">Paketləmə və Promo</div>} />
            <Route path="/purchases" element={<div className="p-4 text-[#2C1D11] font-medium">Alınanlar Səhifəsi</div>} />
            <Route path="/expenses" element={<div className="p-4 text-[#2C1D11] font-medium">Xərclər Səhifəsi</div>} />
            <Route path="/barcode" element={<div className="p-4 text-[#2C1D11] font-medium">Barkod Səhifəsi</div>} />
            <Route path="/reports" element={<div className="p-4 text-[#2C1D11] font-medium">Hesabatlar Səhifəsi</div>} />
            <Route path="/settings" element={<div className="p-4 text-[#2C1D11] font-medium">Tənzimləmələr Səhifəsi</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;