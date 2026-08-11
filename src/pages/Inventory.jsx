import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { yarnsData } from '../data/yarnsData';

// İp seriyalarını bura əlavə edərək siyahını asanlıqla idarə edə bilərsən
const AVAILABLE_SERIES = ["Puffy", "Puffy Color", "Puffy Fine", "Puffy More"]; 

export default function Inventory() {
  // ... (əvvəlki state-lər qalır)
  const [yarns, setYarns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Yeni məhsul forması
  const [newSeries, setNewSeries] = useState(AVAILABLE_SERIES[0]);
  const [newBrand, setNewBrand] = useState('Alize');
  const [newCode, setNewCode] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // ... (fetchYarns, handleSeedDatabase, handleAddSingleYarn, handleEditStock funksiyaları eyni qalır)

  // FILTER LOGIC
  const filteredYarns = yarns.filter((yarn) => {
    const matchesSearch =
      (yarn.code && yarn.code.toLowerCase().includes(search.toLowerCase())) ||
      (yarn.colorName && yarn.colorName.toLowerCase().includes(search.toLowerCase())) ||
      (yarn.brand && yarn.brand.toLowerCase().includes(search.toLowerCase())) ||
      (yarn.series && yarn.series.toLowerCase().includes(search.toLowerCase()));
    
    const matchesSeries = selectedSeries === 'All' || yarn.series === selectedSeries;
    return matchesSearch && matchesSeries;
  });

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', backgroundColor: '#FAF6F0', minHeight: '100vh' }}>
      {/* BAŞLIQ */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ color: '#4A3B32', margin: 0, fontSize: '24px' }}>İp Anbarı</h1>
        {/* Düymələr eyni... */}
      </div>

      {/* YENİ İP FORMASI - DİNAMİK */}
      {showAddForm && (
        <form onSubmit={handleAddSingleYarn} style={{ backgroundColor: '#F5EBE1', padding: '20px', borderRadius: '8px', border: '1px solid #E0D3C1', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A3B32', fontWeight: 'bold', fontSize: '13px' }}>Seriya Seç:</label>
            <select value={newSeries} onChange={(e) => setNewSeries(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #C4B2A0' }}>
              {AVAILABLE_SERIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {/* Digər form sahələri eyni... */}
        </form>
      )}

      {/* AXTARIŞ VƏ FİLTR - DİNAMİK */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', backgroundColor: '#F5EBE1', padding: '16px', borderRadius: '8px', border: '1px solid #E0D3C1', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Axtar..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #C4B2A0' }} />
        
        <select value={selectedSeries} onChange={(e) => setSelectedSeries(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #C4B2A0' }}>
          <option value="All">Bütün Seriyalar</option>
          {AVAILABLE_SERIES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Cədvəl eyni qaydada işləyir... */}
    </div>
  );
}