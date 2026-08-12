import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: 'ALP-001',
      customerName: 'Leyla',
      customerPhone: '0559876543',
      source: 'Instagram',
      orderDate: '04.08.26',
      deliveryDate: '07.08.26',
      product: 'Uşaq Yorğanı',
      category: 'Körpə Tekstili',
      yarn: 'Alize Puffy',
      color: '55 - Ağ',
      pattern: 'Klassik Hörgü',
      size: '90x90 sm',
      costPrice: '35.00 AZN',
      sellingPrice: '80.00 AZN',
      profit: '+45.00 AZN',
      status: 'Hazırdır'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newOrder, setNewOrder] = useState({
    code: 'ALP-002',
    customerName: '',
    customerPhone: '',
    source: 'Instagram',
    orderDate: '12.08.26',
    deliveryDate: '',
    product: '',
    category: '',
    yarn: 'Alize Puffy',
    color: 'Qəhvəyi',
    pattern: '',
    size: '',
    costPrice: '',
    sellingPrice: '',
    status: 'Hazırlanır'
  });

  // Axtarış funksiyası
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.code.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerPhone.toLowerCase().includes(searchLower) ||
      order.product.toLowerCase().includes(searchLower) ||
      order.color.toLowerCase().includes(searchLower) ||
      order.pattern.toLowerCase().includes(searchLower)
    );
  });

  // Tarixlər arasındakı gün fərqini hesablamaq üçün köməkçi funksiya
  const calculateDays = (d1, d2) => {
    try {
      const [p1, m1, y1] = d1.split('.').map(Number);
      const [p2, m2, y2] = d2.split('.').map(Number);
      const date1 = new Date(2000 + y1, m1 - 1, p1);
      const date2 = new Date(2000 + y2, m2 - 1, p2);
      const diffTime = date2 - date1;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 ? diffDays : 0;
    } catch {
      return 3;
    }
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    const cost = parseFloat(newOrder.costPrice) || 0;
    const selling = parseFloat(newOrder.sellingPrice) || 0;
    const profitVal = (selling - cost);
    const profitStr = (profitVal >= 0 ? '+' : '') + profitVal.toFixed(2) + ' AZN';

    const orderToAdd = {
      ...newOrder,
      id: Date.now(),
      costPrice: cost.toFixed(2) + ' AZN',
      sellingPrice: selling.toFixed(2) + ' AZN',
      profit: profitStr
    };

    setOrders([orderToAdd, ...orders]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* Başlıq və Yeni Sifariş düyməsi */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Sifarişlər</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          style={{ backgroundColor: '#5a3d28', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Yeni Sifariş
        </button>
      </div>

      {/* Qısa Axtarış bölməsi və lupa ikonası */}
      <div style={{ marginBottom: '20px', position: 'relative', width: '350px' }}>
        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
          🔍
        </span>
        <input 
          type="text"
          placeholder="Axtarış (Müştəri, Telefon, Kod, Məhsul və s.)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px', outline: 'none', backgroundColor: '#fff' }}
        />
      </div>

      {/* Cədvəl Səhifəsi */}
      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff', borderBottom: '2px solid #eee', color: '#555', fontSize: '12px' }}>
              <th style={{ padding: '12px' }}>MÜŞTƏRİ / TEL</th>
              <th style={{ padding: '12px' }}>KOD</th>
              <th style={{ padding: '12px' }}>TARİXLƏR (SİFARİŞ / TƏHVİL)</th>
              <th style={{ padding: '12px' }}>MƏHSUL ADI</th>
              <th style={{ padding: '12px' }}>KATEQORİYA</th>
              <th style={{ padding: '12px' }}>İPİN NÖVÜ</th>
              <th style={{ padding: '12px' }}>RƏNG</th>
              <th style={{ padding: '12px' }}>HÖRGÜ / ÖLÇÜ</th>
              <th style={{ padding: '12px' }}>MAYA DƏYƏRİ</th>
              <th style={{ padding: '12px' }}>SATIŞ QİYMƏTİ</th>
              <th style={{ padding: '12px' }}>QAZANC</th>
              <th style={{ padding: '12px' }}>STATUS</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>ƏMƏLİYYAT</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const daysCount = calculateDays(order.orderDate, order.deliveryDate);
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f2f2f2', alignItems: 'center' }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 'bold', color: '#222' }}>{order.customerName}</div>
                      <div style={{ fontSize: '11px', color: '#777' }}>{order.customerPhone}</div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#333' }}>{order.code}</td>
                    <td style={{ padding: '12px', fontSize: '12px' }}>
                      <div>📅 {order.orderDate} <span style={{ color: '#007bff' }}>({daysCount} gün)</span></div>
                      <div style={{ marginTop: '2px' }}>🚚 {order.deliveryDate}</div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{order.product}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{order.category}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{order.yarn}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '3px 8px', backgroundColor: '#f1f1f1', borderRadius: '12px', fontSize: '11px', border: '1px solid #ddd' }}>
                        ⚪ {order.color}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: '500' }}>{order.pattern}</div>
                      <div style={{ fontSize: '11px', color: '#777' }}>{order.size}</div>
                    </td>
                    <td style={{ padding: '12px', color: '#d9534f', fontWeight: '500' }}>{order.costPrice}</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{order.sellingPrice}</td>
                    <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold' }}>{order.profit}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '4px 10px', backgroundColor: '#fff3cd', borderRadius: '4px', fontSize: '11px', color: '#856404', fontWeight: 'bold' }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button title="Redaktə et" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                          ✏️
                        </button>
                        <button onClick={() => handleDelete(order.id)} title="Sil" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="13" style={{ textAlign: 'center', padding: '20px', color: '#777' }}>
                  Heç bir sifariş tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Yeni Sifariş Modalı */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', width: '450px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3>Yeni Sifariş Əlavə Et</h3>
            <form onSubmit={handleAddOrder} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Müştəri Adı</label>
                <input type="text" required placeholder="Məs: Aysel" value={newOrder.customerName} onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Telefon</label>
                <input type="text" required placeholder="Məs: 0501234567" value={newOrder.customerPhone} onChange={(e) => setNewOrder({...newOrder, customerPhone: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Təhvil Tarixi (gün.ay.il)</label>
                <input type="text" required placeholder="Məs: 15.08.26" value={newOrder.deliveryDate} onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Məhsul Adı</label>
                <input type="text" required placeholder="Məs: Uşaq Yorğanı" value={newOrder.product} onChange={(e) => setNewOrder({...newOrder, product: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Kateqoriya</label>
                <input type="text" placeholder="Məs: Körpə Tekstili" value={newOrder.category} onChange={(e) => setNewOrder({...newOrder, category: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Rəng</label>
                <input type="text" value={newOrder.color} onChange={(e) => setNewOrder({...newOrder, color: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Hörgü Növü</label>
                <input type="text" placeholder="Məs: Klassik Hörgü" value={newOrder.pattern} onChange={(e) => setNewOrder({...newOrder, pattern: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Ölçü</label>
                <input type="text" placeholder="Məs: 90x90 sm" value={newOrder.size} onChange={(e) => setNewOrder({...newOrder, size: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Maya Dəyəri (AZN)</label>
                <input type="number" step="0.01" value={newOrder.costPrice} onChange={(e) => setNewOrder({...newOrder, costPrice: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Satış Qiyməti (AZN)</label>
                <input type="number" step="0.01" value={newOrder.sellingPrice} onChange={(e) => setNewOrder({...newOrder, sellingPrice: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                <button type="button" onClick={() => setIsAddModalOpen(false)} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Bağla
                </button>
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Yadda saxla
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