import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />

            {/* pt-14: leaves room for the fixed mobile top bar (h-14) in Sidebar */}
            {/* lg:ml-[210px]: pushes content past the sidebar only on desktop */}
            {/* ml-0: full width on mobile, since the sidebar is an off-canvas drawer there */}
            <main className="min-h-screen ml-0 pt-14 lg:ml-[210px] lg:pt-0">
                <Navbar />

                <div className="m-5">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;