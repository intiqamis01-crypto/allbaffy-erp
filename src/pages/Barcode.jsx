import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([
    { id: 1, code: 'ALZ-001', name: 'Alize Puffy Uşaq Yorğanı', color: 'Krem', cost: 45.00, price: 70.00, stock: 12 },
    { id: 2, code: 'ALZ-002', name: 'Alize Puffy İp', color: 'Bej', cost: 3.50, price: 5.00, stock: 50 },
    { id: 3, code: 'BOX-001', name: 'Hədiyyə Qutusu (L)', color: 'Tünd Qəhvəyi', cost: 15.00, price: 35.00, stock: 3 },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Əməliyyat Paneli */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#78716c' }} />
          <input 
            type="text" 
            placeholder="Məhsul və ya kod axtar..." 
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid #e7e5e4', backgroundColor: '#ffffff', outline: 'none', fontSize: '14px' }}
          />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', backgroundColor: '#1c1917', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
          <Plus size={18} /> Yeni Məhsul
        </button>
      </div>

      {/* Cədvəl */}
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e7e5e4', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f5f2eb', color: '#78716c' }}>
              <th style={{ padding: '12px 8px', fontWeight: '700' }}>Kod</th>
              <th style={{ padding: '12px 8px', fontWeight: '700' }}>Məhsul Adı</th>
              <th style={{ padding: '12px 8px', fontWeight: '700' }}>Rəng</th>
              <th style={{ padding: '12px 8px', fontWeight: '700' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px 8px', fontWeight: '700' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px 8px', fontWeight: '700' }}>Stok</th>
              <th style={{ padding: '12px 8px', fontWeight: '700', textAlign: 'right' }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f5f2eb' }}>
                <td style={{ padding: '14px 8px', color: '#78716c', fontWeight: '500' }}>{p.code}</td>
                <td style={{ padding: '14px 8px', color: '#1c1917', fontWeight: '400' }}>{p.name}</td>
                <td style={{ padding: '14px 8px' }}>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#f2ede4', color: '#57534e', border: '1px solid #e2dacd', fontWeight: '500' }}>
                    {p.color}
                  </span>
                </td>
                <td style={{ padding: '14px 8px', color: '#78716c', fontWeight: '400' }}>{p.cost.toFixed(2)} AZN</td>
                <td style={{ padding: '14px 8px', color: '#1c1917', fontWeight: '400' }}>{p.price.toFixed(2)} AZN</td>
                <td style={{ padding: '14px 8px' }}>
                  <span style={{ color: p.stock <= 5 ? '#dc2626' : '#1c1917', fontWeight: p.stock <= 5 ? '700' : '400' }}>
                    {p.stock} ədəd
                  </span>
                </td>
                <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716c', marginRight: '8px' }}><Edit size={16} /></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}