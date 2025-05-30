import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ✅ HAPUS IMPORT NAVBAR
import './AddAccountPage.css';

const AddAccountPage = () => {
  const navigate = useNavigate();
  const [namaGame, setNamaGame] = useState('');
  const [username, setUsername] = useState('');
  const [harga, setHarga] = useState('');
  const [rank, setRank] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simpan data
    const newAccount = {
      namaGame,
      username,
      harga: Number(harga),
      rank,
      deskripsi
    };
    
    console.log('New account:', newAccount);
    
    // Simulasi API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };

  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, '');
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const handleHargaChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setHarga(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ HAPUS NAVBAR DARI SINI */}
      
      <div className="add-account-container">
        <div className="add-account-card">
          <div className="add-account-header">
            <div className="header-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h1>Tambah Akun Game</h1>
            <p>Isi detail akun game yang ingin dijual dengan lengkap</p>
          </div>
          
          <form onSubmit={handleSubmit} className="add-account-form">
            <div className="form-section">
              <h3 className="section-title">Informasi Game</h3>
              
              <div className="form-group">
                <label className="form-label">
                  <span>Nama Game</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Mobile Legends, PUBG Mobile, Free Fire"
                  className="form-input"
                  value={namaGame}
                  onChange={(e) => setNamaGame(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <span>Username Akun</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Username atau ID game Anda"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Detail Akun</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span>Rank/Level</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Mythic, Grandmaster, Conqueror, etc."
                    className="form-input"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <span>Harga</span>
                    <span className="required">*</span>
                  </label>
                  <div className="price-input-wrapper">
                    <span className="price-prefix">Rp</span>
                    <input
                      type="text"
                      placeholder="0"
                      className="form-input price-input"
                      value={harga ? formatCurrency(harga) : ''}
                      onChange={handleHargaChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Deskripsi Tambahan</h3>
              
              <div className="form-group">
                <label className="form-label">
                  <span>Deskripsi Akun</span>
                  <span className="optional">(Opsional)</span>
                </label>
                <textarea
                  placeholder="Deskripsikan akun Anda: skin yang dimiliki, hero/karakter, achievement, dll."
                  className="form-textarea"
                  rows={4}
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
                <div className="character-count">
                  {deskripsi.length}/500 karakter
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary ${isSubmitting ? 'loading' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Simpan Akun
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccountPage;