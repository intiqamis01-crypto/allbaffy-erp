import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Expenses from './pages/Expenses';
import Barcode from './pages/Barcode';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="stock/products" element={<Products />} />
          <Route path="stock/yarns" element={<Inventory />} />
          <Route path="stock/packaging" element={<Inventory />} />
          <Route path="purchases" element={<Expenses />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="barcode" element={<Barcode />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;