const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String },
  customerEmail: { type: String },
  total: { type: Number },
  receipt: { type: Object } // snapshot of items, total, timestamp
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
