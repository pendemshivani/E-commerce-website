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

  const [user, setUser] = useState(() => {
    return localStorage.getItem('mock_user') || 'demoUser';
  });

  useEffect(() => {
    fetchCount();

    const handler = () => fetchCount();
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, [user]);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('vibe-dark');
    else document.documentElement.classList.remove('vibe-dark');
    try {
      localStorage.setItem('vibe_dark_mode', dark ? 'true' : 'false');
    } catch {}
  }, [dark]);

  async function fetchCount() {
    try {
      const res = await API.get(`/cart?userId=${user}`);
      const items = (res.data && res.data.items) || [];
      const qtySum = items.reduce((s, it) => s + (it.qty || 0), 0);
      setCount(qtySum);
    } catch (err) {
      console.error('Error fetching cart count:', err);
      setCount(0);
    }
  }

  function handleUserChange(e) {
    const newUser = e.target.value;
    setUser(newUser);
    localStorage.setItem('mock_user', newUser);
    window.dispatchEvent(new Event('cartUpdated'));
  }

  return (
    <header className="header-bar">
      <div className="header-left">
        <div className="logo">
          Simply <span className="logo-bold">Shopping</span>
        </div>
        <div
          className="tag"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "#555",
            marginTop: "6px",
          }}
        >
          Where Quality Meets Affordability
        </div>
      </div>

      <div className="header-right">
        <select
          className="user-select"
          value={user}
          onChange={handleUserChange}
          title="Switch User"
        >
          <option value="demoUser">Demo User</option>
          <option value="userA">User A</option>
          <option value="userB">User B</option>
          <option value="userC">User C</option>
        </select>

        <button
          className="mode-toggle"
          onClick={() => setDark((d) => !d)}
          title="Toggle dark / light"
        >
          {dark ? '🌙' : '☀️'}
        </button>

        <div className="cart-section-header">
          <div className="cart-icon" title="Cart">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6h15l-1.5 9h-13z"></path>
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="18" cy="20" r="1"></circle>
            </svg>
            {count > 0 && <span className="cart-badge">{count}</span>}
          </div>
          <p className="user-label">Logged in as: <strong>{user}</strong></p>
        </div>
      </div>
    </header>
  );
}
