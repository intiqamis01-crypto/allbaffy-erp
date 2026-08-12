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
  const [editingId, setEditingId] = useState(null);

  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerPhone: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    product: '',
    yarn: 'Alize Puffy',
    color: '',
    pattern: '',
    size: '',
    costPrice: '',
    sellingPrice: ''
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

  const deleteOrder = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsinizmi?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const startEdit = (order) => {
    setEditingId(order.id);
    // İstəsəniz buranı modal ilə və ya sətrin özündə redaktə üçün genişləndirə bilərik. Hələlik sadə məlumat yeniləmə nümunəsi:
    const newName = prompt("Yeni müştəri adı:", order.customerName);
    if (newName !== null) {
      setOrders(orders.map(o => o.id === order.id ? { ...o, customerName: newName } : o));
    }
    setEditingId(null);
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return '';
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
    const cost = parseFloat(newOrder.costPrice) || 0;
    const selling = parseFloat(newOrder.sellingPrice) || 0;
    const profitVal = (selling - cost).toFixed(2);

    const nextCodeNum = orders.length + 1;
    const formattedCode = `ALP-${String(nextCodeNum).padStart(3, '0')}`;

    const createdOrder = {
      id: Date.now(),
      code: formattedCode,
      customerName: newOrder.customerName,
      customerPhone: newOrder.customerPhone,
      orderDate: newOrder.orderDate,
      deliveryDate: newOrder.deliveryDate,
      product: newOrder.product,
      yarn: newOrder.yarn,
      color: newOrder.color,
      pattern: newOrder.pattern,
      size: newOrder.size,
      costPrice: `${cost.toFixed(2)} AZN`,
      sellingPrice: `${selling.toFixed(2)} AZN`,
      profit: `${profitVal >= 0 ? '+' : ''}${profitVal} AZN`,
      status: 'Hazırlanır'
    };

    setOrders([createdOrder, ...orders]);
    setIsAddModalOpen(false);
    setNewOrder({
      customerName: '',
      customerPhone: '',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      product: '',
      yarn: 'Alize Puffy',
      color: '',
      pattern: '',
      size: '',
      costPrice: '',
      sellingPrice: ''
    });
  };

  const filteredOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase();
    return (
      order.code.toLowerCase().includes(term) ||
      order.customerName.toLowerCase().includes(term) ||
      order.customerPhone.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term) ||
      order.yarn.toLowerCase().includes(term) ||
      order.color.toLowerCase().includes(term) ||
      order.pattern.toLowerCase().includes(term) ||
      order.size.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term)
    );
  });

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
            {filteredOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
                <td style={{ padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>{order.code}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}><div>{order.customerName}</div><div style={{ fontSize: '11px', color: '#777' }}>{order.customerPhone}</div></td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={{ display: 'inline-block', textAlign: 'left', lineHeight: '1.4' }}>
                    <div>{formatDate(order.orderDate)}</div>
                    <div>{formatDate(order.deliveryDate)} <span style={{ fontSize: '11px', color: '#777' }}>({calculateDays(order.orderDate, order.deliveryDate)})</span></div>
                  </div>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.product}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.yarn}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.color}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.pattern}<br/><span style={{ fontSize: '11px', fontStyle: 'italic', color: '#777' }}>{order.size}</span></td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.costPrice}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.sellingPrice}</td>
                <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold', textAlign: 'center' }}>{order.profit}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <select value={order.status} onChange={(e) => changeStatus(order.id, e.target.value)} style={{ padding: '4px', backgroundColor: statusOptions[order.status].bg, color: statusOptions[order.status].color, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {Object.keys(statusOptions).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span onClick={() => startEdit(order)} title="Redaktə et" style={{ display: 'inline-block', transform: 'scaleX(-1)', cursor: 'pointer', marginRight: '12px', fontSize: '16px' }}>✎</span>
                  <span onClick={() => deleteOrder(order.id)} title="Sil" style={{ cursor: 'pointer', fontSize: '20px' }}>🗑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', width: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, color: '#5a3d28' }}>Yeni Sifariş Əlavə Et</h3>
            <form onSubmit={handleAddOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Müştəri Adı</label>
                <input type="text" placeholder="Müştəri adı" required value={newOrder.customerName} onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Müştəri Telefonu</label>
                <input type="text" placeholder="055XXXXXXX" required value={newOrder.customerPhone} onChange={(e) => setNewOrder({...newOrder, customerPhone: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Sifariş Tarixi</label>
                  <input type="date" required value={newOrder.orderDate} onChange={(e) => setNewOrder({...newOrder, orderDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Təhvil Tarixi</label>
                  <input type="date" required value={newOrder.deliveryDate} onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Məhsul</label>
                <input type="text" placeholder="Məs: Uşaq Yorğanı" required value={newOrder.product} onChange={(e) => setNewOrder({...newOrder, product: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>İp</label>
                  <input type="text" placeholder="Alize Puffy" required value={newOrder.yarn} onChange={(e) => setNewOrder({...newOrder, yarn: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Rəng</label>
                  <input type="text" placeholder="Məs: 55 - Ağ" required value={newOrder.color} onChange={(e) => setNewOrder({...newOrder, color: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Hörgü</label>
                  <input type="text" placeholder="Klassik Hörgü" required value={newOrder.pattern} onChange={(e) => setNewOrder({...newOrder, pattern: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Ölçü</label>
                  <input type="text" placeholder="90x90 sm" required value={newOrder.size} onChange={(e) => setNewOrder({...newOrder, size: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Maya Dəyəri</label>
                  <input type="number" step="0.01" placeholder="35.00" required value={newOrder.costPrice} onChange={(e) => setNewOrder({...newOrder, costPrice: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Satış Qiyməti</label>
                  <input type="number" step="0.01" placeholder="80.00" required value={newOrder.sellingPrice} onChange={(e) => setNewOrder({...newOrder, sellingPrice: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '8px 15px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>İmtina</button>
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Əlavə et</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;