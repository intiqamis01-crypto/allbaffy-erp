import React, { useState } from 'react';

const Orders = () => {
  // Nümunə sifariş məlumatları (öz state və ya Firebase datanız ilə əvəz edə bilərsiniz)
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: 'AB-2026-001',
      customer: 'Aysel Məmmədova / +994 50 123 45 67',
      source: 'Instagram',
      date: '12.08.2026',
      product: 'Odeyal',
      yarn: 'Alize Puffy',
      color: 'Tünd qəhvəyi',
      patternSize: 'Klassik ilmə / 100x100 sm',
      costPrice: '18 AZN',
      sellingPrice: '35 AZN',
      profit: '17 AZN',
      status: 'Hazırlanır'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sifarişlər Səhifəsi</h2>

      {/* Cədvəl Hissəsi */}
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px' }}>Kod</th>
              <th style={{ padding: '12px' }}>Müştəri / Tel</th>
              <th style={{ padding: '12px' }}>Mənbə</th>
              <th style={{ padding: '12px' }}>Tarix</th>
              <th style={{ padding: '12px' }}>Məhsul</th>
              <th style={{ padding: '12px' }}>İp</th>
              <th style={{ padding: '12px' }}>Rəng</th>
              <th style={{ padding: '12px' }}>Hörgü növü / Ölçü</th>
              <th style={{ padding: '12px' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px' }}>Qazanc</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{order.code}</td>
                <td style={{ padding: '12px' }}>{order.customer}</td>
                <td style={{ padding: '12px' }}>{order.source}</td>
                <td style={{ padding: '12px' }}>{order.date}</td>
                <td style={{ padding: '12px' }}>{order.product}</td>
                <td style={{ padding: '12px' }}>{order.yarn}</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#4a3b32' }}>{order.color}</td>
                <td style={{ padding: '12px' }}>{order.patternSize}</td>
                <td style={{ padding: '12px' }}>{order.costPrice}</td>
                <td style={{ padding: '12px' }}>{order.sellingPrice}</td>
                <td style={{ padding: '12px', color: 'green', fontWeight: 'bold' }}>{order.profit}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 8px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button style={{ marginRight: '5px', padding: '5px 10px' }}>Redaktə</button>
                  <button style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px' }}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal və ya düymələr hissəsi (şəkildəki kodunuza uyğun olaraq) */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
        <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px' }}>
          Bağla
        </button>
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Yadda saxla
        </button>
      </div>
    </div>
  );
};

export default Orders;