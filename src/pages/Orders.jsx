import React, { useState } from 'react';

function Orders({ orders = [], setOrders, inventory = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Bütün');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialOrderState = {
    customerName: '',
    phone: '',
    code: '',
    source: 'VP',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    productName: '',
    category: 'Körpə Tekstili',
    yarnType: 'Alize Puffy',
    stockType: 'Sıfırdan hörülür',
    color: '',
    patternSize: '',
    cost: '',
    price: '',
    status: 'Hazırlanır'
  };

  const [newOrder, setNewOrder] = useState(initialOrderState);

  const handleOpenAddModal = () => {
    const nextId = orders.length + 1;
    const generatedCode = `ALP-${String(nextId).padStart(3, '0')}`;
    setEditingId(null);
    setNewOrder({ ...initialOrderState, code: generatedCode });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (ord) => {
    setEditingId(ord.id);
    setNewOrder({
      customerName: ord.customerName || '',
      phone: ord.phone || '',
      code: ord.code || '',
      source: ord.source || 'VP',
      orderDate: ord.orderDate || new Date().toISOString().split('T')[0],
      deliveryDate: ord.deliveryDate || '',
      productName: ord.productName || '',
      category: ord.category || 'Körpə Tekstili',
      yarnType: ord.yarnType || 'Alize Puffy',
      stockType: ord.stockType || 'Sıfırdan hörülür',
      color: ord.color || '',
      patternSize: ord.patternSize || '',
      cost: ord.cost !== undefined ? ord.cost : '',
      price: ord.price !== undefined ? ord.price : '',
      status: ord.status || 'Hazırlanır'
    });
    setIsModalOpen(true);
  };

  const handleProductSelect = (selectedProductName) => {
    const foundItem = inventory.find(
      (item) => item.name?.toLowerCase() === selectedProductName.toLowerCase()
    );

    let autoCode = foundItem ? foundItem.code : newOrder.code;
    if (!autoCode) {
      const nextId = orders.length + 1;
      autoCode = `ALP-${String(nextId).padStart(3, '0')}`;
    }

    setNewOrder((prev) => ({
      ...prev,
      productName: selectedProductName,
      code: autoCode,
      cost: foundItem ? foundItem.cost || '' : prev.cost,
      price: foundItem ? foundItem.price || '' : prev.price,
      stockType: foundItem?.stockType === 'Stokda hazır' ? 'Stokdan' : 'Sıfırdan hörülür'
    }));
  };

  const handleStatusChange = (id, newStatus) => {
    if (setOrders) {
      setOrders((prev) =>
        prev.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord))
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizdən əminsiniz?')) {
      if (setOrders) {
        setOrders((prev) => prev.filter((ord) => ord.id !== id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // REDAKTƏ REJİMİ
      if (setOrders) {
        setOrders((prev) =>
          prev.map((ord) =>
            ord.id === editingId
              ? {
                  ...ord,
                  ...newOrder,
                  cost: Number(newOrder.cost) || 0,
                  price: Number(newOrder.price) || 0
                }
              : ord
          )
        );
      }
    } else {
      // YENİ ƏLAVƏ REJİMİ
      const created = {
        id: Date.now(),
        ...newOrder,
        cost: Number(newOrder.cost) || 0,
        price: Number(newOrder.price) || 0
      };

      if (setOrders) {
        setOrders((prev) => [created, ...prev]);
      }
    }

    setIsModalOpen(false);
    setEditingId(null);
    setNewOrder(initialOrderState);
  };

  const filteredOrders = orders.filter((ord) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (ord.customerName && ord.customerName.toLowerCase().includes(term)) ||
      (ord.phone && ord.phone.includes(term)) ||
      (ord.code && ord.code.toLowerCase().includes(term)) ||
      (ord.productName && ord.productName.toLowerCase().includes(term)) ||
      (ord.color && ord.color.toLowerCase().includes(term)) ||
      (ord.source && ord.source.toLowerCase().includes(term));

    const matchesStatus =
      statusFilter === 'Bütün' || ord.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* BAŞLIQ VƏ ƏLAVƏ ET DÜYMƏSİ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Sifarişlər</h1>
        <button
          onClick={handleOpenAddModal}
          style={{
            backgroundColor: '#16a34a',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          + Yeni Sifariş
        </button>
      </div>

      {/* AXTARIŞ VƏ STATUS */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <input
          type="text"
          placeholder="🔍 Axtarış..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '160px',
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            backgroundColor: '#fff',
            outline: 'none',
            color: '#334155',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          <option value="Bütün">Bütün Statuslar</option>
          <option value="Hazırlanır">Hazırlanır</option>
          <option value="Hazırdır">Hazırdır</option>
          <option value="Təhvil verildi">Təhvil verildi</option>
          <option value="Ləğv edildi">Ləğv edildi</option>
        </select>
      </div>

      {/* CƏDVƏL */}
      <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
              <th style={{ padding: '10px' }}>Müştəri / Tel</th>
              <th style={{ padding: '10px' }}>Kod</th>
              <th style={{ padding: '10px' }}>Məhsul Adı</th>
              <th style={{ padding: '10px' }}>Təminat Mənbəyi</th>
              <th style={{ padding: '10px' }}>Tarixlər (Sifariş / Təhvil)</th>
              <th style={{ padding: '10px' }}>Kateqoriya</th>
              <th style={{ padding: '10px' }}>Rəng / Ölçü</th>
              <th style={{ padding: '10px' }}>Maya Dəyəri</th>
              <th style={{ padding: '10px' }}>Satış Qiyməti</th>
              <th style={{ padding: '10px' }}>Qazanc</th>
              <th style={{ padding: '10px' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="12" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                  Axtarışa uyğun sifariş tapılmadı.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => {
                const profit = (Number(ord.price) || 0) - (Number(ord.cost) || 0);

                return (
                  <tr key={ord.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 'bold', color: '#334155' }}>{ord.customerName || '—'}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{ord.phone || ''}</div>
                    </td>
                    <td style={{ padding: '10px', fontWeight: '600', color: '#334155' }}>{ord.code || '—'}</td>
                    <td style={{ padding: '10px', fontWeight: '500' }}>{ord.productName || '—'}</td>
                    <td style={{ padding: '10px' }}>
                      <span
                        style={{
                          padding: '3px 7px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          backgroundColor: ord.stockType === 'Stokdan' ? '#dcfce7' : '#fef3c7',
                          color: ord.stockType === 'Stokdan' ? '#15803d' : '#b45309'
                        }}
                      >
                        {ord.stockType === 'Stokdan' ? '📦 Stokdan' : '🧶 Sıfırdan hörülür'}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontSize: '11px', color: '#475569' }}>🗓️ {ord.orderDate || '-'}</div>
                      <div style={{ fontSize: '11px', color: '#e11d48', fontWeight: '500' }}>🚚 {ord.deliveryDate || '-'}</div>
                    </td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{ord.category || 'Körpə Tekstili'}</td>
                    <td style={{ padding: '10px' }}>
                      <div>{ord.color || '—'}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{ord.patternSize || ''}</div>
                    </td>
                    <td style={{ padding: '10px' }}>{Number(ord.cost || 0).toFixed(2)} AZN</td>
                    <td style={{ padding: '10px', fontWeight: '600' }}>{Number(ord.price || 0).toFixed(2)} AZN</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: profit >= 0 ? '#16a34a' : '#dc2626' }}>
                      {profit >= 0 ? `+${profit.toFixed(2)}` : profit.toFixed(2)} AZN
                    </td>
                    <td style={{ padding: '10px' }}>
                      <select
                        value={ord.status || 'Hazırlanır'}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          border: 'none',
                          backgroundColor: getStatusBg(ord.status),
                          color: '#334155',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Hazırlanır">Hazırlanır</option>
                        <option value="Hazırdır">Hazırdır</option>
                        <option value="Təhvil verildi">Təhvil verildi</option>
                        <option value="Ləğv edildi">Ləğv edildi</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleOpenEditModal(ord)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                          title="Düzəliş et"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(ord.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                          title="Sil"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PƏNCƏRƏSİ (ƏLAVƏ VƏ VƏ REDAKTƏ) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#0f172a' }}>
              {editingId ? 'Sifarişə Düzəliş Et' : 'Yeni Sifariş Əlavə Et'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Müştəri Adı"
                  required
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  style={modalInputStyle}
                />
                <input
                  type="text"
                  placeholder="Telefon Nömrəsi"
                  value={newOrder.phone}
                  onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                  style={modalInputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Məhsul Adı"
                  required
                  value={newOrder.productName}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  style={modalInputStyle}
                />
                <input
                  type="text"
                  placeholder="Kod (Avtomatik)"
                  value={newOrder.code}
                  onChange={(e) => setNewOrder({ ...newOrder, code: e.target.value })}
                  style={{ ...modalInputStyle, backgroundColor: '#f1f5f9', fontWeight: 'bold' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#64748b' }}>Təminat Mənbəyi:</label>
                  <select
                    value={newOrder.stockType}
                    onChange={(e) => setNewOrder({ ...newOrder, stockType: e.target.value })}
                    style={{ ...modalInputStyle, marginTop: '2px' }}
                  >
                    <option value="Sıfırdan hörülür">🧶 Sıfırdan Hörülür</option>
                    <option value="Stokdan">📦 Stokdan Çəkilir</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#64748b' }}>Sifariş Mənbəyi:</label>
                  <select
                    value={newOrder.source}
                    onChange={(e) => setNewOrder({ ...newOrder, source: e.target.value })}
                    style={{ ...modalInputStyle, marginTop: '2px' }}
                  >
                    <option value="VP">WhatsApp</option>
                    <option value="IG">Instagram</option>
                    <option value="Zəng">Zəng</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Kateqoriya"
                  value={newOrder.category}
                  onChange={(e) => setNewOrder({ ...newOrder, category: e.target.value })}
                  style={modalInputStyle}
                />
                <input
                  type="text"
                  placeholder="İpin Növü"
                  value={newOrder.yarnType}
                  onChange={(e) => setNewOrder({ ...newOrder, yarnType: e.target.value })}
                  style={modalInputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Rəng (Məs: 183 - Çəhrayı)"
                  value={newOrder.color}
                  onChange={(e) => setNewOrder({ ...newOrder, color: e.target.value })}
                  style={modalInputStyle}
                />
                <input
                  type="text"
                  placeholder="Hörgü / Ölçü"
                  value={newOrder.patternSize}
                  onChange={(e) => setNewOrder({ ...newOrder, patternSize: e.target.value })}
                  style={modalInputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="Maya Dəyəri (AZN)"
                  value={newOrder.cost}
                  onChange={(e) => setNewOrder({ ...newOrder, cost: e.target.value })}
                  style={modalInputStyle}
                />
                <input
                  type="number"
                  placeholder="Satış Qiyməti (AZN)"
                  required
                  value={newOrder.price}
                  onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                  style={modalInputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#64748b' }}>Sifariş Tarixi:</label>
                  <input
                    type="date"
                    value={newOrder.orderDate}
                    onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
                    style={{ ...modalInputStyle, width: '100%', marginTop: '2px' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#64748b' }}>Təhvil Tarixi:</label>
                  <input
                    type="date"
                    required
                    value={newOrder.deliveryDate}
                    onChange={(e) => setNewOrder({ ...newOrder, deliveryDate: e.target.value })}
                    style={{ ...modalInputStyle, width: '100%', marginTop: '2px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                  }}
                  style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer' }}
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#16a34a', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {editingId ? 'Yenilə' : 'Yadda Saxla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusBg(status) {
  switch (status) {
    case 'Hazırdır': return '#dcfce7';
    case 'Təhvil verildi': return '#bbf7d0';
    case 'Ləğv edildi': return '#fecdd3';
    default: return '#fef08a';
  }
}

const modalInputStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box'
};

export default Orders;