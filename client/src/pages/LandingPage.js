import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    setIsLoading(true);
    setError("");
    
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);

        // Simpan ke localStorage
        localStorage.setItem("wallet", accounts[0]);

        // Pindah ke dashboard setelah delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } catch (error) {
        console.error("Gagal login:", error);
        setError("Gagal menghubungkan ke MetaMask. Pastikan Anda menyetujui permintaan koneksi.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("MetaMask tidak ditemukan. Silakan install ekstensi MetaMask terlebih dahulu.");
      setIsLoading(false);
    }
  };

  const connectWalletDemo = async () => {
    setIsLoading(true);
    setError("");
    
    // Demo mode untuk development
    setTimeout(() => {
      const mockAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
      setWalletAddress(mockAddress);
      localStorage.setItem("wallet", mockAddress);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="landing-page">
      <div className="landing-background">
        <div className="bg-animation">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
        </div>
      </div>
      
      <div className="landing-container">
        <div className="landing-card">
          <div className="card-glow"></div>
          
          <div className="landing-content">
            <div className="landing-header">
              <div className="logo-container">
                <div className="logo-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                </div>
                <div className="logo-pulse"></div>
              </div>
              
              <h1 className="landing-title">GameMarket</h1>
              <h2 className="landing-subtitle">Web3 Gaming Marketplace</h2>
              <p className="landing-description">
                Sambungkan dompet Ethereum Anda untuk mengakses marketplace gaming terdepan
              </p>
            </div>

            {error && (
              <div className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {walletAddress ? (
              <div className="success-section">
                <div className="success-message">
                  <div className="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="success-content">
                    <h3>Berhasil Terhubung!</h3>
                    <p>Wallet: <span className="wallet-address">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span></p>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-continue"
                >
                  <span>Lanjut ke Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="connect-section">
                <button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className={`btn-connect ${isLoading ? 'loading' : ''}`}
                >
                  <div className="btn-content">
                    {isLoading ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>Menghubungkan...</span>
                      </>
                    ) : (
                      <>
                        <div className="metamask-icon">
                          <svg viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.0112 1.33337L21.2916 12.1945L24.0036 5.48016L36.0112 1.33337Z" fill="#E17726"/>
                            <path d="M4.00439 1.33337L18.5935 12.2847L15.9964 5.48016L4.00439 1.33337Z" fill="#E27625"/>
                            <path d="M30.6724 26.9509L26.6321 33.2588L35.1807 35.4979L37.5235 27.1012L30.6724 26.9509Z" fill="#E27625"/>
                            <path d="M2.49194 27.1012L4.81989 35.4979L13.3685 33.2588L9.32816 26.9509L2.49194 27.1012Z" fill="#E27625"/>
                          </svg>
                        </div>
                        <span>Login dengan MetaMask</span>
                      </>
                    )}
                  </div>
                </button>
                
                <div className="connect-divider">
                  <span>atau</span>
                </div>
                
                <button
                  onClick={connectWalletDemo}
                  disabled={isLoading}
                  className="btn-demo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Mode Demo</span>
                </button>
              </div>
            )}

            <div className="landing-footer">
              <p>Belum memiliki MetaMask?</p>
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-link"
              >
                Download MetaMask
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;