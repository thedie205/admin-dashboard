import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../services/userService";

const GuestRoute = () => {
    if (isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;