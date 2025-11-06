// backend/seed/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI;

const products = [
  // --- Existing ---
  { name: 'Vibe T-Shirt', price: 399, imageUrl: 'https://img.freepik.com/premium-photo/soft-cotton-t-shirt-mockup-white-unisex_816702-1172.jpg', description: 'Soft cotton unisex T-shirt — everyday comfort.' },
  { name: 'Vibe Hoodie', price: 999, imageUrl: 'https://i.pinimg.com/originals/93/d6/5f/93d65f17d90173310ea6a75c47ad9e44.png', description: 'Warm fleece hoodie with embroidered logo.' },
  { name: 'Wireless Earbuds', price: 1499, imageUrl: 'https://www.soundmaxpro.com/wp-content/uploads/2025/07/Earbuds-with-the-Longest-Battery-Life-You-Can-Buy-in-India-in-2025.jpg', description: 'Noise-canceling earbuds with long battery life.' },
  { name: 'Vibe Mug', price: 249, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.sBbyw-uzTX-IMEaT84tqIAHaHa?pid=Api&P=0&h=180', description: 'Matte ceramic mug — perfect for your morning brew.' },
  { name: 'Notebook', price: 199, imageUrl: 'https://m.media-amazon.com/images/I/71u5-wVIYuL._AC_.jpg', description: 'A5 ruled notebook with 120 pages.' },
  { name: 'Phone Stand', price: 299, imageUrl: 'https://m.media-amazon.com/images/I/71rvgPqT-ZL.jpg', description: 'Adjustable aluminum desk stand for phones.' },
  { name: 'Sticker Pack', price: 99, imageUrl: 'https://down-ph.img.susercontent.com/file/id-11134207-7r98t-lzta451vc0g516', description: 'Pack of 12 waterproof aesthetic stickers.' },
  { name: 'Laptop Sleeve', price: 699, imageUrl: 'https://m.media-amazon.com/images/I/71eknZxZLmL._SL1500_.jpg', description: 'Neoprene sleeve fits 13–15″ laptops.' },


  { name: 'Smart Watch', price: 2499, imageUrl: 'https://m.media-amazon.com/images/I/71AcGKTe9+L._AC_SL1500_.jpg', description: 'Stylish smartwatch with health tracking and notifications.' },
  { name: 'Bluetooth Speaker', price: 1099, imageUrl: 'https://m.media-amazon.com/images/I/71FmnOl0aOL._AC_.jpg', description: 'Portable Bluetooth speaker with deep bass and 10h battery.' },
  { name: 'Wireless Keyboard', price: 899, imageUrl: 'https://microless.com/cdn/products/d7a990107e6b79562d4dc21338e8b1ea-hi.jpg', description: 'Slim wireless keyboard with silent keys and fast response.' },
  { name: 'Gaming Mouse', price: 599, imageUrl: 'https://m.media-amazon.com/images/I/61eafpAWRQL.jpg', description: 'RGB gaming mouse with adjustable DPI and ergonomic grip.' },
  { name: 'Power Bank', price: 1299, imageUrl: 'https://m.media-amazon.com/images/I/71Q073fzxtL._AC_.jpg', description: '10000mAh fast-charging portable power bank.' },
  { name: 'Wireless Charger', price: 799, imageUrl: 'https://m.media-amazon.com/images/I/61k2xgSvpDL._AC_.jpg', description: 'Fast Qi wireless charger pad — supports all smartphones.' },
  { name: 'Travel Backpack', price: 1499, imageUrl: 'https://m.media-amazon.com/images/I/71BxL+ucnzL._AC_.jpg', description: 'Water-resistant travel backpack with laptop compartment.' },
  { name: 'Desk Lamp', price: 599, imageUrl: 'https://m.media-amazon.com/images/I/51s3Gmu62TL._AC_SL1200_.jpg', description: 'LED desk lamp with adjustable brightness and touch control.' }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Inserted products:', products.length);
    await mongoose.disconnect();
    console.log('Seeding completed and disconnected');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
