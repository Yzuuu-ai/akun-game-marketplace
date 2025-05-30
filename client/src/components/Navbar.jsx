import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const walletAddress = localStorage.getItem('wallet');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (location.pathname === '/login') return null;

  const shortenAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "Not Connected";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <span>GM</span>
            </div>
            <span className="logo-text">GameMarket</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/tambah-akun" 
            className={`nav-link ${location.pathname === '/tambah-akun' ? 'active' : ''}`}
          >
            Tambah Akun
          </Link>
          <Link 
            to="/marketplace" 
            className={`nav-link ${location.pathname === '/marketplace' ? 'active' : ''}`}
          >
            Marketplace
          </Link>
        </div>

        {/* User Profile & Mobile Toggle */}
        <div className="navbar-right">
          <div className="user-profile">
            <span className="wallet-address">
              {shortenAddress(walletAddress)}
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <Link 
            to="/dashboard" 
            className={`mobile-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/tambah-akun" 
            className={`mobile-nav-link ${location.pathname === '/tambah-akun' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Tambah Akun
          </Link>
          <Link 
            to="/marketplace" 
            className={`mobile-nav-link ${location.pathname === '/marketplace' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Marketplace
          </Link>
          <div className="mobile-wallet">
            <span className="mobile-wallet-text">Wallet:</span>
            <span className="mobile-wallet-address">
              {shortenAddress(walletAddress)}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;