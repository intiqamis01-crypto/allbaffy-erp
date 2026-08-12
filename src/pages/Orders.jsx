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
      source: 'Instagram',
      status: 'Hazırlanır'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
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
    sellingPrice: '',
    source: 'Instagram'
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

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
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
      sellingPrice: '',
      source: 'Instagram'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingId(order.id);
    setFormData({
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      product: order.product,
      yarn: order.yarn,
      color: order.color,
      pattern: order.pattern,
      size: order.size,
      costPrice: parseFloat(order.costPrice) || '',
      sellingPrice: parseFloat(order.sellingPrice) || '',
      source: order.source
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cost = parseFloat(formData.costPrice) || 0;
    const selling = parseFloat(formData.sellingPrice) || 0;
    const profitVal = (selling - cost).toFixed(2);

    if (editingId !== null) {
      setOrders(orders.map(o => o.id === editingId ? {
        ...o, ...formData,
        costPrice: `${cost.toFixed(2)} AZN`,
        sellingPrice: `${selling.toFixed(2)} AZN`,
        profit: `${profitVal >= 0 ? '+' : ''}${profitVal} AZN`
      } : o));
    } else {
      const nextCodeNum = orders.length + 1;
      setOrders([{
        id: Date.now(),
        code: `ALP-${String(nextCodeNum).padStart(3, '0')}`,
        ...formData,
        costPrice: `${cost.toFixed(2)} AZN`,
        sellingPrice: `${selling.toFixed(2)} AZN`,
        profit: `${profitVal >= 0 ? '+' : ''}${profitVal} AZN`,
        status: 'Hazırlanır'
      }, ...orders]);
    }
    setIsModalOpen(false);
  };

  const filteredOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase();
    return Object.values(order).some(val => String(val).toLowerCase().includes(term));
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Sifarişlər</h2>
        <button onClick={openAddModal} style={{ backgroundColor: '#5a3d28', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+ Yeni Sifariş</button>
      </div>

      <input type="text" placeholder="Axtarış..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '300px', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' }} />

      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff', borderBottom: '2px solid #eee' }}>
              <th style={{ padding: '12px', textAlign: 'center' }}>KOD</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>MÜŞTƏRİ</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>MƏNBƏ</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>MƏHSUL</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>QAZANC</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>STATUS</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>ƏMƏLİYYAT</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
                <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{order.code}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.customerName}<br/><span style={{fontSize: '11px', color: '#777'}}>{order.customerPhone}</span></td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.source}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{order.product}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: '#28a745', fontWeight: 'bold' }}>{order.profit}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <select value={order.status} onChange={(e) => changeStatus(order.id, e.target.value)} style={{ padding: '4px', backgroundColor: statusOptions[order.status].bg, border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {Object.keys(statusOptions).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span onClick={() => openEditModal(order)} style={{ cursor: 'pointer', marginRight: '10px' }}>✎</span>
                  <span onClick={() => deleteOrder(order.id)} style={{ cursor: 'pointer' }}>🗑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Müştəri Adı" required value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} style={{ padding: '8px' }} />
              <input type="text" placeholder="Müştəri Telefonu" required value={formData.customerPhone} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} style={{ padding: '8px' }} />
              <select value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} style={{ padding: '8px' }}>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="TikTok">TikTok</option>
                <option value="Digər">Digər</option>
              </select>
              <input type="text" placeholder="Məhsul" required value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} style={{ padding: '8px' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" placeholder="Maya" required value={formData.costPrice} onChange={(e) => setFormData({...formData, costPrice: e.target.value})} style={{ flex: 1, padding: '8px' }} />
                <input type="number" placeholder="Satış" required value={formData.sellingPrice} onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})} style={{ flex: 1, padding: '8px' }} />
              </div>
              <button type="submit" style={{ padding: '10px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px' }}>{editingId !== null ? 'Yenilə' : 'Əlavə et'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;