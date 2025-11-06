import { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../api/api';

export default function ProductCard({ product, onView }) {
  const [adding, setAdding] = useState(false);
  // reliable placeholder (HTTPS)
  const placeholder = 'https://via.placeholder.com/600x400.png?text=Vibe+Product';
  const imgSrc = product.imageUrl && product.imageUrl.startsWith('http') ? product.imageUrl : (product.imageUrl || placeholder);

  const addToCart = async () => {
    try {
      setAdding(true);
      await API.post('/cart', { productId: product._id, qty: 1 });
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Added to cart');
    } catch (err) {
      console.error('Add to cart failed', err);
      toast.error('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="card">
      <div style={{
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 8
      }}>
        <img
          src={imgSrc}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
        />
      </div>

      <h3 style={{ marginTop: 10 }}>{product.name}</h3>
      <div className="small" style={{ marginTop: 6, minHeight: 36 }}>{product.description}</div>
      <div className="price" style={{ marginTop: 8 }}>₹{product.price}</div>
      <div className="actions">
        <button className="btn btn-primary" onClick={addToCart} disabled={adding}>
          {adding ? 'Adding…' : 'Add to Cart'}
        </button>
        <button className="btn btn-ghost" onClick={() => onView(product)}>
          View
        </button>
      </div>
    </div>
  );
}
