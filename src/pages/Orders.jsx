import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerName: 'Aygün Məmmədova',
      phone: '+994 50 123 45 67',
      product: 'Toxunma Odyal',
      material: 'Alize Puffy',
      netPrice: '45 AZN',
      profit: '18 AZN',
      status: 'Hazırlanır'
    },
    {
      id: 'ORD-002',
      customerName: 'Elmir Qasımov',
      phone: '+994 55 987 65 43',
      product: 'Şarf və Papaq dəsti',
      material: 'Alize Puffy Fine',
      netPrice: '30 AZN',
      profit: '12 AZN',
      status: 'Tamamlandı'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    id: `ORD-00${orders.length + 1}`,
    customerName: '',
    phone: '',
    product: '',
    material: '',
    netPrice: '',
    profit: '',
    status: 'Gözləmədə'
  });

  const filteredOrders = orders.filter(order =>
    Object.values(order).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setOrders([newOrder, ...orders]);
    setIsAddModalOpen(false);
    setNewOrder({
      id: `ORD-00${orders.length + 2}`,
      customerName: '',
      phone: '',
      product: '',
      material: '',
      netPrice: '',
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
      {/* Başlıq və Düymə */}
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

      {/* Axtarış */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Hər hansı bir məlumata görə axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px', padding: '10px 15px', border: '1px solid #D7CCC8', borderRadius: '8px', outline: 'none', fontSize: '14px' }}
        />
      </div>

      {/* Cədvəl */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #EFEBE9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#EFEBE9', color: '#5C4033', fontSize: '12px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 15px' }}>Sifariş Kodu</th>
              <th style={{ padding: '12px 15px' }}>Müştəri Adı</th>
              <th style={{ padding: '12px 15px' }}>Telefon</th>
              <th style={{ padding: '12px 15px' }}>Məhsul Adı</th>
              <th style={{ padding: '12px 15px' }}>Material</th>
              <th style={{ padding: '12px 15px' }}>Net Qiyməti</th>
              <th style={{ padding: '12px 15px' }}>Gəlir</th>
              <th style={{ padding: '12px 15px' }}>Status</th>
              <th style={{ padding: '12px 15px', textAlign: 'center' }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #EFEBE9' }}>
                  <td style={{ padding: '12px 15px', fontWeight: 'bold', color: '#5C4033' }}>{order.id}</td>
                  <td style={{ padding: '12px 15px', fontWeight: '500' }}>{order.customerName}</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>{order.phone}</td>
                  <td style={{ padding: '12px 15px' }}>{order.product}</td>
                  <td style={{ padding: '12px 15px', color: '#777' }}>{order.material}</td>
                  <td style={{ padding: '12px 15px', fontWeight: '600' }}>{order.netPrice}</td>
                  <td style={{ padding: '12px 15px', color: '#2e7d32', fontWeight: '600' }}>{order.profit}</td>
                  <td style={{ padding: '12px 15px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold',
                      backgroundColor: order.status === 'Tamamlandı' ? '#e8f5e9' : '#fffde7',
                      color: order.status === 'Tamamlandı' ? '#2e7d32' : '#f57f17'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                    <button onClick={() => handleEditClick(order)} style={{ background: '#e3f2fd', color: '#1565c0', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '6px', fontSize: '12px', fontWeight: 'bold' }}>Düzəliş et</button>
                    <button onClick={() => handleDelete(order.id)} style={{ background: '#ffebee', color: '#c62828', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Sil</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Heç bir sifariş tapılmadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Yeni Sifariş Modalı */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '14px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#5C4033', marginBottom: '15px' }}>Yeni Sifariş Əlavə Et</h2>
            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>MÜŞTƏRİ ADI</label>
                <input type="text" required value={newOrder.customerName} onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>TELEFON NÖMRƏSİ</label>
                <input type="text" required value={newOrder.phone} onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>MƏHSUL ADI</label>
                <input type="text" required value={newOrder.product} onChange={(e) => setNewOrder({...newOrder, product: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>MATERİAL</label>
                <input type="text" required value={newOrder.material} onChange={(e) => setNewOrder({...newOrder, material: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>NET QİYMƏTİ</label>
                  <input type="text" required value={newOrder.netPrice} onChange={(e) => setNewOrder({...newOrder, netPrice: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>GƏLİR</label>
                  <input type="text" required value={newOrder.profit} onChange={(e) => setNewOrder({...newOrder, profit: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>STATUS</label>
                <select value={newOrder.status} onChange={(e) => setNewOrder({...newOrder, status: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '10px 15px', border: '1px solid #ccc', background: 'white', borderRadius: '8px', cursor: 'pointer' }}>Ləğv et</button>
                <button type="submit" style={{ padding: '10px 15px', background: '#5C4033', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Yadda saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Düzəliş Modalı */}
      {isEditModalOpen && currentOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '14px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#5C4033', marginBottom: '15px' }}>Sifarişə Düzəliş Et</h2>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>MÜŞTƏRİ ADI</label>
                <input type="text" required value={currentOrder.customerName} onChange={(e) => setCurrentOrder({...currentOrder, customerName: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>TELEFON NÖMRƏSİ</label>
                <input type="text" required value={currentOrder.phone} onChange={(e) => setCurrentOrder({...currentOrder, phone: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>MƏHSUL ADI</label>
                <input type="text" required value={currentOrder.product} onChange={(e) => setCurrentOrder({...currentOrder, product: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>MATERİAL</label>
                <input type="text" required value={currentOrder.material} onChange={(e) => setCurrentOrder({...currentOrder, material: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>NET QİYMƏTİ</label>
                  <input type="text" required value={currentOrder.netPrice} onChange={(e) => setCurrentOrder({...currentOrder, netPrice: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>GƏLİR</label>
                  <input type="text" required value={currentOrder.profit} onChange={(e) => setCurrentOrder({...currentOrder, profit: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>STATUS</label>
                <select value={currentOrder.status} onChange={(e) => setCurrentOrder({...currentOrder, status: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ padding: '10px 15px', border: '1px solid #ccc', background: 'white', borderRadius: '8px', cursor: 'pointer' }}>Ləğv et</button>
                <button type="submit" style={{ padding: '10px 15px', background: '#5C4033', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Yenilə</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;