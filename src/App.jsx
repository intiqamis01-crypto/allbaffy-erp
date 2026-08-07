import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Firebase Canlı Məlumatlar
  const [orders, setOrders] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      setOrders(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubExpenses = onSnapshot(collection(db, "expenses"), (snapshot) => {
      setExpenses(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubInventory = onSnapshot(collection(db, "inventory"), (snapshot) => {
      setInventory(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubOrders();
      unsubExpenses();
      unsubInventory();
    };
  }, []);

  // Maliyyə və Stat Hesablamaları
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  // Status Sayğacları
  const hazirlanirCount = orders.filter(o => o.status === 'Hazırlanır').length;
  const hazirdirCount = orders.filter(o => o.status === 'Hazırdır').length;
  const tehvilCount = orders.filter(o => o.status === 'Təhvil verildi').length;
  const legvCount = orders.filter(o => o.status === 'Ləğv edildi').length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Sifarişlər', icon: '📦' },
    { id: 'inventory', label: 'Stok (Məhsullar)', icon: '🧱' },
    { id: 'expenses', label: 'Xərclər (Rasxod)', icon: '💸' },
    { id: 'barcode', label: 'Barkod', icon: '🏷️' },
    { id: 'reports', label: 'Hesabatlar', icon: '📈' },
    { id: 'settings', label: 'Tənzimləmələr', icon: '⚙️' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f8fafc' }}>
      
      {/* SOL SIDEBAR */}
      <div style={{ width: '240px', backgroundColor: '#0f172a', color: '#fff', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '32px', paddingLeft: '8px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Allbaffy ERP</h2>
          <span style={{ fontSize: '12px', color: '#64748b' }}>İdarəetmə Paneli</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {menuItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: isActive ? '600' : '500',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* SAĞ ƏSAS MƏZMUN */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        
        {/* DASHBOARD SEKSİYASI */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Dashboard</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' }}>Ümumi biznes xülasəsi, analitika və xəbərdarlıqlar</p>
            </div>

            {/* Top 4 Stat Kartı */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              
              <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>ÜMUMİ SİFARİŞLƏR</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>{totalOrdersCount} ədəd</h2>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>GƏLİR</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>{totalRevenue.toFixed(2)} AZN</h2>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>XƏRC</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>{totalExpenses.toFixed(2)} AZN</h2>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>QAZANC</span>
                <h2 style={{ margin: '8px 0 0 0', fontSize: '24px', color: netProfit >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                  {netProfit >= 0 ? `+${netProfit.toFixed(2)}` : netProfit.toFixed(2)} AZN
                </h2>
              </div>

            </div>

            {/* Xəbərdarlıq Qutuları */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b91c1c', fontWeight: '600', fontSize: '14px' }}>
                  <span>⏰</span> Təhvilinə 1 Gün Qalan və ya Keçən Sifarişlər (0)
                </div>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#7f1d1d' }}>Təhvil tarixi yaxınlaşan təcili sifariş yoxdur.</p>
              </div>

              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: '600', fontSize: '14px' }}>
                  <span>⚠️</span> Stoku Azalan İplər və Materiallar (0)
                </div>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#78350f' }}>Stokda kritik səviyyədə azalan xammal və ya məhsul yoxdur.</p>
              </div>
            </div>

            {/* Sifariş Statusları Blokları */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Sifariş Statusları</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                
                <div style={{ backgroundColor: '#fef9c3', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#854d0e' }}>Hazırlanır</span>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#713f12', marginTop: '4px' }}>{hazirlanirCount} ədəd</div>
                </div>

                <div style={{ backgroundColor: '#dcfce7', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#166534' }}>Hazırdır</span>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#14532d', marginTop: '4px' }}>{hazirdirCount} ədəd</div>
                </div>

                <div style={{ backgroundColor: '#dbeafe', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#1e40af' }}>Təhvil verildi</span>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', marginTop: '4px' }}>{tehvilCount} ədəd</div>
                </div>

                <div style={{ backgroundColor: '#ffe4e6', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#9f1239' }}>Ləğv edildi</span>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#881337', marginTop: '4px' }}>{legvCount} ədəd</div>
                </div>

              </div>
            </div>

            {/* Son Sifarişlər Cədvəli */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '600', color: '#334155' }}>Son Sifarişlər</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '10px 12px' }}>Müştəri / Tel</th>
                    <th style={{ padding: '10px 12px' }}>Məhsul Kodu</th>
                    <th style={{ padding: '10px 12px' }}>Məhsul</th>
                    <th style={{ padding: '10px 12px' }}>Məbləğ</th>
                    <th style={{ padding: '10px 12px' }}>Sifariş / Təhvil Tarixi</th>
                    <th style={{ padding: '10px 12px' }}>Status (Hamısı) ∨</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right' }}>Əməliyyat</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>Məlumat tapılmadı</td>
                    </tr>
                  ) : (
                    orders.map(o => (
                      <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: '600', color: '#0f172a' }}>{o.customerName}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{o.phone || '070 970 09 79'}</div>
                        </td>
                        <td style={{ padding: '12px', color: '#64748b' }}>{o.productCode || 'ALP-001'}</td>
                        <td style={{ padding: '12px', color: '#334155' }}>{o.productName || 'odeyal 183'}</td>
                        <td style={{ padding: '12px', fontWeight: '600', color: '#0f172a' }}>{o.price ? `${o.price}.00 AZN` : '80.00 AZN'}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ color: '#334155' }}>Sifariş: {o.date || '07/08/26'}</div>
                          <div style={{ color: '#94a3b8', fontSize: '11px' }}>Təhvil: -</div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', backgroundColor: '#fef9c3', color: '#854d0e' }}>
                            {o.status || 'Hazırlanır'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <button style={{ padding: '4px 10px', border: '1px solid #cbd5e1', backgroundColor: '#fff', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#334155' }}>
                            ✏️ Düzəliş
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Diqqət: Digər tab-lar (Sifarişlər, Rasxodlar və s.) ehtiyaca uyğun olaraq menyudan seçildikdə bura əlavə olunacaq */}
        {activeTab !== 'dashboard' && (
          <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ margin: 0, color: '#0f172a' }}>{menuItems.find(m => m.id === activeTab)?.label}</h2>
            <p style={{ color: '#64748b' }}>Bu bölmə daxilində tezliklə əməliyyatlar aktiv olunacaq.</p>
          </div>
        )}

      </div>

    </div>
  );
}