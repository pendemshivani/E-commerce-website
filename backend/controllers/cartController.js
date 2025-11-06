// backend/controllers/cartController.js
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.query.userId || 'demoUser'; // mock user persistence
    const items = await CartItem.find({ userId }).populate('productId');

    const formatted = items.map(it => ({
      id: it._id,
      productId: it.productId._id,
      Product: {
        name: it.productId.name,
        price: it.productId.price,
        imageUrl: it.productId.imageUrl
      },
      qty: it.qty
    }));

    const total = formatted.reduce((sum, it) => sum + it.qty * it.Product.price, 0);
    res.json({ items: formatted, total });
  } catch (err) {
    console.error('cartController.getCart error:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, qty, userId = 'demoUser' } = req.body;
    if (!productId || !qty) {
      return res.status(400).json({ error: 'productId and qty required' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let existing = await CartItem.findOne({ productId, userId });
    if (existing) {
      existing.qty += Number(qty);
      await existing.save();
      return res.status(200).json(existing);
    }

    const item = await CartItem.create({ productId, qty, userId });
    res.status(201).json(item);
  } catch (err) {
    console.error('cartController.addToCart error:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

// PATCH /api/cart/:id -> update quantity
exports.updateQty = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    if (!qty || qty < 1) return res.status(400).json({ error: 'qty must be >= 1' });

    const item = await CartItem.findById(id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    item.qty = qty;
    await item.save();
    res.json(item);
  } catch (err) {
    console.error('cartController.updateQty error:', err);
    res.status(500).json({ error: 'Failed to update quantity' });
  }
};

// DELETE /api/cart/:id -> remove item
exports.removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await CartItem.findById(id);
    if (!found) return res.status(404).json({ error: 'Cart item not found' });

    await found.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error('cartController.removeItem error:', err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
};
