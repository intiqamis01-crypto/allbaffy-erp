import React, { useState } from "react";

export default function Inventory() {
  const [yarns, setYarns] = useState([
    { id: 1, type: "Alize Puffy", code: "183", name: "Açıq Qəhvəyi / Krem", price: "4.50 AZN", stock: 12 },
    { id: 2, type: "Alize Puffy", code: "55", name: "Ağ", price: "4.50 AZN", stock: 8 },
    { id: 3, type: "Alize Puffy Fine", code: "216", name: "Sarı", price: "4.50 AZN", stock: 5 },
    { id: 4, type: "Alize Puffy Fine", code: "60", name: "Qara", price: "4.50 AZN", stock: 2 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");

  // Modal State-ləri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingYarn, setEditingYarn] = useState(null);
  const [formData, setFormData] = useState({
    type: "Alize Puffy",
    code: "",
    name: "",
    price: "4.50 AZN",
    stock: "",
  });

  // HƏR ŞEYƏ GÖRƏ AXTARIŞ (Növü, Kodu, Adı, Qiyməti)
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

  // Modal Açılışları
  const openAddModal = () => {
    setEditingYarn(null);
    setFormData({ type: "Alize Puffy", code: "", name: "", price: "4.50 AZN", stock: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (yarn) => {
    setEditingYarn(yarn);
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
  };

  // Form Yadda Saxlama
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.name.trim() || !formData.stock) {
      alert("Xahiş olunur Rəng Kodu, Rəng Adı və Stok xanalarını doldurun!");
      return;
    }

    if (editingYarn) {
      setYarns(
        yarns.map((item) =>
          item.id === editingYarn.id ? { ...item, ...formData, stock: Number(formData.stock) } : item
        )
      );
    } else {
      const newYarn = {
        id: Date.now(),
        ...formData,
        stock: Number(formData.stock),
      };
      setYarns([newYarn, ...yarns]);
    }

    closeModal();
  };

  // Silmə
  const handleDelete = (id) => {
    if (window.confirm("Bu ipi silmək istədiyinizdən əminsiniz?")) {
      setYarns(yarns.filter((item) => item.id !== id));
    }
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#FAF7F2", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* BAŞLIQ */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#4A2E1B", margin: 0 }}>İplər Stoku</h1>
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
            padding: "10px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + Yeni İp Əlavə Et
        </button>
      </div>

      {/* AXTARIŞ VƏ TƏB-LƏR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "16px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Rəng kodu, adı və ya növü ilə axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px 16px",
            border: "1px solid #E2D7C7",
            borderRadius: "10px",
            width: "340px",
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#FFF",
          }}
        />

        <div style={{ backgroundColor: "#EFE6D8", padding: "4px", borderRadius: "10px", display: "flex", gap: "4px" }}>
          {["Hamısı", "Alize Puffy", "Alize Puffy Fine"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 16px",
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
      <div style={{ backgroundColor: "#FFF", borderRadius: "14px", border: "1px solid #EFE8DC", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #EFE8DC", backgroundColor: "#FAF7F2", color: "#8A7663", fontSize: "14px" }}>
              <th style={{ padding: "16px" }}>Növü</th>
              <th style={{ padding: "16px" }}>Rəng Kodu</th>
              <th style={{ padding: "16px" }}>Rəng Adı</th>
              <th style={{ padding: "16px" }}>Qiymət</th>
              <th style={{ padding: "16px" }}>Stok (Ədəd)</th>
              <th style={{ padding: "16px", textAlign: "center" }}>Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredYarns.length > 0 ? (
              filteredYarns.map((yarn) => (
                <tr key={yarn.id} style={{ borderBottom: "1px solid #F7F3EC", fontSize: "15px" }}>
                  <td style={{ padding: "16px", fontWeight: "600", color: "#3A2B1E", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#7A4A21", display: "inline-block" }}></span>
                    {yarn.type}
                  </td>
                  <td style={{ padding: "16px", fontWeight: "600", color: "#5A4332" }}>KOD: {yarn.code}</td>
                  <td style={{ padding: "16px", color: "#6A5849" }}>{yarn.name}</td>
                  <td style={{ padding: "16px", fontWeight: "bold", color: "#3A2B1E" }}>{yarn.price}</td>
                  <td style={{ padding: "16px" }}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: yarn.stock < 3 ? "#FEE2E2" : "#D1FAE5",
                        color: yarn.stock < 3 ? "#DC2626" : "#059669",
                      }}
                    >
                      {yarn.stock} ədəd
                    </span>
                  </td>
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <button
                      onClick={() => openEditModal(yarn)}
                      style={{
                        padding: "6px 10px",
                        border: "1px solid #E2D7C7",
                        borderRadius: "8px",
                        backgroundColor: "#FFF",
                        cursor: "pointer",
                        marginRight: "6px",
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(yarn.id)}
                      style={{
                        padding: "6px 10px",
                        border: "1px solid #FCA5A5",
                        borderRadius: "8px",
                        backgroundColor: "#FEF2F2",
                        color: "#DC2626",
                        cursor: "pointer",
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: "32px", textAlign: "center", color: "#9A8878" }}>
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
            backgroundColor: "rgba(0,0,0,0.5)",
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
              width: "420px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#4A2E1B", marginBottom: "20px" }}>
              {editingYarn ? "İpi Redaktə Et" : "Yeni İp Əlavə Et"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "13px", color: "#7A6B5D", fontWeight: "600", display: "block", marginBottom: "4px" }}>İp Növü</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #E2D7C7", boxSizing: "border-box" }}
                >
                  <option value="Alize Puffy">Alize Puffy</option>
                  <option value="Alize Puffy Fine">Alize Puffy Fine</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#7A6B5D", fontWeight: "600", display: "block", marginBottom: "4px" }}>Rəng Kodu</label>
                <input
                  type="text"
                  placeholder="Məs: 183"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #E2D7C7", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#7A6B5D", fontWeight: "600", display: "block", marginBottom: "4px" }}>Rəng Adı</label>
                <input
                  type="text"
                  placeholder="Məs: Açıq Qəhvəyi / Krem"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #E2D7C7", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#7A6B5D", fontWeight: "600", display: "block", marginBottom: "4px" }}>Qiymət</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #E2D7C7", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "13px", color: "#7A6B5D", fontWeight: "600", display: "block", marginBottom: "4px" }}>Stok (Ədəd)</label>
                <input
                  type="number"
                  placeholder="Məs: 10"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #E2D7C7", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={closeModal}
                  style={{ padding: "9px 18px", borderRadius: "8px", border: "1px solid #E2D7C7", backgroundColor: "#FFF", cursor: "pointer" }}
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 18px", borderRadius: "8px", border: "none", backgroundColor: "#7A4A21", color: "#FFF", fontWeight: "600", cursor: "pointer" }}
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