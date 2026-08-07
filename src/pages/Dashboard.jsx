import React from 'react';

export default function Dashboard({ orders = [], products = [] }) {
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0);
  const totalCost = orders.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
  const totalProfit = totalRevenue - totalCost;

  const hazirlanirCount = orders.filter(o => o.status === 'Hazırlanır').length;
  const hazirdirCount = orders.filter(o => o.status === 'Hazırdır').length;
  const tehvilVerildiCount = orders.filter(o => o.status === 'Təhvil verildi').length;
  const legvEdildiCount = orders.filter(o => o.status === 'Ləğv edildi').length;

  const urgentOrders = orders.filter(o => o.status === 'Hazırlanır');
  const lowStockProducts = products.filter(p => Number(p.stock) <= 3);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hazırlanır':
        return { bg: '#FEF3C7', color: '#92400E' };
      case 'Hazırdır':
        return { bg: '#D1FAE5', color: '#065F46' };
      case 'Təhvil verildi':
        return { bg: '#DBEAFE', color: '#1E40AF' };
      case 'Ləğv edildi':
        return { bg: '#FEE2E2', color: '#991B1B' };
      default:
        return { bg: '#F3F4F6', color: '#374151' };
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>Dashboard</h1>
        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>
          Ümumi biznes xülasəsi, analitika və xəbərdarlıqlar
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.5px' }}>ÜMUMİ SİFARİŞLƏR</div>
          <div style={{ marginTop: '8px', fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>{totalOrdersCount} ədəd</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.5px' }}>GƏLİR</div>
          <div style={{ marginTop: '8px', fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>{totalRevenue.toFixed(2)} AZN</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.5px' }}>XƏRC</div>
          <div style={{ marginTop: '8px', fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>{totalCost.toFixed(2)} AZN</div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.5px' }}>QAZANC</div>
          <div style={{ marginTop: '8px', fontSize: '22px', fontWeight: 'bold', color: '#16a34a' }}>
            {totalProfit >= 0 ? `+${totalProfit.toFixed(2)}` : totalProfit.toFixed(2)} AZN
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', padding: '14px 18px', borderRadius: '10px' }}>
          <div style={{ color: '#DC2626', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
            ⏰ Təhvilinə 1 Gün Qalan və ya Keçən Sifarişlər ({urgentOrders.length})
          </div>
          <div style={{ color: '#991B1B', fontSize: '12px' }}>
            Təhvil tarixi yaxınlaşan təcili sifariş yoxdur.
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', padding: '14px 18px', borderRadius: '10px' }}>
          <div style={{ color: '#D97706', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
            ⚠️ Stoku Azalan İplər və Materiallar ({lowStockProducts.length})
          </div>
          <div style={{ color: '#92400E', fontSize: '12px' }}>
            Stokda kritik səviyyədə azalan xammal və ya məhsul yoxdur.
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '18px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <div style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>Sifariş Statusları</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          <div style={{ backgroundColor: '#FEF3C7', padding: '12px 15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#92400E', fontWeight: 'bold' }}>Hazırlanır</div>
            <div style={{ marginTop: '4px', color: '#92400E', fontSize: '18px', fontWeight: 'bold' }}>{hazirlanirCount} ədəd</div>
          </div>
          <div style={{ backgroundColor: '#D1FAE5', padding: '12px 15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#065F46', fontWeight: 'bold' }}>Hazırdır</div>
            <div style={{ marginTop: '4px', color: '#065F46', fontSize: '18px', fontWeight: 'bold' }}>{hazirdirCount} ədəd</div>
          </div>
          <div style={{ backgroundColor: '#DBEAFE', padding: '12px 15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: 'bold' }}>Təhvil verildi</div>
            <div style={{ marginTop: '4px', color: '#1E40AF', fontSize: '18px', fontWeight: 'bold' }}>{tehvilVerildiCount} ədəd</div>
          </div>
          <div style={{ backgroundColor: '#FEE2E2', padding: '12px 15px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#991B1B', fontWeight: 'bold' }}>Ləğv edildi</div>
            <div style={{ marginTop: '4px', color: '#991B1B', fontSize: '18px', fontWeight: 'bold' }}>{legvEdildiCount} ədəd</div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '18px 20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <div style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>Son Sifarişlər</div>

        {orders.length === 0 ? (
          <div style={{ color: '#94a3b8', fontSize: '13px', padding: '10px 0' }}>Hələ ki, heç bir sifariş daxil edilməyib.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 'bold', fontSize: '12px' }}>
                  <th style={{ padding: '10px 8px' }}>Müştəri / Tel</th>
                  <th style={{ padding: '10px 8px' }}>Məhsul Kodu</th>
                  <th style={{ padding: '10px 8px' }}>Məhsul</th>
                  <th style={{ padding: '10px 8px' }}>Məbləğ</th>
                  <th style={{ padding: '10px 8px' }}>Sifariş / Təhvil Tarixi</th>
                  <th style={{ padding: '10px 8px' }}>Status (Hamısı) ▾</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => {
                  const badge = getStatusBadge(item.status);
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ fontWeight: 'bold', color: '#0f172a' }}>{item.customerName}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{item.phone || '-'}</div>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#475569' }}>{item.productCode || 'ALP-001'}</td>
                      <td style={{ padding: '12px 8px', color: '#334155' }}>{item.productSearch}</td>
                      <td style={{ padding: '12px 8px', fontWeight: 'bold', color: '#0f172a' }}>
                        {Number(item.totalAmount || 0).toFixed(2)} AZN
                      </td>
                      <td style={{ padding: '12px 8px', fontSize: '11px', color: '#475569' }}>
                        <div>Sifariş: {item.orderDate || '-'}</div>
                        <div>Təhvil: {item.dueDate || '-'}</div>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          backgroundColor: badge.bg,
                          color: badge.color,
                          padding: '3px 8px',
                          borderRadius: '5px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          {item.status || 'Hazırlanır'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}