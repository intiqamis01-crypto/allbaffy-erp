import React, { useState } from 'react';

export default function Inventory({ inventory = [], setInventory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Bütün');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    code: '',
    name: '',
    category: 'Körpə Tekstili',
    yarnType: 'Alize Puffy',
    stockType: 'Stokda hazır', // 'Stokda hazır' və ya 'Sıfırdan hörülür'
    quantity: 1,
    cost: '',
    price: ''
  });

  const handleDelete = (id) => {
    if (window.confirm('Bu məhsulu inventardan silmək istədiyinizdən əminsiniz?')) {
      if (setInventory) {
        setInventory((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      ...newItem,
      quantity: Number(newItem.quantity) || 0,
      cost: Number(newItem.cost) || 0,
      price: Number(newItem.price) || 0
    };

    if (setInventory) {
      setInventory((prev) => [created, ...prev]);
    }

    setIsModalOpen(false);
    setNewItem({
      code: '',
      name: '',
      category: 'Körpə Tekstili',
      yarnType: 'Alize Puffy',
      stockType: 'Stokda hazır',
      quantity: 1,
      cost: '',
      price: ''
    });
  };

  const filteredInventory = inventory.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.code && item.code.toLowerCase().includes(term)) ||
      (item.category && item.category.toLowerCase().includes(term));

    const matchesType =
      typeFilter === 'Bütün' || item.stockType === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* BAŞLIQ VƏ ƏLAVƏ ET DÜYMƏSİ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Məhsullar / İnventar</h1>
        <button
          onClick={() => {
            const nextId = inventory.length + 1;
            const generatedCode = `ALP-${String(nextId).padStart(3, '0')}`;
            setNewItem((prev) => ({ ...prev, code: generatedCode }));
            setIsModalOpen(true);
          }}
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
          + Yeni Məhsul
        </button>
      </div>

      {/* AXTARIŞ VƏ İSTEHSAL NÖVÜ FİLTRİ */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <input
          type="text"
          placeholder="🔍 Axtarış (ad, kod)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '180px',
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
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
          <option value="Bütün">Bütün Məhsullar</option>
          <option value="Stokda hazır">📦 Stokda Var</option>
          <option value="Sıfırdan hörülür">🧶 Sıfırdan Hörülür</option>
        </select>
      </div>

      {/* CƏDVƏL */}
      <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
              <th style={{ padding: '10px' }}>Kod</th>
              <th style={{ padding: '10px' }}>Məhsul Adı</th>
              <th style={{ padding: '10px' }}>Kateqoriya</th>
              <th style={{ padding: '10px' }}>Hazırlanma Növü</th>
              <th style={{ padding: '10px' }}>Stok Sayı</th>
              <th style={{ padding: '10px' }}>Maya Dəyəri</th>
              <th style={{ padding: '10px' }}>Satış Qiyməti</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                  Axtarışa uyğun məhsul tapılmadı.
                </td>
              </tr>
            ) : (
              filteredInventory.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#334155' }}>{item.code || '—'}</td>
                  <td style={{ padding: '10px', fontWeight: '500' }}>{item.name || '—'}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{item.category || '—'}</td>
                  <td style={{ padding: '10px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        backgroundColor: item.stockType === 'Sıfırdan hörülür' ? '#fef3c7' : '#dcfce7',
                        color: item.stockType === 'Sıfırdan hörülür' ? '#b45309' : '#15803d'
                      }}
                    >
                      {item.stockType === 'Sıfırdan hörülür' ? '🧶 Sıfırdan hörülür' : '📦 Stokda var'}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>
                    {item.stockType === 'Sıfırdan hörülür' ? '—' : `${item.quantity || 0} ədəd`}
                  </td>
                  <td style={{ padding: '10px' }}>{Number(item.cost || 0).toFixed(2)} AZN</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{Number(item.price || 0).toFixed(2)} AZN</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                      title="Sil"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PƏNCƏRƏSİ */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '450px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: '#0f172a' }}>Yeni Məhsul Əlavə Et</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Məhsul Adı"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  style={modalInputStyle}
                />
                <input
                  type="text"
                  placeholder="Kod (Avtomatik)"
                  value={newItem.code}
                  onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                  style={{ ...modalInputStyle, backgroundColor: '#f1f5f9', fontWeight: 'bold' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: '#64748b' }}>Hazırlanma Növü:</label>
                  <select
                    value={newItem.stockType}
                    onChange={(e) => setNewItem({ ...newItem, stockType: e.target.value })}
                    style={{ ...modalInputStyle, marginTop: '2px' }}
                  >
                    <option value="Stokda hazır">📦 Stokda Hazır Var</option>
                    <option value="Sıfırdan hörülür">🧶 Sıfırdan Hörülür</option>
                  </select>
                </div>

                {newItem.stockType === 'Stokda hazır' && (
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', color: '#64748b' }}>Stok Sayı:</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                      style={{ ...modalInputStyle, marginTop: '2px' }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Kateqoriya"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  style={modalInputStyle}
                />
                <input
                  type="text"
                  placeholder="İpin Növü"
                  value={newItem.yarnType}
                  onChange={(e) => setNewItem({ ...newItem, yarnType: e.target.value })}
                  style={modalInputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="Maya Dəyəri (AZN)"
                  value={newItem.cost}
                  onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                  style={modalInputStyle}
                />
                <input
                  type="number"
                  placeholder="Satış Qiyməti (AZN)"
                  required
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  style={modalInputStyle}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer' }}
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', backgroundColor: '#16a34a', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
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