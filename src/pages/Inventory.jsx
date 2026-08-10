import React, { useState } from "react";

export default function Inventory() {
  const [yarns, setYarns] = useState([
    { id: 1, type: "Alize Puffy", code: "183", name: "Açıq Qəhvəyi / Krem", price: "4.50 AZN", stock: 12 },
    { id: 2, type: "Alize Puffy", code: "55", name: "Ağ", price: "4.50 AZN", stock: 8 },
    { id: 3, type: "Alize Puffy Fine", code: "216", name: "Sarı", price: "4.50 AZN", stock: 5 },
    { id: 4, type: "Alize Puffy Fine", code: "60", name: "Qara", price: "4.50 AZN", stock: 2 },
  ]);

  const [categories, setCategories] = useState(["Alize Puffy", "Alize Puffy Fine"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");

  // Modal State-ləri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingYarn, setEditingYarn] = useState(null);
  const [isAddingNewType, setIsAddingNewType] = useState(false);
  const [customTypeInput, setCustomTypeInput] = useState("");

  const [formData, setFormData] = useState({
    type: "Alize Puffy",
    code: "",
    name: "",
    price: "4.50 AZN",
    stock: "",
  });

  // Axtarış Və Filtr
  const filteredYarns = yarns.filter((yarn) => {
    const query = searchTerm.toLowerCase().trim();

    const matchesSearch =
      yarn.code.toLowerCase().includes(query) ||
      yarn.name.toLowerCase().includes(query) ||
      yarn.type.toLowerCase().includes(query) ||
      yarn.price.toLowerCase().includes(query) ||
      `kod: ${yarn.code}`.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "Hamısı" || yarn.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingYarn(null);
    setIsAddingNewType(false);
    setCustomTypeInput("");
    setFormData({ type: categories[0] || "Alize Puffy", code: "", name: "", price: "4.50 AZN", stock: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (yarn) => {
    setEditingYarn(yarn);
    setIsAddingNewType(false);
    setCustomTypeInput("");
    setFormData({
      type: yarn.type,
      code: yarn.code,
      name: yarn.name,
      price: yarn.price,
      stock: yarn.stock,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingYarn(null);
    setIsAddingNewType(false);
  };

  const handleTypeSelectChange = (e) => {
    const val = e.target.value;
    if (val === "NEW_TYPE") {
      setIsAddingNewType(true);
    } else {
      setIsAddingNewType(false);
      setFormData({ ...formData, type: val });
    }
  };

  const handleAddNewType = () => {
    const trimmed = customTypeInput.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setFormData({ ...formData, type: trimmed });
      setIsAddingNewType(false);
      setCustomTypeInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalType = formData.type;
    if (isAddingNewType) {
      if (!customTypeInput.trim()) {
        alert("Xahiş olunur yeni ip növünün adını qeyd edin!");
        return;
      }
      finalType = customTypeInput.trim();
      if (!categories.includes(finalType)) {
        setCategories([...categories, finalType]);
      }
    }

    if (!formData.code.trim() || !formData.name.trim() || !formData.stock) {
      alert("Xahiş olunur Rəng Kodu, Rəng Adı və Stok xanalarını doldurun!");
      return;
    }

    if (editingYarn) {
      setYarns(
        yarns.map((item) =>
          item.id === editingYarn.id
            ? { ...item, ...formData, type: finalType, stock: Number(formData.stock) }
            : item
        )
      );
    } else {
      const newYarn = {
        id: Date.now(),
        ...formData,
        type: finalType,
        stock: Number(formData.stock),
      };
      setYarns([newYarn, ...yarns]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu ipi silmək istədiyinizdən əminsiniz?")) {
      setYarns(yarns.filter((item) => item.id !== id));
    }
  };

  return (
    <div style={{ padding: "32px 24px", backgroundColor: "#FAF7F2", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* BAŞLIQ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#3A2111", margin: 0 }}>İplər Stoku</h1>
          <p style={{ fontSize: "14px", color: "#7A6B5D", marginTop: "4px" }}>
            Alize Puffy və digər iplərin rəng kodu və stok idarəetməsi
          </p>
        </div>
        <button
          onClick={openAddModal}
          style={{
            backgroundColor: "#7A4A21",
            color: "#FFF",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          + Yeni İp Əlavə Et
        </button>
      </div>

      {/* AXTARIŞ VƏ TƏB-LƏR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Rəng kodu, adı və ya növü ilə axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid #E2D7C7",
            borderRadius: "10px",
            width: "320px",
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#FFF",
          }}
        />

        <div style={{ backgroundColor: "#EFE6D8", padding: "4px", borderRadius: "10px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {["Hamısı", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                backgroundColor: selectedCategory === cat ? "#7A4A21" : "transparent",
                color: selectedCategory === cat ? "#FFF" : "#5A4332",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CƏDVƏL */}
      <div style={{ backgroundColor: "#FFF", borderRadius: "14px", border: "1px solid #EFE8DC", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #EFE8DC", backgroundColor: "#FAF7F2", color: "#6B5A4C", fontSize: "14px", fontWeight: "600" }}>
              <th style={{ padding: "18px 20px" }}>Növü</th>
              <th style={{ padding: "18px 20px" }}>Rəng Kodu</th>
              <th style={{ padding: "18px 20px" }}>Rəng Adı</th>
              <th style={{ padding: "18px 20px" }}>Qiymət</th>
              <th style={{ padding: "18px 20px" }}>Stok (Ədəd)</th>
              <th style={{ padding: "18px 20px", textAlign: "center" }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredYarns.length > 0 ? (
              filteredYarns.map((yarn) => (
                <tr key={yarn.id} style={{ borderBottom: "1px solid #F7F3EC" }}>
                  {/* NÖVÜ: BOLD VƏ BÖYÜK */}
                  <td style={{ padding: "18px 20px", fontWeight: "700", fontSize: "16px", color: "#1A1A1A" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#7A4A21", display: "inline-block" }}></span>
                      {yarn.type}
                    </div>
                  </td>

                  {/* RƏNG KODU: BOLD VƏ BÖYÜK */}
                  <td style={{ padding: "18px 20px", fontWeight: "700", fontSize: "16px", color: "#1A1A1A" }}>
                    KOD: {yarn.code}
                  </td>

                  {/* RƏNG ADI: AÇIQ OXUNAN TÜND QARA */}
                  <td style={{ padding: "18px 20px", fontSize: "15px", color: "#1A1A1A" }}>
                    {yarn.name}
                  </td>

                  {/* QİYMƏT */}
                  <td style={{ padding: "18px 20px", fontWeight: "700", fontSize: "15px", color: "#1A1A1A" }}>
                    {yarn.price}
                  </td>

                  {/* STOK */}
                  <td style={{ padding: "18px 20px" }}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        backgroundColor: yarn.stock < 3 ? "#FEE2E2" : "#D1FAE5",
                        color: yarn.stock < 3 ? "#DC2626" : "#059669",
                      }}
                    >
                      {yarn.stock} ədəd
                    </span>
                  </td>

                  {/* ƏMƏLİYYATLAR: SADƏ MİNİMAL İKONLAR */}
                  <td style={{ padding: "18px 20px", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
                      {/* Redaktə ikonu */}
                      <button
                        onClick={() => openEditModal(yarn)}
                        title="Redaktə et"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px",
                          display: "flex",
                          alignItems: "center",
                          color: "#6B5A4C",
                          opacity: 0.8,
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>

                      {/* Sil ikonu */}
                      <button
                        onClick={() => handleDelete(yarn.id)}
                        title="Sil"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "4px",
                          display: "flex",
                          alignItems: "center",
                          color: "#999",
                          opacity: 0.8,
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#8A7A6C" }}>
                  Axtarışa uyğun nəticə tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* YENİ İP ƏLAVƏ ET / REDAKTƏ ET MODALI */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#FFF",
              padding: "24px",
              borderRadius: "16px",
              width: "400px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#3A2111", marginBottom: "20px" }}>
              {editingYarn ? "İpi Redaktə Et" : "Yeni İp Əlavə Et"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "13px", color: "#6B5A4C", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  İp Növü
                </label>
                <select
                  value={isAddingNewType ? "NEW_TYPE" : formData.type}
                  onChange={handleTypeSelectChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #E2D7C7",
                    boxSizing: "border-box",
                    backgroundColor: "#FFF",
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="NEW_TYPE" style={{ fontWeight: "bold", color: "#7A4A21" }}>
                    + Yeni İp Növü Əlavə Et...
                  </option>
                </select>

                {isAddingNewType && (
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <input
                      type="text"
                      placeholder="Yeni ip növünün adı"
                      value={customTypeInput}
                      onChange={(e) => setCustomTypeInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "8px 10px",
                        borderRadius: "8px",
                        border: "1px solid #7A4A21",
                        fontSize: "13px",
                        boxSizing: "border-box",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddNewType}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#7A4A21",
                        color: "#FFF",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Əlavə et
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#6B5A4C", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  Rəng Kodu
                </label>
                <input
                  type="text"
                  placeholder="Məs: 183"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #E2D7C7",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#6B5A4C", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  Rəng Adı
                </label>
                <input
                  type="text"
                  placeholder="Məs: Açıq Qəhvəyi / Krem"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #E2D7C7",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#6B5A4C", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  Qiymət
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #E2D7C7",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#6B5A4C", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  Stok (Ədəd)
                </label>
                <input
                  type="number"
                  placeholder="Məs: 10"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #E2D7C7",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "8px",
                    border: "1px solid #E2D7C7",
                    backgroundColor: "#FFF",
                    cursor: "pointer",
                  }}
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "9px 18px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#7A4A21",
                    color: "#FFF",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Yadda saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}