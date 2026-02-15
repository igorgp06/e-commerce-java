import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { MainAdm } from "../pages/admin/MainAdm";
import { Dashboard } from "../pages/admin/partials/dashboard/Dashboard";
import { EstadosPage } from "../pages/admin/partials/estados/EstadosPage";
import { AdminLogin } from "../pages/admin/auth/AdminLogin";
import { CategoriasPage } from "../pages/admin/partials/categorias/CategoriasPage";
import { CidadesPage } from "../pages/admin/partials/cidades/CidadesPage";
import { MarcasPage } from "../pages/admin/partials/marcas/MarcasPage";
import { ProdutosPage } from "../pages/admin/partials/produtos/ProdutosPage";
import { ClientesPage } from "../pages/admin/partials/clientes/ClientesPage";

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

                <Route path="dashboard" element={<Dashboard />} />

                <Route path="estados" element={<EstadosPage />} />
                <Route path="cidades" element={<CidadesPage />} />
                <Route path="categorias" element={<CategoriasPage />} />
                <Route path="marcas" element={<MarcasPage />} />
                <Route path="produtos" element={<ProdutosPage />} />
                <Route path="clientes" element={<ClientesPage />} />

            </Route>
        </Routes>
    );
}
