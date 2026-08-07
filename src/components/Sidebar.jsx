import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { key: 'dashboard', name: 'Dashboard', icon: '📊' },
    { key: 'orders', name: 'Sifarişlər', icon: '🛍️' },
    { key: 'products', name: 'Stok (Məhsullar)', icon: '📦' },
    { key: 'expenses', name: 'Xərclər (Rasxod)', icon: '💸' },
    { key: 'barcode', name: 'Barkod', icon: '🏷️' },
    { key: 'reports', name: 'Hesabatlar', icon: '📈' },
    { key: 'settings', name: 'Tənzimləmələr', icon: '⚙️' },
  ];

  return (
    <aside
      style={{
        width: '240px',
        backgroundColor: '#0b1329',
        color: '#fff',
        minHeight: '100vh',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ marginBottom: '30px', paddingLeft: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Allbaffy ERP</h2>
        <span style={{ fontSize: '11px', color: '#64748b' }}>İdarəetmə Paneli</span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveTab(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                color: isActive ? '#ffffff' : '#94a3b8',
                backgroundColor: isActive ? '#2563eb' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: isActive ? '600' : '400',
                fontSize: '14px',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}