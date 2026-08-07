import React, { useState } from 'react';

const DataImport = ({ onDataImported }) => {
  const [jsonInput, setJsonInput] = useState('');

  const handleImport = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      // Qəbul edilən məlumatları (məhsullar, sifarişlər) sistemə ötürürük
      onDataImported(parsedData);
      alert('Məlumatlar uğurla ERP-yə köçürüldü!');
    } catch (error) {
      alert('Format düzgün deyil. Xahiş olunur JSON formatını yoxlayın.');
    }
  };

  return (
    <div className="p-6 bg-[#3a2e2b] text-[#f5f0eb] rounded-xl shadow-lg border border-[#5a4742]">
      <h2 className="text-xl font-bold mb-4 text-[#e8dacb]">
        Saytdan Məlumatların Göçürülməsi (Import)
      </h2>
      <p className="text-sm mb-4 text-[#d0c0b0]">
        Saytınızdan çıxarılan JSON formatındakı məhsul və ya sifariş məlumatlarını aşağıdakı xanaya yapışdırın:
      </p>
      
      <textarea
        rows={8}
        className="w-full p-3 bg-[#2a211e] border border-[#5a4742] rounded-lg text-sm text-[#f5f0eb] focus:outline-none focus:border-[#c4a482] mb-4 font-mono"
        placeholder='[{"id": 1, "name": "Alize Puffy Odeyal", "price": 45, "category": "Odeyal"}, ...]'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <button
        onClick={handleImport}
        className="px-6 py-2.5 bg-[#5a4742] hover:bg-[#6e5852] text-[#f5f0eb] font-semibold rounded-lg transition-colors border border-[#7a625b]"
      >
        Məlumatları ERP-yə Əlavə Et
      </button>
    </div>
  );
};

export default DataImport;