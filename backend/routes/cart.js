const router = require("express").Router();
const auth = require("../middleware/auth");

// In-memory cart store
const carts = {};

router.get("/", auth, (req, res) => {
  const cart = carts[req.user.id] || [];
  res.json(cart);
});

router.post("/", auth, (req, res) => {
  const { productId, name, price, image, quantity } = req.body;
  if (!carts[req.user.id]) carts[req.user.id] = [];
  const cart = carts[req.user.id];
  const idx = cart.findIndex((i) => i.productId === productId);
  if (idx > -1) {
    if (quantity === 0) cart.splice(idx, 1);
    else cart[idx].quantity = quantity;
  } else {
    cart.push({ productId, name, price, image, quantity });
  }
  res.json(cart);
});

router.delete("/", auth, (req, res) => {
  carts[req.user.id] = [];
  res.json({ message: "Cart cleared" });
});

module.exports = router;
