const express = require("express");
const router = express.Router();
const isAdmin = require("./middleware/auth");

const {
  getProducts,
  uploadProduct,
  updateProduct,
  addReview,
  deleteProduct,
} = require("./routes/products");
const { getSettings, updateSettings } = require("./routes/settings");
const {
  getCategories,
  uploadCategory,
  updateCategory,
  deleteCategory,
} = require("./routes/categories");
const { uploadOrder, getOrders } = require("./routes/orders");
const { paymentRequest, paymentStatus } = require("./routes/payments");

// Products
router.get("/products", getProducts);
router.post("/products/upload", isAdmin, uploadProduct);
router.put("/products/update", isAdmin, updateProduct);
router.put("/products/review", addReview);
router.delete("/products/delete", isAdmin, deleteProduct);

// Categories
router.get("/categories", getCategories);
router.post("/categories/upload", isAdmin, uploadCategory);
router.put("/categories/update", isAdmin, updateCategory);
router.delete("/categories/delete", isAdmin, deleteCategory);

// Payments
router.post("/payments", paymentRequest);
router.post("/payments/status", paymentStatus);

// Orders
router.get("/orders", getOrders);
router.post("/orders/upload", uploadOrder);

// Settings
router.get("/settings", getSettings);
router.put("/settings/update", isAdmin, updateSettings);

module.exports = router;
