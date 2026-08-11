import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('allbaffy_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'ALP-001',
        orderDate: '2026-08-01',
        deliveryDate: '2026-08-08',
        customerName: 'Aysel',
        phone: '0501234567',
        source: 'WhatsApp',
        product: 'Uşaq Yorğanı',
        category: 'Körpə Tekstili',
        advance: '10',
        advanceMethod: 'Kart',
        remaining: '20',
        remainingMethod: 'Nağd',
        deliveryAddress: 'Koroğlu m/s',
        deliveryPrice: '5',
        profit: '+18.00 AZN',
        status: 'Hazırlanır'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('allbaffy_orders', JSON.stringify(orders));
  }, [orders]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    id: `ALP-00${orders.length + 1}`,
    orderDate: '',
    deliveryDate: '',
    customerName: '',
    phone: '',
    source: 'Instagram',
    product: '',
    category: '',
    advance: '0',
    advanceMethod: 'Nağd',
    remaining: '0',
    remainingMethod: 'Nağd',
    deliveryAddress: '',
    deliveryPrice: '0',
    profit: '0 AZN',
    status: 'Hazırlanır'
  });

  const filteredOrders = orders.filter(order =>
    Object.values(order).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setOrders([newOrder, ...orders]);
    setIsAddModalOpen(false);
    setNewOrder({
      id: `ALP-00${orders.length + 2}`,
      orderDate: '',
      deliveryDate: '',
      customerName: '',
      phone: '',
      source: 'Instagram',
      product: '',
      category: '',
      advance: '0',
      advanceMethod: 'Nağd',
      remaining: '0',
      remainingMethod: 'Nağd',
      deliveryAddress: '',
      deliveryPrice: '0',
      profit: '0 AZN',
      status: 'Hazırlanır'
    });
  };

  const handleEditClick = (order) => {
    setCurrentOrder({ ...order });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setOrders(orders.map(o => (o.id === currentOrder.id ? currentOrder : o)));
    setIsEditModalOpen(false);
    setCurrentOrder(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsinizmi?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hazırlanır': return '#f57f17';
      case 'Hazırdır': return '#0288d1';
      case 'Təhvil verildi': return '#2e7d32';
      case 'Ləğv edildi': return '#d32f2f';
      default: return '#555';
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#FDFBF7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#4A3B32' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #EFEBE9', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#3D2C22', margin: 0 }}>Sifarişlər</h1>
          <p style={{ fontSize: '13px', color: '#795548', margin: '5px 0 0 0' }}>Bütün sifarişləri izləyin və idarə edin</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{ backgroundColor: '#2E7D32', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
        >
          + Yeni Sifariş
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Axtarış (Müştəri, Mənbə, Telefon, Kod, Məhsul, Kateqoriya və s.)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '400px', padding: '10px 15px', border: '1px solid #D7CCC8', borderRadius: '8px', outline: 'none', fontSize: '14px' }}
        />
      </div>

      {/* 1-ci şəkildəki cədvəl strukturu: Kod, Müştəri Adı/Nömrə, Məhsul Adı, Kateqoriya, Qazanc, Status, Əməliyyat */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #EFEBE9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#EFEBE9', color: '#5C4033', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px' }}>Müştəri / Tel</th>
              <th style={{ padding: '12px' }}>Kod</th>
              <th style={{ padding: '12px' }}>Məhsul Adı</th>
              <th style={{ padding: '12px' }}>Kateqoriya</th>
              <th style={{ padding: '12px' }}>Qazanc</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #EFEBE9' }}>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold', color: '#3D2C22' }}>{order.customerName}</div>
                    <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>{order.phone}</div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#5C4033' }}>{order.id}</td>
                  <td style={{ padding: '12px' }}>{order.product}</td>
                  <td style={{ padding: '12px' }}>{order.category}</td>
                  <td style={{ padding: '12px', color: '#2e7d32', fontWeight: 'bold' }}>{order.profit}</td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '12px', background: '#fff', cursor: 'pointer', fontWeight: 'bold', color: getStatusColor(order.status) }}
                    >
                      <option value="Hazırlanır">Hazırlanır</option>
                      <option value="Hazırdır">Hazırdır</option>
                      <option value="Təhvil verildi">Təhvil verildi</option>
                      <option value="Ləğv edildi">Ləğv edildi</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEditClick(order)}
                      title="Düzəliş et"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', marginRight: '10px' }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      title="Sil"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Heç bir sifariş tapılmadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 2-ci şəkildəki açılan pəncərə (Yeni Sifariş) */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '14px', width: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#5C4033', marginBottom: '15px' }}>Yeni Sifariş</h2>
            <form onSubmit={handleAddSubmit}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Sifariş Tarixi</label>
                  <input type="date" required value={newOrder.orderDate} onChange={(e) => setNewOrder({...newOrder, orderDate: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Təhvil Tarixi (Müddət)</label>
                  <input type="date" required value={newOrder.deliveryDate} onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Müştəri Adı</label>
                  <input type="text" required value={newOrder.customerName} onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Telefon Nömrəsi</label>
                  <input type="text" required value={newOrder.phone} onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Sifarişin Gəldiyi Mənbə</label>
                <select value={newOrder.source} onChange={(e) => setNewOrder({...newOrder, source: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Instagram">Instagram</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Tövsiyə">Tövsiyə</option>
                  <option value="Digər">Digər</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Məhsul Adı</label>
                  <input type="text" required value={newOrder.product} onChange={(e) => setNewOrder({...newOrder, product: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Kateqoriya</label>
                  <input type="text" required value={newOrder.category} onChange={(e) => setNewOrder({...newOrder, category: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Beh (AZN)</label>
                  <input type="text" value={newOrder.advance} onChange={(e) => setNewOrder({...newOrder, advance: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Beh Ödəniş Növü</label>
                  <select value={newOrder.advanceMethod} onChange={(e) => setNewOrder({...newOrder, advanceMethod: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                    <option value="Nağd">Nağd</option>
                    <option value="Kart">Kart</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Qalıq</label>
                  <input type="text" value={newOrder.remaining} onChange={(e) => setNewOrder({...newOrder, remaining: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Qalıq Ödəniş Növü</label>
                  <select value={newOrder.remainingMethod} onChange={(e) => setNewOrder({...newOrder, remainingMethod: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                    <option value="Nağd">Nağd</option>
                    <option value="Kart">Kart</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Ünvan / Kuryer</label>
                  <input type="text" value={newOrder.deliveryAddress} onChange={(e) => setNewOrder({...newOrder, deliveryAddress: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Çatdırılma (AZN)</label>
                  <input type="text" value={newOrder.deliveryPrice} onChange={(e) => setNewOrder({...newOrder, deliveryPrice: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Status</label>
                <select value={newOrder.status} onChange={(e) => setNewOrder({...newOrder, status: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Hazırdır">Hazırdır</option>
                  <option value="Təhvil verildi">Təhvil verildi</option>
                  <option value="Ləğv edildi">Ləğv edildi</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '8px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '6px', cursor: 'pointer' }}>Ləğv et</button>
                <button type="submit" style={{ padding: '8px 12px', background: '#5C4033', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Yadda saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2-ci şəkildəki açılan pəncərə (Sifarişi Redaktə Et) */}
      {isEditModalOpen && currentOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '14px', width: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#5C4033', marginBottom: '15px' }}>Sifarişi Redaktə Et</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Sifariş Tarixi</label>
                  <input type="date" required value={currentOrder.orderDate} onChange={(e) => setCurrentOrder({...currentOrder, orderDate: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Təhvil Tarixi (Müddət)</label>
                  <input type="date" required value={currentOrder.deliveryDate} onChange={(e) => setCurrentOrder({...currentOrder, deliveryDate: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Müştəri Adı</label>
                  <input type="text" required value={currentOrder.customerName} onChange={(e) => setCurrentOrder({...currentOrder, customerName: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Telefon Nömrəsi</label>
                  <input type="text" required value={currentOrder.phone} onChange={(e) => setCurrentOrder({...currentOrder, phone: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Sifarişin Gəldiyi Mənbə</label>
                <select value={currentOrder.source} onChange={(e) => setCurrentOrder({...currentOrder, source: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Instagram">Instagram</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Tövsiyə">Tövsiyə</option>
                  <option value="Digər">Digər</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Məhsul Adı</label>
                  <input type="text" required value={currentOrder.product} onChange={(e) => setCurrentOrder({...currentOrder, product: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Kateqoriya</label>
                  <input type="text" required value={currentOrder.category} onChange={(e) => setCurrentOrder({...currentOrder, category: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Beh (AZN)</label>
                  <input type="text" value={currentOrder.advance} onChange={(e) => setCurrentOrder({...currentOrder, advance: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Beh Ödəniş Növü</label>
                  <select value={currentOrder.advanceMethod} onChange={(e) => setCurrentOrder({...currentOrder, advanceMethod: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                    <option value="Nağd">Nağd</option>
                    <option value="Kart">Kart</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Qalıq</label>
                  <input type="text" value={currentOrder.remaining} onChange={(e) => setCurrentOrder({...currentOrder, remaining: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Qalıq Ödəniş Növü</label>
                  <select value={currentOrder.remainingMethod} onChange={(e) => setCurrentOrder({...currentOrder, remainingMethod: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                    <option value="Nağd">Nağd</option>
                    <option value="Kart">Kart</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Ünvan / Kuryer</label>
                  <input type="text" value={currentOrder.deliveryAddress} onChange={(e) => setCurrentOrder({...currentOrder, deliveryAddress: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Çatdırılma (AZN)</label>
                  <input type="text" value={currentOrder.deliveryPrice} onChange={(e) => setCurrentOrder({...currentOrder, deliveryPrice: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>Status</label>
                <select value={currentOrder.status} onChange={(e) => setCurrentOrder({...currentOrder, status: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Hazırdır">Hazırdır</option>
                  <option value="Təhvil verildi">Təhvil verildi</option>
                  <option value="Ləğv edildi">Ləğv edildi</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ padding: '8px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '6px', cursor: 'pointer' }}>Ləğv et</button>
                <button type="submit" style={{ padding: '8px 12px', background: '#5C4033', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Yenilə</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;