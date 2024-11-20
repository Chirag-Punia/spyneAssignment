import { Button } from "@nextui-org/button";
import Header from "./Header.jsx";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const reactNavigator = useNavigate();
    return (
        <>
            <Header />
            <div className="bg-customPurple min-h-screen font-doto text-darkText rounded-t-full rounded-b-full">
                <div className="container mx-auto px-6 py-16">

                    <div className="text-center">
                        <h1 className="text-5xl font-bold leading-tight">
                            Welcome to Your Car Management Portal
                        </h1>
                        <p className="mt-6 text-lg">
                            Discover an efficient way to manage and track your car inventory, schedules, and analytics.
                        </p>
                        <Button
                            color="primary"
                            className="mt-8 bg-white text-purple-700 rounded-lg shadow-md px-8 py-4 text-lg hover:bg-gray-100"
                            onPress={() => reactNavigator("/login")}
                        >
                            Get Started
                        </Button>
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-8 shadow-md text-center">
                            <h3 className="text-xl font-bold text-purple-700">Inventory Management</h3>
                            <p className="mt-4">
                                Add, update, and organize your car inventory effortlessly to streamline your operations.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-8 shadow-md text-center">
                            <h3 className="text-xl font-bold text-purple-700">Schedule Tracking</h3>
                            <p className="mt-4">
                                Keep track of maintenance schedules, rentals, and availability of your cars seamlessly.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-8 shadow-md text-center">
                            <h3 className="text-xl font-bold text-purple-700">Performance Analytics</h3>
                            <p className="mt-4">
                                Use data-driven insights to optimize your fleet management and boost productivity.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
                        <div className="mt-8 grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg p-8 shadow-md text-center">
                                <h3 className="text-xl font-bold text-purple-700">Basic</h3>
                                <p className="mt-4">$10/month</p>
                                <p className="mt-4">Essential tools for managing your car inventory.</p>
                                <Button className="mt-4 bg-purple-700 text-white rounded-lg px-6 py-2">
                                    Select Plan
                                </Button>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-md text-center">
                                <h3 className="text-xl font-bold text-purple-700">Pro</h3>
                                <p className="mt-4">$30/month</p>
                                <p className="mt-4">Advanced features for scheduling and analytics.</p>
                                <Button className="mt-4 bg-purple-700 text-white rounded-lg px-6 py-2">
                                    Select Plan
                                </Button>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-md text-center">
                                <h3 className="text-xl font-bold text-purple-700">Enterprise</h3>
                                <p className="mt-4">Contact Us</p>
                                <p className="mt-4">Custom solutions for large-scale car management.</p>
                                <Button className="mt-4 bg-purple-700 text-white rounded-lg px-6 py-2">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
                        <div className="mt-8 max-w-2xl mx-auto">
                            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                                <h4 className="text-lg font-bold text-purple-700">What is this platform for?</h4>
                                <p className="mt-2">
                                    This portal helps manage your car inventory, track schedules, and analyze performance data efficiently.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                                <h4 className="text-lg font-bold text-purple-700">Is my data secure?</h4>
                                <p className="mt-2">
                                    Yes! We use robust security measures to ensure all your data remains safe and confidential.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                                <h4 className="text-lg font-bold text-purple-700">Can I switch plans later?</h4>
                                <p className="mt-2">
                                    Absolutely! You can upgrade or downgrade your plan anytime based on your needs.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-white">Join Us Today!</h2>
                        <p className="mt-4 text-lg text-bold">
                            Sign up now and start managing your cars with our platform.
                        </p>
                        <Button
                            color="primary"
                            className="mt-8 bg-white text-purple-700 rounded-lg shadow-md px-8 py-4 text-lg hover:bg-gray-100"
                            onPress={() => reactNavigator("/signup")}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>

                <style jsx={"true"}>{`
                    .bg-customPurple {
                        background: linear-gradient(135deg, #6a0dad, #b700ff);
                    }
                    .font-doto {
                        font-family: 'Doto', sans-serif;
                    }
                    .text-darkText {
                        color: #2D2D2D;
                    }
                `}</style>
            </div>
        </>
    );
}
