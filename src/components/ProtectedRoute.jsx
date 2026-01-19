import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = () => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default ProtectedRoute;
