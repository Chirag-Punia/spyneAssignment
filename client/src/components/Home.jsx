import { Button } from "@nextui-org/button";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import CarCard from "./CarCard.jsx";

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [cars, setCars] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        if (token) {
            fetchCars();
        }
    }, [token]);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = cars.filter(
            (car) =>
                car.title.toLowerCase().includes(lowercasedQuery) ||
                car.description.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredCars(filtered);
    }, [searchQuery, cars]);

    const fetchCars = async () => {
        try {
            const response = await axios.get("http://localhost:5002/api/cars", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCars(response.data);
            setFilteredCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    };

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Header />
            <div className="mt-24 flex flex-col items-center justify-center bg-gray-50 px-6 py-12 h-[600px]">
                <div className="bg-white rounded-lg shadow-2xl p-12 w-full max-w-4xl">
                    <h1 className="text-4xl font-semibold mb-6 text-purple-800">
                        Welcome to Your Car Management Dashboard!
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Add, manage, and view your cars, manage campaigns, and more.
                    </p>


                    <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
                        <Button
                            className="bg-purple-700 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
                            onClick={() => navigate("/create-car")}
                        >
                            Add a New Car
                        </Button>
                        <input
                            type="text"
                            placeholder="Search by title or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-grow border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Button
                            className="bg-red-500 text-white px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105"
                            onClick={logOut}
                        >
                            Log Out
                        </Button>
                    </div>


                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-purple-700 mb-6">Your Cars</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCars.length === 0 ? (
                                <p className="text-gray-600">No cars match your search. Try a different query!</p>
                            ) : (
                                filteredCars.map((car) => (
                                    <div key={car._id} className="transform hover:scale-105 transition duration-300">
                                        <CarCard car={car}/>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Home;
