import React, { useState } from 'react';

// --- Nümunə Sifarişlər ---
const initialOrders = [
  { id: '1', customer: 'Aysel M.', product: 'Alize Puffy Odeyal', amount: 45, status: 'Hazırlanır' },
  { id: '2', customer: 'Elvin K.', product: 'Uşaq Dəsti', amount: 60, status: 'Çatdırıldı' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('orders');
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
      setOrders(orders.map(item => 
        item.id === editingId 
          ? { ...item, customer, product, amount: Number(amount), status }
          : item
      ));
      setEditingId(null);
    } else {
      const newOrder = {
        id: Date.now().toString(),
        customer,
        product,
        amount: Number(amount),
        status
      };
      setOrders([newOrder, ...orders]);
    }

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
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sol Menyu (Router-siz, sadə Tab dəyişimi) */}
      <div style={{ width: '240px', background: '#0f172a', color: '#fff', padding: '20px 12px', flexShrink: 0 }}>
        <h2 style={{ paddingLeft: '8px', fontSize: '18px', margin: '0 0 4px 0' }}>Allbaffy ERP</h2>
        <p style={{ paddingLeft: '8px', fontSize: '12px', color: '#94a3b8', margin: '0 0 24px 0' }}>İdarəetmə Paneli</p>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button onClick={() => setActiveTab('dashboard')} style={navBtnStyle(activeTab === 'dashboard')}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('orders')} style={navBtnStyle(activeTab === 'orders')}>📦 Sifarişlər</button>
          <button onClick={() => setActiveTab('stock')} style={navBtnStyle(activeTab === 'stock')}>🧱 Stok (Məhsullar)</button>
          <button onClick={() => setActiveTab('expenses')} style={navBtnStyle(activeTab === 'expenses')}>💸 Xərclər (Rasxod)</button>
          <button onClick={() => setActiveTab('barcode')} style={navBtnStyle(activeTab === 'barcode')}>🏷️ Barkod</button>
          <button onClick={() => setActiveTab('reports')} style={navBtnStyle(activeTab === 'reports')}>📈 Hesabatlar</button>
          <button onClick={() => setActiveTab('settings')} style={navBtnStyle(activeTab === 'settings')}>⚙️ Tənzimləmələr</button>
        </nav>
      </div>

      {/* Sağ Ərazi */}
      <div style={{ flex: 1, background: '#f8fafc', minHeight: '100vh', padding: '24px' }}>
        {activeTab === 'orders' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
        )}

        {activeTab !== 'orders' && (
          <div>
            <h2>{activeTab.toUpperCase()}</h2>
            <p style={{ color: '#64748b' }}>Bu bölmə hazırlanır...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const navBtnStyle = (isActive) => ({
  background: isActive ? '#1e293b' : 'transparent',
  color: isActive ? '#38bdf8' : '#e2e8f0',
  border: 'none',
  padding: '10px 12px',
  borderRadius: '6px',
  fontSize: '14px',
  textAlign: 'left',
  cursor: 'pointer',
  fontWeight: isActive ? '600' : 'normal'
});