import React from 'react';

export default function Dashboard() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#FDFBF7', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Başlıq */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2C1D11', margin: '0 0 4px 0' }}>Əsas Səhifə</h1>
        <p style={{ fontSize: '14px', color: '#7A624E', margin: 0 }}>Ümumi biznes xülasəsi, analitika və xəbərdarlıqlar</p>
      </div>

      {/* Statistika Kartları */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Ümumi Sifarişlər */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ÜMUMİ SİFARİŞLƏR</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>1 ədəd</div>
        </div>

        {/* Gəlir */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GƏLİR</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>80.00 AZN</div>
        </div>

        {/* Rasxod */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>RASXOD</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>35.00 AZN</div>
        </div>

        {/* Qazanc */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>QAZANC</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#15803d', marginTop: '6px' }}>+45.00 AZN</div>
        </div>

      </div>
    </div>
  );
}