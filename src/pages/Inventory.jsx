import React, { useState } from "react";

export default function Inventory() {
  // 1. İplərin ilkin siyahısı
  const [yarns, setYarns] = useState([
    { id: 1, type: "Alize Puffy", code: "183", name: "Açıq Qəhvəyi / Krem", price: "4.50 AZN", stock: 12 },
    { id: 2, type: "Alize Puffy", code: "55", name: "Ağ", price: "4.50 AZN", stock: 8 },
    { id: 3, type: "Alize Puffy Fine", code: "216", name: "Sarı", price: "4.50 AZN", stock: 5 },
    { id: 4, type: "Alize Puffy Fine", code: "60", name: "Qara", price: "4.50 AZN", stock: 2 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");

  // 2. AXTARIŞ VƏ KATEQORİYA FİLTİRİ (Düzəldildi)
  const filteredYarns = yarns.filter((yarn) => {
    const query = searchTerm.toLowerCase().trim();

    // Həm rəng koduna, həm də rəng adına görə axtarır
    const matchesSearch =
      yarn.code.toLowerCase().includes(query) ||
      yarn.name.toLowerCase().includes(query);

    // Kateqoriyaya görə süzgəc (Hamısı / Alize Puffy / Alize Puffy Fine)
    const matchesCategory =
      selectedCategory === "Hamısı" || yarn.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 3. ƏMƏLİYYAT FUNKSİYALARI (Düzəldildi)
  const handleEdit = (yarn) => {
    alert(`Redaktə olunur: KOD ${yarn.code} - ${yarn.name}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu ipi silmək istədiyinizdən əminsiniz?")) {
      setYarns(yarns.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#fdfbf7] min-h-screen">
      {/* BAŞLIQ */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#4a2e1b]">İplər Stoku</h1>
          <p className="text-sm text-gray-500">
            Alize Puffy və digər iplərin rəng kodu və stok idarəetməsi
          </p>
        </div>
        <button className="bg-[#8c5a2b] hover:bg-[#734821] text-white px-4 py-2 rounded-lg font-medium shadow-sm">
          + Yeni İp Əlavə Et
        </button>
      </div>

      {/* AXTARIŞ VƏ KATEQORİYA TƏB-LƏRİ */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Rəng kodu və ya adı ilə axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8c5a2b]"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        <div className="flex bg-[#f3ebd9] p-1 rounded-xl gap-1 w-full sm:w-auto">
          {["Hamısı", "Alize Puffy", "Alize Puffy Fine"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#8c5a2b] text-white"
                  : "text-[#5c4028] hover:bg-[#e2d5bd]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CƏDVƏL */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-sm font-semibold text-gray-500 bg-gray-50/50">
              <th className="p-4">Növü</th>
              <th className="p-4">Rəng Kodu</th>
              <th className="p-4">Rəng Adı</th>
              <th className="p-4">Qiymət</th>
              <th className="p-4">Stok (Ədəd)</th>
              <th className="p-4 text-center">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody>
            {filteredYarns.length > 0 ? (
              filteredYarns.map((yarn) => (
                <tr key={yarn.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 flex items-center gap-2 font-medium">
                    <span className="w-4 h-4 rounded-full border-2 border-[#8c5a2b] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8c5a2b]"></span>
                    </span>
                    {yarn.type}
                  </td>
                  <td className="p-4 font-semibold text-gray-700">KOD: {yarn.code}</td>
                  <td className="p-4 text-gray-600">{yarn.name}</td>
                  <td className="p-4 font-bold">{yarn.price}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        yarn.stock < 3
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {yarn.stock} ədəd
                    </span>
                  </td>
                  {/* ƏMƏLİYYAT DÜYMƏLƏRİ */}
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(yarn)}
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-600 transition"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(yarn.id)}
                        className="p-1.5 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">
                  Axtarışa uyğun nəticə tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}