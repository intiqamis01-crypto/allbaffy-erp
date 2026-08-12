import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      code: 'ALP-001',
      customerName: 'Leyla',
      customerPhone: '0559876543',
      orderDate: '2026-08-04',
      deliveryDate: '2026-08-07',
      product: 'Uşaq Yorğanı',
      yarn: 'Alize Puffy',
      color: '55 - Ağ',
      pattern: 'Klassik Hörgü',
      size: '90x90 sm',
      materials: [
        { name: '3 yumaq ip', price: 12.00 },
        { name: 'Atlas lent', price: 1.50 }
      ],
      costPrice: '13.50 AZN',
      sellingPrice: '80.00 AZN',
      profit: '+66.50 AZN',
      source: 'Instagram',
      status: 'Hazırlanır'
    }
  ]);

  const [sources, setSources] = useState([
    { 
      name: 'WhatsApp', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      ) 
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      ) 
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      ) 
    },
    { 
      name: 'Tiktok', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
      ) 
    },
    { 
      name: 'Sayt', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      ) 
    },
    { 
      name: 'Tövsiyyə', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ) 
    },
    { 
      name: 'Mağaza', 
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      ) 
    }
  ]);

  const [productsList, setProductsList] = useState(['Uşaq Yorğanı', 'Şərf', 'Gift Box', 'Jaket', 'Jilet', 'Oyun Matı']);
  const [yarnsList, setYarnsList] = useState(['Alize Puffy', 'Alize Puffy Fine', 'Alize Puffy Color']);
  const [colorsList, setColorsList] = useState(['55 - Ağ', '60 - Krem', '15 - Ətrəngi', '310 - Pudra']);
  const [patternsList, setPatternsList] = useState(['Klassik Hörgü', 'Şahmat', 'Sep Hörgü']);
  const [sizesList, setSizesList] = useState(['90x90 sm', '100x120 sm', 'Standard']);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [manageModalType, setManageModalType] = useState(null); 
  const [newItemText, setNewItemText] = useState('');
  const [editingItemOriginal, setEditingItemOriginal] = useState(null);

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
    source: 'Instagram'
  });

  const [tempMaterialName, setTempMaterialName] = useState('');
  const [tempMaterialPrice, setTempMaterialPrice] = useState('');

  const statusOptions = {
    'Hazırlanır': { bg: '#fff3cd', color: '#856404' },
    'Hazırdır': { bg: '#d4edda', color: '#155724' },
    'Təhvil Verildi': { bg: '#cce5ff', color: '#004085' },
    'Ləğv edildi': { bg: '#f8d7da', color: '#721c24' }
  };

  const changeStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const deleteOrder = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsinizmi?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      customerName: '',
      customerPhone: '',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      product: productsList[0] || '',
      yarn: yarnsList[0] || '',
      color: colorsList[0] || '',
      pattern: patternsList[0] || '',
      size: sizesList[0] || '',
      materials: [],
      sellingPrice: '',
      source: sources[0] ? sources[0].name : 'Instagram'
    });
    setTempMaterialName('');
    setTempMaterialPrice('');
    setIsModalOpen(true);
  };

  const openEditModal = (order) => {
    setEditingId(order.id);
    setFormData({
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate,
      product: order.product,
      yarn: order.yarn,
      color: order.color,
      pattern: order.pattern,
      size: order.size,
      materials: order.materials ? [...order.materials] : [],
      sellingPrice: parseFloat(order.sellingPrice) || '',
      source: order.source || 'Instagram'
    });
    setTempMaterialName('');
    setTempMaterialPrice('');
    setIsModalOpen(true);
  };

  const handleAddMaterial = () => {
    if (!tempMaterialName.trim() || !tempMaterialPrice) return;
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

  const handleSaveItem = (e) => {
    e.preventDefault();
    const val = newItemText.trim();
    if (!val) return;

    if (manageModalType === 'source') {
      if (editingItemOriginal) {
        setSources(sources.map(s => s.name === editingItemOriginal ? { ...s, name: val } : s));
        if (formData.source === editingItemOriginal) {
          setFormData(prev => ({...prev, source: val}));
        }
      } else {
        if (!sources.some(s => s.name === val)) {
          setSources([...sources, { 
            name: val, 
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            ) 
          }]);
        }
      }
    } else if (manageModalType === 'product') {
      if (editingItemOriginal) {
        setProductsList(productsList.map(i => i === editingItemOriginal ? val : i));
        if (formData.product === editingItemOriginal) {
          setFormData(prev => ({...prev, product: val}));
        }
      } else {
        if (!productsList.includes(val)) {
          setProductsList([...productsList, val]);
        }
      }
    } else if (manageModalType === 'yarn') {
      if (editingItemOriginal) {
        setYarnsList(yarnsList.map(i => i === editingItemOriginal ? val : i));
        if (formData.yarn === editingItemOriginal) {
          setFormData(prev => ({...prev, yarn: val}));
        }
      } else {
        if (!yarnsList.includes(val)) {
          setYarnsList([...yarnsList, val]);
        }
      }
    } else if (manageModalType === 'color') {
      if (editingItemOriginal) {
        setColorsList(colorsList.map(i => i === editingItemOriginal ? val : i));
        if (formData.color === editingItemOriginal) {
          setFormData(prev => ({...prev, color: val}));
        }
      } else {
        if (!colorsList.includes(val)) {
          setColorsList([...colorsList, val]);
        }
      }
    } else if (manageModalType === 'pattern') {
      if (editingItemOriginal) {
        setPatternsList(patternsList.map(i => i === editingItemOriginal ? val : i));
        if (formData.pattern === editingItemOriginal) {
          setFormData(prev => ({...prev, pattern: val}));
        }
      } else {
        if (!patternsList.includes(val)) {
          setPatternsList([...patternsList, val]);
        }
      }
    } else if (manageModalType === 'size') {
      if (editingItemOriginal) {
        setSizesList(sizesList.map(i => i === editingItemOriginal ? val : i));
        if (formData.size === editingItemOriginal) {
          setFormData(prev => ({...prev, size: val}));
        }
      } else {
        if (!sizesList.includes(val)) {
          setSizesList([...sizesList, val]);
        }
      }
    }

    setNewItemText('');
    setEditingItemOriginal(null);
  };

  const handleEditItemClick = (itemVal) => {
    setNewItemText(itemVal);
    setEditingItemOriginal(itemVal);
  };

  const handleDeleteItem = (type, itemVal) => {
    if (type === 'source') {
      const filtered = sources.filter(s => s.name !== itemVal);
      setSources(filtered);
      if (formData.source === itemVal) {
        setFormData(prev => ({...prev, source: filtered[0] ? filtered[0].name : ''}));
      }
    } else if (type === 'product') {
      const filtered = productsList.filter(i => i !== itemVal);
      setProductsList(filtered);
      if (formData.product === itemVal) {
        setFormData(prev => ({...prev, product: filtered[0] || ''}));
      }
    } else if (type === 'yarn') {
      const filtered = yarnsList.filter(i => i !== itemVal);
      setYarnsList(filtered);
      if (formData.yarn === itemVal) {
        setFormData(prev => ({...prev, yarn: filtered[0] || ''}));
      }
    } else if (type === 'color') {
      const filtered = colorsList.filter(i => i !== itemVal);
      setColorsList(filtered);
      if (formData.color === itemVal) {
        setFormData(prev => ({...prev, color: filtered[0] || ''}));
      }
    } else if (type === 'pattern') {
      const filtered = patternsList.filter(i => i !== itemVal);
      setPatternsList(filtered);
      if (formData.pattern === itemVal) {
        setFormData(prev => ({...prev, pattern: filtered[0] || ''}));
      }
    } else if (type === 'size') {
      const filtered = sizesList.filter(i => i !== itemVal);
      setSizesList(filtered);
      if (formData.size === itemVal) {
        setFormData(prev => ({...prev, size: filtered[0] || ''}));
      }
    }
    if (editingItemOriginal === itemVal) {
      setNewItemText('');
      setEditingItemOriginal(null);
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCost = formData.materials.reduce((sum, m) => sum + (parseFloat(m.price) || 0), 0);
    const selling = parseFloat(formData.sellingPrice) || 0;
    const profitVal = (selling - totalCost).toFixed(2);

    if (editingId !== null) {
      setOrders(orders.map(o => {
        if (o.id === editingId) {
          return {
            ...o,
            customerName: formData.customerName,
            customerPhone: formData.customerPhone,
            orderDate: formData.orderDate,
            deliveryDate: formData.deliveryDate,
            product: formData.product,
            yarn: formData.yarn,
            color: formData.color,
            pattern: formData.pattern,
            size: formData.size,
            materials: [...formData.materials],
            costPrice: `${totalCost.toFixed(2)} AZN`,
            sellingPrice: `${selling.toFixed(2)} AZN`,
            profit: `${profitVal >= 0 ? '+' : ''}${profitVal} AZN`,
            source: formData.source
          };
        }
        return o;
      }));
    } else {
      const nextCodeNum = orders.length + 1;
      const formattedCode = `ALP-${String(nextCodeNum).padStart(3, '0')}`;

      const createdOrder = {
        id: Date.now(),
        code: formattedCode,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        orderDate: formData.orderDate,
        deliveryDate: formData.deliveryDate,
        product: formData.product,
        yarn: formData.yarn,
        color: formData.color,
        pattern: formData.pattern,
        size: formData.size,
        materials: [...formData.materials],
        costPrice: `${totalCost.toFixed(2)} AZN`,
        sellingPrice: `${selling.toFixed(2)} AZN`,
        profit: `${profitVal >= 0 ? '+' : ''}${profitVal} AZN`,
        source: formData.source,
        status: 'Hazırlanır'
      };

      setOrders([createdOrder, ...orders]);
    }
    setIsModalOpen(false);
  };

  const filteredOrders = orders.filter(order => {
    const term = searchTerm.toLowerCase();
    return (
      order.code.toLowerCase().includes(term) ||
      order.customerName.toLowerCase().includes(term) ||
      order.customerPhone.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term) ||
      order.yarn.toLowerCase().includes(term) ||
      order.color.toLowerCase().includes(term) ||
      order.pattern.toLowerCase().includes(term) ||
      order.size.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term) ||
      (order.source && order.source.toLowerCase().includes(term))
    );
  });

  const currentSelectedSource = sources.find(s => s.name === formData.source);

  const renderCustomSelect = (labelTitle, typeKey, currentValue, listArray, isSourceType = false) => {
    const isOpen = activeDropdown === typeKey;

    return (
      <div style={{ flex: 1, position: 'relative' }}>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>{labelTitle}</label>
        <div 
          onClick={() => setActiveDropdown(isOpen ? null : typeKey)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isSourceType && currentSelectedSource ? currentSelectedSource.icon : null}
            <span>{currentValue}</span>
          </div>
          <span>▼</span>
        </div>

        {isOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 1200, maxHeight: '200px', overflowY: 'auto', marginTop: '2px' }}>
            {isSourceType ? (
              sources.map(src => (
                <div 
                  key={src.name} 
                  onClick={() => {
                    setFormData({...formData, source: src.name});
                    setActiveDropdown(null);
                  }}
                  style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', borderBottom: '1px solid #f0f0f0' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f0eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  {src.icon}
                  <span>{src.name}</span>
                </div>
              ))
            ) : (
              listArray.map(item => (
                <div 
                  key={item} 
                  onClick={() => {
                    setFormData({...formData, [typeKey]: item});
                    setActiveDropdown(null);
                  }}
                  style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '12px', borderBottom: '1px solid #f0f0f0' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f4f0eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                >
                  {item}
                </div>
              ))
            )}

            <div 
              onClick={() => {
                setActiveDropdown(null);
                setNewItemText('');
                setEditingItemOriginal(null);
                setManageModalType(typeKey);
              }}
              style={{ padding: '8px 10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', color: '#5a3d28', backgroundColor: '#faf7f2' }}
            >
              ⚙️ <span>Əlavə et / Düzəliş et</span>
            </div>
          </div>
        )}
      </div>
    );
  };

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
            {filteredOrders.map((order) => {
              const isMatch = searchTerm.trim() !== '' && (
                order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customerPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.yarn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (order.source && order.source.toLowerCase().includes(searchTerm.toLowerCase()))
              );

              const matchedSrc = sources.find(s => s.name === order.source);

              return (
                <tr key={order.id} style={{ borderBottom: '1px solid #f7f3ed', backgroundColor: isMatch ? '#f0f0f0' : 'transparent', transition: 'background-color 0.2s' }}>
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
                    <select value={order.status} onChange={(e) => changeStatus(order.id, e.target.value)} style={{ padding: '4px', backgroundColor: statusOptions[order.status].bg, color: statusOptions[order.status].color, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                      {Object.keys(statusOptions).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span onClick={() => openEditModal(order)} title="Redaktə et" style={{ display: 'inline-block', transform: 'scaleX(-1)', cursor: 'pointer', marginRight: '12px', fontSize: '15px' }}>✎</span>
                    <span onClick={() => deleteOrder(order.id)} title="Sil" style={{ cursor: 'pointer', fontSize: '16px' }}>🗑</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', width: '550px', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>{editingId !== null ? 'Sifarişi Redaktə Et' : 'Yeni Sifariş Əlavə Et'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1.2 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Müştəri Adı</label>
                  <input type="text" placeholder="Müştəri adı" required value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
                <div style={{ flex: 1.1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Telefon Nömrəsi</label>
                  <input type="text" placeholder="055XXXXXXX" required value={formData.customerPhone} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
                
                {renderCustomSelect('Mənbə', 'source', formData.source, sources, true)}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Sifariş Tarixi</label>
                  <input type="date" required value={formData.orderDate} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Təhvil Tarixi</label>
                  <input type="date" required value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
              </div>

              <div style={{ backgroundColor: '#fbf8f3', padding: '12px', borderRadius: '6px', border: '1px solid #f0e9dd', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {renderCustomSelect('Məhsul', 'product', formData.product, productsList)}
                  {renderCustomSelect('İp', 'yarn', formData.yarn, yarnsList)}
                  {renderCustomSelect('Rəng', 'color', formData.color, colorsList)}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {renderCustomSelect('Hörgü', 'pattern', formData.pattern, patternsList)}
                  {renderCustomSelect('Ölçü', 'size', formData.size, sizesList)}
                </div>
              </div>

              {/* İstifadə Edilən Materiallar Bölməsi */}
              <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #e0dbd1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>İstifadə Edilən Materiallar (İp, Etiket, Paket, Lent və s.)</label>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    placeholder="Məs: 1 ədəd paket və ya etiket" 
                    value={tempMaterialName} 
                    onChange={(e) => setTempMaterialName(e.target.value)} 
                    style={{ flex: 1.5, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '12px' }} 
                  />
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="Qiymət (AZN)" 
                    value={tempMaterialPrice} 
                    onChange={(e) => setTempMaterialPrice(e.target.value)} 
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '12px' }} 
                  />
                  <button 
                    type="button" 
                    onClick={handleAddMaterial} 
                    style={{ padding: '8px 15px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', whiteSpace: 'nowrap' }}
                  >
                    + Əlavə et
                  </button>
                </div>

                {formData.materials.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                    {formData.materials.map((mat, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: '#fcfbfa', borderRadius: '4px', border: '1px solid #eee', fontSize: '12px' }}>
                        <span style={{ fontWeight: '500' }}>{mat.name} – <strong>{mat.price.toFixed(2)} AZN</strong></span>
                        <span onClick={() => handleRemoveMaterial(index)} style={{ cursor: 'pointer', color: '#c0392b', fontWeight: 'bold', fontSize: '12px' }}>Sil</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Maya Dəyəri (Avtomatik Hesablanır)</label>
                  <input 
                    type="text" 
                    disabled 
                    value={`${formData.materials.reduce((sum, m) => sum + (parseFloat(m.price) || 0), 0).toFixed(2)} AZN`} 
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f4f0eb', boxSizing: 'border-box', marginTop: '4px', fontWeight: 'bold', color: '#333' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>Satış Qiyməti</label>
                  <input type="number" step="0.01" placeholder="80.00" required value={formData.sellingPrice} onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '8px 15px', backgroundColor: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>İmtina</button>
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>{editingId !== null ? 'Yenilə' : 'Əlavə et'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {manageModalType && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100 }}>
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', width: '380px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, color: '#333', fontSize: '18px', textTransform: 'capitalize' }}>
              {manageModalType === 'source' ? 'Mənbələri' :
               manageModalType === 'product' ? 'Məhsulları' :
               manageModalType === 'yarn' ? 'İpləri' :
               manageModalType === 'color' ? 'Rəngləri' :
               manageModalType === 'pattern' ? 'Hörgü növlərini' : 'Ölçüləri'} İdarə Et
            </h3>
            
            <form onSubmit={handleSaveItem} style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              <input 
                type="text" 
                placeholder={editingItemOriginal ? "Seçimi yenilə..." : "Yeni dəyər daxil et..."} 
                value={newItemText} 
                onChange={(e) => setNewItemText(e.target.value)} 
                required
                style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
              />
              <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                {editingItemOriginal ? 'Yenilə' : 'Əlavə et'}
              </button>
            </form>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
              {manageModalType === 'source' ? (
                sources.map(src => (
                  <div key={src.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: '#f9f6f0', borderRadius: '4px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {src.icon}
                      <span>{src.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span onClick={() => handleEditItemClick(src.name)} style={{ transform: 'scaleX(-1)', cursor: 'pointer', fontSize: '14px', color: '#555' }} title="Redaktə et">✎</span>
                      <span onClick={() => handleDeleteItem('source', src.name)} style={{ cursor: 'pointer', color: '#c0392b', fontWeight: 'bold', fontSize: '14px' }} title="Sil">🗑</span>
                    </div>
                  </div>
                ))
              ) : (
                (
                  manageModalType === 'product' ? productsList :
                  manageModalType === 'yarn' ? yarnsList :
                  manageModalType === 'color' ? colorsList :
                  manageModalType === 'pattern' ? patternsList : sizesList
                ).map(item => (
                  <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: '#f9f6f0', borderRadius: '4px', fontSize: '13px' }}>
                    <span>{item}</span>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span onClick={() => handleEditItemClick(item)} style={{ transform: 'scaleX(-1)', cursor: 'pointer', fontSize: '14px', color: '#555' }} title="Redaktə et">✎</span>
                      <span onClick={() => handleDeleteItem(manageModalType, item)} style={{ cursor: 'pointer', color: '#c0392b', fontWeight: 'bold', fontSize: '14px' }} title="Sil">🗑</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button type="button" onClick={() => setManageModalType(null)} style={{ padding: '8px 15px', backgroundColor: '#5a3d28', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Bağla</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;