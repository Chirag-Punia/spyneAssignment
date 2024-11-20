const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    createCar,
    getCars,
    searchCars,
    getCarById,
    updateCar,
    deleteCar,
} = require("../controllers/carController");
const { upload } = require("../utils/multer");

const router = express.Router();

router.get("/", protect, getCars);

router.post("/", protect, upload.array("images", 10), createCar);

router.get("/search", protect, searchCars);

router.get("/:id", protect, getCarById);

router.put("/:id", protect, upload.array("images", 10), updateCar);

router.delete("/:id", protect, deleteCar);

module.exports = router;
