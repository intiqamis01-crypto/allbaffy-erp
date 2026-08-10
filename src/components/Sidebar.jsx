import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuShoppingCart, 
  LuPackage, 
  LuShoppingBag,
  LuReceipt, 
  LuBarcode, 
  LuTrendingUp, 
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

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    color: isActive(path) ? '#FFFFFF' : '#4A3525',
    backgroundColor: isActive(path) ? '#8C6239' : 'transparent',
    transition: 'all 0.2s ease',
    marginBottom: '4px'
  });

  return (
    <aside style={{ 
      width: '250px', 
      backgroundColor: '#EFE7DC', // Açıq krem / tünd bej
      color: '#4A3525', 
      minHeight: '100vh', 
      flexShrink: 0, 
      borderRight: '1px solid #D8C8B8' 
    }}>
      
      {/* Logo */}
      <div style={{ padding: '20px', borderBottom: '1px solid #D8C8B8' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#2C1D11' }}>Allbaffy ERP</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#7A624E' }}>İdarəetmə Paneli</p>
      </div>

      {/* Menyu */}
      <nav style={{ padding: '16px' }}>
        <Link to="/" style={linkStyle('/')}>
          <LuLayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link to="/orders" style={linkStyle('/orders')}>
          <LuShoppingCart size={18} />
          <span>Sifarişlər</span>
        </Link>

        {/* Stock */}
        <div>
          <button
            type="button"
            onClick={() => setIsStockOpen(!isStockOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              background: 'transparent',
              color: '#4A3525',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LuPackage size={18} />
              <span>Stock</span>
            </div>
            {isStockOpen ? <LuChevronDown size={14} /> : <LuChevronRight size={14} />}
          </button>

          {isStockOpen && (
            <div style={{ marginLeft: '20px', paddingLeft: '8px', borderLeft: '2px solid #C2B09F', marginTop: '4px' }}>
              <Link to="/stock/products" style={linkStyle('/stock/products')}>
                <LuBox size={14} />
                <span>Məhsul</span>
              </Link>
              <Link to="/stock/yarns" style={linkStyle('/stock/yarns')}>
                <LuDisc size={14} />
                <span>İplər</span>
              </Link>
              <Link to="/stock/packaging" style={linkStyle('/stock/packaging')}>
                <LuGift size={14} />
                <span>Paketləmə və promo</span>
              </Link>
            </div>
          )}
        </div>

        <Link to="/purchases" style={linkStyle('/purchases')}>
          <LuShoppingBag size={18} />
          <span>Alınan</span>
        </Link>

        <Link to="/expenses" style={linkStyle('/expenses')}>
          <LuReceipt size={18} />
          <span>Xərc</span>
        </Link>

        <Link to="/barcode" style={linkStyle('/barcode')}>
          <LuBarcode size={18} />
          <span>Barkod</span>
        </Link>

        <Link to="/reports" style={linkStyle('/reports')}>
          <LuTrendingUp size={18} />
          <span>Hesabat</span>
        </Link>

        <Link to="/settings" style={linkStyle('/settings')}>
          <LuSettings size={18} />
          <span>Tənzimləmələr</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;