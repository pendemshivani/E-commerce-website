const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.find({}).populate('productId');
    const formatted = items.map(it => ({
      id: it._id,
      productId: it.productId._id,
      Product: { name: it.productId.name, price: it.productId.price },
      qty: it.qty
    }));
    const total = formatted.reduce((s, it) => s + (it.qty * it.Product.price), 0);
    res.json({ items: formatted, total });
  } catch (err) {
    console.error('cartController.getCart error:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty) return res.status(400).json({ error: 'productId and qty required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.qty += Number(qty);
      await existing.save();
      return res.status(200).json(existing);
    }

    const item = await CartItem.create({ productId, qty });
    res.status(201).json(item);
  } catch (err) {
    console.error('cartController.addToCart error:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.updateQty = async (req, res) => {
  try {
    const id = req.params.id;
    const { qty } = req.body;
    if (!qty || qty < 1) return res.status(400).json({ error: 'qty must be >= 1' });

    const item = await CartItem.findById(id);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    item.qty = qty;
    await item.save();
    res.json(item);
  } catch (err) {
    console.error('cartController.updateQty error:', err);
    res.status(500).json({ error: 'Failed to update qty' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await CartItem.findById(id);
    if (!found) return res.status(404).json({ error: 'Cart item not found' });
    await found.remove();
    res.json({ success: true });
  } catch (err) {
    console.error('cartController.removeItem error:', err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
};
