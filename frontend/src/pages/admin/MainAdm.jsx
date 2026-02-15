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
        <div className="min-h-screen bg-base-200 lg:grid lg:grid-cols-[16rem_1fr]">
            <Sidebar />

            <div className="flex min-h-screen flex-col">
                <nav className="navbar bg-base-100 shadow-sm">
                    <div className="flex-1 px-2 text-lg font-semibold">Painel Administrativo</div>
                    <button className="btn btn-sm btn-outline mr-3" onClick={handleLogout}>
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