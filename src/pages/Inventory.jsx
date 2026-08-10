import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { yarnsData } from '../data/yarnsData';

export default function Inventory() {
  const [yarns, setYarns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [uploading, setUploading] = useState(false);

  // Firestore-dan dataları çəkmək
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
      console.error("Data çəkilərkən xəta yarandı:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYarns();
  }, []);

  // yarnsData-dakı bütün ipləri birdəfəlik Firebase Firestore-a yükləmək
  const handleSeedDatabase = async () => {
    if (!window.confirm("Bütün static ip bazasını Firebase-ə yükləmək istəyirsiniz?")) return;
    setUploading(true);
    try {
      for (const item of yarnsData) {
        await setDoc(doc(db, 'yarns', item.id), {
          brand: item.brand,
          series: item.series,
          code: item.code,
          colorName: item.colorName,
          stockCount: 0 // Başlanğıc üçün stok 0
        });
      }
      alert("Bütün iplər uğurla Firebase bazasına əlavə olundu!");
      fetchYarns();
    } catch (error) {
      console.error("Yükləmə xətası:", error);
      alert("Xəta baş verdi, konsola baxın.");
    } finally {
      setUploading(false);
    }
  };

  const filteredYarns = yarns.filter((yarn) => {
    const matchesSearch =
      (yarn.code && yarn.code.toLowerCase().includes(search.toLowerCase())) ||
      (yarn.colorName && yarn.colorName.toLowerCase().includes(search.toLowerCase()));
    
    const matchesSeries =
      selectedSeries === 'All' || yarn.series === selectedSeries;

    return matchesSearch && matchesSeries;
  });

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#4A3B32', margin: 0, fontSize: '24px' }}>İp Anbarı (Firebase Baza)</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {yarns.length === 0 && !loading && (
            <button
              onClick={handleSeedDatabase}
              disabled={uploading}
              style={{
                backgroundColor: '#785A46',
                color: '#FFF',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {uploading ? "Yüklənir..." : "İp Bazasını Firebase-ə Yüklə"}
            </button>
          )}
          <span style={{ backgroundColor: '#D9C3B0', padding: '6px 12px', borderRadius: '16px', color: '#3A2E2B', fontWeight: 'bold' }}>
            Cəmi Çeşid: {filteredYarns.length}
          </span>
        </div>
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
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#785A46' }}>Məlumatlar yüklənir...</div>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #E0D3C1' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#FFF' }}>
            <thead>
              <tr style={{ backgroundColor: '#785A46', color: '#FFF' }}>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Marka</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Seriya</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Rəng Kodu</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Rəng Adı</th>
                <th style={{ padding: '12px 16px', fontWeight: '600' }}>Stok (Ədəd)</th>
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
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#4A3B32' }}>{yarn.stockCount || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#888' }}>
                    Axtarışa uyğun ip tapılmadı və ya baza boşdur.
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