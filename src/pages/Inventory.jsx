import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { yarnsData } from '../data/yarnsData';

const AVAILABLE_SERIES = ["Puffy", "Puffy Color", "Puffy Fine", "Puffy More"];

export default function Inventory() {
  const [yarns, setYarns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBrand, setNewBrand] = useState('Alize');
  const [newSeries, setNewSeries] = useState(AVAILABLE_SERIES[0]);
  const [newCode, setNewCode] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const fetchYarns = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'yarns'));
      const list = [];
      querySnapshot.forEach((docItem) => {
        list.push({ id: docItem.id, ...docItem.data() });
      });
      setYarns(list.length > 0 ? list : yarnsData);
    } catch (error) {
      setYarns(yarnsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYarns();
  }, []);

  const handleSeedDatabase = async () => {
    if (!window.confirm("Bütün bazanı yükləmək istəyirsiniz?")) return;
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
      alert("Yükləndi!");
      fetchYarns();
    } catch (error) {
      alert("Xəta baş verdi.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSingleYarn = async () => {
    if (!newCode || !newColorName) {
      alert("Zəhmət olmasa Rəng Kodunu və Rəng Adını daxil edin!");
      return;
    }
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
      alert("Yeni ip əlavə olundu!");
      setShowAddForm(false);
      setNewCode('');
      setNewColorName('');
      setNewStock('');
      setNewImageUrl('');
      fetchYarns();
    } catch (error) {
      alert("Xəta oldu.");
    }
  };

  const handleEditStock = async (yarn) => {
    const input = window.prompt("Yeni stok miqdarını yazın:", yarn.stockCount || 0);
    if (input === null) return;
    const newStockVal = parseInt(input, 10);
    try {
      await updateDoc(doc(db, 'yarns', yarn.id), { stockCount: newStockVal });
      fetchYarns();
    } catch (err) { alert("Xəta."); }
  };

  const filteredYarns = yarns.filter((yarn) => {
    const matchesSearch = (yarn.code || "").toLowerCase().includes(search.toLowerCase()) || (yarn.colorName || "").toLowerCase().includes(search.toLowerCase());
    const matchesSeries = selectedSeries === 'All' || yarn.series === selectedSeries;
    return matchesSearch && matchesSeries;
  });

  return (
    <div style={{ padding: '24px', backgroundColor: '#FAF6F0', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#4A3B32' }}>İp Anbarı</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} style={{ backgroundColor: '#5c4033', color: '#FFF', padding: '10px', borderRadius: '6px' }}>
          {showAddForm ? "Bağla" : "+ Yeni İp"}
        </button>
      </div>

      {showAddForm && (
        <div style={{ backgroundColor: '#F5EBE1', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'grid', gap: '10px' }}>
          <input type="text" placeholder="Rəng Kodu" value={newCode} onChange={(e) => setNewCode(e.target.value)} style={{ padding: '8px' }} />
          <input type="text" placeholder="Rəng Adı" value={newColorName} onChange={(e) => setNewColorName(e.target.value)} style={{ padding: '8px' }} />
          <input type="number" placeholder="Stok" value={newStock} onChange={(e) => setNewStock(e.target.value)} style={{ padding: '8px' }} />
          <button onClick={handleAddSingleYarn} style={{ backgroundColor: '#785A46', color: '#FFF', padding: '10px', borderRadius: '6px' }}>Yadda Saxla</button>
        </div>
      )}

      <input type="text" placeholder="Axtar..." onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px' }} />

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#FFF' }}>
        <thead>
          <tr style={{ backgroundColor: '#785A46', color: '#FFF' }}>
            <th style={{ padding: '10px' }}>Kod</th>
            <th style={{ padding: '10px' }}>Ad</th>
            <th style={{ padding: '10px' }}>Stok</th>
            <th style={{ padding: '10px' }}>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {filteredYarns.map((yarn) => (
            <tr key={yarn.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{yarn.code}</td>
              <td style={{ padding: '10px' }}>{yarn.colorName}</td>
              <td style={{ padding: '10px' }}>{yarn.stockCount}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleEditStock(yarn)}>Düzəliş</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}