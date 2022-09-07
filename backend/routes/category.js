const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getAllCategories,
} = require("../controllers/category");

// VALIDATORS
const { categoryCreateValidator } = require("../validators/category");
const { runValidation } = require("../validators");

//ROUTES
router
    .route("/")
    .get(getCategories)
    .post(categoryCreateValidator, runValidation, createCategory);

router
    .route("/:id")
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;