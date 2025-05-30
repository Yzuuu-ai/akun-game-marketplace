import React, { useState, useContext } from 'react';
import { AccountContext } from '../Context/AccountContext';
// ✅ HAPUS IMPORT NAVBAR
import './MarketplacePage.css';

const MarketplacePage = () => {
  const { accounts } = useContext(AccountContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(harga);
  };

  const filteredAccounts = accounts
    .filter(account => 
      account.namaGame.toLowerCase().includes(searchTerm.toLowerCase()) || 
      account.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'newest') return b.id - a.id;
      if (sortOption === 'price-high') return b.harga - a.harga;
      if (sortOption === 'price-low') return a.harga - b.harga;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ HAPUS NAVBAR DARI SINI */}
      
      <div className="marketplace-container">
        {/* Header Section */}
        <div className="marketplace-header">
          <h1>Marketplace Akun Game</h1>
          <p className="marketplace-subtitle">Temukan akun game premium dengan harga terbaik</p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Cari game atau username..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg 
                className="search-icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="sort-container">
              <label className="sort-label">Urutkan:</label>
              <select
                className="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Terbaru</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="price-low">Harga Terendah</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-header">
            <h2>{filteredAccounts.length} Akun Tersedia</h2>
          </div>
          
          {filteredAccounts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon"></div>
              <h3>Tidak ada akun yang ditemukan</h3>
              <p>Coba kata kunci lain atau periksa kembali nanti</p>
              <button 
                className="reset-search-btn"
                onClick={() => setSearchTerm('')}
              >
                Tampilkan Semua Akun
              </button>
            </div>
          ) : (
            <div className="accounts-grid">
              {filteredAccounts.map((account) => (
                <div key={account.id} className="account-card">
                  <div className="account-image">
                    <div className="image-placeholder"></div>
                  </div>
                  
                  <div className="account-content">
                    <div className="account-header">
                      <h3 className="game-name">{account.namaGame}</h3>
                      <span className="rank-badge">
                        {account.rank || 'Pro'}
                      </span>
                    </div>
                    
                    <div className="account-details">
                      <div className="account-info">
                        <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="username">@{account.username}</span>
                      </div>
                      
                      <div className="price-info">
                        <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="price">{formatHarga(account.harga)}</span>
                      </div>
                      
                      {account.deskripsi && (
                        <p className="description">
                          {account.deskripsi}
                        </p>
                      )}
                    </div>
                    
                    <button className="buy-button">
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;