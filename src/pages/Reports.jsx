import React, { useState, useMemo } from 'react';

export default function Reports({ orders = [], expenses = [] }) {
  // Tarix filtri (Başlanğıc və Bitiş)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sifarişlər və Xərclərdən İnteqrasiya edərək Aylıq Hesablama
  const monthlyData = useMemo(() => {
    const monthsMap = {};

    // 1. Sifarişləri daxil et və aylara görə qruplaşdır
    (orders || []).forEach(ord => {
      const ordDate = ord.orderDate || ord.date;
      if (!ordDate) return;

      // Tarix filtri
      if (startDate && ordDate < startDate) return;
      if (endDate && ordDate > endDate) return;

      const dateObj = new Date(ordDate);
      const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
      
      const monthName = dateObj.toLocaleDateString('az-AZ', { month: 'long', year: 'numeric' });

      if (!monthsMap[monthKey]) {
        monthsMap[monthKey] = {
          monthKey,
          monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
          itemCount: 0,
          sales: 0,
          cost: 0,
          expenses: 0
        };
      }

      monthsMap[monthKey].itemCount += Number(ord.count) || 1;
      monthsMap[monthKey].sales += Number(ord.totalAmount) || 0;
      monthsMap[monthKey].cost += Number(ord.cost) || 0;
    });

    // 2. Xərcləri (rasxod) daxil et və aylara görə qruplaşdır
    (expenses || []).forEach(exp => {
      const expDate = exp.expenseDate || exp.date;
      if (!expDate) return;

      // Tarix filtri
      if (startDate && expDate < startDate) return;
      if (endDate && expDate > endDate) return;

      const dateObj = new Date(expDate);
      const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
      const monthName = dateObj.toLocaleDateString('az-AZ', { month: 'long', year: 'numeric' });

      if (!monthsMap[monthKey]) {
        monthsMap[monthKey] = {
          monthKey,
          monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
          itemCount: 0,
          sales: 0,
          cost: 0,
          expenses: 0
        };
      }

      monthsMap[monthKey].expenses += Number(exp.amount) || 0;
    });

    // Tarixə görə yenidən köhnəyə sıralama
    return Object.values(monthsMap).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [orders, expenses, startDate, endDate]);

  // Ümumi Yekunlar
  const totalSales = monthlyData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalCost = monthlyData.reduce((acc, curr) => acc + curr.cost, 0);
  const totalExpenses = monthlyData.reduce((acc, curr) => acc + curr.expenses, 0);
  
  // Düstur: Xalis Mənfəət = Satış Həcmi - (Maya + Xərclər)
  const netProfit = totalSales - (totalCost + totalExpenses);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* BAŞLIQ VƏ TARİX ARALIĞI SEÇİMİ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c1a14', margin: 0 }}>Mənfəət və Satış Hesabatı</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff', padding: '10px 16px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>📅 Tarix Aralığı:</span>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            style={dateInputStyle} 
          />
          <span style={{ color: '#94a3b8' }}>—</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            style={dateInputStyle} 
          />
          {(startDate || endDate) && (
            <button 
              onClick={() => { setStartDate(''); setEndDate(''); }}
              style={{ padding: '6px 12px', fontSize: '12px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#475569' }}
            >
              Təmizlə
            </button>
          )}
        </div>
      </div>

      {/* STATİSTİKA KARTLARI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ ...cardStyle, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
          <span style={cardTitleStyle}>Ümumi Satış Həcmi</span>
          <span style={{ ...cardValueStyle, color: '#16a34a' }}>{totalSales.toFixed(2)} AZN</span>
        </div>

        <div style={{ ...cardStyle, backgroundColor: '#fff7ed', borderColor: '#ffedd5' }}>
          <span style={cardTitleStyle}>Satılan Məhsulun Maya Dəyəri</span>
          <span style={{ ...cardValueStyle, color: '#c2410c' }}>{totalCost.toFixed(2)} AZN</span>
        </div>

        <div style={{ ...cardStyle, backgroundColor: '#fef2f2', borderColor: '#fee2e2' }}>
          <span style={cardTitleStyle}>Ümumi Xərclər (Rasxod)</span>
          <span style={{ ...cardValueStyle, color: '#dc2626' }}>{totalExpenses.toFixed(2)} AZN</span>
        </div>

        <div style={{ ...cardStyle, backgroundColor: '#faf5ff', borderColor: '#f3e8ff' }}>
          <span style={cardTitleStyle}>Xalis Mənfəət</span>
          <span style={{ ...cardValueStyle, color: netProfit >= 0 ? '#7e22ce' : '#dc2626' }}>
            {netProfit.toFixed(2)} AZN
          </span>
        </div>
      </div>

      {/* AYLIK CƏDVƏL */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Aylıq Mənfəət Bölgüsü</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b', fontSize: '13px' }}>
              <th style={{ padding: '12px' }}>Tarix / Dönəm</th>
              <th style={{ padding: '12px' }}>Satılan Sayı</th>
              <th style={{ padding: '12px' }}>Ümumi Maya</th>
              <th style={{ padding: '12px' }}>Xərclər (Rasxod)</th>
              <th style={{ padding: '12px' }}>Ümumi Satış</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Xalis Mənfəət</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                  Hələ heç bir sifariş və ya xərc məlumatı yoxdur.
                </td>
              </tr>
            ) : (
              monthlyData.map((row) => {
                const rowNetProfit = row.sales - (row.cost + row.expenses);
                return (
                  <tr key={row.monthKey} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#1e293b' }}>{row.monthName}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{row.itemCount} ədəd</td>
                    <td style={{ padding: '12px', color: '#c2410c' }}>{row.cost.toFixed(2)} AZN</td>
                    <td style={{ padding: '12px', color: '#dc2626' }}>{row.expenses.toFixed(2)} AZN</td>
                    <td style={{ padding: '12px', fontWeight: '500' }}>{row.sales.toFixed(2)} AZN</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: rowNetProfit >= 0 ? '#16a34a' : '#dc2626' }}>
                      {rowNetProfit >= 0 ? '+' : ''}{rowNetProfit.toFixed(2)} AZN
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

const cardStyle = { padding: '20px', borderRadius: '12px', border: '1px solid', display: 'flex', flexDirection: 'column' };
const cardTitleStyle = { fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' };
const cardValueStyle = { fontSize: '22px', fontWeight: 'bold' };
const dateInputStyle = { padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#1e293b' };