import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, Trash2, Edit, X } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      code: 'ALP-001', 
      name: 'Uşaq Yorğanı', 
      category: 'Körpə Tekstili', 
      yarnType: 'Alize Puffy',
      color: '62 – Bej / Krem', 
      stitchType: 'Klassik Hörgü',
      size: '90x90 cm',
      materialsList: [
        { name: '3 yumaq ip', price: 12.00 },
        { name: 'Atlas lent', price: 1.50 }
      ],
      cost: 45.00, 
      price: 70.00, 
      stock: 12 
    },
  ]);

  const [categories, setCategories] = useState(['Körpə Tekstili', 'Hədiyyə Qutuları', 'Xüsusi Suvenirlər', 'Əl İşləri', 'Digər']);
  const [productNames, setProductNames] = useState(['Uşaq Yorğanı', 'Körpə Padyası', 'Oyun Xalçası', 'Papaq və Şarf Dəsti', 'Hədiyyə Qutusu', 'Dekorativ Yastıq']);
  const [yarnTypes, setYarnTypes] = useState(['Alize Puffy', 'Alize Puffy Fine', 'Alize Puffy More', 'Coton', 'Yoxdur']);
  const [stitchTypes, setStitchTypes] = useState(['Klassik Hörgü', 'Ziqzaq Naxış', 'Təkli Petlə', 'İkili Petlə', 'Şahmat Qaydası']);
  
  const [yarnColors, setYarnColors] = useState({
    'Alize Puffy': [
      { name: '01 – Ağ', hex: '#FFFFFF' },
      { name: '02 – Süd rəngi / Açıq krem', hex: '#FDFBF7' },
      { name: '15 – Nanə / Açıq yaşıl', hex: '#D1E7DD' },
      { name: '21 – Qırmızı', hex: '#DC2626' },
      { name: '40 – Açıq mavi', hex: '#BAE6FD' },
      { name: '46 – Tünd göy / Lacivərd', hex: '#1E3A8A' },
      { name: '55 – Təmiz ağ', hex: '#FFFFFF' },
      { name: '58 – Qara', hex: '#1C1917' },
      { name: '60 – Açıq boz', hex: '#E7E5E4' },
      { name: '62 – Bej / Krem', hex: '#EFECE6' },
      { name: '67 – Sarı', hex: '#FEF08A' },
      { name: '110 – Püstəyi / Açıq yaşıl', hex: '#BBF7D0' },
      { name: '141 – Narıncı', hex: '#F97316' },
      { name: '152 – Lila / Bənövşəyi', hex: '#E9D5FF' },
      { name: '161 – Açıq çəhrayı', hex: '#FBCFE8' },
      { name: '187 – Xaki / Zeytun yaşılı', hex: '#65A30D' },
      { name: '192 – Pudra çəhrayı', hex: '#FCE7F3' },
      { name: '216 – Hardal sarısı', hex: '#CA8A04' },
      { name: '245 – Qəhvəyi / Şokolad', hex: '#78350F' },
      { name: '287 – Firuzəyi', hex: '#2DD4BF' },
      { name: '310 – Kofe / Açıq qəhvəyi', hex: '#A16207' },
      { name: '336 – Marsala / Çaxır rəngi', hex: '#881337' },
      { name: '340 – Tozlu çəhrayı', hex: '#F472B6' },
      { name: '462 – Tünd qəhvəyi', hex: '#451A03' },
      { name: '485 – Antrasit / Tünd boz', hex: '#4B5563' },
      { name: '547 – Kətan / Təbii bej', hex: '#D4D4D8' },
      { name: '630 – Zümrüd yaşılı', hex: '#065F46' }
    ],
    'Alize Puffy Fine': [
      { name: '01 – Ağ', hex: '#FFFFFF' },
      { name: '62 – Bej / Krem', hex: '#EFECE6' },
      { name: '161 – Açıq çəhrayı', hex: '#FBCFE8' },
      { name: '340 – Tozlu çəhrayı', hex: '#F472B6' }
    ],
    'Alize Puffy More': [
      { name: '501 – Multikolor 1', hex: '#A855F7' },
      { name: '502 – Multikolor 2', hex: '#3B82F6' }
    ],
    'Coton': [
      { name: 'C-01 – Ağ', hex: '#FFFFFF' },
      { name: 'C-02 – Qəhvəyi', hex: '#78350F' }
    ],
    'Yoxdur': [
      { name: 'Standart Rəng', hex: '#E7E5E4' }
    ]
  });

  const [sizes, setSizes] = useState(['80x80 cm', '90x90 cm', '100x100 cm', '120x120 cm', 'Standart']);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [managerModal, setManagerModal] = useState({ isOpen: false, type: '', title: '' });

  const [formData, setFormData] = useState({
    code: '', name: '', category: '', yarnType: 'Alize Puffy', color: '', stitchType: 'Klassik Hörgü', size: '', materialsList: [], cost: '', price: '', stock: ''
  });

  const [newMatName, setNewMatName] = useState('');
  const [newMatPrice, setNewMatPrice] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateCodeForYarn = (yarn) => {
    let prefix = 'PRD';
    if (yarn === 'Alize Puffy') prefix = 'ALP';
    else if (yarn === 'Alize Puffy Fine') prefix = 'ALPF';
    else if (yarn === 'Alize Puffy More') prefix = 'ALPM';
    else if (yarn === 'Coton') prefix = 'CTN';

    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${randomNum}`;
  };

  const handleYarnChange = (e) => {
    const selectedYarn = e.target.value;
    const availableColors = yarnColors[selectedYarn] || [{ name: 'Standart', hex: '#ccc' }];
    
    setFormData(prev => ({
      ...prev,
      yarnType: selectedYarn,
      code: generateCodeForYarn(selectedYarn),
      color: availableColors[0].name || ''
    }));
  };

  const handleSelectChange = (e, fieldName, currentList, setList) => {
    const value = e.target.value;
    if (value === '___add_new___') {
      const newItem = prompt('Yeni dəyər daxil edin:');
      if (newItem && newItem.trim() !== '') {
        const trimmed = newItem.trim();
        if (!currentList.includes(trimmed)) {
          setList([...currentList, trimmed]);
        }
        setFormData(prev => ({ ...prev, [fieldName]: trimmed }));
      }
    } else if (value === '___manage___') {
      setManagerModal({ isOpen: true, type: fieldName, title: 'Siyahını Düzənlə' });
    } else {
      setFormData(prev => ({ ...prev, [fieldName]: value }));
    }
  };

  const handleColorAction = (e) => {
    const value = e.target.value;
    const currentColors = yarnColors[formData.yarnType] || [];

    if (value === '___add_new___') {
      const newColorName = prompt(`"${formData.yarnType}" üçün yeni rəng adı daxil edin (məs: 631 – Yeni rəng):`);
      if (newColorName && newColorName.trim() !== '') {
        const trimmed = newColorName.trim();
        const updatedColors = [...currentColors, { name: trimmed, hex: '#A855F7' }];
        setYarnColors({ ...yarnColors, [formData.yarnType]: updatedColors });
        setFormData(prev => ({ ...prev, color: trimmed }));
      }
    } else if (value === '___manage___') {
      setManagerModal({ isOpen: true, type: 'color', title: `${formData.yarnType} Rənglərini İdarə Et` });
    } else {
      setFormData(prev => ({ ...prev, color: value }));
    }
  };

  const getColorHex = (yarn, colorName) => {
    const colors = yarnColors[yarn] || [];
    const found = colors.find(c => c.name === colorName);
    return found ? found.hex : '#D4D4D8';
  };

  const addMaterialItem = () => {
    if (!newMatName.trim()) return;
    const priceVal = parseFloat(newMatPrice) || 0;
    const updatedList = [...(formData.materialsList || []), { name: newMatName.trim(), price: priceVal }];
    
    // Avtomatik maya dəyərini yeniləyə bilərik və ya sadəcə siyahıda saxlaya bilərik
    const totalMaterialsCost = updatedList.reduce((acc, m) => acc + m.price, 0);

    setFormData({
      ...formData,
      materialsList: updatedList,
      cost: totalMaterialsCost > 0 ? totalMaterialsCost : formData.cost
    });

    setNewMatName('');
    setNewMatPrice('');
  };

  const removeMaterialItem = (index) => {
    const updatedList = formData.materialsList.filter((_, i) => i !== index);
    const totalMaterialsCost = updatedList.reduce((acc, m) => acc + m.price, 0);

    setFormData({
      ...formData,
      materialsList: updatedList,
      cost: totalMaterialsCost > 0 ? totalMaterialsCost : formData.cost
    });
  };

  const term = searchTerm.toLowerCase().trim();

  const matchedNames = productNames.filter(n => n.toLowerCase().includes(term));
  const matchedCategories = categories.filter(c => c.toLowerCase().includes(term));
  const matchedStitches = stitchTypes.filter(s => s.toLowerCase().includes(term));
  
  let matchedColors = [];
  Object.entries(yarnColors).forEach(([yarn, colors]) => {
    colors.forEach(colObj => {
      if (colObj.name.toLowerCase().includes(term)) {
        matchedColors.push({ yarn, color: colObj.name, hex: colObj.hex });
      }
    });
  });

  const filteredProducts = products.filter(p => {
    if (!term) return true;
    const matString = (p.materialsList || []).map(m => m.name).join(' ').toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(term)) ||
      (p.code && p.code.toLowerCase().includes(term)) ||
      (p.category && p.category.toLowerCase().includes(term)) ||
      (p.yarnType && p.yarnType.toLowerCase().includes(term)) ||
      (p.color && p.color.toLowerCase().includes(term)) ||
      (p.stitchType && p.stitchType.toLowerCase().includes(term)) ||
      (p.size && p.size.toLowerCase().includes(term)) ||
      matString.includes(term)
    );
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        materialsList: product.materialsList || (product.materials ? [{ name: product.materials, price: product.cost || 0 }] : [])
      });
    } else {
      setEditingProduct(null);
      const defaultYarn = yarnTypes[0];
      const defaultColors = yarnColors[defaultYarn] || [];
      setFormData({ 
        code: generateCodeForYarn(defaultYarn), 
        name: productNames[0] || '', 
        category: categories[0] || '', 
        yarnType: defaultYarn, 
        color: defaultColors[0]?.name || '', 
        stitchType: stitchTypes[0] || '',
        size: sizes[0] || '', 
        materialsList: [], 
        cost: '', 
        price: '', 
        stock: '' 
      });
    }
    setNewMatName('');
    setNewMatPrice('');
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      cost: Number(formData.cost),
      price: Number(formData.price),
      stock: Number(formData.stock)
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formattedData, id: p.id } : p));
    } else {
      setProducts([...products, { ...formattedData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #d6d3d1',
    backgroundColor: '#ffffff',
    color: '#000000',
    outline: 'none',
    fontSize: '14px',
    fontWeight: '400',
    width: '100%'
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1c1917',
    marginBottom: '4px',
    display: 'block'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
        
        <div style={{ position: 'relative', width: '380px' }} ref={searchRef}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#1c1917' }} />
            <input 
              type="text" 
              placeholder="Məhsul adı, hörgü, rəng və ya kateqoriya yazın..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              style={{ ...inputStyle, paddingLeft: '38px', borderRadius: '10px', color: '#000000' }}
            />
          </div>

          {isDropdownOpen && term.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #d6d3d1',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              zIndex: 999,
              maxHeight: '300px',
              overflowY: 'auto',
              padding: '10px'
            }}>
              {matchedNames.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1c1917', textTransform: 'uppercase', marginBottom: '4px', paddingLeft: '6px' }}>Məhsul Adları</div>
                  {matchedNames.map((name, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setSearchTerm(name); setIsDropdownOpen(false); }}
                      style={{ padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#000000', fontWeight: '400' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f2eb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      📦 {name}
                    </div>
                  ))}
                </div>
              )}

              {matchedCategories.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1c1917', textTransform: 'uppercase', marginBottom: '4px', paddingLeft: '6px' }}>Kateqoriyalar</div>
                  {matchedCategories.map((cat, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setSearchTerm(cat); setIsDropdownOpen(false); }}
                      style={{ padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#000000', fontWeight: '400' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f2eb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      📁 {cat}
                    </div>
                  ))}
                </div>
              )}

              {matchedStitches.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1c1917', textTransform: 'uppercase', marginBottom: '4px', paddingLeft: '6px' }}>Hörgü Növü</div>
                  {matchedStitches.map((stitch, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setSearchTerm(stitch); setIsDropdownOpen(false); }}
                      style={{ padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#000000', fontWeight: '400' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f2eb'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      🧶 {stitch}
                    </div>
                  ))}
                </div>
              )}

              {matchedColors.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#1c1917', textTransform: 'uppercase', marginBottom: '4px', paddingLeft: '6px' }}>Rənglər</div>
                  {matchedColors.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => { setSearchTerm(item.color); setIsDropdownOpen(false); }}
                      style={{ padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: '#000000', fontWeight: '400', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f2eb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.hex, border: '1px solid #78716c', display: 'inline-block' }}></span>
                        <span>{item.color}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#57534e', fontWeight: '400' }}>({item.yarn})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <button 
          onClick={() => openModal()} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', backgroundColor: '#1c1917', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
        >
          <Plus size={18} /> Yeni Məhsul
        </button>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #d6d3d1', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e7e5e4', color: '#1c1917' }}>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Məhsul Kodu</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Məhsul Adı</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Kateqoriya</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>İpin Növü</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Rəng</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Hörgü Növü</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Ölçü</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>İstifadə edildi</th>
              <th style={{ padding: '12px 8px', fontWeight: '400' }}>Stok Sayı</th>
              <th style={{ padding: '12px 8px', fontWeight: '400' }}>Maya Dəyəri</th>
              <th style={{ padding: '12px 8px', fontWeight: '400' }}>Satış Qiyməti</th>
              <th style={{ padding: '12px 8px', fontWeight: '800' }}>Qazanc</th>
              <th style={{ padding: '12px 8px', fontWeight: '600', textAlign: 'right' }}>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => {
                const profit = Number(p.price) - Number(p.cost);
                const colorHex = getColorHex(p.yarnType, p.color);
                const matsText = p.materialsList && p.materialsList.length > 0 
                  ? p.materialsList.map(m => `${m.name} (${m.price} AZN)`).join(', ') 
                  : '-';
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f5f2eb' }}>
                    <td style={{ padding: '14px 8px', color: '#1c1917', fontWeight: '400' }}>{p.code}</td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontWeight: '400' }}>{p.name}</td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontWeight: '400' }}>{p.category}</td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontWeight: '400' }}>{p.yarnType || '-'}</td>
                    <td style={{ padding: '14px 8px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#000000', fontWeight: '400' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: colorHex, border: '1px solid #78716c', display: 'inline-block', flexShrink: 0 }}></span>
                        {p.color}
                      </span>
                    </td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontWeight: '400' }}>{p.stitchType || '-'}</td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontWeight: '400' }}>{p.size || '-'}</td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontSize: '13px', fontWeight: '400' }}>{matsText}</td>
                    <td style={{ padding: '14px 8px', fontWeight: '400', color: '#000000' }}>{p.stock} əd</td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontWeight: '400' }}>{Number(p.cost).toFixed(2)} AZN</td>
                    <td style={{ padding: '14px 8px', color: '#000000', fontWeight: '400' }}>{Number(p.price).toFixed(2)} AZN</td>
                    <td style={{ padding: '14px 8px', color: '#16a34a', fontWeight: '800' }}>+{profit.toFixed(2)} AZN</td>
                    <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                      <button onClick={() => openModal(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1c1917', marginRight: '8px' }}><Edit size={16} /></button>
                      <button onClick={() => handleDelete(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="13" style={{ textAlign: 'center', padding: '24px', color: '#1c1917', fontWeight: '400' }}>
                  Axtarışa uyğun məhsul tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '540px', padding: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#000000' }}>
                {editingProduct ? 'Məhsulu Düzəlt' : 'Yeni Məhsul Əlavə Et'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1c1917' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Məhsul Kodu</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      value={formData.code} 
                      onChange={e => setFormData({ ...formData, code: e.target.value })} 
                      required 
                      style={inputStyle} 
                    />
                    <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#000000', background: '#f5f5f4', padding: '2px 5px', borderRadius: '4px', fontWeight: '400' }}>Avto</span>
                  </div>
                </div>
                
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Kateqoriya</label>
                  <select value={formData.category} onChange={e => handleSelectChange(e, 'category', categories, setCategories)} style={inputStyle}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    <option disabled style={{ borderTop: '1px solid #ccc' }}>──────────</option>
                    <option value="___add_new___" style={{ fontWeight: '600', color: '#2563eb' }}>+ Yeni əlavə et</option>
                    <option value="___manage___" style={{ fontWeight: '600', color: '#1c1917' }}>⚙️ Siyahını düzənlə</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Məhsul adı</label>
                  <select value={formData.name} onChange={e => handleSelectChange(e, 'name', productNames, setProductNames)} style={inputStyle}>
                    <option value="">-- Seçin --</option>
                    {productNames.map(name => <option key={name} value={name}>{name}</option>)}
                    <option disabled>──────────</option>
                    <option value="___add_new___" style={{ fontWeight: '600', color: '#2563eb' }}>+ Yeni məhsul adı əlavə et</option>
                    <option value="___manage___" style={{ fontWeight: '600', color: '#1c1917' }}>⚙️ Adları düzənlə</option>
                  </select>
                </div>

                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>İpin Növü</label>
                  <select value={formData.yarnType} onChange={handleYarnChange} style={inputStyle}>
                    {yarnTypes.map(y => <option key={y} value={y}>{y}</option>)}
                    <option disabled>──────────</option>
                    <option value="___add_new___" style={{ fontWeight: '600', color: '#2563eb' }}>+ Yeni əlavə et</option>
                    <option value="___manage___" style={{ fontWeight: '600', color: '#1c1917' }}>⚙️ Siyahını düzənlə</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Rəng</label>
                  <select value={formData.color} onChange={handleColorAction} style={inputStyle}>
                    {(yarnColors[formData.yarnType] || []).map(colObj => (
                      <option key={colObj.name} value={colObj.name}>
                        {colObj.name}
                      </option>
                    ))}
                    <option disabled>──────────</option>
                    <option value="___add_new___" style={{ fontWeight: '600', color: '#2563eb' }}>+ Yeni rəng əlavə et</option>
                    <option value="___manage___" style={{ fontWeight: '600', color: '#1c1917' }}>⚙️ Rəngləri düzənlə</option>
                  </select>
                </div>

                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Hörgü / Toxunuş Növü</label>
                  <select value={formData.stitchType} onChange={e => handleSelectChange(e, 'stitchType', stitchTypes, setStitchTypes)} style={inputStyle}>
                    <option value="">-- Hörgü Seç --</option>
                    {stitchTypes.map(st => <option key={st} value={st}>{st}</option>)}
                    <option disabled>──────────</option>
                    <option value="___add_new___" style={{ fontWeight: '600', color: '#2563eb' }}>+ Yeni hörgü əlavə et</option>
                    <option value="___manage___" style={{ fontWeight: '600', color: '#1c1917' }}>⚙️ Siyahını düzənlə</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Ölçü</label>
                  <select value={formData.size} onChange={e => handleSelectChange(e, 'size', sizes, setSizes)} style={inputStyle}>
                    <option value="">-- Ölçü Seç --</option>
                    {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                    <option disabled>──────────</option>
                    <option value="___add_new___" style={{ fontWeight: '600', color: '#2563eb' }}>+ Yeni əlavə et</option>
                    <option value="___manage___" style={{ fontWeight: '600', color: '#1c1917' }}>⚙️ Siyahını düzənlə</option>
                  </select>
                </div>

                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Stok Sayı</label>
                  <input type="number" placeholder="0" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required style={inputStyle} />
                </div>
              </div>

              {/* İSTİFADƏ EDİLDİ (ALT PƏNCƏRƏ / MATERİALLAR HİSSƏSİ) */}
              <div style={{ backgroundColor: '#f9f8f6', padding: '12px', borderRadius: '10px', border: '1px solid #e7e5e4', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={labelStyle}>İstifadə Edilən Materiallar (İp, Etiket, Paket, Lent və s.)</label>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Məs: 1 ədəd paket və ya etiket" 
                    value={newMatName} 
                    onChange={e => setNewMatName(e.target.value)} 
                    style={{ ...inputStyle, flex: 2, backgroundColor: '#fff' }} 
                  />
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="Qiymət (AZN)" 
                    value={newMatPrice} 
                    onChange={e => setNewMatPrice(e.target.value)} 
                    style={{ ...inputStyle, flex: 1, backgroundColor: '#fff' }} 
                  />
                  <button 
                    type="button" 
                    onClick={addMaterialItem}
                    style={{ backgroundColor: '#1c1917', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 14px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    + Əlavə et
                  </button>
                </div>

                {formData.materialsList && formData.materialsList.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                    {formData.materialsList.map((mat, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '6px', border: '1px solid #e7e5e4', fontSize: '13px' }}>
                        <span>{mat.name} – <b>{mat.price.toFixed(2)} AZN</b></span>
                        <button type="button" onClick={() => removeMaterialItem(idx)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontWeight: '600' }}>Sil</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Maya Dəyəri (AZN)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} required style={inputStyle} />
                </div>
                <div style={{ width: '50%' }}>
                  <label style={labelStyle}>Satış Qiyməti (AZN)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #d6d3d1', backgroundColor: '#ffffff', color: '#000000', fontWeight: '600', cursor: 'pointer' }}>Ləğv et</button>
                <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#1c1917', color: '#ffffff', fontWeight: '600', cursor: 'pointer' }}>Yadda Saxla</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {managerModal.isOpen && (() => {
        let list = [];
        let setListFunc = null;

        if (managerModal.type === 'category') {
          list = categories;
          setListFunc = setCategories;
        } else if (managerModal.type === 'name') {
          list = productNames;
          setListFunc = setProductNames;
        } else if (managerModal.type === 'yarnType') {
          list = yarnTypes;
          setListFunc = setYarnTypes;
        } else if (managerModal.type === 'stitchType') {
          list = stitchTypes;
          setListFunc = setStitchTypes;
        } else if (managerModal.type === 'color') {
          list = (yarnColors[formData.yarnType] || []).map(c => c.name);
          setListFunc = (newList) => {
            const formattedColors = newList.map(name => {
              const existing = (yarnColors[formData.yarnType] || []).find(c => c.name === name);
              return existing || { name, hex: '#A855F7' };
            });
            setYarnColors({ ...yarnColors, [formData.yarnType]: formattedColors });
          };
        } else if (managerModal.type === 'size') {
          list = sizes;
          setListFunc = setSizes;
        }

        return (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', width: '400px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#000000' }}>{managerModal.title}</h4>
                <button onClick={() => setManagerModal({ ...managerModal, isOpen: false })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1c1917' }}><X size={18} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto', marginBottom: '15px' }}>
                {list.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: '#f5f5f4', borderRadius: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#000000', fontWeight: '400' }}>{item}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          const updated = prompt('Yeni adı daxil edin:', item);
                          if (updated && updated.trim() !== '') {
                            const newList = [...list];
                            newList[idx] = updated.trim();
                            setListFunc(newList);
                          }
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb', fontSize: '12px', fontWeight: '600' }}
                      >
                        Dəyiş
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          setListFunc(list.filter((_, i) => i !== idx));
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontSize: '12px', fontWeight: '600' }}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                type="button" 
                onClick={() => setManagerModal({ ...managerModal, isOpen: false })} 
                style={{ width: '100%', padding: '10px', backgroundColor: '#1c1917', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Bağla
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}