const Car = require("../models/Car");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
dotenv.config({ path: './.env.local' });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }

        // Upload each image to Cloudinary
        const uploadPromises = req.files.map((file) =>
            cloudinary.uploader.upload(file.path, { folder: "cars" })
        );
        const uploadResults = await Promise.all(uploadPromises);

        const imageUrls = uploadResults.map((result) => result.secure_url);

        const car = await Car.create({
            title,
            description,
            tags: tags ? tags.split(",") : [],
            images: imageUrls, // Save array of image URLs
            user: req.headers.userId,
        });

        res.status(201).json(car);
    } catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({ message: "Failed to create car" });
    }
};



const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.headers.userId });
        res.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: "Failed to fetch cars" });
    }
};

const searchCars = async (req, res) => {
    try {
        const { keyword } = req.query;

        const cars = await Car.find({
            user: req.user.id,
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } },
            ],
        });

        res.json(cars);
    } catch (error) {
        console.error("Error searching cars:", error);
        res.status(500).json({ message: "Failed to search cars" });
    }
};

const getCarById = async (req, res) => {
    try {
        const car = await Car.find({_id:req.params.id});
        if (car && (car[0].user.toString() === req.headers.userId.toString())) {
            res.json(car);
        } else {
            res.status(404).json({ message: "Car not found or not authorized" });
        }
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        res.status(500).json({ message: "Failed to fetch car" });
    }
};

const updateCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const car = await Car.findById(req.params.id);
        if (car && car.user.toString() === req.headers.userId.toString()) {
            car.title = title || car.title;
            car.description = description || car.description;
            car.tags = tags || car.tags;

           
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "cars",
                });
                car.images = result.secure_url;
            }

            const updatedCar = await car.save();
            res.json(updatedCar);
        } else {
            res.status(404).json({ message: "Car not found or not authorized" });
        }
    } catch (error) {
        console.error("Error updating car:", error);
        res.status(500).json({ message: "Failed to update car" });
    }
};

const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (car && car.user.toString() === req.headers.userId.toString()) {
           
            const publicId = car.images.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`cars/${publicId}`);

            await car.remove();
            res.json({ message: "Car removed" });
        } else {
            res.status(404).json({ message: "Car not found or not authorized" });
        }
    } catch (error) {
        console.error("Error deleting car:", error);
        res.status(500).json({ message: "Failed to delete car" });
    }
};

module.exports = { createCar, getCars, searchCars, getCarById, updateCar, deleteCar };
