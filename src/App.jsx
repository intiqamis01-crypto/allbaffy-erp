import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { db } from './firebase'; // Əgər firebase.js faylınız src/firebase.js-dədirsə
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Form xanaları
  const [customer, setCustomer] = useState('');
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Gözləyir');

  // Edit rejimi
  const [editingId, setEditingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (!db) {
        throw new Error("Firebase bazası (db) tapılmadı. 'firebase.js' faylınızı yoxlayın.");
      }
      const ordersRef = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersRef);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(data);
    } catch (err) {
      console.error("Xəta:", err);
      setErrorMsg(err.message || "Məlumatları yükləyərkən xəta baş verdi.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer || !product || !amount) return alert("Bütün xanaları doldurun!");

    try {
      const ordersRef = collection(db, 'orders');
      if (editingId) {
        // Redaktə et (Edit)
        const orderDoc = doc(db, 'orders', editingId);
        await updateDoc(orderDoc, {
          customer,
          product,
          amount: Number(amount),
          status,
          updatedAt: serverTimestamp()
        });
        setEditingId(null);
      } else {
        // Yeni əlavə et
        await addDoc(ordersRef, {
          customer,
          product,
          amount: Number(amount),
          status,
          createdAt: serverTimestamp()
        });
      }

      setCustomer('');
      setProduct('');
      setAmount('');
      setStatus('Gözləyir');
      fetchOrders();
    } catch (err) {
      alert("Xəta yarandı: " + err.message);
    }
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setCustomer(order.customer || '');
    setProduct(order.product || '');
    setAmount(order.amount || '');
    setStatus(order.status || 'Gözləyir');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCustomer('');
    setProduct('');
    setAmount('');
    setStatus('Gözləyir');
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu sifarişi silməyə əminsiniz?")) {
      try {
        await deleteDoc(doc(db, 'orders', id));
        fetchOrders();
      } catch (err) {
        alert("Silinərkən xəta yarandı: " + err.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>
        Sifarişlərin İdarə Olunması
      </h2>

      {errorMsg && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Əlavə et / Edit Formu */}
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px', color: '#334155' }}>
          {editingId ? '✏️ Sifarişi Redaktə Et' : '➕ Yeni Sifariş Yarat'}
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <input 
            type="text" 
            placeholder="Müştəri adı" 
            value={customer} 
            onChange={e => setCustomer(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <input 
            type="text" 
            placeholder="Məhsul adı" 
            value={product} 
            onChange={e => setProduct(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <input 
            type="number" 
            placeholder="Məbləğ (AZN)" 
            value={amount} 
            onChange={e => setAmount(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <select 
            value={status} 
            onChange={e => setStatus(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="Gözləyir">Gözləyir</option>
            <option value="Hazırlanır">Hazırlanır</option>
            <option value="Çatdırıldı">Çatdırıldı</option>
            <option value="Ləğv edildi">Ləğv edildi</option>
          </select>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              style={{ flex: 1, padding: '10px', background: editingId ? '#0284c7' : '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {editingId ? 'Yenilə' : 'Əlavə et'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={handleCancelEdit}
                style={{ padding: '10px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Ləğv et
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sifarişlər Cədvəli */}
      {loading ? (
        <p>Yüklənir...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: '#64748b' }}>Hələ heç bir sifariş yoxdur.</p>
      ) : (
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px' }}>Müştəri</th>
                <th style={{ padding: '12px' }}>Məhsul</th>
                <th style={{ padding: '12px' }}>Məbləğ</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{order.customer}</td>
                  <td style={{ padding: '12px' }}>{order.product}</td>
                  <td style={{ padding: '12px' }}>{order.amount} AZN</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: order.status === 'Çatdırıldı' ? '#dcfce7' : order.status === 'Hazırlanır' ? '#fef3c7' : '#f1f5f9',
                      color: order.status === 'Çatdırıldı' ? '#166534' : order.status === 'Hazırlanır' ? '#92400e' : '#475569'
                    }}>
                      {order.status || 'Gözləyir'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleEdit(order)}
                      style={{ padding: '6px 12px', marginRight: '6px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(order.id)}
                      style={{ padding: '6px 12px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- DİĞƏR SƏHİFƏLƏR ---
const Dashboard = () => <div style={{ padding: '20px' }}><h2>Dashboard</h2><p>Əsas göstəricilər tezliklə yerləşdiriləcək.</p></div>;
const Stock = () => <div style={{ padding: '20px' }}><h2>Stok (Məhsullar)</h2><p>Məhsul siyahısı tezliklə yerləşdiriləcək.</p></div>;
const Expenses = () => <div style={{ padding: '20px' }}><h2>Xərclər (Rasxod)</h2><p>Rasxodlar bölməsi tezliklə yerləşdiriləcək.</p></div>;
const Barcode = () => <div style={{ padding: '20px' }}><h2>Barkod</h2><p>Barkod generasiyası tezliklə yerləşdiriləcək.</p></div>;
const Reports = () => <div style={{ padding: '20px' }}><h2>Hesabatlar</h2><p>Maliyyə hesabatları tezliklə yerləşdiriləcək.</p></div>;
const Settings = () => <div style={{ padding: '20px' }}><h2>Tənzimləmələr</h2><p>Sistem parametrləri tezliklə yerləşdiriləcək.</p></div>;

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ width: '240px', background: '#0f172a', color: '#fff', padding: '20px 10px' }}>
          <h2 style={{ paddingLeft: '10px', fontSize: '20px', marginBottom: '5px' }}>Allbaffy ERP</h2>
          <p style={{ paddingLeft: '10px', fontSize: '12px', color: '#94a3b8', marginTop: 0, marginBottom: '30px' }}>İdarəetmə Paneli</p>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/" style={linkStyle}>📊 Dashboard</Link>
            <Link to="/orders" style={linkStyle}>📦 Sifarişlər</Link>
            <Link to="/stock" style={linkStyle}>🧱 Stok (Məhsullar)</Link>
            <Link to="/expenses" style={linkStyle}>💸 Xərclər (Rasxod)</Link>
            <Link to="/barcode" style={linkStyle}>🏷️ Barkod</Link>
            <Link to="/reports" style={linkStyle}>📈 Hesabatlar</Link>
            <Link to="/settings" style={linkStyle}>⚙️ Tənzimləmələr</Link>
          </nav>
        </div>

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
  padding: '10px 14px',
  borderRadius: '8px',
  fontSize: '14px',
  display: 'block'
};