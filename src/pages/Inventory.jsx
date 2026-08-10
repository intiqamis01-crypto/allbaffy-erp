import React, { useState } from 'react';
import { yarnsData } from '../data/yarnsData';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');

  // Filtrasiya məntiqi
  const filteredYarns = yarnsData.filter((yarn) => {
    const matchesSearch =
      yarn.code.toLowerCase().includes(search.toLowerCase()) ||
      yarn.colorName.toLowerCase().includes(search.toLowerCase());
    
    const matchesSeries =
      selectedSeries === 'All' || yarn.series === selectedSeries;

    return matchesSearch && matchesSeries;
  });

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#4A3B32', margin: 0, fontSize: '24px' }}>İp Anbarı (Kataloq)</h1>
        <span style={{ backgroundColor: '#D9C3B0', padding: '6px 12px', borderRadius: '16px', color: '#3A2E2B', fontWeight: 'bold' }}>
          Cəmi Çeşid: {filteredYarns.length}
        </span>
      </div>

      {/* Axtarış və Filtr Paneli */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px', 
        backgroundColor: '#F5EBE1', 
        padding: '16px', 
        borderRadius: '8px',
        border: '1px solid #E0D3C1' 
      }}>
        <input
          type="text"
          placeholder="Rəng kodu və ya rəng adı ilə axtar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #C4B2A0',
            fontSize: '14px',
            outline: 'none'
          }}
        />

        <select
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #C4B2A0',
            backgroundColor: '#FFF',
            fontSize: '14px',
            color: '#4A3B32',
            outline: 'none'
          }}
        >
          <option value="All">Bütün Seriyalar</option>
          <option value="Puffy">Alize Puffy</option>
          <option value="Puffy Color">Alize Puffy Color</option>
        </select>
      </div>

      {/* Cədvəl */}
      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #E0D3C1' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#FFF' }}>
          <thead>
            <tr style={{ backgroundColor: '#785A46', color: '#FFF' }}>
              <th style={{ padding: '12px 16px', fontWeight: '600' }}>Marka</th>
              <th style={{ padding: '12px 16px', fontWeight: '600' }}>Seriya</th>
              <th style={{ padding: '12px 16px', fontWeight: '600' }}>Rəng Kodu</th>
              <th style={{ padding: '12px 16px', fontWeight: '600' }}>Rəng Adı</th>
            </tr>
          </thead>
          <tbody>
            {filteredYarns.length > 0 ? (
              filteredYarns.map((yarn, idx) => (
                <tr 
                  key={yarn.id} 
                  style={{ 
                    backgroundColor: idx % 2 === 0 ? '#FAF6F0' : '#FFFFFF',
                    borderBottom: '1px solid #E0D3C1' 
                  }}
                >
                  <td style={{ padding: '12px 16px', color: '#4A3B32' }}>{yarn.brand}</td>
                  <td style={{ padding: '12px 16px', color: '#785A46', fontWeight: '500' }}>{yarn.series}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#3A2E2B' }}>
                    <span style={{ backgroundColor: '#EFE7DE', padding: '4px 8px', borderRadius: '4px', border: '1px solid #D9C3B0' }}>
                      {yarn.code}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#4A3B32' }}>{yarn.colorName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#888' }}>
                  Axtarışa uyğun ip tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}