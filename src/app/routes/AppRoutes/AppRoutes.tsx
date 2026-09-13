// AppRoutes.tsx

import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../../../components/auth/ProtectedRoute";
import GuestRoute from "../../../components/auth/GuestRoute";

import Login from "../../../pages/Login";
import Register from "../../../pages/Register";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
    Dashboard,
    Analytics,
} from '../../../pages/index'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Guest Routes */}
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;