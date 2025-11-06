import { useEffect, useState } from 'react';
import API from '../api/api';
import CheckoutForm from './CheckoutForm';

export default function CartView() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await API.get('/cart');
      setCart(res.data || { items: [], total: 0 });
    } catch (err) {
      console.error('Failed to fetch cart', err);
      alert('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    const handler = () => fetchCart();
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, []);

  const removeItem = async (id) => {
    if (!window.confirm('Remove this item from cart?')) return;
    try {
      await API.delete(`/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error(err);
      alert('Failed to remove item');
    }
  };

  const updateQty = async (id, qty) => {
    if (qty < 1) return;
    try {
      await API.patch(`/cart/${id}`, { qty });
      fetchCart();
    } catch (err) {
      console.error(err);
      alert('Failed to update quantity');
    }
  };

  return (
    <div>
      <h2 style={{marginBottom:8}}>Cart</h2>
      {loading ? <div className="small">Loading cart…</div> : (
        <>
          {cart.items.length === 0 ? (
            <div className="empty">Cart is empty</div>
          ) : (
            <div>
              {cart.items.map(it => (
                <div className="cart-item" key={it.id}>
                  <div className="meta">
                    <div style={{fontWeight:700}}>{it.Product.name}</div>
                    <div className="small">₹{it.Product.price} each</div>
                  </div>

                  <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6}}>
                    <input
                      className="qty-input"
                      type="number"
                      min="1"
                      value={it.qty}
                      onChange={(e) => updateQty(it.id, Number(e.target.value))}
                    />
                    <button className="btn btn-ghost" onClick={() => removeItem(it.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="total-row">
                <div className="small">TOTAL</div>
                <div>₹{cart.total}</div>
              </div>
              <div style={{marginTop:12}}>
                <button className="btn btn-primary" onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </>
      )}

      {showCheckout && (
        <CheckoutForm cart={cart} onClose={() => { setShowCheckout(false); window.dispatchEvent(new Event('cartUpdated')); }} />
      )}
    </div>
  );
}
