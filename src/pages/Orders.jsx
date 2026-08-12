import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: 'ALP-001',
      customerName: 'Leyla',
      customerPhone: '0559876543',
      orderDate: '04.08.26',
      deliveryDate: '07.08.26',
      product: 'Uşaq Yorğanı',
      yarn: 'Alize Puffy',
      color: '55 - Ağ',
      pattern: 'Klassik Hörgü',
      size: '90x90 sm',
      costPrice: '35.00 AZN',
      sellingPrice: '80.00 AZN',
      profit: '+45.00 AZN',
      status: 'Hazırlanır'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    code: 'ALP-002', customerName: '', customerPhone: '', orderDate: '12.08.26', deliveryDate: '', product: '', yarn: 'Alize Puffy', color: 'Qəhvəyi', pattern: '', size: '', costPrice: '', sellingPrice: '', status: 'Hazırlanır'
  });

  const statusOptions = {
    'Hazırlanır': { bg: '#fff3cd', color: '#856404' },
    'Hazırdır': { bg: '#d4edda', color: '#155724' },
    'Təhvil Verildi': { bg: '#cce5ff', color: '#004085' },
    'Ləğv edildi': { bg: '#f8d7da', color: '#721c24' }
  };

  const changeStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    setOrders([ { ...newOrder, id: Date.now(), profit: (parseFloat(newOrder.sellingPrice) - parseFloat(newOrder.costPrice)).toFixed(2) + ' AZN' }, ...orders ]);
    setIsAddModalOpen(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Sifarişlər</h2>
        <button onClick={() => setIsAddModalOpen(true)} style={{ backgroundColor: '#5a3d28', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+ Yeni Sifariş</button>
      </div>

      <div style={{ marginBottom: '20px', position: 'relative', width: '300px' }}>
        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#000', fontSize: '18px' }}>🔍</span>
        <input type="text" placeholder="Axtarış..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff', borderBottom: '2px solid #eee', color: '#555' }}>
              <th style={{ padding: '12px' }}>KOD</th>
              <th style={{ padding: '12px' }}>MÜŞTƏRİ / TEL</th>
              <th style={{ padding: '12px' }}>Tarix (Sifariş / Təhvil)</th>
              <th style={{ padding: '12px' }}>MƏHSUL</th>
              <th style={{ padding: '12px' }}>İP</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>RƏNG</th>
              <th style={{ padding: '12px' }}>HÖRGÜ / ÖLÇÜ</th>
              <th style={{ padding: '12px' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px' }}>QAZANC</th>
              <th style={{ padding: '12px' }}>STATUS</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>ƏMƏLİYYAT</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{order.code}</td>
                <td style={{ padding: '12px' }}><div>{order.customerName}</div><div style={{ fontSize: '11px', color: '#777' }}>{order.customerPhone}</div></td>
                <td style={{ padding: '12px' }}>{order.orderDate} / {order.deliveryDate}</td>
                <td style={{ padding: '12px' }}>{order.product}</td>
                <td style={{ padding: '12px' }}>{order.yarn}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.color}</td>
                <td style={{ padding: '12px' }}>{order.pattern}<br/><span style={{ fontSize: '11px', color: '#777' }}>{order.size}</span></td>
                <td style={{ padding: '12px' }}>{order.costPrice}</td>
                <td style={{ padding: '12px' }}>{order.sellingPrice}</td>
                <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold' }}>{order.profit}</td>
                <td style={{ padding: '12px' }}>
                  <select value={order.status} onChange={(e) => changeStatus(order.id, e.target.value)} style={{ padding: '4px', backgroundColor: statusOptions[order.status].bg, color: statusOptions[order.status].color, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {Object.keys(statusOptions).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', transform: 'scaleX(-1)', cursor: 'pointer', marginRight: '12px', fontSize: '16px' }}>✎</span>
                  <span style={{ cursor: 'pointer', fontSize: '20px' }}>🗑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;