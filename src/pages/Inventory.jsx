import React, { useState } from 'react';
import { LuPlus, LuSearch, LuPencil, LuTrash2, LuDisc } from 'react-icons/lu';

const Inventory = () => {
  // Mövcud ip növlərinin siyahısı (dinamik olaraq yeni növlər əlavə olunca artacaq)
  const [categories, setCategories] = useState(['Alize Puffy', 'Alize Puffy Fine', 'Alize Puffy Color', 'Alize Puffy More']);

  // İplər stoku
  const [yarns, setYarns] = useState([
    { id: 1, category: 'Alize Puffy', colorCode: '183', colorName: 'Açıq Qəhvəyi / Krem', stock: 12, price: '4.50 AZN' },
    { id: 2, category: 'Alize Puffy', colorCode: '55', colorName: 'Ağ', stock: 8, price: '4.50 AZN' },
    { id: 3, category: 'Alize Puffy Fine', colorCode: '216', colorName: 'Sarı', stock: 5, price: '4.50 AZN' },
    { id: 4, category: 'Alize Puffy Fine', colorCode: '60', colorName: 'Qara', stock: 2, price: '4.50 AZN' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Hamısı');

  // Modal state-ləri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  const [newYarn, setNewYarn] = useState({
    category: 'Alize Puffy',
    colorCode: '',
    colorName: '',
    stock: '',
    price: '4.50 AZN'
  });

  // Axtarış və Filtr
  const filteredYarns = yarns.filter(item => {
    const matchesSearch = item.colorCode.includes(searchTerm) || 
                          item.colorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Hamısı' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Selekt dəyişdikdə
  const handleCategorySelectChange = (e) => {
    const value = e.target.value;
    if (value === 'NEW_CATEGORY') {
      setIsCustomCategory(true);
      setNewYarn({ ...newYarn, category: '' });
    } else {
      setIsCustomCategory(false);
      setNewYarn({ ...newYarn, category: value });
    }
  };

  // Yeni ip əlavə etmək
  const handleAddYarn = (e) => {
    e.preventDefault();
    
    let finalCategory = newYarn.category;

    if (isCustomCategory) {
      if (!customCategoryInput.trim()) return;
      finalCategory = customCategoryInput.trim();
      
      // Əgər siyahıda yoxdursa, yeni kateqoriyanı siyahıya əlavə et
      if (!categories.includes(finalCategory)) {
        setCategories([...categories, finalCategory]);
      }
    }

    if (!newYarn.colorCode) return;

    const item = {
      id: Date.now(),
      category: finalCategory,
      colorCode: newYarn.colorCode,
      colorName: newYarn.colorName || '-',
      stock: Number(newYarn.stock) || 0,
      price: newYarn.price || '4.50 AZN'
    };

    setYarns([item, ...yarns]);
    
    // Modalı sıfırla və bağla
    setIsModalOpen(false);
    setIsCustomCategory(false);
    setCustomCategoryInput('');
    setNewYarn({ category: 'Alize Puffy', colorCode: '', colorName: '', stock: '', price: '4.50 AZN' });
  };

  // İp silmək
  const handleDeleteYarn = (id) => {
    if (window.confirm('Bu ipi stokdan silmək istədiyinizdən əminsiniz?')) {
      setYarns(yarns.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ padding: '8px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Başlıq və Düymə */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#2C1D11' }}>İplər Stoku</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#7A624E' }}>
            Alize Puffy və digər iplərin rəng kodu və stok idarəetməsi
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            setIsCustomCategory(false);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#8C6239',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <LuPlus size={18} />
          <span>Yeni İp Əlavə Et</span>
        </button>
      </div>

      {/* Axtarış və Filtr */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        
        {/* Axtarış İnputu */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <LuSearch size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#7A624E' }} />
          <input
            type="text"
            placeholder="Rəng kodu və ya adı ilə axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 38px',
              borderRadius: '8px',
              border: '1px solid #D8C8B8',
              backgroundColor: '#FFFFFF',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Tab Filtri */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: '#EFE7DC', padding: '4px', borderRadius: '8px', border: '1px solid #D8C8B8', overflowX: 'auto' }}>
          {['Hamısı', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backgroundColor: selectedCategory === cat ? '#8C6239' : 'transparent',
                color: selectedCategory === cat ? '#FFFFFF' : '#4A3525',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* İplər Cədvəli */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2D7C7', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#FAF7F2', color: '#7A624E', borderBottom: '1px solid #E2D7C7' }}>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Növü</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Rəng Kodu</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Rəng Adı</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Qiymət</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold' }}>Stok (Ədəd)</th>
                <th style={{ padding: '12px 16px', fontWeight: 'bold', textAlign: 'right' }}>Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredYarns.length > 0 ? (
                filteredYarns.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F0EAE1' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '600', color: '#2C1D11' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LuDisc size={16} color="#8C6239" />
                        <span>{item.category}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#8C6239' }}>
                      KOD: {item.colorCode}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#4A3525' }}>{item.colorName}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '600', color: '#2C1D11' }}>{item.price}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: item.stock <= 3 ? '#FFEBEE' : '#E8F5E9',
                        color: item.stock <= 3 ? '#C62828' : '#2E7D32',
                        border: `1px solid ${item.stock <= 3 ? '#FFCDD2' : '#C8E6C9'}`
                      }}>
                        {item.stock} ədəd
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          type="button"
                          style={{
                            padding: '6px 10px',
                            backgroundColor: '#FAF7F2',
                            border: '1px solid #D8C8B8',
                            borderRadius: '6px',
                            color: '#4A3525',
                            cursor: 'pointer'
                          }}
                        >
                          <LuPencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteYarn(item.id)}
                          style={{
                            padding: '6px 10px',
                            backgroundColor: '#FFEBEE',
                            border: '1px solid #FFCDD2',
                            borderRadius: '6px',
                            color: '#C62828',
                            cursor: 'pointer'
                          }}
                        >
                          <LuTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#7A624E' }}>
                    Axtarışa uyğun ip tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '450px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 'bold', color: '#2C1D11' }}>
              Yeni İp Əlavə Et
            </h2>

            <form onSubmit={handleAddYarn}>
              
              {/* İp Növü Seçimi */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4A3525', marginBottom: '6px' }}>
                  İp Növü
                </label>
                
                {!isCustomCategory ? (
                  <select
                    value={newYarn.category}
                    onChange={handleCategorySelectChange}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D8C8B8', fontSize: '14px', outline: 'none', backgroundColor: '#FFFFFF'
                    }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="NEW_CATEGORY" style={{ fontWeight: 'bold', color: '#8C6239' }}>
                      + Yeni İp Növü Əlavə Et...
                    </option>
                  </select>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Məs: Alize Puffy Color"
                      value={customCategoryInput}
                      onChange={(e) => setCustomCategoryInput(e.target.value)}
                      style={{
                        flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #8C6239', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(false)}
                      style={{
                        padding: '10px 12px', borderRadius: '8px', border: '1px solid #D8C8B8', backgroundColor: '#FAF7F2', color: '#4A3525', fontSize: '12px', cursor: 'pointer'
                      }}
                    >
                      Siyahıdan seç
                    </button>
                  </div>
                )}
              </div>

              {/* Rəng Kodu */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4A3525', marginBottom: '6px' }}>
                  Rəng Kodu
                </label>
                <input
                  type="text"
                  required
                  placeholder="Məs: 183"
                  value={newYarn.colorCode}
                  onChange={(e) => setNewYarn({ ...newYarn, colorCode: e.target.value })}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D8C8B8', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Rəng Adı */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4A3525', marginBottom: '6px' }}>
                  Rəng Adı / Təsviri
                </label>
                <input
                  type="text"
                  placeholder="Məs: Krem / Açıq Bej"
                  value={newYarn.colorName}
                  onChange={(e) => setNewYarn({ ...newYarn, colorName: e.target.value })}
                  style={{
                    width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D8C8B8', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Stok və Qiymət */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4A3525', marginBottom: '6px' }}>
                    Stok (Ədəd)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={newYarn.stock}
                    onChange={(e) => setNewYarn({ ...newYarn, stock: e.target.value })}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D8C8B8', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#4A3525', marginBottom: '6px' }}>
                    Qiymət
                  </label>
                  <input
                    type="text"
                    value={newYarn.price}
                    onChange={(e) => setNewYarn({ ...newYarn, price: e.target.value })}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #D8C8B8', fontSize: '14px', outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Düymələr */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 16px', borderRadius: '8px', border: '1px solid #D8C8B8', backgroundColor: '#FAF7F2', color: '#4A3525', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  Ləğv Et
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 18px', borderRadius: '8px', border: 'none', backgroundColor: '#8C6239', color: '#FFFFFF', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
                  }}
                >
                  Yadda Saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;