import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();

        navigate("/login", { replace: true });
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 text-white"
        >
            Logout
        </button>
    );
};

export default LogoutButton;