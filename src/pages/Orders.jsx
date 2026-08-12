import React, { useState } from 'react';

const Orders = () => {
  // Sifarişlərin siyahısı və ilkin test məlumatı
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: 'AB-2026-001',
      customer: 'Aysel Məmmədova / +994 50 123 45 67',
      source: 'Instagram',
      orderDate: '12.08.2026',
      deliveryDate: '15.08.2026',
      product: 'Odeyal',
      yarn: 'Alize Puffy',
      color: 'Qəhvəyi',
      patternSize: 'Klassik ilmə / 100x100 sm',
      costPrice: '18 AZN',
      sellingPrice: '35 AZN',
      profit: '17 AZN',
      status: 'Hazırlanır'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Yeni sifariş formu üçün state (standart rəng: Qəhvəyi)
  const [newOrder, setNewOrder] = useState({
    code: `AB-2026-${Math.floor(100 + Math.random() * 900)}`,
    customer: '',
    source: 'Instagram',
    orderDate: new Date().toLocaleDateString(),
    deliveryDate: '',
    product: '',
    yarn: 'Alize Puffy',
    color: 'Qəhvəyi',
    patternSize: '',
    costPrice: '',
    sellingPrice: '',
    status: 'Hazırlanır'
  });

  // Hərf yazıldıqda dərhal bütün sahələrdə axtarış edən filtr
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.code.toLowerCase().includes(searchLower) ||
      order.customer.toLowerCase().includes(searchLower) ||
      order.source.toLowerCase().includes(searchLower) ||
      order.product.toLowerCase().includes(searchLower) ||
      order.yarn.toLowerCase().includes(searchLower) ||
      order.color.toLowerCase().includes(searchLower) ||
      order.patternSize.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

  // Yeni sifariş əlavə etmə funksiyası
  const handleAddOrder = (e) => {
    e.preventDefault();
    const cost = parseFloat(newOrder.costPrice) || 0;
    const selling = parseFloat(newOrder.sellingPrice) || 0;
    const profitVal = (selling - cost) + ' AZN';

    const orderToAdd = {
      ...newOrder,
      id: Date.now(),
      costPrice: cost + ' AZN',
      sellingPrice: selling + ' AZN',
      profit: profitVal
    };

    setOrders([orderToAdd, ...orders]);
    setIsAddModalOpen(false);
    // Formu sıfırla (rəng yenə qəhvəyi qalır)
    setNewOrder({
      code: `AB-2026-${Math.floor(100 + Math.random() * 900)}`,
      customer: '',
      source: 'Instagram',
      orderDate: new Date().toLocaleDateString(),
      deliveryDate: '',
      product: '',
      yarn: 'Alize Puffy',
      color: 'Qəhvəyi',
      patternSize: '',
      costPrice: '',
      sellingPrice: '',
      status: 'Hazırlanır'
    });
  };

  // Sifarişi silmək
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
          style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Yeni Sifariş
        </button>
      </div>

      {/* Axtarış bölməsi */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          placeholder="Axtarış (Müştəri, Telefon, Kod, Məhsul, Rəng, Hörgü növü və s.)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '12px 15px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
        />
      </div>

      {/* Cədvəl Səhifəsi */}
      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ddd', color: '#333' }}>
              <th style={{ padding: '12px' }}>Kod</th>
              <th style={{ padding: '12px' }}>Müştəri / Tel</th>
              <th style={{ padding: '12px' }}>Mənbə</th>
              <th style={{ padding: '12px' }}>Tarix (Sifariş / Təhvil)</th>
              <th style={{ padding: '12px' }}>Məhsul</th>
              <th style={{ padding: '12px' }}>İp</th>
              <th style={{ padding: '12px' }}>Rəng</th>
              <th style={{ padding: '12px' }}>Hörgü növü / Ölçü</th>
              <th style={{ padding: '12px' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px' }}>Qazanc</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{order.code}</td>
                  <td style={{ padding: '12px' }}>{order.customer}</td>
                  <td style={{ padding: '12px' }}>{order.source}</td>
                  <td style={{ padding: '12px' }}>{order.orderDate} / {order.deliveryDate}</td>
                  <td style={{ padding: '12px' }}>{order.product}</td>
                  <td style={{ padding: '12px' }}>{order.yarn}</td>
                  <td style={{ padding: '12px', color: '#5a3d28', fontWeight: 'bold' }}>{order.color}</td>
                  <td style={{ padding: '12px' }}>{order.patternSize}</td>
                  <td style={{ padding: '12px' }}>{order.costPrice}</td>
                  <td style={{ padding: '12px' }}>{order.sellingPrice}</td>
                  <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold' }}>{order.profit}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '4px 8px', backgroundColor: '#fff3cd', borderRadius: '4px', fontSize: '11px', color: '#856404' }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      {/* Redaktə İkonu */}
                      <button 
                        title="Redaktə et" 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      {/* Silmə İkonu */}
                      <button 
                        onClick={() => handleDelete(order.id)} 
                        title="Sil" 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
            <form onSubmit={handleAddOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
              
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Müştəri / Tel</label>
                <input 
                  type="text" 
                  required
                  placeholder="Məs: Aysel / 0501234567"
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Mənbə</label>
                <input 
                  type="text" 
                  value={newOrder.source}
                  onChange={(e) => setNewOrder({...newOrder, source: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Təhvil Tarixi</label>
                <input 
                  type="text" 
                  placeholder="Məs: 15.08.2026"
                  value={newOrder.deliveryDate}
                  onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Məhsul</label>
                <input 
                  type="text" 
                  required
                  placeholder="Məs: Odeyal, Şərf və s."
                  value={newOrder.product}
                  onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>İp</label>
                <input 
                  type="text" 
                  value={newOrder.yarn}
                  onChange={(e) => setNewOrder({...newOrder, yarn: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Rəng (Standart: Qəhvəyi)</label>
                <input 
                  type="text" 
                  value={newOrder.color}
                  onChange={(e) => setNewOrder({...newOrder, color: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Hörgü növü / Ölçü</label>
                <input 
                  type="text" 
                  placeholder="Məs: Klassik ilmə / 100x100 sm"
                  value={newOrder.patternSize}
                  onChange={(e) => setNewOrder({...newOrder, patternSize: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Maya Dəyəri (AZN)</label>
                <input 
                  type="number" 
                  value={newOrder.costPrice}
                  onChange={(e) => setNewOrder({...newOrder, costPrice: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Satış Qiyməti (AZN)</label>
                <input 
                  type="number" 
                  value={newOrder.sellingPrice}
                  onChange={(e) => setNewOrder({...newOrder, sellingPrice: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Bağla
                </button>
                <button 
                  type="submit"
                  style={{ padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
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