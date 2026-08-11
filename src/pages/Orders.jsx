import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('allbaffy_orders');
      return saved ? JSON.parse(saved) : [{
        id: 'ALP-001',
        customerName: 'Aysel',
        phone: '0501234567',
        source: 'Instagram',
        orderDate: '2026-08-01',
        deliveryDate: '2026-08-04',
        daysCount: 3,
        product: 'Uşaq Yorğanı',
        category: 'Körpə Tekstili',
        yarnType: 'Alize Puffy',
        color: '62 – Bej / Krem',
        patternSize: 'Klassik Hörgü\n90x90 cm',
        materials: [{ name: '3 yumaq ip', price: 12.00 }],
        costPrice: 12.00,
        salePrice: 30.00,
        advancePayment: 10,
        advancePaymentType: 'Kart',
        remainingPayment: 20,
        remainingPaymentType: 'Nağd',
        address: 'Koroğlu m/s',
        deliveryPrice: 0,
        status: 'Hazırlanır'
      }];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('allbaffy_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const sources = [
    { name: 'Instagram', icon: '📷' },
    { name: 'WhatsApp', icon: '💬' },
    { name: 'TikTok', icon: '🎵' }
  ];

  const productOptions = [
    'Uşaq Yorğanı', 
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
    source: 'Instagram',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    daysCount: 0,
    product: 'Uşaq Yorğanı',
    category: 'Körpə Tekstili',
    yarnType: 'Alize Puffy',
    color: '',
    patternSize: 'Klassik Hörgü\n90x90 cm',
    materials: [],
    costPrice: 0,
    salePrice: 0,
    advancePayment: 0,
    advancePaymentType: 'Kart',
    remainingPayment: 0,
    remainingPaymentType: 'Nağd',
    address: '',
    deliveryPrice: 0,
    status: 'Hazırlanır'
  });

  const [newMaterialName, setNewMaterialName] = useState('');
  const [newMaterialPrice, setNewMaterialPrice] = useState('');

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

  const handleAddMaterial = () => {
    if (!newMaterialName.trim() || !newMaterialPrice) return;
    const priceNum = parseFloat(newMaterialPrice) || 0;
    const updatedMaterials = [...formData.materials, { name: newMaterialName.trim(), price: priceNum }];
    
    // Maya dəyərini avtomatik materialların cəmi edə bilərik və ya saxlaya bilərik
    const totalCost = updatedMaterials.reduce((sum, item) => sum + item.price, 0);

    setFormData({
      ...formData,
      materials: updatedMaterials,
      costPrice: totalCost
    });
    setNewMaterialName('');
    setNewMaterialPrice('');
  };

  const handleRemoveMaterial = (index) => {
    const updatedMaterials = formData.materials.filter((_, i) => i !== index);
    const totalCost = updatedMaterials.reduce((sum, item) => sum + item.price, 0);
    setFormData({ ...formData, materials: updatedMaterials, costPrice: totalCost });
  };

  const handlePriceChange = (field, value) => {
    const numVal = parseFloat(value) || 0;
    let updated = { ...formData, [field]: numVal };
    
    if (field === 'salePrice' || field === 'advancePayment') {
      const sale = field === 'salePrice' ? numVal : (parseFloat(updated.salePrice) || 0);
      const advance = field === 'advancePayment' ? numVal : (parseFloat(updated.advancePayment) || 0);
      updated.remainingPayment = Math.max(0, sale - advance);
    }
    setFormData(updated);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Hazırlanır': return { background: '#fef08a', color: '#854d0e', border: '1px solid #eab308' };
      case 'Hazırdır': return { background: '#dcfce7', color: '#166534', border: '1px solid #22c55e' };
      case 'Təhvil verildi': return { background: '#e0f2fe', color: '#0369a1', border: '1px solid #0ea5e9' };
      case 'Ləğv edildi': return { background: '#fee2e2', color: '#991b1b', border: '1px solid #ef4444' };
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
      source: 'Instagram',
      orderDate: today,
      deliveryDate: '',
      daysCount: 0,
      product: 'Uşaq Yorğanı',
      category: 'Körpə Tekstili',
      yarnType: 'Alize Puffy',
      color: '',
      patternSize: 'Klassik Hörgü\n90x90 cm',
      materials: [],
      costPrice: 0,
      salePrice: 0,
      advancePayment: 0,
      advancePaymentType: 'Kart',
      remainingPayment: 0,
      remainingPaymentType: 'Nağd',
      address: '',
      deliveryPrice: 0,
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
    <div style={{ padding: '25px', backgroundColor: '#FDFBF7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#4A3B32', fontSize: '16px', boxSizing: 'border-box' }}>
      
      {/* Başlıq və Yeni Sifariş düyməsi */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#3D2C22', margin: 0 }}>Sifarişlər</h1>
        <button 
          onClick={handleOpenAddModal}
          style={{ backgroundColor: '#22c55e', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
        >
          + Yeni Sifariş
        </button>
      </div>

      {/* Axtarış sahəsi */}
      <input
        type="text"
        placeholder="Axtarış (Müştəri, Mənbə, Telefon, Kod, Məhsul, Rəng, Hörgü və s.)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '14px 18px', marginBottom: '20px', borderRadius: '10px', border: '1px solid #D7CCC8', outline: 'none', fontSize: '15px', backgroundColor: 'white', boxSizing: 'border-box' }}
      />

      {/* Cədvəl */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #EFEBE9', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1200px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F2EF', color: '#5C4033', fontSize: '14px', fontWeight: 'normal' }}>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Müştəri / Tel</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Kod</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Mənbə</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Tarixlər (Sifariş / Təhvil)</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Məhsul Adı</th>
              <th style={{ padding: '14px 12px', fontWeight: 'normal' }}>Körpə Tekstili</th>
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
            {filteredOrders.map((order) => {
              const profit = (parseFloat(order.salePrice) || 0) - (parseFloat(order.costPrice) || 0);
              return (
                <tr key={order.id} style={{ borderBottom: '1px solid #EFEBE9', fontSize: '15px' }}>
                  <td style={{ padding: '14px 12px' }}>
                    <div>{order.customerName}</div>
                    <div style={{ color: '#777', fontSize: '13px', marginTop: '2px' }}>{order.phone}</div>
                  </td>
                  <td style={{ padding: '14px 12px' }}>{order.id}</td>
                  <td style={{ padding: '14px 12px' }}>{sources.find(s => s.name === order.source)?.icon} {order.source}</td>
                  <td style={{ padding: '14px 12px', fontSize: '14px' }}>
                    <div>📅 {order.orderDate} ({order.daysCount || 0} gün)</div>
                    <div style={{ marginTop: '4px', color: '#777' }}>🚚 {order.deliveryDate}</div>
                  </td>
                  <td style={{ padding: '14px 12px' }}>{order.product}</td>
                  <td style={{ padding: '14px 12px' }}>{order.category}</td>
                  <td style={{ padding: '14px 12px' }}>{order.yarnType}</td>
                  <td style={{ padding: '14px 12px' }}>{order.color}</td>
                  <td style={{ padding: '14px 12px', whiteSpace: 'pre-line', fontSize: '14px' }}>{order.patternSize}</td>
                  <td style={{ padding: '14px 12px' }}>{order.costPrice} AZN</td>
                  <td style={{ padding: '14px 12px' }}>{order.salePrice} AZN</td>
                  <td style={{ padding: '14px 12px', color: profit >= 0 ? '#166534' : '#991b1b', fontWeight: 'bold' }}>
                    {profit >= 0 ? `+${profit}` : profit} AZN
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', ...getStatusStyle(order.status) }}
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
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }}
                    >
                      ✏️
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDelete(order.id)} 
                      title="Sil" 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'black' }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal / Form */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '15px', boxSizing: 'border-box' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: '#3D2C22', fontSize: '20px', margin: 0 }}>{isAddModalOpen ? 'Yeni Sifariş' : 'Sifarişə Düzəliş Et'}</h2>
              <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>

            <form onSubmit={isAddModalOpen ? handleSaveAdd : handleSaveEdit}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Sifariş Tarixi</label>
                  <input type="date" value={formData.orderDate} onChange={(e) => handleDateChange('orderDate', e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Təhvil Tarixi</label>
                  <input type="date" value={formData.deliveryDate} onChange={(e) => handleDateChange('deliveryDate', e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Müştəri Adı</label>
                  <input type="text" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Telefon Nömrəsi</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="050..." style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Sifarişin Gəldiyi Mənbə</label>
                <select value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box', backgroundColor: 'white' }}>
                  {sources.map((s, idx) => <option key={idx} value={s.name}>{s.icon} {s.name}</option>)}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Məhsul Adı</label>
                  <select value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box', backgroundColor: 'white' }}>
                    {productOptions.map((prod, idx) => <option key={idx} value={prod}>{prod}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Kateqoriya</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box', backgroundColor: 'white' }}>
                    {categoryOptions.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>İpin Növü</label>
                  <select value={formData.yarnType} onChange={(e) => setFormData({...formData, yarnType: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box', backgroundColor: 'white' }}>
                    {yarnOptions.map((yarn, idx) => <option key={idx} value={yarn}>{yarn}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Rəng</label>
                  <input type="text" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} placeholder="Məs: 62 – Bej / Krem" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
              </div>

              {/* Hörgü / Ölçü sahəsi */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Hörgü / Ölçü</label>
                <input type="text" value={formData.patternSize} onChange={(e) => setFormData({...formData, patternSize: e.target.value})} placeholder="Məs: Klassik Hörgü 90x90 cm" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
              </div>

              <div style={{ backgroundColor: '#F9F6F0', padding: '12px', borderRadius: '8px', border: '1px solid #EFEBE9', marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '13px', color: '#5C4033' }}>İstifadə Edilən Materiallar</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <input type="text" placeholder="Material adı" value={newMaterialName} onChange={(e) => setNewMaterialName(e.target.value)} style={{ flex: 2, padding: '8px', borderRadius: '6px', border: '1px solid #D7CCC8' }} />
                  <input type="number" placeholder="Qiymət" value={newMaterialPrice} onChange={(e) => setNewMaterialPrice(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #D7CCC8' }} />
                  <button type="button" onClick={handleAddMaterial} style={{ backgroundColor: '#5C4033', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+ Əlavə et</button>
                </div>
                {formData.materials.map((mat, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '6px 10px', borderRadius: '6px', marginBottom: '4px', border: '1px solid #EFEBE9' }}>
                    <span>{mat.name} – <strong>{mat.price} AZN</strong></span>
                    <button type="button" onClick={() => handleRemoveMaterial(idx)} style={{ background: 'none', border: 'none', color: '#c62828', cursor: 'pointer', fontWeight: 'bold' }}>Sil</button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Maya Dəyəri (AZN)</label>
                  <input type="number" value={formData.costPrice} onChange={(e) => setFormData({...formData, costPrice: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Satış Qiyməti (AZN)</label>
                  <input type="number" value={formData.salePrice} onChange={(e) => handlePriceChange('salePrice', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Beh (AZN)</label>
                  <input type="number" value={formData.advancePayment} onChange={(e) => handlePriceChange('advancePayment', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Beh Ödəniş Növü</label>
                  <select value={formData.advancePaymentType} onChange={(e) => setFormData({...formData, advancePaymentType: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box', backgroundColor: 'white' }}>
                    <option value="Kart">Kart</option>
                    <option value="Nağd">Nağd</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Qalıq (Avtomatik)</label>
                  <input type="number" value={formData.remainingPayment} readOnly style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', backgroundColor: '#f5f2ef', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500', fontSize: '13px' }}>Qalıq Ödəniş Növü</label>
                  <select value={formData.remainingPaymentType} onChange={(e) => setFormData({...formData, remainingPaymentType: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D7CCC8', boxSizing: 'border-box', backgroundColor: 'white' }}>
                    <option value="Nağd">Nağd</option>
                    <option value="Kart">Kart</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #D7CCC8', background: 'white', color: '#5C4033', cursor: 'pointer', fontWeight: '500' }}>Ləğv et</button>
                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#5C4033', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Yadda saxla</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;