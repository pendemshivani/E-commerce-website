const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /api/cart
router.get('/', cartController.getCart);

// POST /api/cart -> { productId, qty }
router.post('/', cartController.addToCart);

// PATCH /api/cart/:id -> update qty
router.patch('/:id', cartController.updateQty);

// DELETE /api/cart/:id
router.delete('/:id', cartController.removeItem);

module.exports = router;
