import { useNavigate, Outlet } from "react-router-dom"
import { Sidebar } from "./layout/Sidebar"

export const MainAdm = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_token_expires_at");
        navigate("/admin/login", { replace: true });
    }

    return (
        <div className="app-admin-shell">
            <Sidebar />

            <div className="flex min-h-screen flex-col">
                <nav className="app-topbar">
                    <div className="flex-1 px-2 text-lg font-semibold text-secondary">Painel Administrativo</div>
                    <button className="app-btn app-btn-neutral app-btn-sm" onClick={handleLogout}>
                        Sair
                    </button>
                </nav>

                <main className="flex-1 p-4 lg:p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};