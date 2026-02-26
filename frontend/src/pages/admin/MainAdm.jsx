import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";

export const MainAdm = () => {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_token_expires_at");
        navigate("/admin/login", { replace: true });
    };

    return (
        <div className={`app-admin-shell ${sidebarCollapsed ? "app-admin-shell-collapsed" : ""}`}>
            <Sidebar
                collapsed={sidebarCollapsed}
                mobileOpen={mobileSidebarOpen}
                onToggle={() => setSidebarCollapsed((prev) => !prev)}
                onClose={() => setMobileSidebarOpen(false)}
            />

            <div className="flex min-h-screen flex-col lg:min-w-0">
                <nav className="app-topbar">
                    <div className="flex items-center gap-2">
                        <button
                            className="app-btn app-btn-neutral app-btn-sm lg:hidden"
                            type="button"
                            onClick={() => setMobileSidebarOpen(true)}
                            aria-label="Abrir menu"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                        <div className="flex-1 px-2 text-lg font-semibold text-secondary">Painel Administrativo</div>
                    </div>
                    <button className="app-btn app-btn-neutral app-btn-sm" onClick={handleLogout}>
                        Sair
                    </button>
                </nav>

                <main className="container flex-1 overflow-auto lg:p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    );
};