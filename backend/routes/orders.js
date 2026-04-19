const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Place new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, address } = req.body;
    
    const order = new Order({
      userId: req.user.id,
      items,
      total,
      address: address || "169, Devamma Basthi, Jagathgirigutta, Hyderabad, Telangana 500004",
      status: 'delivered',
      deliveredIn: Math.floor(Math.random() * 5) + 8 + " mins"
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
