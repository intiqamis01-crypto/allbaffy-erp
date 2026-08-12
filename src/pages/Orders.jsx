import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase konfiqurasiya faylının yolu
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [sources, setSources] = useState([
    { name: 'WhatsApp', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
    { name: 'Instagram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { name: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { name: 'Tiktok', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
    { name: 'Sayt', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { name: 'Tövsiyyə', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { name: 'Mağaza', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> }
  ]);

  const [productsList] = useState(['Uşaq Yorğanı', 'Şərf', 'Gift Box', 'Jaket', 'Jilet', 'Oyun Matı']);
  const [yarnsList] = useState(['Alize Puffy', 'Alize Puffy Fine', 'Alize Puffy Color']);
  const [colorsList] = useState(['55 - Ağ', '60 - Krem', '15 - Ətrəngi', '310 - Pudra']);
  const [patternsList] = useState(['Klassik Hörgü', 'Şahmat', 'Sep Hörgü']);
  const [sizesList] = useState(['90x90 sm', '100x120 sm', 'Standard']);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    product: 'Uşaq Yorğanı',
    yarn: 'Alize Puffy',
    color: '55 - Ağ',
    pattern: 'Klassik Hörgü',
    size: '90x90 sm',
    materials: [],
    sellingPrice: '',
    source: 'Instagram',
    hasDelivery: false,
    deliveryAddress: '',
    deliveryPrice: ''
  });

  const [tempMaterialName, setTempMaterialName] = useState('');
  const [tempMaterialPrice, setTempMaterialPrice] = useState('');

  const statusOptions = {
    'Hazırlanır': { bg: '#fff3cd', color: '#856404' },
    'Hazırdır': { bg: '#d4edda', color: '#155724' },
    'Təhvil Verildi': { bg: '#cce5ff', color: '#004085' },
    'Ləğv edildi': { bg: '#f8d7da', color: '#721c24' }
  };

  // Firebase-dən sifarişləri çəkmək
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Sifarişləri çəkərkən xəta baş verdi: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, newStatus) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Status yenilənmədi: ", error);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsinizmi?')) {
      try {
        await deleteDoc(doc(db, "orders", id));
        setOrders(orders.filter(o => o.id !== id));
      } catch (error) {
        console.error("Sifariş silinə bilmədi: ", error);
      }
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      customerName: '',
      customerPhone: '',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      product: productsList[0],
      yarn: yarnsList[0],
      color: colorsList[0],
      pattern: patternsList[0],
      size: sizesList[0],
      materials: [],
      sellingPrice: '',
      source: sources[0].name,
      hasDelivery: false,
      deliveryAddress: '',
      deliveryPrice: ''
    });
    setTempMaterialName('');
    setTempMaterialPrice('');
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingId(order.id);
    setFormData({
      customerName: order.customerName || '',
      customerPhone: order.customerPhone || '',
      orderDate: order.orderDate || '',
      deliveryDate: order.deliveryDate || '',
      product: order.product || productsList[0],
      yarn: order.yarn || yarnsList[0],
      color: order.color || colorsList[0],
      pattern: order.pattern || patternsList[0],
      size: order.size || sizesList[0],
      materials: order.materials ? [...order.materials] : [],
      sellingPrice: order.sellingPrice ? parseFloat(order.sellingPrice) : '',
      source: order.source || 'Instagram',
      hasDelivery: order.hasDelivery || false,
      deliveryAddress: order.deliveryAddress || '',
      deliveryPrice: order.deliveryPrice || ''
    });
    setTempMaterialName('');
    setTempMaterialPrice('');
    setIsModalOpen(true);
  };

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (!tempMaterialName.trim()) return;
    const priceVal = parseFloat(tempMaterialPrice) || 0;
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, { name: tempMaterialName.trim(), price: priceVal }]
    }));
    setTempMaterialName('');
    setTempMaterialPrice('');
  };

  const handleRemoveMaterial = (index) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return '';
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const diffTime = endDate - startDate;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `${diffDays} gün` : '';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0].slice(-2)}`;
    }
    return dateStr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalCost = formData.materials.reduce((sum, m) => sum + (parseFloat(m.price) || 0), 0);
    const selling = parseFloat(formData.sellingPrice) || 0;
    const profitVal = (selling - totalCost).toFixed(2);

    const nextCodeNum = orders.length + 1;
    const formattedCode = `ALP-${String(nextCodeNum).padStart(3, '0')}`;

    const orderPayload = {
      code: editingId ? orders.find(o => o.id === editingId)?.code : formattedCode,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      orderDate: formData.orderDate,
      deliveryDate: formData.deliveryDate,
      product: formData.product,
      yarn: formData.yarn,
      color: formData.color,
      pattern: formData.pattern,
      size: formData.size,
      materials: formData.materials,
      costPrice: `${totalCost.toFixed(2)} AZN`,
      sellingPrice: `${selling.toFixed(2)} AZN`,
      profit: `${profitVal >= 0 ? '+' : ''}${profitVal} AZN`,
      source: formData.source,
      status: editingId ? (orders.find(o => o.id === editingId)?.status || 'Hazırlanır') : 'Hazırlanır',
      hasDelivery: formData.hasDelivery,
      deliveryAddress: formData.deliveryAddress,
      deliveryPrice: formData.deliveryPrice
    };

    try {
      if (editingId !== null) {
        const orderRef = doc(db, "orders", editingId);
        await updateDoc(orderRef, orderPayload);
        setOrders(orders.map(o => o.id === editingId ? { ...o, ...orderPayload } : o));
      } else {
        const docRef = await addDoc(collection(db, "orders"), orderPayload);
        setOrders([{ id: docRef.id, ...orderPayload }, ...orders]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Sifariş yadda saxlanılarkən xəta: ", error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase();
    return (
      (order.code && order.code.toLowerCase().includes(term)) ||
      (order.customerName && order.customerName.toLowerCase().includes(term)) ||
      (order.customerPhone && order.customerPhone.toLowerCase().includes(term)) ||
      (order.product && order.product.toLowerCase().includes(term)) ||
      (order.yarn && order.yarn.toLowerCase().includes(term)) ||
      (order.color && order.color.toLowerCase().includes(term)) ||
      (order.pattern && order.pattern.toLowerCase().includes(term)) ||
      (order.size && order.size.toLowerCase().includes(term)) ||
      (order.status && order.status.toLowerCase().includes(term)) ||
      (order.source && order.source.toLowerCase().includes(term))
    );
  });

  return (
    <div style={{ flex: 1, padding: '30px', backgroundColor: '#f9f6f0', overflowX: 'auto', fontFamily: 'sans-serif', minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Sifarişlər</h1>
        <button onClick={openAddModal} style={{ backgroundColor: '#5a3d28', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>+ Yeni Sifariş</button>
      </div>

      <div style={{ marginBottom: '20px', position: 'relative', width: '280px' }}>
        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', filter: 'grayscale(100%)', fontSize: '16px' }}>🔍</span>
        <input type="text" placeholder="Axtarış..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: '6px', border: '1px solid #dcd6cd', backgroundColor: '#fff', boxSizing: 'border-box' }} />
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #eee' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff', borderBottom: '2px solid #f0eae1' }}>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>KOD</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>MÜŞTƏRİ / TEL</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>MƏNBƏ</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>Tarix (Sifariş / Təhvil)</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>MƏHSUL</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>İP</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>RƏNG</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>HÖRGÜ / ÖLÇÜ</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>QAZANC</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>STATUS</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#555' }}>ƏMƏLİYYAT</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="13" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>Hələ heç bir sifariş yoxdur.</td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const matchedSrc = sources.find(s => s.name === order.source);
                const currentStatus = order.status || 'Hazırlanır';
                const statusStyle = statusOptions[currentStatus] || { bg: '#fff3cd', color: '#856404' };

                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f7f3ed', transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>{order.code}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}><div>{order.customerName}</div><div style={{ fontSize: '11px', color: '#888' }}>{order.customerPhone}</div></td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {matchedSrc ? matchedSrc.icon : null}
                        <span>{order.source}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-block', textAlign: 'left', lineHeight: '1.4' }}>
                        <div>{formatDate(order.orderDate)}</div>
                        <div>{formatDate(order.deliveryDate)} <span style={{ fontSize: '11px', color: '#888' }}>({calculateDays(order.orderDate, order.deliveryDate)})</span></div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{order.product}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{order.yarn}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{order.color}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{order.pattern}<br/><span style={{ fontSize: '11px', fontStyle: 'italic', color: '#888' }}>{order.size}</span></td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{order.costPrice}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{order.sellingPrice}</td>
                    <td style={{ padding: '12px', color: '#28a745', fontWeight: 'bold', textAlign: 'center' }}>{order.profit}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <select value={currentStatus} onChange={(e) => changeStatus(order.id, e.target.value)} style={{ padding: '4px', backgroundColor: statusStyle.bg, color: statusStyle.color, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {Object.keys(statusOptions).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span onClick={() => openEditModal(order)} title="Redaktə et" style={{ display: 'inline-block', transform: 'scaleX(-1)', cursor: 'pointer', marginRight: '12px', fontSize: '15px' }}>✎</span>
                      <span onClick={() => deleteOrder(order.id)} title="Sil" style={{ cursor: 'pointer', fontSize: '16px' }}>🗑</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', width: '550px', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>{editingId !== null ? 'Sifarişi Redaktə Et' : 'Yeni Sifariş Əlavə Et'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', gap: '10px', backgroundColor: '#fbf8f3', padding: '10px', borderRadius: '6px', border: '1px solid #f0e9dd' }}>
                <div style={{ flex: 1.2 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Müştəri Adı</label>
                  <input type="text" placeholder="Müştəri adı" required value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px', backgroundColor: '#fff' }} />
                </div>
                <div style={{ flex: 1.1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Telefon Nömrəsi</label>
                  <input type="text" placeholder="055XXXXXXX" required value={formData.customerPhone} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px', backgroundColor: '#fff' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Mənbə</label>
                  <select value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px', backgroundColor: '#fff' }}>
                    {sources.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', backgroundColor: '#fbf8f3', padding: '10px', borderRadius: '6px', border: '1px solid #f0e9dd' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Sifariş Tarixi</label>
                  <input type="date" required value={formData.orderDate} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px', backgroundColor: '#fff' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Təhvil Tarixi</label>
                  <input type="date" required value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px', backgroundColor: '#fff' }} />
                </div>
              </div>

              <div style={{ backgroundColor: '#fbf8f3', padding: '12px', borderRadius: '6px', border: '1px solid #f0e9dd', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Məhsul</label>
                    <select value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px' }}>
                      {productsList.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>İp</label>
                    <select value={formData.yarn} onChange={(e) => setFormData({...formData, yarn: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px' }}>
                      {yarnsList.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Rəng</label>
                    <select value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px' }}>
                      {colorsList.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Hörgü</label>
                    <select value={formData.pattern} onChange={(e) => setFormData({...formData, pattern: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px' }}>
                      {patternsList.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Ölçü</label>
                    <select value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px' }}>
                      {sizesList.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#fbf8f3', padding: '12px', borderRadius: '6px', border: '1px solid #f0e9dd', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>İstifadə Edilən Materiallar</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input type="text" placeholder="Məs: 3 yumaq ip" value={tempMaterialName} onChange={(e) => setTempMaterialName(e.target.value)} style={{ flex: 1.5, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }} />
                  <input type="number" step="0.01" placeholder="Qiymət (AZN)" value={tempMaterialPrice} onChange={(e) => setTempMaterialPrice(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', backgroundColor: '#fff' }} />
                  <button type="button" onClick={handleAddMaterial} style={{ padding: '8px 15px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Əlavə et</button>
                </div>
                {formData.materials.map((mat, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e0dcd5', fontSize: '12px' }}>
                    <span>{mat.name} - {mat.price} AZN</span>
                    <button type="button" onClick={() => handleRemoveMaterial(index)} style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Satış Qiyməti (AZN)</label>
                <input type="number" step="0.01" placeholder="80.00" required value={formData.sellingPrice} onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px', backgroundColor: '#fff' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 15px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>İmtina</button>
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Yadda saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;