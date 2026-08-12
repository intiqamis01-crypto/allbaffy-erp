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
        
        {/* Sifarişlər */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SİFARİŞLƏR</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>1 ədəd</div>
        </div>

        {/* Satış */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SATIŞ</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>80.00 AZN</div>
        </div>

        {/* Rasxod */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rasxod</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>35.00 AZN</div>
        </div>

        {/* Qazanc */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>QAZANC</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#15803d', marginTop: '6px' }}>+45.00 AZN</div>
        </div>

      </div>

      {/* Xəbərdarlıq Qutuları (Birinci şəkildəki dizaynda) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Təcili Sifarişlər Qutusu */}
        <div style={{ backgroundColor: '#FFF5F5', border: '1px solid #F5C6CB', padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFE3E3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
            ⏰
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#9B2C2C' }}>Təhvilinə 1 Gün Qalan və ya Keçən Sifarişlər (0)</div>
            <div style={{ fontSize: '12px', color: '#7A624E', marginTop: '2px' }}>Təhvil tarixi yaxınlaşan təcili sifariş yoxdur.</div>
          </div>
        </div>

        {/* Stoku Azalan İplər Qutusu */}
        <div style={{ backgroundColor: '#FEFCBF', border: '1px solid #FAF089', padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FEFC9F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
            ⚠️
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#744210' }}>Stoku Azalan İplər və Materiallar (0)</div>
            <div style={{ fontSize: '12px', color: '#7A624E', marginTop: '2px' }}>Stokda kritik səviyyədə azalan xammal və ya məhsul yoxdur.</div>
          </div>
        </div>

      </div>

      {/* Sifariş Statusları */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2D7C7', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2C1D11', margin: '0 0 16px 0' }}>Sifariş Statusları</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          
          <div style={{ backgroundColor: '#FEFCBF', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #D69E2E' }}>
            <div style={{ fontSize: '12px', color: '#744210', fontWeight: 'bold' }}>Hazırlanır</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>1 ədəd</div>
          </div>

          <div style={{ backgroundColor: '#F0FFF4', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #38A169' }}>
            <div style={{ fontSize: '12px', color: '#22543D', fontWeight: 'bold' }}>Hazırdır</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>0 ədəd</div>
          </div>

          <div style={{ backgroundColor: '#EBF8FF', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #3182CE' }}>
            <div style={{ fontSize: '12px', color: '#2B6CB0', fontWeight: 'bold' }}>Təhvil verildi</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>0 ədəd</div>
          </div>

          <div style={{ backgroundColor: '#FFF5F5', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #E53E3E' }}>
            <div style={{ fontSize: '12px', color: '#9B2C2C', fontWeight: 'bold' }}>Ləğv edildi</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>0 ədəd</div>
          </div>

        </div>
      </div>

      {/* Son Sifarişlər Cədvəli */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2D7C7', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2D7C7' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2C1D11', margin: 0 }}>Son Sifarişlər</h3>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9F6F0', borderBottom: '1px solid #E2D7C7', color: '#7A624E', fontSize: '12px' }}>
                <th style={{ padding: '12px 20px' }}>Müştəri / Tel</th>
                <th style={{ padding: '12px 20px' }}>Məhsul Kodu</th>
                <th style={{ padding: '12px 20px' }}>Məhsul</th>
                <th style={{ padding: '12px 20px' }}>Məbləğ</th>
                <th style={{ padding: '12px 20px' }}>Sifariş / Təhvil Tarixi</th>
                <th style={{ padding: '12px 20px' }}>Status (Hamısı)</th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F2EFE9' }}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 'bold', color: '#2C1D11' }}>Aytac</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>070 970 09 79</div>
                </td>
                <td style={{ padding: '16px 20px', color: '#4A5568' }}>ALP-001</td>
                <td style={{ padding: '16px 20px', color: '#2C1D11' }}>odeyal 183</td>
                <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#2C1D11' }}>80.00 AZN</td>
                <td style={{ padding: '16px 20px', fontSize: '12px', color: '#4A5568' }}>
                  <div>Sifariş: 07/08/26</div>
                  <div>Təhvil: -</div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#FEFCBF', color: '#744210', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
                    Hazırlanır
                  </span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button style={{ backgroundColor: '#FDFBF7', border: '1px solid #E2D7C7', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#2C1D11', fontWeight: '500' }}>
                    ✎ Düzəliş
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}