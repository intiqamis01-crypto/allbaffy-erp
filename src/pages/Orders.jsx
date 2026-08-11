import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('allbaffy_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'ALP-001',
        customerName: 'Aynur Məmmədova',
        phone: '+994 50 123 45 67',
        source: 'WhatsApp',
        orderDate: '2026-08-15',
        deliveryDate: '2026-08-30',
        daysCount: 15,
        product: 'Toxunma Odyal',
        yarnTypes: ['Alize Puffy'],
        colors: ['Bej'],
        knitType: 'Klassik Hörgü',
        size: '90x90 cm',
        costPrice: '25',
        salePrice: '40',
        profit: '+15 AZN',
        status: 'Hazırlanır',
        advance: '10',
        advanceMethod: 'Kart',
        remaining: '30',
        remainingMethod: 'Nağd',
        deliveryAddress: 'Gənclik m/s',
        deliveryPrice: '3',
        materials: [
          { name: '2 yumaq ip', price: '8.00' }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('allbaffy_orders', JSON.stringify(orders));
  }, [orders]);

  // Dinamik siyahılar və ikonları
  const [sources, setSources] = useState([
    { name: 'Instagram', icon: '📸' },
    { name: 'WhatsApp', icon: '🟢' },
    { name: 'TikTok', icon: '🎬' },
    { name: 'Tövsiyə', icon: '⭐' },
    { name: 'Digər', icon: '📌' }
  ]);

  const [products, setProducts] = useState(['Uşaq Yorğanı', 'Şərf', 'Gift Box', 'Pampers Tortu', 'Jaket / Jilet', 'Oyun Matı', 'Toxunma Odyal']);
  const [yarnTypesList, setYarnTypesList] = useState(['Alize Puffy', 'Alize Puffy Fine', 'Alize Puffy Fine Color']);
  const [colorsList, setColorsList] = useState(['Bej / Krem', 'Çəhrayı', 'Mavi', 'Ağ', 'Yaşıl', 'Bej']);
  const [knitTypesList, setKnotTypesList] = useState(['Klassik Hörgü', 'Şahmat uazoru', 'Ziqzaq', 'Sadə']);
  const [sizesList, setSizesList] = useState(['90x90 cm', '100x100 cm', '120x150 cm', 'Standart']);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // İdarəetmə Modalları üçün state-lər
  const [manageModalType, setManageModalType] = useState(null); // 'sources' və ya 'products'
  const [newItemName, setNewItemName] = useState('');

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const d1 = new Date(start);
    const d2 = new Date(end);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const emptyOrderTemplate = {
    id: `ALP-00${orders.length + 1}`,
    customerName: '',
    phone: '',
    source: 'Instagram',
    orderDate: '2026-08-11',
    deliveryDate: '2026-08-25',
    daysCount: 14,
    product: 'Uşaq Yorğanı',
    yarnTypes: ['Alize Puffy'],
    colors: ['Bej'],
    knitType: 'Klassik Hörgü',
    size: '90x90 cm',
    costPrice: '25',
    salePrice: '40',
    status: 'Hazırlanır',
    advance: '0',
    advanceMethod: 'Kart',
    remaining: '40',
    remainingMethod: 'Nağd',
    deliveryAddress: '',
    deliveryPrice: '0',
    materials: []
  };

  const [newOrder, setNewOrder] = useState(emptyOrderTemplate);
  const [newMatName, setNewMatName] = useState('');
  const [newMatPrice, setNewMatPrice] = useState('');
  const [colorSearch, setColorSearch] = useState('');

  const filteredOrders = orders.filter(order =>
    Object.values(order).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const profitVal = Number(newOrder.salePrice || 0) - Number(newOrder.costPrice || 0);
    const orderToAdd = { 
      ...newOrder, 
      profit: (profitVal >= 0 ? '+' : '') + profitVal + ' AZN' 
    };
    setOrders([orderToAdd, ...orders]);
    setIsAddModalOpen(false);
    setNewOrder({ ...emptyOrderTemplate, id: `ALP-00${orders.length + 2}` });
  };

  const handleEditClick = (order) => {
    setCurrentOrder({ 
      ...order, 
      colors: order.colors || [order.color || 'Bej'],
      yarnTypes: order.yarnTypes || [order.yarnType || 'Alize Puffy'],
      knitType: order.knitType || 'Klassik Hörgü',
      size: order.size || '90x90 cm'
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const profitVal = Number(currentOrder.salePrice || 0) - Number(currentOrder.costPrice || 0);
    const updatedOrder = { 
      ...currentOrder, 
      profit: (profitVal >= 0 ? '+' : '') + profitVal + ' AZN' 
    };
    setOrders(orders.map(o => (o.id === updatedOrder.id ? updatedOrder : o)));
    setIsEditModalOpen(false);
    setCurrentOrder(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsinizmi?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hazırlanır': return '#f57f17';
      case 'Hazırdır': return '#0288d1';
      case 'Təhvil verildi': return '#2e7d32';
      case 'Ləğv edildi': return '#d32f2f';
      default: return '#555';
    }
  };

  const handleDateChange = (obj, setObj, field, val) => {
    const updated = { ...obj, [field]: val };
    if (field === 'orderDate' || field === 'deliveryDate') {
      updated.daysCount = calculateDays(field === 'orderDate' ? val : updated.orderDate, field === 'deliveryDate' ? val : updated.deliveryDate);
    }
    setObj(updated);
  };

  const updatePricesAndRemaining = (obj, setObj, field, val) => {
    const updated = { ...obj, [field]: val };
    const sale = Number(field === 'salePrice' ? val : updated.salePrice) || 0;
    const advance = Number(field === 'advance' ? val : updated.advance) || 0;
    updated.remaining = Math.max(0, sale - advance).toString();
    setObj(updated);
  };

  const toggleColorSelection = (currObj, setCurrObj, colorItem) => {
    const currentColors = currObj.colors || [];
    let updatedColors;
    if (currentColors.includes(colorItem)) {
      updatedColors = currentColors.filter(c => c !== colorItem);
    } else {
      updatedColors = [...currentColors, colorItem];
    }
    setCurrObj({ ...currObj, colors: updatedColors });
  };

  const getSourceIcon = (srcName) => {
    const found = sources.find(s => s.name === srcName);
    return found ? found.icon : '📌';
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#FDFBF7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#4A3B32' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #EFEBE9', paddingBottom: '15px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#3D2C22', margin: 0 }}>Sifarişlər</h1>
        <button
          onClick={() => {
            setNewOrder({ ...emptyOrderTemplate, id: `ALP-00${orders.length + 1}` });
            setIsAddModalOpen(true);
          }}
          style={{ backgroundColor: '#2E7D32', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
        >
          + Yeni Sifariş
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Axtarış (Müştəri, Mənbə, Telefon, Kod, Məhsul və s.)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '400px', padding: '10px 15px', border: '1px solid #D7CCC8', borderRadius: '8px', outline: 'none', fontSize: '14px' }}
        />
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflowX: 'auto', border: '1px solid #EFEBE9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px', minWidth: '1300px' }}>
          <thead>
            <tr style={{ backgroundColor: '#EFEBE9', color: '#5C4033', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '10px' }}>Kod</th>
              <th style={{ padding: '10px' }}>Müştəri / Tel</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Mənbə</th>
              <th style={{ padding: '10px' }}>Tarix</th>
              <th style={{ padding: '10px' }}>Məhsul Adı</th>
              <th style={{ padding: '10px' }}>İpin Növü</th>
              <th style={{ padding: '10px' }}>Rənglər</th>
              <th style={{ padding: '10px' }}>Maya Dəyəri</th>
              <th style={{ padding: '10px' }}>Satış Qiyməti</th>
              <th style={{ padding: '10px' }}>Qazanc</th>
              <th style={{ padding: '10px' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const formatDateStr = (dStr) => {
                  if (!dStr) return '';
                  const parts = dStr.split('-');
                  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0].slice(2)}`;
                  return dStr;
                };

                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #EFEBE9' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#5C4033' }}>{order.id}</td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 'bold', color: '#3D2C22' }}>{order.customerName}</div>
                      <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>{order.phone}</div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', fontSize: '18px' }} title={order.source}>
                      {getSourceIcon(order.source)}
                    </td>
                    <td style={{ padding: '10px', fontSize: '11px' }}>
                      <div>{formatDateStr(order.orderDate)}</div>
                      <div style={{ marginTop: '2px' }}>{formatDateStr(order.deliveryDate)} <strong style={{ color: '#2e7d32' }}>({order.daysCount || 0} gün)</strong></div>
                    </td>
                    <td style={{ padding: '10px' }}>{order.product}</td>
                    <td style={{ padding: '10px' }}>{Array.isArray(order.yarnTypes) ? order.yarnTypes.join(', ') : order.yarnType}</td>
                    <td style={{ padding: '10px' }}>{Array.isArray(order.colors) ? order.colors.join(', ') : order.color}</td>
                    <td style={{ padding: '10px' }}>{order.costPrice} AZN</td>
                    <td style={{ padding: '10px' }}>{order.salePrice} AZN</td>
                    <td style={{ padding: '10px', color: '#2e7d32', fontWeight: 'bold' }}>{order.profit}</td>
                    <td style={{ padding: '10px' }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        style={{ padding: '4px 6px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '11px', background: '#fff', cursor: 'pointer', fontWeight: 'bold', color: getStatusColor(order.status) }}
                      >
                        <option value="Hazırlanır">Hazırlanır</option>
                        <option value="Hazırdır">Hazırdır</option>
                        <option value="Təhvil verildi">Təhvil verildi</option>
                        <option value="Ləğv edildi">Ləğv edildi</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button onClick={() => handleEditClick(order)} title="Düzəliş et" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', marginRight: '8px', color: '#6d4c41', fontWeight: 'bold' }}>✎</button>
                      <button onClick={() => handleDelete(order.id)} title="Sil" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#d32f2f' }}>🗑</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="12" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Heç bir sifariş tapılmadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Əsas Əlavə Et / Redaktə Et Modalı */}
      {(isAddModalOpen || isEditModalOpen) && (() => {
        const isEditing = isEditModalOpen;
        const currentData = isEditing ? currentOrder : newOrder;
        const setCurrentData = isEditing ? setCurrentOrder : setNewOrder;
        const titleText = isEditing ? 'Sifarişi Redaktə Et' : 'Yeni Sifariş';

        return (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '14px', width: '580px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#3D2C22', margin: 0 }}>{titleText}</h2>
                <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#555' }}>✕</button>
              </div>

              <form onSubmit={isEditing ? handleEditSubmit : handleAddSubmit}>
                
                {/* Tarixlər */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Sifariş Tarixi</label>
                    <input type="date" value={currentData.orderDate} onChange={(e) => handleDateChange(currentData, setCurrentData, 'orderDate', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #D7CCC8', borderRadius: '6px', outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>
                      Təhvil Tarixi — <span style={{ color: '#2e7d32' }}>{currentData.daysCount || 0} gün var</span>
                    </label>
                    <input type="date" value={currentData.deliveryDate} onChange={(e) => handleDateChange(currentData, setCurrentData, 'deliveryDate', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #D7CCC8', borderRadius: '6px', outline: 'none', fontSize: '13px', boxSizing: 'border-box' }} />
                  </div>
                </div>

                {/* Müştəri / Tel */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Müştəri Adı</label>
                    <input type="text" required value={currentData.customerName} onChange={(e) => setCurrentData({...currentData, customerName: e.target.value})} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Telefon Nömrəsi</label>
                    <input type="text" required value={currentData.phone} onChange={(e) => setCurrentData({...currentData, phone: e.target.value})} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                {/* Mənbə seçimi və Səliqəli İdarəetmə düyməsi */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#5C4033' }}>Sifarişin Gəldiyi Mənbə</label>
                    <button type="button" onClick={() => setManageModalType('sources')} style={{ background: 'none', border: 'none', color: '#2e7d32', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>⚙️ Əlavə et və ya düzəliş et</button>
                  </div>
                  <select 
                    value={currentData.source} 
                    onChange={(e) => setCurrentData({...currentData, source: e.target.value})} 
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}
                  >
                    {sources.map(src => (
                      <option key={src.name} value={src.name}>{src.icon} {src.name}</option>
                    ))}
                  </select>
                </div>

                {/* Məhsul Adı və Səliqəli İdarəetmə düyməsi */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#5C4033' }}>Məhsul Adı</label>
                    <button type="button" onClick={() => setManageModalType('products')} style={{ background: 'none', border: 'none', color: '#2e7d32', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>⚙️ Əlavə et və ya düzəliş et</button>
                  </div>
                  <select 
                    value={currentData.product} 
                    onChange={(e) => setCurrentData({...currentData, product: e.target.value})} 
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}
                  >
                    {products.map(prod => (
                      <option key={prod} value={prod}>{prod}</option>
                    ))}
                  </select>
                </div>

                {/* Hörgü Növü və Ölçü seçimləri */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Hörgü Növü</label>
                    <select 
                      value={currentData.knitType} 
                      onChange={(e) => setCurrentData({...currentData, knitType: e.target.value})} 
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}
                    >
                      {knitTypesList.map(kt => (
                        <option key={kt} value={kt}>{kt}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Ölçü</label>
                    <select 
                      value={currentData.size} 
                      onChange={(e) => setCurrentData({...currentData, size: e.target.value})} 
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}
                    >
                      {sizesList.map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* İpin Növü */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>İpin Növü</label>
                  <select 
                    value={Array.isArray(currentData.yarnTypes) ? currentData.yarnTypes[0] : currentData.yarnType} 
                    onChange={(e) => setCurrentData({...currentData, yarnTypes: [e.target.value], yarnType: e.target.value})} 
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}
                  >
                    {yarnTypesList.map(yt => (
                      <option key={yt} value={yt}>{yt}</option>
                    ))}
                  </select>
                </div>

                {/* Rənglərin seçimi və axtarışı */}
                <div style={{ marginBottom: '12px', border: '1px solid #D7CCC8', borderRadius: '6px', padding: '10px', background: '#FAFAFA' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#5C4033' }}>
                    Rənglər (Birdən çox seçə bilərsiniz): <span style={{ color: '#2e7d32' }}>Seçilib: {(currentData.colors || []).join(', ') || 'Yoxdur'}</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Rəng axtar..." 
                    value={colorSearch}
                    onChange={(e) => setColorSearch(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px', marginBottom: '8px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                  />
                  <div style={{ maxHeight: '100px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {colorsList
                      .filter(c => c.toLowerCase().includes(colorSearch.toLowerCase()))
                      .map(colorItem => {
                        const isSelected = (currentData.colors || []).includes(colorItem);
                        return (
                          <div 
                            key={colorItem}
                            onClick={() => toggleColorSelection(currentData, setCurrentData, colorItem)}
                            style={{ padding: '5px 8px', borderRadius: '4px', backgroundColor: isSelected ? '#E8F5E9' : '#fff', border: isSelected ? '1px solid #81C784' : '1px solid #E0E0E0', cursor: 'pointer', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          >
                            <span>{colorItem}</span>
                            {isSelected && <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓</span>}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Materiallar */}
                <div style={{ border: '1px solid #EFEBE9', borderRadius: '8px', padding: '12px', marginBottom: '12px', background: '#FAFAFA' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#5C4033' }}>İstifadə Edilən Materiallar</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input type="text" placeholder="Məs: 1 ədəd paket" value={newMatName} onChange={(e) => setNewMatName(e.target.value)} style={{ flex: 2, padding: '6px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', fontSize: '12px', outline: 'none', background: '#fff' }} />
                    <input type="text" placeholder="Qiymət" value={newMatPrice} onChange={(e) => setNewMatPrice(e.target.value)} style={{ flex: 1, padding: '6px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', fontSize: '12px', outline: 'none', background: '#fff' }} />
                    <button type="button" onClick={() => {
                      if (newMatName && newMatPrice) {
                        const updatedMats = [...(currentData.materials || []), { name: newMatName, price: newMatPrice }];
                        const totalCost = updatedMats.reduce((sum, m) => sum + Number(m.price || 0), 0);
                        setCurrentData({ ...currentData, materials: updatedMats, costPrice: totalCost.toString() });
                        setNewMatName('');
                        setNewMatPrice('');
                      }
                    }} style={{ backgroundColor: '#2B2B2B', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>+ Əlavə et</button>
                  </div>
                  {currentData.materials?.map((mat, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '6px 10px', borderRadius: '6px', marginBottom: '5px', border: '1px solid #EFEBE9', fontSize: '12px' }}>
                      <span>{mat.name} – <strong>{mat.price} AZN</strong></span>
                      <button type="button" onClick={() => {
                        const updatedMats = currentData.materials.filter((_, i) => i !== idx);
                        const totalCost = updatedMats.reduce((sum, m) => sum + Number(m.price || 0), 0);
                        setCurrentData({ ...currentData, materials: updatedMats, costPrice: totalCost.toString() });
                      }} style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}>Sil</button>
                    </div>
                  ))}
                </div>

                {/* Qiymətlər */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Maya Dəyəri (AZN)</label>
                    <input type="text" value={currentData.costPrice} onChange={(e) => setCurrentData({...currentData, costPrice: e.target.value})} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Satış Qiyməti (AZN)</label>
                    <input type="text" value={currentData.salePrice} onChange={(e) => updatePricesAndRemaining(currentData, setCurrentData, 'salePrice', e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                {/* Beh və Ödəniş */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Beh (AZN)</label>
                    <input type="text" value={currentData.advance} onChange={(e) => updatePricesAndRemaining(currentData, setCurrentData, 'advance', e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Beh Ödəniş Növü</label>
                    <select value={currentData.advanceMethod} onChange={(e) => setCurrentData({...currentData, advanceMethod: e.target.value})} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}>
                      <option value="Kart">Kart</option>
                      <option value="Nağd">Nağd</option>
                    </select>
                  </div>
                </div>

                {/* Qalıq */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Qalıq (Avtomatik)</label>
                    <input type="text" readOnly value={currentData.remaining} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none', backgroundColor: '#F5F5F5' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Qalıq Ödəniş Növü</label>
                    <select value={currentData.remainingMethod} onChange={(e) => setCurrentData({...currentData, remainingMethod: e.target.value})} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}>
                      <option value="Nağd">Nağd</option>
                      <option value="Kart">Kart</option>
                    </select>
                  </div>
                </div>

                {/* Düymələr */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #EFEBE9', paddingTop: '12px' }}>
                  <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} style={{ padding: '8px 16px', border: '1px solid #D7CCC8', background: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', color: '#555' }}>Ləğv et</button>
                  <button type="submit" style={{ padding: '8px 16px', background: '#8D6E63', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Yadda saxla</button>
                </div>
              </form>

            </div>
          </div>
        );
      })()}

      {/* Səliqəli İdarəetmə Modalı (Əlavə et / Düzəliş et / Sil) */}
      {manageModalType && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#3D2C22' }}>
                {manageModalType === 'sources' ? 'Mənbələri İdarə Et' : 'Məhsulları İdarə Et'}
              </h3>
              <button onClick={() => { setManageModalType(null); setNewItemName(''); }} style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Yeni element əlavə etmə hissəsi */}
            <div style={{ marginBottom: '15px', background: '#FAFAFA', padding: '10px', borderRadius: '8px', border: '1px solid #EFEBE9' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '5px', color: '#5C4033' }}>Yeni {manageModalType === 'sources' ? 'Mənbə' : 'Məhsul'} Əlavə Et</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input 
                  type="text" 
                  placeholder="Adı..." 
                  value={newItemName} 
                  onChange={(e) => setNewItemName(e.target.value)}
                  style={{ flex: 1, padding: '6px 8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px', outline: 'none' }} 
                />
                <button 
                  type="button"
                  onClick={() => {
                    if (!newItemName) return;
                    if (manageModalType === 'sources') {
                      if (!sources.some(s => s.name === newItemName)) {
                        setSources([...sources, { name: newItemName, icon: '📌' }]);
                      }
                    } else {
                      if (!products.includes(newItemName)) {
                        setProducts([...products, newItemName]);
                      }
                    }
                    setNewItemName('');
                  }}
                  style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Əlavə et
                </button>
              </div>
            </div>

            {/* Mövcud elementlərin siyahısı və düzəliş/silmə */}
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#777', marginBottom: '2px' }}>Mövcud Siyahı (Düzəliş et və ya sil):</div>
              {manageModalType === 'sources' ? (
                sources.map(src => (
                  <div key={src.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid #EFEBE9', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}>
                    <span>{src.icon} {src.name}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          const updatedName = prompt("Yeni adı daxil edin:", src.name);
                          if (updatedName && updatedName !== src.name) {
                            setSources(sources.map(s => s.name === src.name ? { ...s, name: updatedName } : s));
                          }
                        }}
                        style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ✎
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          if (sources.length <= 1) {
                            alert('Ən azı 1 mənbə qalmalıdır!');
                            return;
                          }
                          setSources(sources.filter(s => s.name !== src.name));
                        }}
                        style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                products.map(prod => (
                  <div key={prod} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid #EFEBE9', padding: '6px 8px', borderRadius: '6px', fontSize: '12px' }}>
                    <span>{prod}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          const updatedName = prompt("Yeni adı daxil edin:", prod);
                          if (updatedName && updatedName !== prod) {
                            setProducts(products.map(p => p === prod ? updatedName : p));
                          }
                        }}
                        style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ✎
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          if (products.length <= 1) {
                            alert('Ən azı 1 məhsul qalmalıdır!');
                            return;
                          }
                          setProducts(products.filter(p => p !== prod));
                        }}
                        style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ marginTop: '15px', textAlign: 'right' }}>
              <button 
                type="button" 
                onClick={() => setManageModalType(null)} 
                style={{ padding: '6px 14px', background: '#6d4c41', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
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