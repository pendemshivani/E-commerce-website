// src/components/Header.js
import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Header() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('vibe_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    fetchCount();
    const handler = () => fetchCount();
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('vibe-dark');
    else document.documentElement.classList.remove('vibe-dark');
    try {
      localStorage.setItem('vibe_dark_mode', dark ? 'true' : 'false');
    } catch {}
  }, [dark]);

  async function fetchCount() {
    try {
      const res = await API.get('/cart');
      const items = (res.data && res.data.items) || [];
      const qtySum = items.reduce((s, it) => s + (it.qty || 0), 0);
      setCount(qtySum);
    } catch {
      setCount(0);
    }
  }

  return (
    <header className="header-bar">
      <div className="header-left">
        <h1 className="logo">
          Simply <span className="logo-bold">Shopping</span>
        </h1>
        <p className="tagline">Where Quality Meets Affordability</p>
      </div>

      <div className="header-right">
        <button
          className="mode-toggle"
          onClick={() => setDark((d) => !d)}
          title="Toggle dark / light mode"
        >
          {dark ? '🌙' : '☀️'}
        </button>

        <div className="cart-container" title="Cart">
          <div className="cart-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6h15l-1.5 9h-13z"></path>
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="18" cy="20" r="1"></circle>
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </div>
          <span className="cart-label">Cart</span>
        </div>
      </div>
    </header>
  );
}
