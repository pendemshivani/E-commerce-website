import { useEffect, useState } from 'react';
import API from '../api/api';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/products');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to fetch products', err);
      alert('Failed to load products. Check backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  if (loading) {
    // skeleton placeholders
    return (
      <div>
        <h2 style={{ marginBottom: 12 }}>Products</h2>
        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Search products..."
            value={q}
            onChange={e => setQ(e.target.value)}
            className="input"
            style={{ width: '100%', maxWidth: 420 }}
            disabled
          />
        </div>
        <div className="product-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="card" key={i}>
              <div style={{ height: 140 }} className="skeleton" />
              <div style={{ height: 16, marginTop: 10 }} className="skeleton" />
              <div style={{ height: 14, marginTop: 8, width: '40%' }} className="skeleton" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>Products</h2>

      <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          placeholder="Search products..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="input"
          style={{ width: '100%', maxWidth: 420 }}
        />
        <button className="btn btn-ghost" onClick={() => { setQ(''); }}>
          Clear
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No products found</div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <ProductCard key={p._id} product={p} onView={setSelected} />
          ))}
        </div>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
