import React, { useState, createContext, useContext } from 'react';

// Mock AccountContext
const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      namaGame: 'Mobile Legends',
      username: 'ProGamer123',
      harga: 500000,
      rank: 'Mythic Glory',
      deskripsi: 'Akun dengan 150+ skin hero, semua emblem max, winrate 80%+'
    },
    {
      id: 2,
      namaGame: 'PUBG Mobile',
      username: 'PUBGPro',
      harga: 750000,
      rank: 'Conqueror',
      deskripsi: 'Season 1 player, rare skins, mythic outfits'
    },
    {
      id: 3,
      namaGame: 'Free Fire',
      username: 'FFMaster',
      harga: 300000,
      rank: 'Grandmaster',
      deskripsi: 'Banyak bundle dan pet legendaris'
    }
  ]);

  const removeAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const addAccount = (account) => {
    setAccounts([...accounts, { ...account, id: Date.now() }]);
  };

  return (
    <AccountContext.Provider value={{ accounts, removeAccount, addAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

// Marketplace Dashboard Component
const MarketplaceDashboard = () => {
  const { accounts: akunList, removeAccount } = useContext(AccountContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAkun, setSelectedAkun] = useState(null);

  const getGameImage = (gameName) => {
    const gameImages = {
      'mobile legends': 'https://placehold.co/600x400/4b6584/white?text=Mobile+Legends',
      'free fire': 'https://placehold.co/600x400/cd6133/white?text=Free+Fire',
      'pubg mobile': 'https://placehold.co/600x400/3a6ea5/white?text=PUBG+Mobile',
      'genshin impact': 'https://placehold.co/600x400/1e3a5f/white?text=Genshin+Impact',
      'valorant': 'https://placehold.co/600x400/ff4655/white?text=Valorant',
      'league of legends': 'https://placehold.co/600x400/0bc4e2/white?text=LoL',
      'default': 'https://placehold.co/600x400/6c757d/white?text=Game+Account'
    };

    const lowerCaseName = gameName.toLowerCase();
    for (const [key, value] of Object.entries(gameImages)) {
      if (lowerCaseName.includes(key)) {
        return value;
      }
    }
    return gameImages.default;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleBeli = (akun) => {
    setSelectedAkun(akun);
    setShowConfirmation(true);
  };

  const confirmPurchase = () => {
    if (!selectedAkun) return;
    
    removeAccount(selectedAkun.id);
    
    alert(
      `Pembelian berhasil!\n\n` +
      `Akun ${selectedAkun.namaGame} (${selectedAkun.username}) ` +
      `seharga ${formatPrice(selectedAkun.harga)} telah dibeli.`
    );
    
    setShowConfirmation(false);
    setSelectedAkun(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Purchase Confirmation Modal */}
      {showConfirmation && selectedAkun && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Konfirmasi Pembelian</h3>
                <button 
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Apakah Anda yakin ingin membeli akun ini?
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4 overflow-hidden">
                    <img 
                      src={getGameImage(selectedAkun.namaGame)} 
                      alt={selectedAkun.namaGame} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedAkun.namaGame}</h4>
                    <p className="text-gray-600">@{selectedAkun.username}</p>
                    <p className="text-green-600 font-bold">{formatPrice(selectedAkun.harga)}</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    ⚡ Transaksi aman dengan sistem escrow dan verifikasi blockchain
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                >
                  Batal
                </button>
                <button
                  onClick={confirmPurchase}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-700 transition shadow-md"
                >
                  Konfirmasi Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🎮 Marketplace Akun Game</h1>
            <p className="text-gray-600 mt-2">
              Temukan akun game premium dengan harga terbaik
            </p>
          </div>
          
          <button
            onClick={() => console.log('Navigate to add account')}
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-all flex items-center"
          >
            <span className="mr-2">+</span>
            Jual Akun Game
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">🛡️ Akun Game Tersedia</h2>
              <p className="text-gray-600 mt-1">Transaksi aman via escrow dan blockchain verification</p>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {akunList.length} akun ditemukan
            </div>
          </div>
        </div>

        {akunList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada akun game</h3>
            <p className="text-gray-500 mb-6">
              Jadilah yang pertama menjual akun game Anda
            </p>
            <button
              onClick={() => console.log('Navigate to add account')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Jual Akun Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {akunList.map((akun) => (
              <div key={akun.id} className="bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gray-200 border-b border-gray-200 h-48 overflow-hidden">
                  <img 
                    src={getGameImage(akun.namaGame)} 
                    alt={akun.namaGame} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{akun.namaGame}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {akun.rank || 'Pro'}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">👤</span>
                      <span className="text-gray-700 font-medium">{akun.username}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-lg mr-2">💰</span>
                      <span className="text-xl font-bold text-green-600">{formatPrice(akun.harga)}</span>
                    </div>
                    
                    {akun.deskripsi && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 text-sm">
                          {akun.deskripsi.length > 80 
                            ? `${akun.deskripsi.substring(0, 80)}...` 
                            : akun.deskripsi
                          }
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleBeli(akun)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    🛒 Beli Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Seller Dashboard Component
const SellerDashboard = () => {
  const { accounts } = useContext(AccountContext);
  const walletAddress = '0x742d35Cc6B2B3b7C5a8C9b5b12345678901234567';

  const shortenAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "Not Connected";
  };

  const formatHarga = (harga) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(harga);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mock Navbar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">🎮 Game Store</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Wallet: {shortenAddress(walletAddress)}
              </span>
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">📊 Dashboard Penjual</h1>
            <p className="text-gray-600 text-sm">Kelola akun game yang Anda jual</p>
          </div>
          
          <button
            className="mt-3 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
            onClick={() => console.log('Navigate to add account')}
          >
            + Tambah Akun Game
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Akun</p>
                <p className="text-2xl font-bold text-gray-800">{accounts.length}</p>
              </div>
              <div className="text-3xl">🎮</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Nilai</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatHarga(accounts.reduce((sum, acc) => sum + acc.harga, 0))}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-semibold text-green-600">Aktif</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🎯 Akun yang Kamu Jual</h2>
          
          {accounts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada akun yang dijual</h3>
              <p className="text-gray-600 text-sm mb-6">
                Mulai jual akun game Anda untuk mendapatkan penghasilan tambahan
              </p>
              <button
                onClick={() => console.log('Navigate to add account')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Tambah Akun Pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Game</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Username</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Rank</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Harga</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 flex items-center justify-center text-white font-bold">
                            {account.namaGame.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-800">{account.namaGame}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-700">@{account.username}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          {account.rank || 'Pro'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-green-600">{formatHarga(account.harga)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          ✅ Tersedia
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const DashboardApp = () => {
  const [currentView, setCurrentView] = useState('marketplace');

  return (
    <AccountProvider>
      <div className="min-h-screen">
        {/* Navigation */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentView('marketplace')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  currentView === 'marketplace'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🛒 Marketplace
              </button>
              <button
                onClick={() => setCurrentView('seller')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  currentView === 'seller'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📊 Dashboard Penjual
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentView === 'marketplace' ? <MarketplaceDashboard /> : <SellerDashboard />}
      </div>
    </AccountProvider>
  );
};

export default DashboardApp;