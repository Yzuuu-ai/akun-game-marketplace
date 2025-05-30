import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulasi koneksi wallet
      setTimeout(() => {
        const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
        setWalletAddress(mockAddress);
        localStorage.setItem('wallet', mockAddress);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Gagal menghubungkan wallet. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">Login dengan Wallet</h1>
            <p className="text-gray-600 text-sm">Sambungkan wallet Anda untuk mengakses marketplace</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs">
              {error}
            </div>
          )}

          {walletAddress ? (
            <div className="mb-5 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-700 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Berhasil login: <span className="font-mono text-xs">{walletAddress}</span></span>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg text-sm"
              >
                Lanjut ke Dashboard
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center text-sm ${
                isLoading 
                  ? "bg-gray-400 text-gray-500 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menghubungkan...
                </>
              ) : (
                'Login dengan Wallet'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;