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

      {/* Xəbərdarlıq Qutuları */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Təcili Sifarişlər Qutusu */}
        <div style={{ backgroundColor: '#FFF5F5', border: '1px solid #F5C6CB', padding: '16px 20px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '18px', lineHeight: '1.2' }}>⏰</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#C53030' }}>Təhvilinə 1 Gün Qalan və ya Keçən Sifarişlər (0)</div>
            <div style={{ fontSize: '12px', color: '#718096', marginTop: '2px' }}>Təhvil tarixi yaxınlaşan təcili sifariş yoxdur.</div>
          </div>
        </div>

        {/* Stoku Azalan İplər Qutusu */}
        <div style={{ backgroundColor: '#FFFDF0', border: '1px solid #FEE88D', padding: '16px 20px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ fontSize: '18px', lineHeight: '1.2' }}>⚠️</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#975A16' }}>Stoku Azalan İplər və Materiallar (0)</div>
            <div style={{ fontSize: '12px', color: '#718096', marginTop: '2px' }}>Stokda kritik səviyyədə azalan xammal və ya məhsul yoxdur.</div>
          </div>
        </div>

      </div>

      {/* Sifariş Statusları */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2D7C7', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2C1D11', margin: '0 0 16px 0' }}>Sifariş Statusları</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          
          <div style={{ backgroundColor: '#FFFDF0', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #D69E2E' }}>
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

      {/* Son Sifarişlər Cədvəli (Sifarişlər səhifəsinin strukturu ilə) */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2D7C7', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2D7C7', backgroundColor: '#FDFBF7' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#2C1D11', margin: 0 }}>Son Sifarişlər</h3>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9F6F0', borderBottom: '1px solid #E2D7C7', color: '#7A624E', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '12px 16px' }}>Kod</th>
                <th style={{ padding: '12px 16px' }}>Müştəri / Tel</th>
                <th style={{ padding: '12px 16px' }}>Mənbə</th>
                <th style={{ padding: '12px 16px' }}>Tarix (Sifariş / Təhvil)</th>
                <th style={{ padding: '12px 16px' }}>Məhsul</th>
                <th style={{ padding: '12px 16px' }}>İp</th>
                <th style={{ padding: '12px 16px' }}>Rəng</th>
                <th style={{ padding: '12px 16px' }}>Ölçü</th>
                <th style={{ padding: '12px 16px' }}>Maya</th>
                <th style={{ padding: '12px 16px' }}>Satış</th>
                <th style={{ padding: '12px 16px' }}>Qazanc</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F2EFE9' }}>
                <td style={{ padding: '14px 16px', color: '#4A5568', fontWeight: 'bold' }}>ALP-001</td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 'bold', color: '#2C1D11' }}>Leyla</div>
                  <div style={{ fontSize: '11px', color: '#7A624E' }}>0559876543</div>
                </td>
                <td style={{ padding: '14px 16px', color: '#2C1D11' }}>Instagram</td>
                <td style={{ padding: '14px 16px', fontSize: '12px', color: '#4A5568' }}>
                  <div>04.08.26</div>
                  <div style={{ color: '#7A624E', fontSize: '11px' }}>07.08.26</div>
                </td>
                <td style={{ padding: '14px 16px', color: '#2C1D11' }}>Uşaq Yorğanı</td>
                <td style={{ padding: '14px 16px', color: '#4A5568' }}>Alize Puffy</td>
                <td style={{ padding: '14px 16px', color: '#4A5568' }}>55 - Ağ</td>
                <td style={{ padding: '14px 16px', color: '#4A5568' }}>90x90 sm</td>
                <td style={{ padding: '14px 16px', color: '#4A5568' }}>13.50 AZN</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2C1D11' }}>80.00 AZN</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#15803d' }}>+66.50 AZN</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ backgroundColor: '#FFFDF0', color: '#975A16', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #FEE88D' }}>
                    Hazırlanır
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <button style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2D7C7', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#2C1D11' }}>
                    ✎
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