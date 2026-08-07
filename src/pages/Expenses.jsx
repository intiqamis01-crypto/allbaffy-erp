import React, { useState } from 'react';
import { Plus, Trash2, Edit, X } from 'lucide-react';

export default function Expenses() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Alize Puffy İp (Topdansatış)', category: 'İp Xərcləri', quantity: '5 yumaq', price: 20.00, date: '2026-08-01' },
    { id: 2, name: 'Hədiyyə Qutuları və Lentlər', category: 'Qablaşdırma', quantity: '10 ədəd', price: 15.50, date: '2026-08-02' },
  ]);

  const [categories] = useState(['İp Xərcləri', 'Qablaşdırma', 'Etiket və Brend', 'Nəqliyyat', 'Digər']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: categories[0], quantity: '', price: '', date: new Date().toISOString().split('T')[0] });

  const openModal = (expense = null) => {
    if (expense) {
      setEditingExpense(expense);
      setFormData(expense);
    } else {
      setEditingExpense(null);
      setFormData({ name: '', category: categories[0], quantity: '', price: '', date: new Date().toISOString().split('T')[0] });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formattedData = { ...formData, price: Number(formData.price) };

    if (editingExpense) {
      setExpenses(expenses.map(item => item.id === editingExpense.id ? { ...formattedData, id: item.id } : item));
    } else {
      setExpenses([...expenses, { ...formattedData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  const totalExpenseAmount = expenses.reduce((acc, item) => acc + Number(item.price), 0);

  const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #d6d3d1', backgroundColor: '#ffffff', color: '#000000', width: '100%', fontSize: '14px', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#1c1917', marginBottom: '4px', display: 'block' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      {/* Başlıq və düymə hissəsi */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1c1917' }}>Rasxodlar</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#78716c' }}>
            Ümumi xərclər: <b style={{ color: '#1c1917' }}>{totalExpenseAmount.toFixed(2)} AZN</b>
          </p>
        </div>

        <button 
          onClick={() => openModal()} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', backgroundColor: '#1c1917', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
        >
          <Plus size={18} /> Yeni Rasxod Əlavə Et
        </button>
      </div>

      {/* Cədvəl */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #d6d3d1', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e7e5e4', color: '#1c1917' }}>
              <th style={{ padding: '12px 12px', fontWeight: '600' }}>Xərcin Adı</th>
              <th style={{ padding: '12px 12px', fontWeight: '600' }}>Kateqoriya</th>
              <th style={{ padding: '12px 12px', fontWeight: '600' }}>Miqdar</th>
              <th style={{ padding: '12px 12px', fontWeight: '600' }}>Tarix</th>
              <th style={{ padding: '12px 12px', fontWeight: '600' }}>Qiymət</th>
              <th style={{ padding: '12px 12px', fontWeight: '600', textAlign: 'right' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f5f2eb' }}>
                  <td style={{ padding: '16px 12px', color: '#000000', fontWeight: '500' }}>{item.name}</td>
                  <td style={{ padding: '16px 12px', color: '#44403c' }}>{item.category}</td>
                  <td style={{ padding: '16px 12px', color: '#44403c' }}>{item.quantity || '-'}</td>
                  <td style={{ padding: '16px 12px', color: '#44403c' }}>{item.date || '-'}</td>
                  <td style={{ padding: '16px 12px', color: '#dc2626', fontWeight: '700' }}>{Number(item.price).toFixed(2)} AZN</td>
                  <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                    <button onClick={() => openModal(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1c1917', marginRight: '12px' }}><Edit size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '24px', color: '#78716c' }}>
                  Heç bir xərc əlavə olunmayıb.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '460px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000000' }}>
                {editingExpense ? 'Xərci Düzəlt' : 'Yeni Xərc Əlavə Et'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1c1917' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Xərcin Adı</label>
                <input type="text" placeholder="Məs: Alize Puffy ip (5 ədəd)" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={inputStyle} />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Kateqoriya</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={inputStyle}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Miqdar</label>
                  <input type="text" placeholder="Məs: 5 yumaq" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Tarix</label>
                  <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Qiymət (AZN)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #d6d3d1', backgroundColor: '#ffffff', color: '#000000', fontWeight: '600', cursor: 'pointer' }}>Ləğv et</button>
                <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#1c1917', color: '#ffffff', fontWeight: '600', cursor: 'pointer' }}>Yadda Saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}