import { Routes, Route, Navigate } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
import { MainAdm } from "../pages/admin/MainAdm";
import { DashboardHome } from "../pages/admin/dashboard/DashboardHome";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route
                element={
                    // TODO implementar a proteção de rotas para proteger as rotas administrativas
                    // <ProtectedRoute> descomentar após implementar a proteção de rotas
                    <MainAdm />
                    //</ProtectedRoute>
                }
            >
                {/* /admin */}
                <Route index element={<Navigate to="dashboard" replace />} />

                {/* /admin/dashboard */}
                <Route path="dashboard" element={<DashboardHome />} />

                {/* TODO usar esse modelo para as outras páginas administrativas */}
                {/* <Route path="produtos" element={<ProdutosPage />} />
            <Route path="pedidos" element={<PedidosPage />} /> */}

            </Route>
        </Routes>
    );
}
