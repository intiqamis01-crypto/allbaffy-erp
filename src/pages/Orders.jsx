import React, { useState, useEffect } from 'react';

const Orders = () => {
  // Məlumatları əvvəlcə localStorage-dən oxuyuruq, yoxdursa boş siyahı və ya ilkin nümunə götürürük
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('allbaffy_orders');
    if (savedOrders) {
      return JSON.parse(savedOrders);
    }
    return [
      {
        id: 'ORD-001',
        customerName: 'Aygün Məmmədova',
        phone: '+994 50 123 45 67',
        product: 'Toxunma Odyal',
        ingredients: 'Alize Puffy ipi (3 ədəd)',
        color: 'Bej',
        hasDelivery: 'Bəli',
        costPrice: '25 AZN',
        expense: '5 AZN',
        profit: '15 AZN',
        status: 'Hazırlanır'
      }
    ];
  });

  // Hər dəfə orders dəyişəndə localStorage-ə yadda saxlayırıq
  useEffect(() => {
    localStorage.setItem('allbaffy_orders', JSON.stringify(orders));
  }, [orders]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    id: `ORD-00${orders.length + 1}`,
    customerName: '',
    phone: '',
    product: '',
    ingredients: '',
    color: '',
    hasDelivery: 'Xeyr',
    costPrice: '',
    expense: '',
    profit: '',
    status: 'Gözləmədə'
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
      id: `ORD-00${orders.length + 2}`,
      customerName: '',
      phone: '',
      product: '',
      ingredients: '',
      color: '',
      hasDelivery: 'Xeyr',
      costPrice: '',
      expense: '',
      profit: '',
      status: 'Gözləmədə'
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

  return (
    <div style={{ padding: '30px', backgroundColor: '#FDFBF7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#4A3B32' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #EFEBE9', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#3D2C22', margin: 0 }}>Sifarişlər İdarəetməsi</h1>
          <p style={{ fontSize: '13px', color: '#795548', margin: '5px 0 0 0' }}>Bütün sifarişləri izləyin və idarə edin</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{ backgroundColor: '#5C4033', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
        >
          + Yeni Sifariş Əlavə Et
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Hər hansı bir məlumata görə axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px', padding: '10px 15px', border: '1px solid #D7CCC8', borderRadius: '8px', outline: 'none', fontSize: '14px' }}
        />
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #EFEBE9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#EFEBE9', color: '#5C4033', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px' }}>Sifariş Kodu</th>
              <th style={{ padding: '12px' }}>Müştəri / Telefon</th>
              <th style={{ padding: '12px' }}>Məhsul Adı</th>
              <th style={{ padding: '12px' }}>Hazırlanmasında</th>
              <th style={{ padding: '12px' }}>Rəng</th>
              <th style={{ padding: '12px' }}>Çatdırılma</th>
              <th style={{ padding: '12px' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px' }}>Xərc</th>
              <th style={{ padding: '12px' }}>Gəlir</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #EFEBE9' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#5C4033' }}>{order.id}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold', color: '#3D2C22' }}>{order.customerName}</div>
                    <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>{order.phone}</div>
                  </td>
                  <td style={{ padding: '12px' }}>{order.product}</td>
                  <td style={{ padding: '12px', color: '#555' }}>{order.ingredients}</td>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{order.color}</td>
                  <td style={{ padding: '12px' }}>{order.hasDelivery}</td>
                  <td style={{ padding: '12px' }}>{order.costPrice}</td>
                  <td style={{ padding: '12px', color: '#d32f2f' }}>{order.expense}</td>
                  <td style={{ padding: '12px', color: '#2e7d32', fontWeight: 'bold' }}>{order.profit}</td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '12px', background: '#fff', cursor: 'pointer', fontWeight: 'bold', color: order.status === 'Tamamlandı' ? '#2e7d32' : '#f57f17' }}
                    >
                      <option value="Gözləmədə">Gözləmədə</option>
                      <option value="Hazırlanır">Hazırlanır</option>
                      <option value="Tamamlandı">Tamamlandı</option>
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
                <td colSpan="11" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Heç bir sifariş tapılmadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Yeni Sifariş Modalı */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '14px', width: '450px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#5C4033', marginBottom: '15px' }}>Yeni Sifariş Əlavə Et</h2>
            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>MÜŞTƏRİ ADI</label>
                <input type="text" required value={newOrder.customerName} onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>TELEFON NÖMRƏSİ</label>
                <input type="text" required value={newOrder.phone} onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>MƏHSUL ADI</label>
                <input type="text" required value={newOrder.product} onChange={(e) => setNewOrder({...newOrder, product: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>HAZIRLANMASINDA NƏLƏR İSTİFADƏ OLUNUB</label>
                <input type="text" required value={newOrder.ingredients} onChange={(e) => setNewOrder({...newOrder, ingredients: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>RƏNG SEÇİMİ</label>
                <input type="text" required value={newOrder.color} onChange={(e) => setNewOrder({...newOrder, color: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>ÇATDIRILMA</label>
                <select value={newOrder.hasDelivery} onChange={(e) => setNewOrder({...newOrder, hasDelivery: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Xeyr">Xeyr</option>
                  <option value="Bəli">Bəli</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>MAYA DƏYƏRİ</label>
                  <input type="text" required value={newOrder.costPrice} onChange={(e) => setNewOrder({...newOrder, costPrice: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>XƏRC</label>
                  <input type="text" required value={newOrder.expense} onChange={(e) => setNewOrder({...newOrder, expense: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>GƏLİR</label>
                <input type="text" required value={newOrder.profit} onChange={(e) => setNewOrder({...newOrder, profit: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>STATUS</label>
                <select value={newOrder.status} onChange={(e) => setNewOrder({...newOrder, status: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
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

      {/* Düzəliş Modalı */}
      {isEditModalOpen && currentOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '14px', width: '450px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#5C4033', marginBottom: '15px' }}>Sifarişə Düzəliş Et</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>MÜŞTƏRİ ADI</label>
                <input type="text" required value={currentOrder.customerName} onChange={(e) => setCurrentOrder({...currentOrder, customerName: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>TELEFON NÖMRƏSİ</label>
                <input type="text" required value={currentOrder.phone} onChange={(e) => setCurrentOrder({...currentOrder, phone: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>MƏHSUL ADI</label>
                <input type="text" required value={currentOrder.product} onChange={(e) => setCurrentOrder({...currentOrder, product: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>HAZIRLANMASINDA NƏLƏR İSTİFADƏ OLUNUB</label>
                <input type="text" required value={currentOrder.ingredients} onChange={(e) => setCurrentOrder({...currentOrder, ingredients: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>RƏNG SEÇİMİ</label>
                <input type="text" required value={currentOrder.color} onChange={(e) => setCurrentOrder({...currentOrder, color: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>ÇATDIRILMA</label>
                <select value={currentOrder.hasDelivery} onChange={(e) => setCurrentOrder({...currentOrder, hasDelivery: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Xeyr">Xeyr</option>
                  <option value="Bəli">Bəli</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>MAYA DƏYƏRİ</label>
                  <input type="text" required value={currentOrder.costPrice} onChange={(e) => setCurrentOrder({...currentOrder, costPrice: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>XƏRC</label>
                  <input type="text" required value={currentOrder.expense} onChange={(e) => setCurrentOrder({...currentOrder, expense: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>GƏLİR</label>
                <input type="text" required value={currentOrder.profit} onChange={(e) => setCurrentOrder({...currentOrder, profit: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '3px', color: '#5C4033' }}>STATUS</label>
                <select value={currentOrder.status} onChange={(e) => setCurrentOrder({...currentOrder, status: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '6px', background: 'white' }}>
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
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