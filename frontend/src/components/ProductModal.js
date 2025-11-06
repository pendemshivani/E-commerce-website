
export default function ProductModal({ product, onClose }) {
  const placeholder = 'https://via.placeholder.com/900x600.png?text=Vibe+Product';
  const imgSrc = product.imageUrl && product.imageUrl.startsWith('http') ? product.imageUrl : (product.imageUrl || placeholder);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <img
              src={imgSrc}
              alt={product.name}
              style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 8 }}
              onError={(e) => { e.target.onerror = null; e.target.src = placeholder; }}
            />
          </div>
          <div style={{ width: 360 }}>
            <h2>{product.name}</h2>
            <p className="small" style={{ marginTop: 8 }}>{product.description}</p>
            <h3 style={{ marginTop: 12 }}>₹{product.price}</h3>

            <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={() => {
                // add to cart from modal
                fetch('/api/cart', { method: 'POST' }).catch(()=>{});
                window.dispatchEvent(new Event('cartUpdated'));
                onClose();
              }}>
                Add to Cart
              </button>
              <button className="btn btn-ghost" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
