import React, { useState } from 'react';
import { LuClock, LuTriangleAlert, LuPencil } from 'react-icons/lu';

const Dashboard = () => {
  // Statik nümunə məlumatları
  const [orders] = useState([
    {
      id: 1,
      customer: 'Aytac',
      phone: '070 970 09 79',
      productCode: 'ALP-001',
      product: 'odeyal 183',
      amount: '80.00 AZN',
      orderDate: '07/08/26',
      deliveryDate: '-',
      status: 'Hazırlanır'
    }
  ]);

  return (
    <div style={{ padding: '8px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Səhifə Başlığı */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#2C1D11' }}>Əsas Səhifə</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#7A624E' }}>
          Ümumi biznes xülasəsi, analitika və xəbərdarlıqlar
        </p>
      </div>

      {/* 1. Yuxarı Analitika Kartları (4 Metrika) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        
        {/* Sifarişlər */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ÜMUMİ SİFARİŞLƏR</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>1 ədəd</div>
        </div>

        {/* Satış */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GƏLİR</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>80.00 AZN</div>
        </div>

        {/* Rasxod */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>XƏRC</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2C1D11', marginTop: '6px' }}>35.00 AZN</div>
        </div>

        {/* Qazanc */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2D7C7', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#7A624E', textTransform: 'uppercase', letterSpacing: '0.5px' }}>QAZANC</span>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2E7D32', marginTop: '6px' }}>+45.00 AZN</div>
        </div>

      </div>

      {/* 2. Xəbərdarlıq Qutuları (2 ədəd) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Təhvil xəbərdarlığı */}
        <div style={{ backgroundColor: '#FDEDED', border: '1px solid #FAD2D2', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D32F2F', fontWeight: 'bold', fontSize: '13px' }}>
            <LuClock size={16} />
            <span>Təhvilinə 1 Gün Qalan və ya Keçən Sifarişlər (0)</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#7D5252' }}>
            Təhvil tarixi yaxınlaşan təcili sifariş yoxdur.
          </p>
        </div>

        {/* Stok xəbərdarlığı */}
        <div style={{ backgroundColor: '#FFFDE7', border: '1px solid #FFF59D', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F57F17', fontWeight: 'bold', fontSize: '13px' }}>
            <LuTriangleAlert size={16} />
            <span>Stoku Azalan İplər və Materiallar (0)</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#7D6F52' }}>
            Stokda kritik səviyyədə azalan xammal və ya məhsul yoxdur.
          </p>
        </div>

      </div>

      {/* 3. Sifariş Statusları Blokları */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2D7C7', marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 'bold', color: '#2C1D11' }}>Sifariş Statusları</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          
          {/* Hazırlanır */}
          <div style={{ backgroundColor: '#FFF9C4', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #FBC02D' }}>
            <span style={{ fontSize: '12px', color: '#5D4037', fontWeight: 'bold' }}>Hazırlanır</span>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>1 ədəd</div>
          </div>

          {/* Hazırdır */}
          <div style={{ backgroundColor: '#E8F5E9', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #4CAF50' }}>
            <span style={{ fontSize: '12px', color: '#1B5E20', fontWeight: 'bold' }}>Hazırdır</span>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>0 ədəd</div>
          </div>

          {/* Təhvil verildi */}
          <div style={{ backgroundColor: '#E3F2FD', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
            <span style={{ fontSize: '12px', color: '#0D47A1', fontWeight: 'bold' }}>Təhvil verildi</span>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>0 ədəd</div>
          </div>

          {/* Ləğv edildi */}
          <div style={{ backgroundColor: '#FFEBEE', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #EF5350' }}>
            <span style={{ fontSize: '12px', color: '#B71C1C', fontWeight: 'bold' }}>Ləğv edildi</span>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C1D11', marginTop: '4px' }}>0 ədəd</div>
          </div>

        </div>
      </div>

      {/* 4. Son Sifarişlər Cədvəli */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2D7C7', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2D7C7' }}>
          <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#2C1D11' }}>Son Sifarişlər</h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF7F2', color: '#7A624E', borderBottom: '1px solid #E2D7C7' }}>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Müştəri / Tel</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Məhsul Kodu</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Məhsul</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Məbləğ</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Sifariş / Təhvil Tarixi</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Status (Hamısı)</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold', textAlign: 'right' }}>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F0EAE1' }}>
                  <td style={{ padding: '12px 16px', color: '#2C1D11' }}>
                    <div style={{ fontWeight: 'bold' }}>{item.customer}</div>
                    <div style={{ fontSize: '11px', color: '#7A624E' }}>{item.phone}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#5D4037', fontWeight: '500' }}>{item.productCode}</td>
                  <td style={{ padding: '12px 16px', color: '#2C1D11' }}>{item.product}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#2C1D11' }}>{item.amount}</td>
                  <td style={{ padding: '12px 16px', color: '#7A624E', fontSize: '12px' }}>
                    <div>Sifariş: {item.orderDate}</div>
                    <div>Təhvil: {item.deliveryDate}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ 
                      backgroundColor: '#FFF9C4', 
                      color: '#8D6E63', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 'bold',
                      border: '1px solid #FFE082'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button 
                      type="button" 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px', 
                        padding: '6px 12px', 
                        backgroundColor: '#FAF7F2', 
                        border: '1px solid #D8C8B8', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        color: '#4A3525', 
                        cursor: 'pointer' 
                      }}
                    >
                      <LuPencil size={12} />
                      <span>Düzəliş</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;