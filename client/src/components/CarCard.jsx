import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
    const navigate = useNavigate(); // useNavigate replaces useHistory

    const handleViewDetails = () => {
        // Navigate to the product detail page using the car ID
        navigate(`/product-details/${car._id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300">
            <div className="mb-4">
                {car.images && car.images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {car.images.map((image, index) => (
                            <img
                                key={index}
                                src={image} // Assuming `car.images` contains URLs
                                alt={`${car.title} - ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No images available</p>
                )}
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-2">{car.title}</h3>
            <p className="text-gray-600 text-base mb-4">{car.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{car.tags && car.tags.join(", ")}</span>
                <button
                    onClick={handleViewDetails} // Redirect to product details
                    className="bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CarCard;
