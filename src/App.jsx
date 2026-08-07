import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// --- İlkin Nümunə Sifariş Məlumatları (Çökmə riskini sıfıra endirmək üçün) ---
const initialOrders = [
  { id: '1', customer: 'Aysel M.', product: 'Alize Puffy Odeyal', amount: 45, status: 'Hazırlanır' },
  { id: '2', customer: 'Elvin K.', product: 'Uşaq Dəsti', amount: 60, status: 'Çatdırıldı' }
];

// --- 1. SİFARİŞLƏR SƏHİFƏSİ (EDIT + SIL FUNKSİYASI İLƏ) ---
function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);

  // Form xanaları
  const [customer, setCustomer] = useState('');
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Gözləyir');

  // Edit rejimi
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer || !product || !amount) return alert("Lütfən bütün xanaları doldurun!");

    if (editingId) {
      // Edit / Yeniləmə
      setOrders(orders.map(item => 
        item.id === editingId 
          ? { ...item, customer, product, amount: Number(amount), status }
          : item
      ));
      setEditingId(null);
    } else {
      // Yeni əlavə
      const newOrder = {
        id: Date.now().toString(),
        customer,
        product,
        amount: Number(amount),
        status
      };
      setOrders([newOrder, ...orders]);
    }

    // Formu sıfırla
    setCustomer('');
    setProduct('');
    setAmount('');
    setStatus('Gözləyir');
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setCustomer(order.customer);
    setProduct(order.product);
    setAmount(order.amount);
    setStatus(order.status);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCustomer('');
    setProduct('');
    setAmount('');
    setStatus('Gözləyir');
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu sifarişi silməyə əminsiniz?")) {
      setOrders(orders.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#0f172a' }}>📦 Sifarişlərin İdarə Olunması</h2>

      {/* Form */}
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px', color: '#334155' }}>
          {editingId ? '✏️ Sifarişi Redaktə Et' : '➕ Yeni Sifariş Əlavə Et'}
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <input 
            type="text" 
            placeholder="Müştəri adı" 
            value={customer} 
            onChange={e => setCustomer(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          />
          <input 
            type="text" 
            placeholder="Məhsul adı" 
            value={product} 
            onChange={e => setProduct(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          />
          <input 
            type="number" 
            placeholder="Məbləğ (AZN)" 
            value={amount} 
            onChange={e => setAmount(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
          />
          <select 
            value={status} 
            onChange={e => setStatus(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
          >
            <option value="Gözləyir">Gözləyir</option>
            <option value="Hazırlanır">Hazırlanır</option>
            <option value="Çatdırıldı">Çatdırıldı</option>
            <option value="Ləğv edildi">Ləğv edildi</option>
          </select>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              type="submit" 
              style={{ flex: 1, padding: '10px', background: editingId ? '#0284c7' : '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
            >
              {editingId ? 'Yenilə' : 'Əlavə et'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={handleCancelEdit}
                style={{ padding: '10px 14px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Ləğv et
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Cədvəl */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Müştəri</th>
              <th style={{ padding: '12px 16px' }}>Məhsul</th>
              <th style={{ padding: '12px 16px' }}>Məbləğ</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontWeight: '500', color: '#0f172a' }}>{order.customer}</td>
                <td style={{ padding: '12px 16px', color: '#334155' }}>{order.product}</td>
                <td style={{ padding: '12px 16px', color: '#0f172a', fontWeight: '600' }}>{order.amount} AZN</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: order.status === 'Çatdırıldı' ? '#dcfce7' : order.status === 'Hazırlanır' ? '#fef3c7' : '#f1f5f9',
                    color: order.status === 'Çatdırıldı' ? '#15803d' : order.status === 'Hazırlanır' ? '#b45309' : '#475569'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleEdit(order)}
                    style={{ padding: '6px 12px', marginRight: '6px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(order.id)}
                    style={{ padding: '6px 12px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- DİĞƏR BÖLMƏLƏR ---
const Dashboard = () => <div style={{ padding: '24px' }}><h2>📊 Dashboard</h2><p style={{ color: '#64748b' }}>Əsas göstəricilər paneli.</p></div>;
const Stock = () => <div style={{ padding: '24px' }}><h2>🧱 Stok (Məhsullar)</h2><p style={{ color: '#64748b' }}>Məhsul siyahısı.</p></div>;
const Expenses = () => <div style={{ padding: '24px' }}><h2>💸 Xərclər (Rasxod)</h2><p style={{ color: '#64748b' }}>Rasxodlar bölməsi.</p></div>;
const Barcode = () => <div style={{ padding: '24px' }}><h2>🏷️ Barkod</h2><p style={{ color: '#64748b' }}>Barkod generatoru.</p></div>;
const Reports = () => <div style={{ padding: '24px' }}><h2>📈 Hesabatlar</h2><p style={{ color: '#64748b' }}>Maliyyə hesabatları.</p></div>;
const Settings = () => <div style={{ padding: '24px' }}><h2>⚙️ Tənzimləmələr</h2><p style={{ color: '#64748b' }}>Sistem ayarları.</p></div>;

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Sol Menyu */}
        <div style={{ width: '240px', background: '#0f172a', color: '#fff', padding: '20px 12px', flexShrink: 0 }}>
          <h2 style={{ paddingLeft: '8px', fontSize: '18px', margin: '0 0 4px 0' }}>Allbaffy ERP</h2>
          <p style={{ paddingLeft: '8px', fontSize: '12px', color: '#94a3b8', margin: '0 0 24px 0' }}>İdarəetmə Paneli</p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link to="/" style={linkStyle}>📊 Dashboard</Link>
            <Link to="/orders" style={linkStyle}>📦 Sifarişlər</Link>
            <Link to="/stock" style={linkStyle}>🧱 Stok (Məhsullar)</Link>
            <Link to="/expenses" style={linkStyle}>💸 Xərclər (Rasxod)</Link>
            <Link to="/barcode" style={linkStyle}>🏷️ Barkod</Link>
            <Link to="/reports" style={linkStyle}>📈 Hesabatlar</Link>
            <Link to="/settings" style={linkStyle}>⚙️ Tənzimləmələr</Link>
          </nav>
        </div>

        {/* Sağ Əsas Ərazi */}
        <div style={{ flex: 1, background: '#f8fafc', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/barcode" element={<Barcode />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const linkStyle = {
  color: '#e2e8f0',
  textDecoration: 'none',
  padding: '10px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  display: 'block'
};