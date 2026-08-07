import React from 'react';

export default function Settings() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1c1917' }}>Tənzimləmələr</h2>
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #d6d3d1' }}>
        <p style={{ color: '#78716c', margin: 0 }}>Mağaza parametrləri və sistem tənzimləmələri.</p>
      </div>
    </div>
  );
}