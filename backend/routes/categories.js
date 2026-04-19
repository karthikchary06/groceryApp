const router = require("express").Router();

const categories = [
  { id: "1", name: "Paan Corner", slug: "paan", emoji: "🌿", color: "#4CAF50" },
  {
    id: "2",
    name: "Dairy, Bread & Eggs",
    slug: "dairy",
    emoji: "🥛",
    color: "#2196F3",
  },
  {
    id: "3",
    name: "Fruits & Vegetables",
    slug: "fruits",
    emoji: "🥦",
    color: "#8BC34A",
  },
  {
    id: "4",
    name: "Cold Drinks & Juices",
    slug: "drinks",
    emoji: "🥤",
    color: "#F44336",
  },
  {
    id: "5",
    name: "Snacks & Munchies",
    slug: "snacks",
    emoji: "🍿",
    color: "#FF9800",
  },
  {
    id: "6",
    name: "Breakfast & Instant Food",
    slug: "breakfast",
    emoji: "🥣",
    color: "#9C27B0",
  },
  {
    id: "7",
    name: "Sweet Tooth",
    slug: "sweets",
    emoji: "🍫",
    color: "#795548",
  },
  {
    id: "8",
    name: "Bakery & Biscuits",
    slug: "bakery",
    emoji: "🍪",
    color: "#FF5722",
  },
  {
    id: "9",
    name: "Tea, Coffee & Beverages",
    slug: "beverages",
    emoji: "☕",
    color: "#607D8B",
  },
  {
    id: "10",
    name: "Atta, Rice & Dal",
    slug: "staples",
    emoji: "🌾",
    color: "#FFC107",
  },
];

router.get("/", (req, res) => res.json(categories));

module.exports = router;
