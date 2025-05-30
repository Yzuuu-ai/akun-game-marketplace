import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AccountContext } from '../Context/AccountContext';

const Dashboard = () => {
  const { accounts: akunList, removeAccount } = useContext(AccountContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAkun, setSelectedAkun] = useState(null);

  // Function to get placeholder image based on game name
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

  // Format price to IDR currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Handle purchase action
  const handleBeli = (akun) => {
    setSelectedAkun(akun);
    setShowConfirmation(true);
  };

  // Confirm purchase
  const confirmPurchase = () => {
    if (!selectedAkun) return;
    
    // Remove purchased account using context
    removeAccount(selectedAkun.id);
    
    // Show success message
    alert(
      `Pembelian berhasil!\n\n` +
      `Akun ${selectedAkun.namaGame} (${selectedAkun.username}) ` +
      `seharga ${formatPrice(selectedAkun.harga)} telah dibeli.`
    );
    
    // Reset state
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
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Apakah Anda yakin ingin membeli akun ini?
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4">
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
                    Transaksi akan dilakukan secara aman menggunakan rekening bersama (rekber) 
                    dan akan diverifikasi melalui blockchain Ethereum.
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
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Marketplace Akun Game</h1>
            <p className="text-gray-600 mt-2">
              Temukan akun game premium dengan harga terbaik
            </p>
          </div>
          
          <Link
            to="/tambah"
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-teal-700 transition-all flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Jual Akun Game
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Akun Game Tersedia</h2>
              <p className="text-gray-600 mt-1">Transaksi aman via rekber dan blockchain Ethereum</p>
            </div>
            <div className="text-sm text-gray-500">
              {akunList.length} akun ditemukan
            </div>
          </div>
        </div>

        {akunList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada akun game</h3>
            <p className="text-gray-500 mb-6">
              Jadilah yang pertama menjual akun game Anda
            </p>
            <Link
              to="/tambah"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Jual Akun Pertama
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {akunList.map((akun) => (
              <div key={akun.id} className="bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gray-200 border-b border-gray-200 h-48 overflow-hidden">
                  <img 
                    src={getGameImage(akun.namaGame)} 
                    alt={akun.namaGame} 
                    className="w-full h-full object-cover"
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700">{akun.username}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xl font-bold text-green-600">{formatPrice(akun.harga)}</span>
                    </div>
                    
                    {akun.deskripsi && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {akun.deskripsi}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleBeli(akun)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Beli Sekarang
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

export default Dashboard;