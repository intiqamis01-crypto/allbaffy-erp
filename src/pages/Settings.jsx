import React, { useState } from 'react';
import { 
  getAuth, 
  updateProfile, 
  updatePassword, 
  EmailAuthProvider, 
  reauthenticateWithCredential 
} from 'firebase/auth';

export default function Settings() {
  const auth = getAuth();
  const user = auth.currentUser;

  // Form state-ləri
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // Şifrə dəyişmə state-ləri
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status mesajları
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Profil məlumatlarını yeniləmə (Ad)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await updateProfile(user, { displayName });
      setMessage('Profil məlumatları uğurla yeniləndi!');
    } catch (err) {
      setError('Xəta baş verdi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Şifrəni yeniləmə (Firebase təhlükəsizlik qaydasına görə əvvəlcə təkrar autentifikasiya tələb olunur)
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Yeni şifrələr eyni deyil!');
      return;
    }

    if (newPassword.length < 6) {
      setError('Şifrə ən azı 6 simvoldan ibarət olmalıdır!');
      return;
    }

    setLoading(true);

    try {
      // İstifadəçinin yenidən daxil olmasını yoxlamaq üçün credential yaradırıq
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Şifrəni yeniləyirik
      await updatePassword(user, newPassword);
      setMessage('Şifrə uğurla dəyişdirildi!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Cari şifrə yanlışdır və ya xəta baş verdi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-stone-200">
      <h2 className="text-xl font-bold text-stone-800 mb-6">İstifadəçi Tənzimləmələri</h2>

      {/* Bildirişlər */}
      {message && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Profil Məlumatları Formu */}
      <form onSubmit={handleUpdateProfile} className="mb-8 pb-8 border-b border-stone-100">
        <h3 className="text-md font-semibold text-stone-700 mb-4">Profil Məlumatları</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-600 mb-1">Ad və Soyad</label>
          <input 
            type="text" 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 text-stone-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-600 mb-1">Email Ünvanı</label>
          <input 
            type="email" 
            value={email} 
            disabled
            className="w-full px-3 py-2 border border-stone-200 bg-stone-50 rounded-lg text-stone-500 cursor-not-allowed"
          />
          <span className="text-xs text-stone-400 mt-1 block">Email ünvanı dəyişdirilə bilməz.</span>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition text-sm font-medium"
        >
          {loading ? 'Yenilənir...' : 'Yadda Saxla'}
        </button>
      </form>

      {/* Şifrə Dəyişmə Formu */}
      <form onSubmit={handleUpdatePassword}>
        <h3 className="text-md font-semibold text-stone-700 mb-4">Şifrəni Dəyişdir</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-600 mb-1">Cari Şifrə</label>
          <input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 text-stone-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-600 mb-1">Yeni Şifrə</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 text-stone-800"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-600 mb-1">Yeni Şifrə (Təkrar)</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 text-stone-800"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition text-sm font-medium"
        >
          {loading ? 'Yenilənir...' : 'Şifrəni Yenilə'}
        </button>
      </form>
    </div>
  );
}