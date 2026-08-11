import React, { useState } from 'react';

const Orders = () => {
  // Nümunə sifarişlər siyahısı
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

  // Axtarış üçün state
  const [searchTerm, setSearchTerm] = useState('');

  // Modal pəncərələrin vəziyyəti
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Yeni sifariş formunun state-i
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

  // Axtarış filtr edilməsi (hər hərfə görə)
  const filteredOrders = orders.filter(order =>
    Object.values(order).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Yeni sifariş əlavə etmə funksiyası
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

  // Düzəliş üçün seçmə
  const handleEditClick = (order) => {
    setCurrentOrder({ ...order });
    setIsEditModalOpen(true);
  };

  // Düzəlişi yadda saxlama
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setOrders(orders.map(o => (o.id === currentOrder.id ? currentOrder : o)));
    setIsEditModalOpen(false);
    setCurrentOrder(null);
  };

  // Sifarişi silmək
  const handleDelete = (id) => {
    if (window.confirm('Bu sifarişi silmək istədiyinizə əminsinizmi?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#FDFBF7] min-h-screen text-[#4A3B32]">
      {/* Başlıq və Əlavə Et düyməsi */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#3D2C22]">Sifarişlər İdarəetməsi</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#5C4033] hover:bg-[#4A3B32] text-white px-4 py-2 rounded-lg shadow transition duration-200 font-medium"
        >
          + Yeni Sifariş Əlavə Et
        </button>
      </div>

      {/* Hər hərfə görə axtarış paneli */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Axtar (Müştəri, telefon, məhsul və s.)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-[#D7CCC8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D6E63] bg-white"
        />
      </div>

      {/* Sifarişlər Cədvəli */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto border border-[#EFEBE9]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#EFEBE9] text-[#5C4033] border-b border-[#D7CCC8] text-sm">
              <th className="p-3">Sifariş Kodu</th>
              <th className="p-3">Müştəri Adı</th>
              <th className="p-3">Telefon</th>
              <th className="p-3">Məhsul Adı</th>
              <th className="p-3">Material (Nədən hazırlanıb)</th>
              <th className="p-3">Net Qiyməti</th>
              <th className="p-3">Gəlir</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFEBE9] text-sm">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#FDFBF7]">
                  <td className="p-3 font-semibold text-[#5C4033]">{order.id}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3 text-gray-600">{order.material}</td>
                  <td className="p-3 font-medium">{order.netPrice}</td>
                  <td className="p-3 text-green-700 font-medium">{order.profit}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Tamamlandı' ? 'bg-green-100 text-green-800' :
                      order.status === 'Hazırlanır' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(order)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Düzəliş et
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:underline font-medium"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-4 text-center text-gray-500">
                  Heç bir sifariş tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Yeni Sifariş Əlavə Etmə Modalı */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Yeni Sifariş Əlavə Et</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Müştəri Adı</label>
                <input
                  type="text"
                  required
                  value={newOrder.customerName}
                  onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefon Nömrəsi</label>
                <input
                  type="text"
                  required
                  value={newOrder.phone}
                  onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Məhsul Adı</label>
                <input
                  type="text"
                  required
                  value={newOrder.product}
                  onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nədən hazırlanıb (Material)</label>
                <input
                  type="text"
                  required
                  value={newOrder.material}
                  onChange={(e) => setNewOrder({...newOrder, material: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Net Qiyməti</label>
                  <input
                    type="text"
                    required
                    value={newOrder.netPrice}
                    onChange={(e) => setNewOrder({...newOrder, netPrice: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gəlir</label>
                  <input
                    type="text"
                    required
                    value={newOrder.profit}
                    onChange={(e) => setNewOrder({...newOrder, profit: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5C4033] text-white rounded-lg hover:bg-[#4A3B32]"
                >
                  Yadda saxla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Düzəliş Etmə Modalı */}
      {isEditModalOpen && currentOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-[#5C4033]">Sifarişə Düzəliş Et</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Müştəri Adı</label>
                <input
                  type="text"
                  required
                  value={currentOrder.customerName}
                  onChange={(e) => setCurrentOrder({...currentOrder, customerName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefon Nömrəsi</label>
                <input
                  type="text"
                  required
                  value={currentOrder.phone}
                  onChange={(e) => setCurrentOrder({...currentOrder, phone: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Məhsul Adı</label>
                <input
                  type="text"
                  required
                  value={currentOrder.product}
                  onChange={(e) => setCurrentOrder({...currentOrder, product: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Material (Nədən hazırlanıb)</label>
                <input
                  type="text"
                  required
                  value={currentOrder.material}
                  onChange={(e) => setCurrentOrder({...currentOrder, material: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Net Qiyməti</label>
                  <input
                    type="text"
                    required
                    value={currentOrder.netPrice}
                    onChange={(e) => setCurrentOrder({...currentOrder, netPrice: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gəlir</label>
                  <input
                    type="text"
                    required
                    value={currentOrder.profit}
                    onChange={(e) => setCurrentOrder({...currentOrder, profit: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={currentOrder.status}
                  onChange={(e) => setCurrentOrder({...currentOrder, status: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="Gözləmədə">Gözləmədə</option>
                  <option value="Hazırlanır">Hazırlanır</option>
                  <option value="Tamamlandı">Tamamlandı</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5C4033] text-white rounded-lg hover:bg-[#4A3B32]"
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