import React, { useState } from "react";

// Rəng adından Avtomatik HEX Rəng Kodunu Müəyyən Edən Funksiya
const getColorFromText = (text) => {
  if (!text) return "#E8C8D5"; // Defolt çəhrayı/bej ton

  const str = text.toLowerCase();

  if (str.includes("ağ") || str.includes("ag") || str.includes("beyaz")) return "#F5F5F5";
  if (str.includes("qara")) return "#333333";
  if (str.includes("sarı") || str.includes("sari") || str.includes("limon")) return "#FAD02C";
  if (str.includes("xardal")) return "#E3A857";
  if (str.includes("qırmızı") || str.includes("qirmizi")) return "#E63946";
  if (str.includes("bordo")) return "#800020";
  if (str.includes("narıncı") || str.includes("narinci") || str.includes("oranj")) return "#F9844A";
  if (str.includes("çəhrayı") || str.includes("cehrayi") || str.includes("pudra")) return "#F4ACB7";
  if (str.includes("fuchsia") || str.includes("fuşya")) return "#D81B60";
  if (str.includes("bənövşəyi") || str.includes("benovseyi") || str.includes("leylak")) return "#B5838D";
  if (str.includes("açıq mavi") || str.includes("buz") || str.includes("körpə mavi")) return "#A0C4FF";
  if (str.includes("səma") || str.includes("mavi")) return "#4EA8DE";
  if (str.includes("göy") || str.includes("goy") || str.includes("lacivert")) return "#1D3557";
  if (str.includes("su yaşılı") || str.includes("nanə") || str.includes("nane")) return "#B7E4C7";
  if (str.includes("fıstıq") || str.includes("fistiq")) return "#99E2B4";
  if (str.includes("yaşıl") || str.includes("yasil")) return "#52B788";
  if (str.includes("xaki")) return "#6B705C";
  if (str.includes("krem") || str.includes("ekru") || str.includes("süd")) return "#FFF8E7";
  if (str.includes("açıq bej") || str.includes("qum")) return "#E6D5B8";
  if (str.includes("bej")) return "#D4B996";
  if (str.includes("vizon")) return "#C3A995";
  if (str.includes("açıq qəhvəyi") || str.includes("dəvə")) return "#C68B59";
  if (str.includes("qəhvəyi") || str.includes("qehveyi") || str.includes("şokolad")) return "#7F4F24";
  if (str.includes("açıq boz")) return "#E0E0E0";
  if (str.includes("boz")) return "#A8A29E";
  if (str.includes("kömür")) return "#4A4E69";

  return "#D4B996";
};

// Orijinal Alize Puffy Şəkli Əsasında Dinamik Rənglənən Komponent
const RealYarnBall = ({ colorName }) => {
  const hexColor = getColorFromText(colorName);

  // Şəklin linki (Alize Puffy Orijinal Şəkli)
  const imageUrl = "https://images.unsplash.com/photo-1608248597379-537558133503?auto=format&fit=crop&q=80&w=200"; // Həqiqi yumaq forması

  return (
    <div
      style={{
        width: "52px",
        height: "64px",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: hexColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        border: "1px solid #E2D7C7"
      }}
      title={colorName}
    >
      {/* Rəng Layı Və Yumaq Şəklinin Blend Rejimi */}
      <img
        src="https://m.media-amazon.com/images/I/71R3yE5DDTL._AC_SL1500_.jpg"
        alt="Alize Puffy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          mixBlendMode: "multiply",
          filter: "contrast(1.1) brightness(0.95)"
        }}
      />
    </div>
  );
};

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
            Alize Puffy iplərinin rəng kodu və stok idarəetməsi
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
            <tr style={{ borderBottom: "1px solid #EFE8DC", backgroundColor: "#FAF7F2", color: "#70665C", fontSize: "14px", fontWeight: "600" }}>
              <th style={{ padding: "18px 20px", width: "80px" }}>Şəkil</th>
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
                  {/* HAQIQI ALIZE PUFFY SEKLININ RENGININ DYNAMIK DEYISDIRILMESI */}
                  <td style={{ padding: "12px 20px" }}>
                    <RealYarnBall colorName={yarn.name} />
                  </td>

                  {/* NÖVÜ */}
                  <td style={{ padding: "18px 20px", fontSize: "15px", fontWeight: "normal", color: "#70665C" }}>
                    {yarn.type}
                  </td>

                  {/* RƏNG KODU */}
                  <td style={{ padding: "18px 20px", fontSize: "15px", fontWeight: "normal", color: "#70665C" }}>
                    KOD: {yarn.code}
                  </td>

                  {/* RƏNG ADI */}
                  <td style={{ padding: "18px 20px", fontSize: "15px", fontWeight: "normal", color: "#70665C" }}>
                    {yarn.name}
                  </td>

                  {/* QİYMƏT */}
                  <td style={{ padding: "18px 20px", fontSize: "15px", fontWeight: "normal", color: "#70665C" }}>
                    {yarn.price}
                  </td>

                  {/* STOK */}
                  <td style={{ padding: "18px 20px" }}>
                    <span
                      style={{
                        padding: "5px 14px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "500",
                        backgroundColor: "#F3EFEA",
                        color: "#5A4E43",
                        display: "inline-block",
                      }}
                    >
                      {yarn.stock} ədəd
                    </span>
                  </td>

                  {/* ƏMƏLİYYATLAR */}
                  <td style={{ padding: "18px 20px", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
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
                          color: "#8A7D71",
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>

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
                          color: "#A09589",
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
                <td colSpan="7" style={{ padding: "32px", textAlign: "center", color: "#8A7A6C" }}>
                  Axtarışa uyğun nəticə tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
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
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="text"
                    placeholder="Məs: Açıq Qəhvəyi / Krem"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #E2D7C7",
                      boxSizing: "border-box",
                    }}
                  />
                  <RealYarnBall colorName={formData.name} />
                </div>
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