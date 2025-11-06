const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: '' },    // new: product image
  description: { type: String, default: '' }  // new: short description
}, { timestamps: false });

module.exports = mongoose.model('Product', ProductSchema);
