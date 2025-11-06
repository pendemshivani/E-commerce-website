const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, min: 1, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('CartItem', CartItemSchema);
