import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form inputları
  const [customer, setCustomer] = useState('');
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Gözləyir');

  // Edit rejimi üçün state
  const [editingId, setEditingId] = useState(null);

  const ordersRef = collection(db, 'orders');

  // Məlumatları gətir
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(ordersRef);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(data);
    } catch (err) {
      console.error("Xəta baş verdi:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Əlavə et və ya Yenilə (Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer || !product || !amount) return alert("Bütün xanaları doldurun!");

    try {
      if (editingId) {
        // Redaktə rejimi (Edit)
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

      // Formu sıfırla və siyahını yenilə
      setCustomer('');
      setProduct('');
      setAmount('');
      setStatus('Gözləyir');
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit knopkasına basdıqda xanaları doldur
  const handleEdit = (order) => {
    setEditingId(order.id);
    setCustomer(order.customer);
    setProduct(order.product);
    setAmount(order.amount);
    setStatus(order.status || 'Gözləyir');
  };

  // Redaktəni ləğv et
  const handleCancelEdit = () => {
    setEditingId(null);
    setCustomer('');
    setProduct('');
    setAmount('');
    setStatus('Gözləyir');
  };

  // Sil
  const handleDelete = async (id) => {
    if (window.confirm("Bu sifarişi silməyə əminsiniz?")) {
      await deleteDoc(doc(db, 'orders', id));
      fetchOrders();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>
        Sifarişlərin İdarə Olunması
      </h2>

      {/* Əlavə et / Edit Formu */}
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '18px' }}>
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
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#fff' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
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