import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { yarnsData } from '../data/yarnsData';

export default function Inventory() {
  const [yarns, setYarns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [uploading, setUploading] = useState(false);

  // Firebase Firestore-dan ipləri çəkmək
  const fetchYarns = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'yarns'));
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setYarns(list);
    } catch (error) {
      console.error("Firebase xətası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYarns();
  }, []);

  // Stok miqdarını yeniləmək
  const handleEditStock = async (yarn) => {
    const currentStock = yarn.stockCount || 0;
    const input = window.prompt(`${yarn.brand} ${yarn.series} (${yarn.code}) üçün yeni stok miqdarını yazın:`, currentStock);
    
    if (input === null) return;
    const newStock = parseInt(input, 10);
    if (isNaN(newStock) || newStock < 0) return alert("Düzgün rəqəm yazın!");

    try {
      const yarnRef = doc(db, 'yarns', yarn.id);
      await updateDoc(yarnRef, { stockCount: newStock });
      setYarns(prev => prev.map(item => item.id === yarn.id ? { ...item, stockCount: newStock } : item));
    } catch (error) {
      alert("Xəta baş verdi.");
    }
  };

  // Static yarnsData siyahısını Firebase-ə yükləmək/yeniləmək
  const handleSeedDatabase = async () => {
    if (!window.confirm("İp bazasını yeni məlumatlar və şəkillərlə Firebase-ə yükləmək istəyirsiniz?")) return;
    setUploading(true);
    try {
      for (const item of yarnsData) {
        await setDoc(doc(db, 'yarns', item.id), {
          brand: item.brand,
          series: item.series,
          code: item.code,
          colorName: item.colorName,
          stockCount: item.stockCount || 0,
          imageUrl: item.imageUrl || ''
        });
      }
      alert("Bütün iplər uğurla yükləndi və yeniləndi!");
      fetchYarns();
    } catch (error) {
      console.error(error);
      alert("Xəta baş verdi.");
    } finally {
      setUploading(false);
    }
  };

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
      
      {/* Başlıq */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#4A3B32', margin: 0, fontSize: '24px' }}>İp Anbarı</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {!loading && (
            <button
              onClick={handleSeedDatabase}
              disabled={uploading}
              style={{ backgroundColor: '#785A46', color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {uploading ? "Yüklənir..." : "İp Bazasını Yenilə (Şəkillərlə)"}
            </button>
          )}
          <span style={{ backgroundColor: '#D9C3B0', padding: '6px 14px', borderRadius: '16px', color: '#3A2E2B', fontWeight: 'bold' }}>
            Cəmi Çeşid: {filteredYarns.length}
          </span>
        </div>
      </div>

      {/* Axtarış Və Filtr */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', backgroundColor: '#F5EBE1', padding: '16px', borderRadius: '8px', border: '1px solid #E0D3C1' }}>
        <input
          type="text"
          placeholder="Rəng kodu, rəng adı və ya ip adı ilə axtar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '10px 14px', borderRadius: '6px', border: '1px solid #C4B2A0', fontSize: '14px', outline: 'none' }}
        />
        <select
          value={selectedSeries}
          onChange={(e) => setSelectedSeries(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid #C4B2A0', backgroundColor: '#FFF', fontSize: '14px', color: '#4A3B32', outline: 'none' }}
        >
          <option value="All">Bütün Seriyalar</option>
          <option value="Puffy">Alize Puffy</option>
          <option value="Puffy Color">Alize Puffy Color</option>
        </select>
      </div>

      {/* Cədvəl */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#785A46', fontWeight: 'bold' }}>Məlumatlar yüklənir...</div>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #E0D3C1', backgroundColor: '#FFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#785A46', color: '#FFF' }}>
                <th style={{ padding: '12px 16px' }}>İpin Adı</th>
                <th style={{ padding: '12px 16px' }}>Şəkil</th>
                <th style={{ padding: '12px 16px' }}>Rəng Kodu</th>
                <th style={{ padding: '12px 16px' }}>Rəng Adı</th>
                <th style={{ padding: '12px 16px' }}>Stok (Ədəd)</th>
                <th style={{ padding: '12px 16px', textAlign: 'center' }}>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredYarns.length > 0 ? (
                filteredYarns.map((yarn, idx) => (
                  <tr key={yarn.id} style={{ backgroundColor: idx % 2 === 0 ? '#FAF6F0' : '#FFFFFF', borderBottom: '1px solid #E0D3C1' }}>
                    <td style={{ padding: '12px 16px', color: '#4A3B32', fontWeight: 'bold' }}>
                      {yarn.brand} {yarn.series}
                    </td>
                    <td style={{ padding: '8px 16px' }}>
                      {yarn.imageUrl ? (
                        <img 
                          src={yarn.imageUrl} 
                          alt="ip" 
                          style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #D9C3B0' }}
                        />
                      ) : (
                        <div style={{ width: '45px', height: '45px', backgroundColor: '#EFE7DE', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A08C7D', fontSize: '10px' }}>
                          Şəkil Yox
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>
                      <span style={{ backgroundColor: '#EFE7DE', padding: '4px 8px', borderRadius: '4px', border: '1px solid #D9C3B0' }}>
                        {yarn.code}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#4A3B32' }}>{yarn.colorName}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#4A3B32' }}>{yarn.stockCount || 0}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEditStock(yarn)}
                        style={{ backgroundColor: '#A67B5B', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                      >
                        Düzəliş et
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#888' }}>
                    Axtarışa uyğun məlumat tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}