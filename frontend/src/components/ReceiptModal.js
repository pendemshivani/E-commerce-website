// src/components/ReceiptModal.js
import { useEffect } from 'react';

export default function ReceiptModal({ data, onClose }) {
  useEffect(() => {
    // optional auto close timer
  }, []);

  const items = data.items || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{ width: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="checkmark-wrap">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark-check" fill="none" d="M14 27l7 7 17-17" />
              </svg>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: 6 }}>Thank you — your order is confirmed!</h2>
            <div className="small">Order ID: <strong>{data.orderId}</strong></div>
            <div className="small" style={{ marginTop: 6 }}>Time: <strong>{data.timestamp}</strong></div>

            <div style={{ marginTop: 14 }}>
              <h4 style={{ marginBottom: 8 }}>Items</h4>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                {items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '6px 0' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600 }}>{it.name}</div>
                      <div className="small">Qty: {it.qty}</div>
                    </div>
                    <div style={{ fontWeight: 700 }}>₹{it.price * it.qty}</div>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 12,
                borderTop: '1px dashed var(--border)',
                paddingTop: 10
              }}>
                <div className="small">Total</div>
                <div style={{ fontWeight: 800 }}>₹{data.total}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
              <button className="btn btn-primary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
