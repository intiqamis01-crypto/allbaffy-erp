import React, { useState } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Products() {
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Zəhmət olmasa şəkil seçin!");
      return;
    }

    setLoading(true);

    try {
      // 1. Şəkli Cloudinary-yə yükləyirik
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "allbaffy_preset");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/alg7d6lb/image/upload",
        formData
      );
      
      const imageUrl = response.data.secure_url;

      // 2. Məlumatları və şəklin linkini Firebase Firestore bazasına yazırıq
      await addDoc(collection(db, "products"), {
        product: productName,
        amount: Number(amount),
        imageURL: imageUrl,
        createdAt: new Date()
      });

      alert("Məhsul və şəkil uğurla əlavə olundu!");
      
      // Formanı təmizləyirik
      setProductName('');
      setAmount('');
      setImageFile(null);

    } catch (error) {
      console.error("Xəta baş verdi:", error);
      alert("Şəkil yüklənərkən xəta oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', color: '#333' }}>
      <h2>Yeni Məhsul Əlavə Et</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '15px', marginTop: '20px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Məhsulun adı:</label>
          <input 
            type="text" 
            value={productName}
            placeholder="Məsələn: Alize Puffy adyal" 
            onChange={(e) => setProductName(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Qiymət (rasxod/məbləğ):</label>
          <input 
            type="number" 
            value={amount}
            placeholder="Qiymət daxil edin" 
            onChange={(e) => setAmount(e.target.value)} 
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Məhsulun şəkli:</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])} 
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px', backgroundColor: '#5c4033', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? "Yüklənir..." : "Yadda saxla"}
        </button>

      </form>
    </div>
  );
}