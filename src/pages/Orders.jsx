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
      daysCount: 7,
      product: 'Odeyallar',
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

  const productOptions = [
    'Odeyallar', 
    'Şərflər', 
    'Hədiyyəlik gift boxlar', 
    'Xəstəxana çıxışı pampers tortları', 
    'Jaket', 
    'Jilet', 
    'Oyun matı'
  ];

  const yarnOptions = ['Alize Puffy', 'Alize Puffy Fine', 'Digər'];
  const categoryOptions = ['Körpə Tekstili', 'Aksessuar', 'Hədiyyə', 'Geyim'];

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    customerName: '',
    phone: '',
    source: 'WhatsApp',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    daysCount: 0,
    product: 'Odeyallar',
    category: 'Körpə Tekstili',
    yarnType: 'Alize Puffy',
    color: '',
    knitType: 'Klassik Hörgü',
    size: '90x90 cm',
    costPrice: '',
    salePrice: '',
    profit: '',
    status: 'Hazırlanır'
  });

  const handleDateChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    if (updatedForm.orderDate && updatedForm.deliveryDate) {
      const d1 = new Date(updatedForm.orderDate);
      const d2 = new Date(updatedForm.deliveryDate);
      const diffTime = d2 - d1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      updatedForm.daysCount = diffDays >= 0 ? diffDays : 0;
    }
    setFormData(updatedForm);
  };

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

  const handleOpenAddModal = () => {
    const nextIdNum = orders.length + 1;
    const generatedId = `ALP-${String(nextIdNum).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    setFormData({
      id: generatedId,
      customerName: '',
      phone: '',
      source: 'WhatsApp',
      orderDate: today,
      deliveryDate: today,
      daysCount: 0,
      product: 'Odeyallar',
      category: 'Körpə Tekstili',
      yarnType: 'Alize Puffy',
      color: '',
      knitType: 'Klassik Hörgü',
      size: '90x90 cm',
      costPrice: '',
      salePrice: '',
      profit: '',
      status: 'Hazırlanır'
    });
    setIsAddModalOpen(true);
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
          onClick={handleOpenAddModal}
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
                    type="button"
                    onClick={() => handleEditClick(order)} 
                    title="Düzəliş et" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px', color: '#e65100', transform: 'scaleX(-1)', display: 'inline-block' }}
                  >
                    ✏️
                  </button>
                  <button 
                    type="button"
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

      {(isAddModalOpen || isEditModalOpen) && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '550px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px', color: '#3D2C22' }}>{isAddModalOpen ? 'Yeni Sifariş Əlavə Et' : 'Sifarişə Düzəliş Et'}</h2>
            <form onSubmit={isAddModalOpen ? handleSaveAdd : handleSaveEdit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Sifariş Kodu:</label>
                <input 
                  type="text" 
                  value={formData.id} 
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Müştəri Adı:</label>
                <input 
                  type="text" 
                  value={formData.customerName} 
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Telefon:</label>
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Mənbə:</label>
                <select 
                  value={formData.source} 
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Sifariş Tarixi:</label>
                <input 
                  type="date" 
                  value={formData.orderDate} 
                  onChange={(e) => handleDateChange('orderDate', e.target.value)}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Təhvil Tarixi:</label>
                <input 
                  type="date" 
                  value={formData.deliveryDate} 
                  onChange={(e) => handleDateChange('deliveryDate', e.target.value)}
                  required 
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Məhsul Adı:</label>
                <select 
                  value={formData.product} 
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {productOptions.map((prod, idx) => (
                    <option key={idx} value={prod}>{prod}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Kateqoriya:</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {categoryOptions.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>İpin Növü:</label>
                <select 
                  value={formData.yarnType} 
                  onChange={(e) => setFormData({...formData, yarnType: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {yarnOptions.map((yarn, idx) => (
                    <option key={idx} value={yarn}>{yarn}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Rəng (Kod və Ad):</label>
                <input 
                  type="text" 
                  placeholder="Məs: 183 – Çəhrayı" 
                  value={formData.color} 
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Hörgü Növü:</label>
                <input 
                  type="text" 
                  placeholder="Məs: Klassik Hörgü" 
                  value={formData.knitType} 
                  onChange={(e) => setFormData({...formData, knitType: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Ölçü:</label>
                <input 
                  type="text" 
                  placeholder="Məs: 90x90 cm" 
                  value={formData.size} 
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Maya Dəyəri:</label>
                <input 
                  type="text" 
                  placeholder="Məs: 12.00 AZN" 
                  value={formData.costPrice} 
                  onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Satış Qiyməti:</label>
                <input 
                  type="text" 
                  placeholder="Məs: 30.00 AZN" 
                  value={formData.salePrice} 
                  onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Qazanc:</label>
                <input 
                  type="text" 
                  placeholder="Məs: +18.00 AZN" 
                  value={formData.profit} 
                  onChange={(e) => setFormData({...formData, profit: e.target.value})}
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