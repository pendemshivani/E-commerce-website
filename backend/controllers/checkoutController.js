const CartItem = require('../models/CartItem');
const Order = require('../models/Order');

exports.checkout = async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    let items = cartItems;
    if (!items || !Array.isArray(items) || items.length === 0) {
      // fallback to DB cart
      const dbItems = await CartItem.find({}).populate('productId');
      items = dbItems.map(it => ({
        id: it._id,
        productId: it.productId._id,
        name: it.productId.name,
        price: it.productId.price,
        qty: it.qty
      }));
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const total = items.reduce((s, it) => s + (it.qty * it.price), 0);
    const timestamp = new Date().toISOString();

    const order = await Order.create({
      customerName: name || 'Guest',
      customerEmail: email || null,
      total,
      receipt: { items, total, timestamp }
    });

    // clear cart
    await CartItem.deleteMany({});

    res.json({ orderId: order._id, total, timestamp, items });
  } catch (err) {
    console.error('checkoutController.checkout error:', err);
    res.status(500).json({ error: 'Checkout failed' });
  }
};
