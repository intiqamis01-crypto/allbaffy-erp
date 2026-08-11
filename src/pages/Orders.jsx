import React, { useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerName: 'Aygün Məmmədova',
      phone: '+994 50 123 45 67',
      product: 'Toxunma Odyal',
      material: 'Alize Puffy',
      netPrice: '45 AZN',
      profit: '18 AZN',
      status: 'Hazırlanır'
    },
    {
      id: 'ORD-002',
      customerName: 'Elmir Qasımov',
      phone: '+994 55 987 65 43',
      product: 'Şarf və Papaq dəsti',
      material: 'Alize Puffy Fine',
      netPrice: '30 AZN',
      profit: '12 AZN',
      status: 'Tamamlandı'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [newOrder, setNewOrder] = useState({
    id: `ORD-00${orders.length + 1}`,
    customerName: '',
    phone: '',
    product: '',
    material: '',
    netPrice: '',
    profit: '',
    status: 'Gözləmədə'
  });

  const filteredOrders = orders.filter(order =>
    Object.values(order).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setOrders([newOrder, ...orders]);
    setIsAddModalOpen(false);
    setNewOrder({
      id: `ORD-00${orders.length + 2}`,
      customerName: '',
      phone: '',
      product: '',
      material: '',
      netPrice: '',
      profit: '',
      status: 'Gözləmədə'
    });
  };

  const handleEditClick = (order) => {
    setCurrentOrder({ ...order });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setOrders(orders.map(o => (o.id === currentOrder.id ? currentOrder : o)));
    setIsEditModalOpen(false);
    setCurrentOrder(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsinizmi?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="p-8 bg-[#FDFBF7] min-h-screen text-[#4A3B32] w-full">
      {/* Başlıq və Yeni Sifariş düyməsi */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-[#EFEBE9] pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3D2C22]">Sifarişlər İdarəetməsi</h1>
          <p className="text-sm text-[#795548] mt-1">Bütün sifarişləri izləyin və idarə edin</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#5C4033] hover:bg-[#4A3B32] text-white px-5 py-2.5 rounded-xl shadow-md transition duration-200 font-medium text-sm flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span> Yeni Sifariş Əlavə Et
        </button>
      </div>

      {/* Axtarış paneli */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Hər hansı bir məlumata görə axtar (Müştəri, telefon, məhsul və s.)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border border-[#D7CCC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8D6E63] bg-white shadow-sm text-sm"
        />
      </div>

      {/* Səliqəli Cədvəl Kartı */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-[#EFEBE9]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EFEBE9] text-[#5C4033] text-xs uppercase tracking-wider border-b border-[#D7CCC8]">
                <th className="p-4 font-semibold">Sifariş Kodu</th>
                <th className="p-4 font-semibold">Müştəri Adı</th>
                <th className="p-4 font-semibold">Telefon</th>
                <th className="p-4 font-semibold">Məhsul Adı</th>
                <th className="p-4 font-semibold">Material</th>
                <th className="p-4 font-semibold">Net Qiyməti</th>
                <th className="p-4 font-semibold">Gəlir</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-center">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEBE9] text-sm">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="p-4 font-bold text-[#5C4033]">{order.id}</td>
                    <td className="p-4 font-medium text-[#3D2C22]">{order.customerName}</td>
                    <td className="p-4 text-gray-600">{order.phone}</td>
                    <td className="p-4 text-[#4A3B32]">{order.product}</td>
                    <td className="p-4 text-gray-500">{order.material}</td>
                    <td className="p-4 font-semibold">{order.netPrice}</td>
                    <td className="p-4 text-green-700 font-semibold">{order.profit}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                        order.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                        order.status === 'Hazırlanır' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-3">
                      <button
                        onClick={() => handleEditClick(order)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-lg transition"
                      >
                        Düzəliş et
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-xs bg-red-50 px-3 py-1.5 rounded-lg transition"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-gray-400">
                    Heç bir sifariş tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Yeni Sifariş */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-[#D7CCC8]">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Yeni Sifariş Əlavə Et</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Müştəri Adı</label>
                <input
                  type="text"
                  required
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Telefon Nömrəsi</label>
                <input
                  type="text"
                  required
                  value={newOrder.phone}
                  onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Məhsul Adı</label>
                <input
                  type="text"
                  required
                  value={newOrder.product}
                  onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Material (Nədən hazırlanıb)</label>
                <input
                  type="text"
                  required
                  value={newOrder.material}
                  onChange={(e) => setNewOrder({...newOrder, material: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Net Qiyməti</label>
                  <input
                    type="text"
                    required
                    value={newOrder.netPrice}
                    onChange={(e) => setNewOrder({...newOrder, netPrice: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Gəlir</label>
                  <input
                    type="text"
                    required
                    value={newOrder.profit}
                    onChange={(e) => setNewOrder({...newOrder, profit: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Status</label>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-medium"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#5C4033] text-white rounded-xl hover:bg-[#4A3B32] text-sm font-medium shadow"
                >
                  Yadda saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Düzəliş Et */}
      {isEditModalOpen && currentOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-[#D7CCC8]">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Sifarişə Düzəliş Et</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Müştəri Adı</label>
                <input
                  type="text"
                  required
                  value={currentOrder.customerName}
                  onChange={(e) => setCurrentOrder({...currentOrder, customerName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Telefon Nömrəsi</label>
                <input
                  type="text"
                  required
                  value={currentOrder.phone}
                  onChange={(e) => setCurrentOrder({...currentOrder, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Məhsul Adı</label>
                <input
                  type="text"
                  required
                  value={currentOrder.product}
                  onChange={(e) => setCurrentOrder({...currentOrder, product: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Material (Nədən hazırlanıb)</label>
                <input
                  type="text"
                  required
                  value={currentOrder.material}
                  onChange={(e) => setCurrentOrder({...currentOrder, material: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Net Qiyməti</label>
                  <input
                    type="text"
                    required
                    value={currentOrder.netPrice}
                    onChange={(e) => setCurrentOrder({...currentOrder, netPrice: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Gəlir</label>
                  <input
                    type="text"
                    required
                    value={currentOrder.profit}
                    onChange={(e) => setCurrentOrder({...currentOrder, profit: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5C4033] uppercase mb-1">Status</label>
                <select
                  value={currentOrder.status}
                  onChange={(e) => setCurrentOrder({...currentOrder, status: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8D6E63]"
                >
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 text-sm font-medium"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#5C4033] text-white rounded-xl hover:bg-[#4A3B32] text-sm font-medium shadow"
                >
                  Yenilə
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;