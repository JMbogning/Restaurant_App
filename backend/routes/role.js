const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createRole,
    getRoles
    
} = require("../controllers/role");

// VALIDATORS
const { roleCreateValidator } = require("../validators/role");
const { runValidation } = require("../validators");

//ROUTES
router
    .route("/")
    .get(getRoles)
    .post(roleCreateValidator, runValidation, createRole);

module.exports = router;