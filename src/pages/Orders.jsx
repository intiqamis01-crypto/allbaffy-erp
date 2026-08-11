import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('allbaffy_orders');
    return saved ? JSON.parse(saved) : [{
      id: 'ALP-001',
      customerName: 'Aysel',
      phone: '0501234567',
      source: 'WhatsApp',
      orderDate: '2026-08-01',
      deliveryDate: '2026-08-08',
      daysCount: 3,
      product: 'Uşaq Yorğanı',
      category: 'Körpə Tekstili',
      yarnType: 'Alize Puffy',
      color: '183 – Çəhrayı',
      knitType: 'Klassik Hörgü',
      size: '90x90 cm',
      costPrice: '12.00 AZN',
      salePrice: '30.00 AZN',
      profit: '+18.00 AZN',
      status: 'Hazırlanır'
    }];
  });

  useEffect(() => {
    localStorage.setItem('allbaffy_orders', JSON.stringify(orders));
  }, [orders]);

  const sources = [
    { name: 'Instagram', icon: '📷' },
    { name: 'WhatsApp', icon: '💬' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Form state for adding/editing
  const [formData, setFormData] = useState({
    id: 'ALP-002',
    customerName: '',
    phone: '',
    source: 'WhatsApp',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    daysCount: 3,
    product: '',
    category: '',
    yarnType: 'Alize Puffy',
    color: '',
    knitType: '',
    size: '',
    costPrice: '',
    salePrice: '',
    profit: '',
    status: 'Hazırlanır'
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Hazırlanır': return { background: '#fef08a', color: '#854d0e', borderLeft: '4px solid #eab308' };
      case 'Hazırdır': return { background: '#dcfce7', color: '#166534', borderLeft: '4px solid #22c55e' };
      case 'Təhvil verildi': return { background: '#e0f2fe', color: '#0369a1', borderLeft: '4px solid #0ea5e9' };
      case 'Ləğv edildi': return { background: '#fee2e2', color: '#991b1b', borderLeft: '4px solid #ef4444' };
      default: return { background: '#f3f4f6', color: '#374151' };
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsiniz?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const handleEditClick = (order) => {
    setCurrentOrder(order);
    setFormData(order);
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    setOrders([formData, ...orders]);
    setIsAddModalOpen(false);
    setFormData({
      id: `ALP-00${orders.length + 2}`,
      customerName: '',
      phone: '',
      source: 'WhatsApp',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      daysCount: 3,
      product: '',
      category: '',
      yarnType: 'Alize Puffy',
      color: '',
      knitType: '',
      size: '',
      costPrice: '',
      salePrice: '',
      profit: '',
      status: 'Hazırlanır'
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setOrders(orders.map(o => o.id === currentOrder.id ? formData : o));
    setIsEditModalOpen(false);
    setCurrentOrder(null);
  };

  const filteredOrders = orders.filter(order =>
    Object.values(order).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ padding: '30px', backgroundColor: '#FDFBF7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#4A3B32', direction: 'ltr', fontSize: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#3D2C22' }}>Sifarişlər</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          style={{ backgroundColor: '#2e7d32', color: 'white', padding: '10px 18px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
        >
          + Yeni Sifariş
        </button>
      </div>

      <input
        type="text"
        placeholder="Axtarış (Müştəri, Mənbə, Telefon, Kod, Məhsul, Rəng, Hörgü və s.)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', maxWidth: '600px', padding: '12px 15px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #D7CCC8', outline: 'none', fontSize: '15px', backgroundColor: 'white' }}
      />

      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EFEBE9', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F2EF', color: '#5C4033', fontSize: '14px' }}>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Müştəri / Tel</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Kod</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Mənbə</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Tarixlər (Sifariş / Təhvil)</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Məhsul Adı</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Kateqoriya</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>İpin Növü</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Rəng</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Hörgü / Ölçü</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Maya Dəyəri</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Satış Qiyməti</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Qazanc</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Status</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal', textAlign: 'center' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #EFEBE9' }}>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ fontWeight: 'bold' }}>{order.customerName}</div>
                  <div style={{ color: '#777', fontSize: '13px', marginTop: '2px' }}>{order.phone}</div>
                </td>
                <td style={{ padding: '14px 12px', fontWeight: 'bold' }}>{order.id}</td>
                <td style={{ padding: '14px 12px' }}>{sources.find(s => s.name === order.source)?.icon} {order.source}</td>
                <td style={{ padding: '14px 12px', fontSize: '14px' }}>
                  <div>📅 {order.orderDate} <span style={{ color: '#777', fontSize: '12px' }}>({order.daysCount || 0} gün)</span></div>
                  <div style={{ marginTop: '6px' }}>🚚 {order.deliveryDate}</div>
                </td>
                <td style={{ padding: '14px 12px' }}>{order.product}</td>
                <td style={{ padding: '14px 12px' }}>{order.category}</td>
                <td style={{ padding: '14px 12px' }}>{order.yarnType}</td>
                <td style={{ padding: '14px 12px' }}>{order.color}</td>
                <td style={{ padding: '14px 12px' }}>
                  <div style={{ fontWeight: '500' }}>{order.knitType}</div>
                  <div style={{ color: '#777', fontSize: '13px', marginTop: '2px' }}>{order.size}</div>
                </td>
                <td style={{ padding: '14px 12px' }}>{order.costPrice}</td>
                <td style={{ padding: '14px 12px' }}>{order.salePrice}</td>
                <td style={{ padding: '14px 12px', color: '#2e7d32', fontWeight: 'bold' }}>{order.profit}</td>
                <td style={{ padding: '14px 12px' }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ padding: '6px 10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', ...getStatusStyle(order.status) }}
                  >
                    <option value="Hazırlanır">Hazırlanır</option>
                    <option value="Hazırdır">Hazırdır</option>
                    <option value="Təhvil verildi">Təhvil verildi</option>
                    <option value="Ləğv edildi">Ləğv edildi</option>
                  </select>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleEditClick(order)} 
                    title="Düzəliş et" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px', color: '#e65100', transform: 'scaleX(-1)', display: 'inline-block' }}
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(order.id)} 
                    title="Sil" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#212121' }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Yeni Sifariş və ya Redaktə üçün Modal pəncərələrin sadələşdirilmiş idarəsi */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px', color: '#3D2C22' }}>{isAddModalOpen ? 'Yeni Sifariş Əlavə Et' : 'Sifarişə Düzəliş Et'}</h2>
            <form onSubmit={isAddModalOpen ? handleSaveAdd : handleSaveEdit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Müştəri Adı:</label>
                <input 
                  type="text" 
                  value={formData.customerName} 
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Telefon:</label>
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Məhsul Adı:</label>
                <input 
                  type="text" 
                  value={formData.product} 
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hörgü / Ölçü:</label>
                <input 
                  type="text" 
                  placeholder="Məs: Klassik Hörgü / 90x90 cm" 
                  value={formData.knitType} 
                  onChange={(e) => setFormData({...formData, knitType: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '8px' }}
                />
                <input 
                  type="text" 
                  placeholder="Ölçü (Məs: 90x90 cm)" 
                  value={formData.size} 
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                  style={{ padding: '10px 15px', borderRadius: '6px', border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer' }}
                >
                  Bağla
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 15px', borderRadius: '6px', border: 'none', background: '#2e7d32', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Yadda Saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;