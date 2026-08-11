import React, { useState, useEffect } from 'react';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';

export default function Orders() {
  const db = getFirestore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal idarəetməsi
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null); // Redaktə olunan sifariş

  // Form state-ləri
  const [formData, setFormData] = useState({
    orderCode: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: '',
    phone: '',
    productName: '',
    madeOf: 'Alize Puffy ipi',
    netPrice: '',
    profit: '',
    status: 'Gözləmədə'
  });

  // Sifarişləri bazadan çəkmək
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Sifarişləri çəkərkən xəta: ", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Yeni sifariş əlavə etmək və ya mövcudu yeniləmək
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingOrder) {
        // Redaktə rejimi
        const orderRef = doc(db, 'orders', editingOrder.id);
        await updateDoc(orderRef, {
          ...formData,
          netPrice: Number(formData.netPrice),
          profit: Number(formData.profit),
        });
      } else {
        // Yeni əlavə etmə rejimi
        await addDoc(collection(db, 'orders'), {
          ...formData,
          netPrice: Number(formData.netPrice),
          profit: Number(formData.profit),
          createdAt: serverTimestamp()
        });
      }

      closeModal();
      fetchOrders();
    } catch (error) {
      console.error("Xəta baş verdi: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Modalı bağlamaq və formanı təmizləmək
  const closeModal = () => {
    setShowModal(false);
    setEditingOrder(null);
    setFormData({
      orderCode: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: '',
      phone: '',
      productName: '',
      madeOf: 'Alize Puffy ipi',
      netPrice: '',
      profit: '',
      status: 'Gözləmədə'
    });
  };

  // Redaktə düyməsinə basıldıqda
  const handleEditClick = (order) => {
    setEditingOrder(order);
    setFormData({
      orderCode: order.orderCode,
      customerName: order.customerName,
      phone: order.phone,
      productName: order.productName,
      madeOf: order.madeOf,
      netPrice: order.netPrice,
      profit: order.profit,
      status: order.status
    });
    setShowModal(true);
  };

  // Sifarişi silmək
  const handleDelete = async (id) => {
    if (window.confirm("Bu sifarişi silmək istədiyinizə əminsinizmi?")) {
      try {
        await deleteDoc(doc(db, 'orders', id));
        setOrders(orders.filter(o => o.id !== id));
      } catch (error) {
        console.error("Silinərkən xəta: ", error);
      }
    }
  };

  // Statusu birbaşa cədvəldən dəyişmək
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Status yenilənərkən xəta: ", error);
    }
  };

  // Hərfə görə axtarış filtri (Müştəri adı, telefon, məhsul və ya sifariş koduna görə)
  const filteredOrders = orders.filter(order => 
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Başlıq və Üst Panel */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-800">Sifarişlər İdarəetməsi</h2>
          <p className="text-sm text-stone-500">Müştəri sifarişləri, materiallar və gəlir izləməsi</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition text-sm font-medium shadow-sm flex items-center gap-2"
        >
          <span>+</span> Yeni Sifariş Əlavə Et
        </button>
      </div>

      {/* Axtarış Sətri */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input 
            type="text"
            placeholder="Hərfə görə axtar (Müştəri, telefon, məhsul, kod)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800 shadow-xs"
          />
          <svg className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {/* Sifarişlər Cədvəli */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 text-xs uppercase tracking-wider">
                <th className="p-4">Sifariş Kodu</th>
                <th className="p-4">Müştəri Adı</th>
                <th className="p-4">Telefon</th>
                <th className="p-4">Məhsul Adı</th>
                <th className="p-4">Material</th>
                <th className="p-4">Net Qiymət</th>
                <th className="p-4">Gəlir</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700 text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-stone-400">
                    Heç bir sifariş tapılmadı.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition">
                    <td className="p-4 font-medium text-stone-900">{order.orderCode}</td>
                    <td className="p-4 font-medium text-stone-800">{order.customerName}</td>
                    <td className="p-4 text-stone-500">{order.phone}</td>
                    <td className="p-4">{order.productName}</td>
                    <td className="p-4 text-stone-500 text-xs">{order.madeOf}</td>
                    <td className="p-4 font-semibold">{order.netPrice} ₼</td>
                    <td className="p-4 text-emerald-600 font-semibold">+{order.profit} ₼</td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-medium border focus:outline-none cursor-pointer ${
                          order.status === 'Tamamlandı' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          order.status === 'Hazırlanır' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          order.status === 'Ləğv edildi' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          'bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        <option value="Gözləmədə">Gözləmədə</option>
                        <option value="Hazırlanır">Hazırlanır</option>
                        <option value="Tamamlandı">Tamamlandı</option>
                        <option value="Ləğv edildi">Ləğv edildi</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEditClick(order)}
                        className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition font-medium"
                      >
                        Düzəliş et
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="px-2.5 py-1 text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition font-medium"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Əlavə etmə / Düzəliş etmə Modalı (Popup) */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200">
            <h3 className="text-lg font-bold text-stone-800 mb-4">
              {editingOrder ? 'Sifarişə Düzəliş Et' : 'Yeni Sifariş Əlavə Et'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Sifariş Kodu</label>
                  <input 
                    type="text" 
                    value={formData.orderCode}
                    onChange={(e) => setFormData({...formData, orderCode: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm bg-stone-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Telefon Nömrəsi</label>
                  <input 
                    type="text" 
                    placeholder="+994 50 XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Müştərinin Adı və Soyadı</label>
                <input 
                  type="text" 
                  placeholder="Məsələn: Leyla Məmmədova"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Məhsul Adı</label>
                  <input 
                    type="text" 
                    placeholder="Məsələn: Bej odeyal"
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Nədən hazırlanıb (Material)</label>
                  <input 
                    type="text" 
                    value={formData.madeOf}
                    onChange={(e) => setFormData({...formData, madeOf: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Net Qiymət (₼)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={formData.netPrice}
                    onChange={(e) => setFormData({...formData, netPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Gəlir (₼)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    value={formData.profit}
                    onChange={(e) => setFormData({...formData, profit: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none bg-white"
                >
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                  <option value="Ləğv edildi">Ləğv edildi</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100">
                <button 
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50 transition"
                >
                  Ləğv et
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-stone-800 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition"
                >
                  {loading ? 'Yadda saxlanılır...' : (editingOrder ? 'Yenilə' : 'Sifarişi Yarat')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}