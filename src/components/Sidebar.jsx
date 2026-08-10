import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuShoppingCart, 
  LuPackage, 
  LuShoppingBag,
  LuReceipt, 
  LuBarcode, 
  LuBarChart3, 
  LuSettings, 
  LuChevronDown, 
  LuChevronRight,
  LuBox,
  LuDisc,
  LuGift
} from 'react-icons/lu';

const Sidebar = () => {
  const location = useLocation();
  const [isStockOpen, setIsStockOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-[#2C1D11] text-[#E8DCC4] flex flex-col min-h-screen shrink-0 border-r border-[#3D2B1F] shadow-lg">
      
      {/* Logo / Brend */}
      <div className="p-5 border-b border-[#3D2B1F]">
        <h1 className="text-xl font-bold text-[#F5EFE6] tracking-wide">Allbaffy ERP</h1>
        <p className="text-xs text-[#A89F91] mt-0.5">İdarəetmə Paneli</p>
      </div>

      {/* Menyu Keçidləri */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        
        {/* Dashboard */}
        <Link
          to="/"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive('/') || isActive('/dashboard')
              ? 'bg-[#8C6239] text-white shadow-md'
              : 'hover:bg-[#3D2B1F] text-[#E8DCC4]'
          }`}
        >
          <LuLayoutDashboard className="text-lg" />
          <span>Dashboard</span>
        </Link>

        {/* Sifarişlər */}
        <Link
          to="/orders"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive('/orders')
              ? 'bg-[#8C6239] text-white shadow-md'
              : 'hover:bg-[#3D2B1F] text-[#E8DCC4]'
          }`}
        >
          <LuShoppingCart className="text-lg" />
          <span>Sifarişlər</span>
        </Link>

        {/* Stock (Alt menyulu) */}
        <div>
          <button
            onClick={() => setIsStockOpen(!isStockOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3D2B1F] text-[#E8DCC4] transition"
          >
            <div className="flex items-center gap-3">
              <LuPackage className="text-lg" />
              <span>Stock</span>
            </div>
            {isStockOpen ? <LuChevronDown className="text-sm" /> : <LuChevronRight className="text-sm" />}
          </button>

          {isStockOpen && (
            <div className="ml-6 mt-1 space-y-1 border-l-2 border-[#523A2A] pl-2">
              <Link
                to="/stock/products"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition ${
                  isActive('/stock/products') ? 'bg-[#8C6239] text-white' : 'hover:bg-[#3D2B1F] text-[#C4B7A6]'
                }`}
              >
                <LuBox />
                <span>Məhsul</span>
              </Link>

              <Link
                to="/stock/yarns"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition ${
                  isActive('/stock/yarns') ? 'bg-[#8C6239] text-white' : 'hover:bg-[#3D2B1F] text-[#C4B7A6]'
                }`}
              >
                <LuDisc />
                <span>İplər</span>
              </Link>

              <Link
                to="/stock/packaging"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition ${
                  isActive('/stock/packaging') ? 'bg-[#8C6239] text-white' : 'hover:bg-[#3D2B1F] text-[#C4B7A6]'
                }`}
              >
                <LuGift />
                <span>Paketləmə məhsulları və promo</span>
              </Link>
            </div>
          )}
        </div>

        {/* Alınan */}
        <Link
          to="/purchases"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive('/purchases')
              ? 'bg-[#8C6239] text-white shadow-md'
              : 'hover:bg-[#3D2B1F] text-[#E8DCC4]'
          }`}
        >
          <LuShoppingBag className="text-lg" />
          <span>Alınan</span>
        </Link>

        {/* Xərc */}
        <Link
          to="/expenses"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive('/expenses')
              ? 'bg-[#8C6239] text-white shadow-md'
              : 'hover:bg-[#3D2B1F] text-[#E8DCC4]'
          }`}
        >
          <LuReceipt className="text-lg" />
          <span>Xərc</span>
        </Link>

        {/* Barkod */}
        <Link
          to="/barcode"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive('/barcode')
              ? 'bg-[#8C6239] text-white shadow-md'
              : 'hover:bg-[#3D2B1F] text-[#E8DCC4]'
          }`}
        >
          <LuBarcode className="text-lg" />
          <span>Barkod</span>
        </Link>

        {/* Hesabat */}
        <Link
          to="/reports"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
            isActive('/reports')
              ? 'bg-[#8C6239] text-white shadow-md'
              : 'hover:bg-[#3D2B1F] text-[#E8DCC4]'
          }`}
        >
          <LuBarChart3 className="text-lg" />
          <span>Hesabat</span>
        </Link>

        {/* Tənzimləmələr */}
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition mt-4 ${
            isActive('/settings')
              ? 'bg-[#8C6239] text-white shadow-md'
              : 'hover:bg-[#3D2B1F] text-[#E8DCC4]'
          }`}
        >
          <LuSettings className="text-lg" />
          <span>Tənzimləmələr</span>
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;