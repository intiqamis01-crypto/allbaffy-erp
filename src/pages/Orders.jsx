import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: 'ALP-001',
      customerName: 'Leyla',
      customerPhone: '0559876543',
      orderDate: '2026-08-04',
      deliveryDate: '2026-08-07',
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
    code: 'ALP-002', customerName: '', customerPhone: '', orderDate: '2026-08-12', deliveryDate: '2026-08-15', product: '', yarn: 'Alize Puffy', color: 'Qəhvəyi', pattern: '', size: '', costPrice: '', sellingPrice: '', status: 'Hazırlanır'
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

  const calculateDays = (start, end) => {
    const diffTime = new Date(end) - new Date(start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `${diffDays} gün` : '';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0].slice(-2)}`;
    }
    return dateStr;
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
        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', filter: 'grayscale(100%)', fontSize: '18px' }}>🔍</span>
        <input type="text" placeholder="Axtarış..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '10px 10px 10px 35px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>KOD</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>MÜŞTƏRİ / TEL</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>Tarix (Sifariş / Təhvil)</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>MƏHSUL</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>İP</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>RƏNG</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>HÖRGÜ / ÖLÇÜ</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>QAZANC</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>STATUS</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#5a3d28' }}>ƏMƏLİYYAT</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
                <td style={{ padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>{order.code}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}><div>{order.customerName}</div><div style={{ fontSize: '11px', color: '#777' }}>{order.customerPhone}</div></td>
                <td style={{ padding: '12px', textAlign: 'center', lineHeight: '1.4' }}>
                  <div>{formatDate(order.orderDate)}</div>
                  <div>{formatDate(order.deliveryDate)} <span style={{ fontSize: '11px', color: '#777' }}>({calculateDays(order.orderDate, order.deliveryDate)})</span></div>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.product}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.yarn}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.color}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.pattern}<br/><span style={{ fontSize: '13px', fontStyle: 'italic', color: '#333' }}>{order.size}</span></td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.costPrice}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.sellingPrice}</td>
                <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold', textAlign: 'center' }}>{order.profit}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
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