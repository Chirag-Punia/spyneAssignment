import Login from "./components/Login";
import Signup from "./components/Signup";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { authState } from "./store/authState";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import ProductCreation from "./components/ProductCreation.jsx";

function App() {
    return (
        <>
            <RecoilRoot>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <BrowserRouter>
                    <InitState />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/create-car" element={<ProductCreation />} />
                        <Route path="/product-details/:carId" element={<ProductDetail />} />
                    </Routes>
                </BrowserRouter>
            </RecoilRoot>
        </>
    );
}

const InitState = () => {
    const base_url = " http://localhost:5002";
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const init = async () => {
        const token = localStorage.getItem("token");
        try {
            if (token) {
                const config = {
                    method: "GET",
                    url: `${base_url}/auth/me`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const res = await axios(config);
                setAuth({ token, user: res.data.user });

                if (location.pathname === "/") {
                    navigate("/home");
                }
            } else {
                if (location.pathname === "/signup") {
                    navigate("/signup");
                }
            }
        } catch (e) {
            if (location.pathname !== "/signup") {
                navigate("/");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return loading ? <div>Loading...</div> : null;
};

export default App;