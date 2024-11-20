const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const mongoose = require("mongoose");

dotenv.config({ path: './.env.local' });
mongoose.set("strictQuery", true);
const PORT = process.env.PORT;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "CRM" });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
})();
const app = express();
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use('/auth', userRoutes);
app.use('/api/cars', carRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
