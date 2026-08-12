import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  Timestamp 
} from 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dropdown listləri və idarəetmə state-ləri
  const [sources, setSources] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [yarnsList, setYarnsList] = useState([]);
  const [colorsList, setColorsList] = useState([]);
  const [patternsList, setPatternsList] = useState([]);
  const [sizesList, setSizesList] = useState([]);

  const [manageModalType, setManageModalType] = useState(null);
  const [newItemText, setNewItemText] = useState('');
  const [editingItemOriginal, setEditingItemOriginal] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    source: '',
    customerName: '',
    customerPhone: '',
    product: '',
    yarn: '',
    color: '',
    pattern: '',
    size: '',
    materials: [],
    sellingPrice: ''
  });

  const [currentMaterial, setCurrentMaterial] = useState({ name: '', price: '' });

  // Firestore-dan məlumatların çəkilməsi
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Sifarişlər
      const ordersSnapshot = await getDocs(collection(db, 'orders'));
      const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);

      // Parametrlər / Siyahılar
      const settingsSnapshot = await getDocs(collection(db, 'settings'));
      settingsSnapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (docSnap.id === 'sources') setSources(data.items || []);
        if (docSnap.id === 'products') setProductsList(data.items || []);
        if (docSnap.id === 'yarns') setYarnsList(data.items || []);
        if (docSnap.id === 'colors') setColorsList(data.items || []);
        if (docSnap.id === 'patterns') setPatternsList(data.items || []);
        if (docSnap.id === 'sizes') setSizesList(data.items || []);
      });
    } catch (error) {
      console.error("Məlumatları yükləyərkən xəta baş verdi: ", error);
    }
  };

  const handleAddMaterial = () => {
    if (!currentMaterial.name || !currentMaterial.price) return;
    setFormData({
      ...formData,
      materials: [...formData.materials, { name: currentMaterial.name, price: parseFloat(currentMaterial.price) }]
    });
    setCurrentMaterial({ name: '', price: '' });
  };

  const handleRemoveMaterial = (index) => {
    const updated = formData.materials.filter((_, i) => i !== index);
    setFormData({ ...formData, materials: updated });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const totalCost = formData.materials.reduce((sum, m) => sum + (parseFloat(m.price) || 0), 0);
      const sellingPriceNum = parseFloat(formData.sellingPrice) || 0;
      const profit = sellingPriceNum - totalCost;

      const newOrder = {
        ...formData,
        totalCost,
        profit,
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'orders'), newOrder);
      setIsModalOpen(false);
      setFormData({
        source: '',
        customerName: '',
        customerPhone: '',
        product: '',
        yarn: '',
        color: '',
        pattern: '',
        size: '',
        materials: [],
        sellingPrice: ''
      });
      fetchData();
    } catch (error) {
      console.error("Sifariş əlavə edilərkən xəta: ", error);
    }
  };

  // Dinamik siyahıların idarə edilməsi (Əlavə et / Yenilə / Sil)
  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!newItemText.trim() || !manageModalType) return;

    let docId = manageModalType; 
    let currentList = [];
    if (manageModalType === 'source') currentList = sources.map(s => s.name);
    if (manageModalType === 'product') currentList = productsList;
    if (manageModalType === 'yarn') currentList = yarnsList;
    if (manageModalType === 'color') currentList = colorsList;
    if (manageModalType === 'pattern') currentList = patternsList;
    if (manageModalType === 'size') currentList = sizesList;

    let updatedList = [];
    if (editingItemOriginal) {
      updatedList = currentList.map(item => item === editingItemOriginal ? newItemText.trim() : item);
    } else {
      if (currentList.includes(newItemText.trim())) return;
      updatedList = [...currentList, newItemText.trim()];
    }

    try {
      const docRef = doc(db, 'settings', docId);
      let payloadItems = manageModalType === 'source' ? updatedList.map(name => ({ name })) : updatedList;
      
      await updateDoc(docRef, { items: payloadItems });
      
      setNewItemText('');
      setEditingItemOriginal(null);
      setManageModalType(null);
      fetchData();
    } catch (error) {
      console.error("Parametr yenilənərkən xəta: ", error);
    }
  };

  const handleEditItemClick = (itemVal) => {
    setEditingItemOriginal(itemVal);
    setNewItemText(itemVal);
  };

  const handleDeleteItem = async (type, itemVal) => {
    if (!window.confirm("Silmək istədiyinizə əminsinizmi?")) return;
    try {
      let currentList = [];
      if (type === 'source') currentList = sources.map(s => s.name);
      if (type === 'product') currentList = productsList;
      if (type === 'yarn') currentList = yarnsList;
      if (type === 'color') currentList = colorsList;
      if (type === 'pattern') currentList = patternsList;
      if (type === 'size') currentList = sizesList;

      const updatedList = currentList.filter(item => item !== itemVal);
      const docRef = doc(db, 'settings', type);
      let payloadItems = type === 'source' ? updatedList.map(name => ({ name })) : updatedList;

      await updateDoc(docRef, { items: payloadItems });
      fetchData();
    } catch (error) {
      console.error("Element silinərkən xəta: ", error);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fcfbfa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#5a3d28', margin: 0 }}>Sifarişlər İdarəetməsi</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: '#5a3d28', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
        >
          + Yeni Sifariş
        </button>
      </div>

      {/* Sifarişlərin siyahısı cədvəli */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0d6cd', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f0eb', color: '#5a3d28', borderBottom: '1px solid #e0d6cd' }}>
              <th style={{ padding: '12px' }}>Mənbə</th>
              <th style={{ padding: '12px' }}>Müştəri</th>
              <th style={{ padding: '12px' }}>Məhsul</th>
              <th style={{ padding: '12px' }}>Ölçü / Rəng</th>
              <th style={{ padding: '12px' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px' }}>Qazanc</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#777' }}>Hələ heç bir sifariş yoxdur.</td>
              </tr>
            ) : (
              orders.map((ord) => (
                <tr key={ord.id} style={{ borderBottom: '1px solid #f0e9dd' }}>
                  <td style={{ padding: '12px' }}>{ord.source}</td>
                  <td style={{ padding: '12px' }}>{ord.customerName} <br/><span style={{ fontSize: '11px', color: '#777' }}>{ord.customerPhone}</span></td>
                  <td style={{ padding: '12px' }}>{ord.product}</td>
                  <td style={{ padding: '12px' }}>{ord.size} / {ord.color}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{Number(ord.sellingPrice || 0).toFixed(2)} AZN</td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#28a745' }}>{Number(ord.profit || 0).toFixed(2)} AZN</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Yeni Sifariş Modalı */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1200 }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', width: '500px', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
            <h3 style={{ marginTop: 0, color: '#5a3d28', fontSize: '18px', marginBottom: '15px' }}>Yeni Sifariş Əlavə Et</h3>
            
            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Mənbə */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Mənbə</label>
                  <span onClick={() => setManageModalType('source')} style={{ fontSize: '11px', color: '#5a3d28', cursor: 'pointer', fontWeight: 'bold' }}>⚙ İdarə et</span>
                </div>
                <select 
                  required 
                  value={formData.source} 
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                >
                  <option value="">Seçin...</option>
                  {sources.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              {/* Müştəri Məlumatları */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Müştəri Adı</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ad Soyad" 
                    value={formData.customerName} 
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Əlaqə Nömrəsi</label>
                  <input 
                    type="text" 
                    placeholder="+994..." 
                    value={formData.customerPhone} 
                    onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
                  />
                </div>
              </div>

              {/* Məhsul */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Məhsul</label>
                  <span onClick={() => setManageModalType('product')} style={{ fontSize: '11px', color: '#5a3d28', cursor: 'pointer', fontWeight: 'bold' }}>⚙ İdarə et</span>
                </div>
                <select 
                  required 
                  value={formData.product} 
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                >
                  <option value="">Seçin...</option>
                  {productsList.map((p, i) => <option key={i} value={p}>{p}</option>)}
                </select>
              </div>

              {/* İp və Rəng */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>İp növü</label>
                    <span onClick={() => setManageModalType('yarn')} style={{ fontSize: '11px', color: '#5a3d28', cursor: 'pointer', fontWeight: 'bold' }}>⚙</span>
                  </div>
                  <select 
                    value={formData.yarn} 
                    onChange={(e) => setFormData({...formData, yarn: e.target.value})}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                  >
                    <option value="">Seçin...</option>
                    {yarnsList.map((y, i) => <option key={i} value={y}>{y}</option>)}
                  </select>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Rəng</label>
                    <span onClick={() => setManageModalType('color')} style={{ fontSize: '11px', color: '#5a3d28', cursor: 'pointer', fontWeight: 'bold' }}>⚙</span>
                  </div>
                  <select 
                    value={formData.color} 
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                  >
                    <option value="">Seçin...</option>
                    {colorsList.map((c, i) => <option key={i} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Hörgü və Ölçü */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Hörgü növü</label>
                    <span onClick={() => setManageModalType('pattern')} style={{ fontSize: '11px', color: '#5a3d28', cursor: 'pointer', fontWeight: 'bold' }}>⚙</span>
                  </div>
                  <select 
                    value={formData.pattern} 
                    onChange={(e) => setFormData({...formData, pattern: e.target.value})}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                  >
                    <option value="">Seçin...</option>
                    {patternsList.map((pat, i) => <option key={i} value={pat}>{pat}</option>)}
                  </select>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Ölçü</label>
                    <span onClick={() => setManageModalType('size')} style={{ fontSize: '11px', color: '#5a3d28', cursor: 'pointer', fontWeight: 'bold' }}>⚙</span>
                  </div>
                  <select 
                    value={formData.size} 
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                  >
                    <option value="">Seçin...</option>
                    {sizesList.map((sz, i) => <option key={i} value={sz}>{sz}</option>)}
                  </select>
                </div>
              </div>

              {/* Xərclər / Materiallar hissəsi */}
              <div style={{ backgroundColor: '#fbf8f3', padding: '12px', borderRadius: '6px', border: '1px solid #f0e9dd', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Materiallar / Maya dəyəri</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Material adı (məs: İp, qutu...)" 
                    value={currentMaterial.name} 
                    onChange={(e) => setCurrentMaterial({...currentMaterial, name: e.target.value})} 
                    style={{ flex: 2, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                  />
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="Qiymət (AZN)" 
                    value={currentMaterial.price} 
                    onChange={(e) => setCurrentMaterial({...currentMaterial, price: e.target.value})} 
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddMaterial} 
                    style={{ padding: '8px 15px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                  >
                    Əlavə et
                  </button>
                </div>

                {formData.materials.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                    {formData.materials.map((mat, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e0d6cd', fontSize: '12px' }}>
                        <span>{mat.name} - <b>{Number(mat.price).toFixed(2)} AZN</b></span>
                        <span onClick={() => handleRemoveMaterial(index)} style={{ color: '#d9534f', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>×</span>
                      </div>
                    ))}
                    <div style={{ textAlign: 'right', fontSize: '12px', fontWeight: 'bold', color: '#333', marginTop: '2px' }}>
                      Ümumi Maya: {formData.materials.reduce((sum, m) => sum + (parseFloat(m.price) || 0), 0).toFixed(2)} AZN
                    </div>
                  </div>
                )}
              </div>

              {/* Satış Qiyməti */}
              <div style={{ backgroundColor: '#fbf8f3', padding: '12px', borderRadius: '6px', border: '1px solid #f0e9dd', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Satış Qiyməti (AZN)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  required 
                  value={formData.sellingPrice} 
                  onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})} 
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', backgroundColor: '#fff', fontSize: '12px' }} 
                />
                {formData.sellingPrice !== '' && (
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#28a745' }}>
                    Təxmini Qazanc: {(parseFloat(formData.sellingPrice || 0) - formData.materials.reduce((sum, m) => sum + (parseFloat(m.price) || 0), 0)).toFixed(2)} AZN
                  </div>
                )}
              </div>

              {/* Düymələr */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  style={{ backgroundColor: '#ccc', color: '#333', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                >
                  Ləğv et
                </button>
                <button 
                  type="submit" 
                  style={{ backgroundColor: '#5a3d28', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                >
                  Yadda saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dropdown elementlərini idarə etmək (Əlavə et / Düzəliş et) üçün modal */}
      {manageModalType && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1300 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '380px', maxHeight: '80vh', overflowY: 'auto', boxSizing: 'border-box' }}>
            <h3 style={{ marginTop: 0, fontSize: '16px', color: '#333' }}>
              {manageModalType === 'source' && 'Mənbələri İdarə Et'}
              {manageModalType === 'product' && 'Məhsulları İdarə Et'}
              {manageModalType === 'yarn' && 'İpləri İdarə Et'}
              {manageModalType === 'color' && 'Rəngləri İdarə Et'}
              {manageModalType === 'pattern' && 'Hörgüləri İdarə Et'}
              {manageModalType === 'size' && 'Ölçüləri İdarə Et'}
            </h3>

            <form onSubmit={handleSaveItem} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder="Yeni ad..." 
                value={newItemText} 
                onChange={(e) => setNewItemText(e.target.value)} 
                style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
              />
              <button type="submit" style={{ backgroundColor: '#5a3d28', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                {editingItemOriginal ? 'Yenilə' : 'Əlavə et'}
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto', marginBottom: '15px' }}>
              {(manageModalType === 'source' ? sources.map(s => s.name) :
                manageModalType === 'product' ? productsList :
                manageModalType === 'yarn' ? yarnsList :
                manageModalType === 'color' ? colorsList :
                manageModalType === 'pattern' ? patternsList : sizesList
              ).map((itemVal) => (
                <div key={itemVal} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: '#f9f6f0', borderRadius: '4px', fontSize: '12px' }}>
                  <span>{itemVal}</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span onClick={() => handleEditItemClick(itemVal)} style={{ cursor: 'pointer', color: '#004085', fontWeight: 'bold' }}>✎</span>
                    <span onClick={() => handleDeleteItem(manageModalType, itemVal)} style={{ cursor: 'pointer', color: '#d9534f', fontWeight: 'bold' }}>×</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'right' }}>
              <button 
                type="button" 
                onClick={() => { setManageModalType(null); setNewItemText(''); setEditingItemOriginal(null); }} 
                style={{ backgroundColor: '#ccc', color: '#333', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;