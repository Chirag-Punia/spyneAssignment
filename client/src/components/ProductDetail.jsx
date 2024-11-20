import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";

const ProductDetail = () => {
    const { carId } = useParams();
    const [carDetails, setCarDetails] = useState(null);
    const [editDetails, setEditDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [delLoading, setDelLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigator = useNavigate();

    useEffect(() => {
        if (token) {
            fetchCarDetails();
        }
    }, [token]);

    const fetchCarDetails = async () => {
        try {
            const response = await axios.get(`https://spyneassignment-c2vd.onrender.com/api/cars/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCarDetails(response.data[0]);
            setEditDetails(response.data[0]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching car details:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditDetails((prev) => ({
            ...prev,
            [name]: name === "tags" ? value.split(",") : value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
    };

    const handleSave = async () => {
        setSaveLoading(true);
        const formData = new FormData();
        formData.append("title", editDetails?.title || "");
        formData.append("description", editDetails?.description || "");
        formData.append("tags", editDetails?.tags?.join(",") || "");
        imageFiles.forEach((file) => formData.append("images", file));

        try {
            await axios.put(`https://spyneassignment-c2vd.onrender.com/api/cars/${carId}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            setCarDetails(editDetails);
            setIsEditing(false);
            setSaveLoading(false);
            toast.success("Product updated successfully!");
            navigator("/home");
        } catch (error) {
            console.error("Error updating car details:", error);
        }
    };

    const handleDelete = async () => {
        setDelLoading(true);
        try {
            await axios.delete(`https://spyneassignment-c2vd.onrender.com/api/cars/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Car deleted successfully");
            setDelLoading(false);
            navigator("/home");
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-8 bg-gray-50">
            <h1 className="text-4xl font-semibold text-purple-700 mb-4">{carDetails?.title}</h1>
            {carDetails?.images && carDetails.images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {carDetails.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${carDetails.title} - Image ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No images available</p>
            )}
            <p className="text-lg mb-4">{carDetails?.description}</p>
            <p className="text-sm text-gray-500 mb-4">
                Tags: {carDetails?.tags?.join(", ") || "No tags available"}
            </p>

            {isEditing ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit Car Details</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={editDetails?.title || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={editDetails?.description || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Tags (comma-separated):</label>
                        <input
                            type="text"
                            name="tags"
                            value={editDetails?.tags?.join(", ") || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Upload Images:</label>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>
                    <Button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg mr-4"
                        isLoading={saveLoading}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <div>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4"
                    >
                        Edit Car
                    </Button>
                    <Button
                        onPress={handleDelete}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg"
                        isLoading={delLoading}
                    >
                        Delete Car
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
