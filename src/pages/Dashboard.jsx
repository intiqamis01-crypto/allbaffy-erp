import React from 'react';
import { 
  LuClock, 
  LuAlertTriangle, 
  LuPencil 
} from 'react-icons/lu';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-[#f8fafc] min-h-screen">
      
      {/* Başlıq */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-xs text-slate-500 mt-1">Ümumi biznes xülasəsi, analitika və xəbərdarlıqlar</p>
      </div>

      {/* Top KPI Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">ÜMUMİ SİFARİŞLƏR</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">1 ədəd</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">GƏLİR</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">80.00 AZN</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">XƏRC</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">35.00 AZN</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">QAZANC</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">+45.00 AZN</p>
        </div>
      </div>

      {/* Xəbərdarlıq Blokları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-600 font-semibold text-sm">
            <LuClock />
            <span>Təhvilinə 1 Gün Qalan və ya Keçən Sifarişlər (0)</span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 pl-6">Təhvil tarixi yaxınlaşan təcili sifariş yoxdur.</p>
        </div>

        <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
            <LuAlertTriangle />
            <span>Stoku Azalan İplər və Materiallar (0)</span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 pl-6">Stokda kritik səviyyədə azalan xammal və ya məhsul yoxdur.</p>
        </div>
      </div>

      {/* Sifariş Statusları */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-700">Sifariş Statusları</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-amber-100/70 p-4 rounded-lg border border-amber-200/50">
            <p className="text-xs font-medium text-amber-800">Hazırlanır</p>
            <p className="text-lg font-bold text-amber-900 mt-1">1 ədəd</p>
          </div>
          <div className="bg-emerald-100/70 p-4 rounded-lg border border-emerald-200/50">
            <p className="text-xs font-medium text-emerald-800">Hazırdır</p>
            <p className="text-lg font-bold text-emerald-900 mt-1">0 ədəd</p>
          </div>
          <div className="bg-blue-100/70 p-4 rounded-lg border border-blue-200/50">
            <p className="text-xs font-medium text-blue-800">Təhvil verildi</p>
            <p className="text-lg font-bold text-blue-900 mt-1">0 ədəd</p>
          </div>
          <div className="bg-rose-100/70 p-4 rounded-lg border border-rose-200/50">
            <p className="text-xs font-medium text-rose-800">Ləğv edildi</p>
            <p className="text-lg font-bold text-rose-900 mt-1">0 ədəd</p>
          </div>
        </div>
      </div>

      {/* Son Sifarişlər Cədvəli */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-700">Son Sifarişlər</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200/80 uppercase">
                <th className="p-3 pl-4">Müştəri / Tel</th>
                <th className="p-3">Məhsul Kodu</th>
                <th className="p-3">Məhsul</th>
                <th className="p-3">Məbləğ</th>
                <th className="p-3">Sifariş / Təhvil Tarixi</th>
                <th className="p-3">
                  <div className="flex items-center gap-1">
                    Status (Hamısı) <span className="text-xs">∨</span>
                  </div>
                </th>
                <th className="p-3 text-right pr-4">Əməliyyat</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition">
                <td className="p-3 pl-4">
                  <p className="font-semibold text-slate-800">Aytac</p>
                  <p className="text-[11px] text-slate-400">070 970 09 79</p>
                </td>
                <td className="p-3 text-slate-500 font-mono">ALP-001</td>
                <td className="p-3">
                  <p className="text-slate-800">odeyal</p>
                  <p className="text-[10px] text-slate-400">183</p>
                </td>
                <td className="p-3 font-semibold text-slate-900">80.00 AZN</td>
                <td className="p-3">
                  <p><span className="text-slate-400">Sifariş:</span> 07/08/26</p>
                  <p><span className="text-slate-400">Təhvil:</span> -</p>
                </td>
                <td className="p-3">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-medium px-2 py-0.5 rounded border border-amber-200">
                    Hazırlanır
                  </span>
                </td>
                <td className="p-3 text-right pr-4">
                  <button className="inline-flex items-center gap-1 text-[11px] text-slate-600 border border-slate-200 hover:bg-slate-100 px-2 py-1 rounded transition">
                    <LuPencil className="text-xs text-amber-600" /> Düzəliş
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;