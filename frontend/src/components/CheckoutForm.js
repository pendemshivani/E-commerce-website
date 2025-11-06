import { useState } from 'react';
import API from '../api/api';
import ReceiptModal from './ReceiptModal';

export default function CheckoutForm({ cart, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (cart.items.length === 0) {
      alert('Cart is empty');
      return;
    }
    try {
      setSubmitting(true);
      // map items to backend expected shape (include price & qty)
      const items = cart.items.map(it => ({
        id: it.id,
        productId: it.productId,
        name: it.Product.name,
        price: it.Product.price,
        qty: it.qty
      }));
      const res = await API.post('/checkout', { cartItems: items, name, email });
      setReceipt(res.data);
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    return <ReceiptModal data={receipt} onClose={onClose} />;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Checkout</h3>
        <form onSubmit={submit}>
          <div className="form-row">
            <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div style={{marginTop:12, display:'flex', gap:8}}>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? 'Processing…' : `Pay ₹${cart.total}`}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
