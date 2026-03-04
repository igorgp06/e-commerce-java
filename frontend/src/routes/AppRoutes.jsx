import { Routes, Route, Navigate } from "react-router-dom";

// públicas
import { Main } from "../pages/Main";
import { MainPublic } from "../pages/public/MainPublic";
import { NotFound } from "../pages/err/NotFound";

// admin
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
    return (
        <Routes>
            {/* rotas publias */}
            <Route path="/" element={<Main />}>
                <Route index element={<MainPublic />} />
            </Route>

            {/* rota admin "gerenciada" pelo AdminRoutes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* 404 */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}
