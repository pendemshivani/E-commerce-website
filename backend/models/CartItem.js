const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, default: 'demoUser' }, // 👈 mock user persistence
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
