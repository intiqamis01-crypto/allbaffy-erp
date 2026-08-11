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
        customerName: 'Leyla',
        phone: '0500000000',
        source: 'Instagram',
        orderDate: '2026-07-28',
        deliveryDate: '2026-08-01',
        daysCount: 4,
        product: 'Uşaq Yorğanı',
        yarnTypes: ['Alize Puffy'],
        colors: ['62 – Bej / Krem'],
        knitType: 'Klassik Hörgü',
        size: '90x90 cm',
        costPrice: '45',
        salePrice: '70',
        profit: '+25 AZN',
        status: 'Hazırlanır',
        advance: '45',
        advanceMethod: 'Kart',
        remaining: '25',
        remainingMethod: 'Nağd',
        deliveryAddress: 'Koroğlu m/s',
        deliveryPrice: '0',
        materials: [
          { name: '3 yumaq ip', price: '12.00' },
          { name: 'Atlas lent', price: '1.50' }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('allbaffy_orders', JSON.stringify(orders));
  }, [orders]);

  // Dinamik siyahılar (Mənbələr, Məhsullar, İp növləri, Rənglər)
  const [sources, setSources] = useState(['Instagram', 'WhatsApp', 'TikTok', 'Tövsiyə', 'Digər']);
  const [products, setProducts] = useState(['Uşaq Yorğanı', 'Şərf', 'Gift Box', 'Pampers Tortu', 'Jaket / Jilet', 'Oyun Matı']);
  const [yarnTypesList, setYarnTypesList] = useState(['Alize Puffy', 'Alize Puffy Fine', 'Alize Puffy Fine Color']);
  const [colorsList, setColorsList] = useState(['62 – Bej / Krem', '183 – Çəhrayı', '152 – Mavi', '60 – Ağ', '310 – Yaşıl']);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Köməkçi: Tarixlər arası gün fərqini hesablayan funksiya
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
    orderDate: '2026-07-28',
    deliveryDate: '2026-08-01',
    daysCount: 4,
    product: 'Uşaq Yorğanı',
    yarnTypes: ['Alize Puffy'],
    colors: ['62 – Bej / Krem'],
    knitType: 'Klassik Hörgü',
    size: '90x90 cm',
    costPrice: '45',
    salePrice: '70',
    status: 'Hazırlanır',
    advance: '0',
    advanceMethod: 'Kart',
    remaining: '70',
    remainingMethod: 'Nağd',
    deliveryAddress: '',
    deliveryPrice: '0',
    materials: [
      { name: '3 yumaq ip', price: '12.00' },
      { name: 'Atlas lent', price: '1.50' }
    ]
  };

  const [newOrder, setNewOrder] = useState(emptyOrderTemplate);
  const [newMatName, setNewMatName] = useState('');
  const [newMatPrice, setNewMatPrice] = useState('');

  // Rəng axtarış inputu üçün state-lər
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
      colors: order.colors || [order.color || '62 – Bej / Krem'],
      yarnTypes: order.yarnTypes || [order.yarnType || 'Alize Puffy']
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

  // Tarix dəyişdikdə gün fərqini avtomatik yeniləyən köməkçi
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

  // Siyahıdan rəng əlavə etmək/silmək üçün (Birdən çox rəng dəstəyi)
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

  return (
    <div style={{ padding: '30px', backgroundColor: '#FDFBF7', minHeight: '100vh', fontFamily: 'sans-serif', color: '#4A3B32' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #EFEBE9', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#3D2C22', margin: 0 }}>Sifarişlər</h1>
        </div>
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
              <th style={{ padding: '10px' }}>Müştəri / Tel</th>
              <th style={{ padding: '10px' }}>Kod</th>
              <th style={{ padding: '10px' }}>Mənbə</th>
              <th style={{ padding: '10px' }}>Tarix (Sifariş / Təhvil / Müddət)</th>
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
                // Tarixi gün/ay/il formatına çeviririk (ekran üçün: gg.aa.İİ)
                const formatDateStr = (dStr) => {
                  if (!dStr) return '';
                  const parts = dStr.split('-');
                  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0].slice(2)}`;
                  return dStr;
                };

                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #EFEBE9' }}>
                    <td style={{ padding: '10px' }}>
                      <div style={{ fontWeight: 'bold', color: '#3D2C22' }}>{order.customerName}</div>
                      <div style={{ fontSize: '11px', color: '#777', marginTop: '2px' }}>{order.phone}</div>
                    </td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#5C4033' }}>{order.id}</td>
                    <td style={{ padding: '10px' }}>{order.source}</td>
                    <td style={{ padding: '10px', fontSize: '11px' }}>
                      <div>Sif: {formatDateStr(order.orderDate)}</div>
                      <div style={{ marginTop: '2px' }}>Təh: {formatDateStr(order.deliveryDate)} <strong style={{ color: '#2e7d32' }}>({order.daysCount || 0} gün)</strong></div>
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
                      <button
                        onClick={() => handleEditClick(order)}
                        title="Düzəliş et"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', marginRight: '8px', color: '#6d4c41', fontWeight: 'bold' }}
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        title="Sil"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#d32f2f' }}
                      >
                        🗑
                      </button>
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

      {/* Modal Komponenti */}
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
                
                {/* Tarixlər və Təqvim (İstədiyiniz format: gün/ay/26) */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Sifariş Tarixi</label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D7CCC8', borderRadius: '6px', padding: '0 8px', background: '#fff' }}>
                      <input 
                        type="date" 
                        value={currentData.orderDate} 
                        onChange={(e) => handleDateChange(currentData, setCurrentData, 'orderDate', e.target.value)} 
                        style={{ width: '100%', padding: '8px 0', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', cursor: 'pointer' }} 
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>
                      Təhvil Tarixi — <span style={{ color: '#2e7d32' }}>{currentData.daysCount || 0} gün var</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D7CCC8', borderRadius: '6px', padding: '0 8px', background: '#fff' }}>
                      <input 
                        type="date" 
                        value={currentData.deliveryDate} 
                        onChange={(e) => handleDateChange(currentData, setCurrentData, 'deliveryDate', e.target.value)} 
                        style={{ width: '100%', padding: '8px 0', border: 'none', outline: 'none', fontSize: '13px', background: 'transparent', cursor: 'pointer' }} 
                      />
                    </div>
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

                {/* Sifarişin Gəldiyi Mənbə (Siyahının altında Əlavə et / Düzəliş et seçimi) */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Sifarişin Gəldiyi Mənbə</label>
                  <select 
                    value={currentData.source} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '__manage_sources__') {
                        const actionType = prompt("Mənbələr üzrə nə etmək istəyirsiniz?\n1. Yeni mənbə əlavə et\n2. Mənbə sil");
                        if (actionType === '1') {
                          const newSrc = prompt("Yeni mənbənin adını daxil edin:");
                          if (newSrc && !sources.includes(newSrc)) {
                            setSources([...sources, newSrc]);
                            setCurrentData({...currentData, source: newSrc});
                          }
                        } else if (actionType === '2') {
                          const remSrc = prompt(`Hansı mənbəni silmək istəyirsiniz?\nMövcudlar: ${sources.join(', ')}`);
                          if (remSrc) {
                            setSources(sources.filter(s => s !== remSrc));
                          }
                        }
                      } else {
                        setCurrentData({...currentData, source: val});
                      }
                    }} 
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}
                  >
                    {sources.map(src => (
                      <option key={src} value={src}>{src}</option>
                    ))}
                    <option disabled>--------------------------</option>
                    <option value="__manage_sources__" style={{ fontWeight: 'bold', color: '#2e7d32' }}>⚙️ Mənbələri idarə et (Əlavə et / Sil)</option>
                  </select>
                </div>

                {/* Məhsul Adı (Siyahının aşağısında Əlavə et / Düzəliş et və Kateqoriya çıxarılıb) */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Məhsul Adı</label>
                  <select 
                    value={currentData.product} 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '__manage_products__') {
                        const actionType = prompt("Məhsullar üzrə nə etmək istəyirsiniz?\n1. Yeni məhsul əlavə et\n2. Məhsul sil");
                        if (actionType === '1') {
                          const newProd = prompt("Yeni məhsulun adını daxil edin:");
                          if (newProd && !products.includes(newProd)) {
                            setProducts([...products, newProd]);
                            setCurrentData({...currentData, product: newProd});
                          }
                        } else if (actionType === '2') {
                          const remProd = prompt(`Hansı məhsulu silmək istəyirsiniz?\nMövcudlar: ${products.join(', ')}`);
                          if (remProd) {
                            setProducts(products.filter(p => p !== remProd));
                          }
                        }
                      } else {
                        setCurrentData({...currentData, product: val});
                      }
                    }} 
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', background: 'white', fontSize: '13px', outline: 'none' }}
                  >
                    {products.map(prod => (
                      <option key={prod} value={prod}>{prod}</option>
                    ))}
                    <option disabled>--------------------------</option>
                    <option value="__manage_products__" style={{ fontWeight: 'bold', color: '#2e7d32' }}>⚙️ Məhsulları idarə et (Əlavə et / Sil)</option>
                  </select>
                </div>

                {/* İpin Növü */}
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>İpin Növü (Sabit bazadan)</label>
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

                {/* Rəng (Axtarışlı və birdən çox rəng seçə bilmə imkanı) */}
                <div style={{ marginBottom: '12px', border: '1px solid #D7CCC8', borderRadius: '6px', padding: '10px', background: '#FAFAFA' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px', color: '#5C4033' }}>
                    Rənglər (Birdən çox seçə bilərsiniz): <span style={{ color: '#2e7d32' }}>Seçilib: {(currentData.colors || []).join(', ') || 'Yoxdur'}</span>
                  </label>
                  
                  {/* Kiçik axtarış inputu rənglər üçün */}
                  <input 
                    type="text" 
                    placeholder="Rəng axtar..." 
                    value={colorSearch}
                    onChange={(e) => setColorSearch(e.target.value)}
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px', marginBottom: '8px', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                  />

                  <div style={{ maxHeight: '110px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {colorsList
                      .filter(c => c.toLowerCase().includes(colorSearch.toLowerCase()))
                      .map(colorItem => {
                        const isSelected = (currentData.colors || []).includes(colorItem);
                        return (
                          <div 
                            key={colorItem}
                            onClick={() => toggleColorSelection(currentData, setCurrentData, colorItem)}
                            style={{ 
                              padding: '5px 8px', 
                              borderRadius: '4px', 
                              backgroundColor: isSelected ? '#E8F5E9' : '#fff', 
                              border: isSelected ? '1px solid #81C784' : '1px solid #E0E0E0', 
                              cursor: 'pointer', 
                              fontSize: '12px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span>{colorItem}</span>
                            {isSelected && <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓ Seçilib</span>}
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Materiallar Bloku */}
                <div style={{ border: '1px solid #EFEBE9', borderRadius: '8px', padding: '12px', marginBottom: '12px', background: '#FAFAFA' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px', color: '#5C4033' }}>İstifadə Edilən Materiallar (İp, Etiket, Paket, Lent və s.)</label>
                  
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Məs: 1 ədəd paket və ya etiket" 
                      value={newMatName}
                      onChange={(e) => setNewMatName(e.target.value)}
                      style={{ flex: 2, padding: '6px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', fontSize: '12px', outline: 'none', background: '#fff' }} 
                    />
                    <input 
                      type="text" 
                      placeholder="Qiymət (AZN)" 
                      value={newMatPrice}
                      onChange={(e) => setNewMatPrice(e.target.value)}
                      style={{ flex: 1, padding: '6px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', fontSize: '12px', outline: 'none', background: '#fff' }} 
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (newMatName && newMatPrice) {
                          const updatedMats = [...(currentData.materials || []), { name: newMatName, price: newMatPrice }];
                          const totalCost = updatedMats.reduce((sum, m) => sum + Number(m.price || 0), 0);
                          setCurrentData({ ...currentData, materials: updatedMats, costPrice: totalCost.toString() });
                          setNewMatName('');
                          setNewMatPrice('');
                        }
                      }}
                      style={{ backgroundColor: '#2B2B2B', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      + Əlavə et
                    </button>
                  </div>

                  {currentData.materials?.map((mat, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '6px 10px', borderRadius: '6px', marginBottom: '5px', border: '1px solid #EFEBE9', fontSize: '12px' }}>
                      <span>{mat.name} – <strong>{mat.price} AZN</strong></span>
                      <button 
                        type="button" 
                        onClick={() => {
                          const updatedMats = currentData.materials.filter((_, i) => i !== idx);
                          const totalCost = updatedMats.reduce((sum, m) => sum + Number(m.price || 0), 0);
                          setCurrentData({ ...currentData, materials: updatedMats, costPrice: totalCost.toString() });
                        }}
                        style={{ background: 'none', border: 'none', color: '#D32F2F', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                </div>

                {/* Maya və Satış Qiyməti */}
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

                {/* Beh və Ödəniş Növü */}
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

                {/* Qalıq və Ödəniş Növü */}
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

                {/* Çatdırılma */}
                <div style={{ borderTop: '1px solid #EFEBE9', paddingTop: '10px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#5C4033', marginBottom: '8px' }}>Çatdırılma Bölməsi</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Ünvan / Kuryer</label>
                      <input type="text" placeholder="Məs: Koroğlu m/s" value={currentData.deliveryAddress} onChange={(e) => setCurrentData({...currentData, deliveryAddress: e.target.value})} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', color: '#5C4033' }}>Çatdırılma (AZN)</label>
                      <input type="text" value={currentData.deliveryPrice} onChange={(e) => setCurrentData({...currentData, deliveryPrice: e.target.value})} style={{ width: '100%', padding: '8px 10px', border: '1px solid #D7CCC8', borderRadius: '6px', boxSizing: 'border-box', fontSize: '13px', outline: 'none' }} />
                    </div>
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
    </div>
  );
};

export default Orders;