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

  // Şəkil böyütmək üçün state
  const [activeImage, setActiveImage] = useState(null);

  // Yeni məhsul üçün form state-ləri
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBrand, setNewBrand] = useState('Alize');
  const [newSeries, setNewSeries] = useState('Puffy');
  const [newCode, setNewCode] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Firebase Firestore-dan ipləri çəkmək
  const fetchYarns = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'yarns'));
      const list = [];
      querySnapshot.forEach((docItem) => {
        list.push({ id: docItem.id, ...docItem.data() });
      });
      
      if (list.length > 0) {
        setYarns(list);
      } else {
        setYarns(yarnsData);
      }
    } catch (error) {
      console.error("Firebase xətası, yerli məlumatlar göstərilir:", error);
      setYarns(yarnsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYarns();
  }, []);

  // Bütün yarnsData siyahısını Firebase-ə toplu yükləmək
  const handleSeedDatabase = async () => {
    if (!window.confirm("Bütün ip bazasını (şəkillər və kodlarla birlikdə) Firebase-ə yükləmək istəyirsiniz?")) return;
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
      alert("Bütün iplər uğurla bazaya yükləndi!");
      fetchYarns();
    } catch (error) {
      console.error(error);
      alert("Yüklənərkən xəta baş verdi.");
    } finally {
      setUploading(false);
    }
  };

  // Tək bir yeni məhsul əlavə etmək
  const handleAddSingleYarn = async (e) => {
    e.preventDefault();
    try {
      const customId = `puffy_${newCode}_${Date.now()}`;
      await setDoc(doc(db, 'yarns', customId), {
        brand: newBrand,
        series: newSeries,
        code: newCode,
        colorName: newColorName,
        stockCount: Number(newStock) || 0,
        imageUrl: newImageUrl
      });

      alert("Yeni ip uğurla əlavə olundu!");
      setShowAddForm(false);
      setNewCode('');
      setNewColorName('');
      setNewStock('');
      setNewImageUrl('');
      fetchYarns();
    } catch (error) {
      console.error(error);
      alert("Əlavə edilərkən xəta oldu.");
    }
  };

  // Stok miqdarını yeniləmək
  const handleEditStock = async (yarn) => {
    const currentStock = yarn.stockCount || 0;
    const input = window.prompt(`${yarn.brand} ${yarn.series} (${yarn.code}) üçün yeni stok miqdarını yazın:`, currentStock);
    
    if (input === null) return;
    const newStockVal = parseInt(input, 10);
    if (isNaN(newStockVal) || newStockVal < 0) return alert("Düzgün rəqəm yazın!");

    try {
      const yarnRef = doc(db, 'yarns', yarn.id);
      await updateDoc(yarnRef, { stockCount: newStockVal });
      setYarns(prev => prev.map(item => item.id === yarn.id ? { ...item, stockCount: newStockVal } : item));
    } catch (error) {
      try {
        const yarnRef = doc(db, 'yarns', yarn.id);
        await setDoc(yarnRef, { ...yarn, stockCount: newStockVal });
        setYarns(prev => prev.map(item => item.id === yarn.id ? { ...item, stockCount: newStockVal } : item));
      } catch (err) {
        alert("Xəta baş verdi.");
      }
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
      
      {/* Başlıq və Düymələr */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ color: '#4A3B32', margin: 0, fontSize: '24px' }}>İp Anbarı</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{ backgroundColor: '#5c4033', color: '#FFF', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showAddForm ? "Bağla" : "+ Yeni İp Əlavə Et"}
          </button>

          {!loading && (
            <button
              onClick={handleSeedDatabase}
              disabled={uploading}
              style={{ backgroundColor: '#785A46', color: '#FFF', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {uploading ? "Yüklənir..." : "Bütün Bazanı Yüklə / Yenilə"}
            </button>
          )}

          <span style={{ backgroundColor: '#D9C3B0', padding: '8px 14px', borderRadius: '16px', color: '#3A2E2B', fontWeight: 'bold' }}>
            Cəmi Çeşid: {filteredYarns.length}
          </span>
        </div>
      </div>

      {/* Yeni İp Əlavə Etmə Forması */}
      {showAddForm && (
        <form onSubmit={handleAddSingleYarn} style={{ backgroundColor: '#F5EBE1', padding: '20px', borderRadius: '8px', border: '1px solid #E0D3C1', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A3B32', fontWeight: 'bold', fontSize: '13px' }}>Seriya:</label>
            <select value={newSeries} onChange={(e) => setNewSeries(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #C4B2A0' }}>
              <option value="Puffy">Alize Puffy</option>
              <option value="Puffy Color">Alize Puffy Color</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A3B32', fontWeight: 'bold', fontSize: '13px' }}>Rəng Kodu:</label>
            <input type="text" placeholder="Məs: 185" value={newCode} onChange={(e) => setNewCode(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #C4B2A0', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A3B32', fontWeight: 'bold', fontSize: '13px' }}>Rəng Adı:</label>
            <input type="text" placeholder="Məs: Çəhrayı" value={newColorName} onChange={(e) => setNewColorName(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #C4B2A0', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A3B32', fontWeight: 'bold', fontSize: '13px' }}>İlkin Stok:</label>
            <input type="number" placeholder="0" value={newStock} onChange={(e) => setNewStock(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #C4B2A0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#4A3B32', fontWeight: 'bold', fontSize: '13px' }}>Şəkil Linki (URL):</label>
            <input type="text" placeholder="https://..." value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #C4B2A0', boxSizing: 'border-box' }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" style={{ backgroundColor: '#785A46', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              Yadda Saxla
            </button>
          </div>
        </form>
      )}

      {/* Axtarış Və Filtr */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', backgroundColor: '#F5EBE1', padding: '16px', borderRadius: '8px', border: '1px solid #E0D3C1', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Rəng kodu, rəng adı və ya ip adı ilə axtar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '220px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #C4B2A0', fontSize: '14px', outline: 'none' }}
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
                          onClick={() => setActiveImage(yarn.imageUrl)}
                          title="Böyütmək üçün toxun"
                          style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #D9C3B0', cursor: 'pointer' }}
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

      {/* Şəkli Böyük Göstərən Modal (Pop-up) */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, cursor: 'pointer' }}
        >
          <div style={{ position: 'relative', padding: '10px', backgroundColor: '#FFF', borderRadius: '8px' }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={activeImage} 
              alt="Böyük şəkil" 
              style={{ maxWidth: '85vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '6px', display: 'block' }}
            />
            <button 
              onClick={() => setActiveImage(null)}
              style={{ position: 'absolute', top: '-12px', right: '-12px', backgroundColor: '#5c4033', color: '#FFF', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}