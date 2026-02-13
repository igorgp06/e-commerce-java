import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { MainAdm } from "../pages/admin/MainAdm";
import { DashboardHome } from "../pages/admin/dashboard/DashboardHome";
import { EstadosPage } from "../pages/admin/partials/estados/EstadosPages";
import { AdminLogin } from "../pages/admin/auth/AdminLogin";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<AdminLogin />} />

            <Route
                element={
                    <ProtectedRoute>
                        <MainAdm />
                    </ProtectedRoute>
                }
            >

                <Route index element={<Navigate to="dashboard" replace />} />

                <Route path="dashboard" element={<DashboardHome />} />

                <Route path="estados" element={<EstadosPage />} />

            </Route>
        </Routes>
    );
}
