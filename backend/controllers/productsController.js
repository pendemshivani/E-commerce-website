const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error('productsController.getAllProducts error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
