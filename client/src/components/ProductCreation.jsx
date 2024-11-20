import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "./Header.jsx";
import {Button} from "@nextui-org/button";
import {useNavigate} from "react-router-dom";

const ProductCreation = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    const navigator = useNavigate();
    const handleImageUpload = (e) => {
        setImage(Array.from(e.target.files));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!title || !description || !image || image.length === 0) {
            toast.error("All fields are required, including at least one image!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        image.forEach((img) => formData.append("images", img));

        try {
            const response = await axios.post("http://localhost:5002/api/cars", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                toast.success("Product created successfully!");
                setTitle("");
                setDescription("");
                setImage([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error creating product:", error);
            toast.error("Failed to create product. Please try again.");
        }
    };


    return (
        <>
            <Header/>
        <div className="flex justify-center items-center h-[600px] bg-gray-50">
            <Button className="font-Doto mr-10 bg-purple-600" onPress={() => {
                navigator("/home")
            }}>
                Back
            </Button>
            <form
                className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-semibold text-purple-700 mb-6">Create New Product</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter product title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter product description"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                        className="w-full border rounded-lg px-4 py-2 text-gray-700"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-purple-700 text-white w-full py-2 rounded-lg transition duration-300 hover:bg-purple-600"
                    isLoading={isLoading}
                >
                    Create Product
                </Button>
            </form>
        </div>
        </>
    );
};

export default ProductCreation;
