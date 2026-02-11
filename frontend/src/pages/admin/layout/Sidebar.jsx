import { NavLink, useNavigate } from "react-router-dom"


export const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_token_expires_at");
        navigate("/admin/login", { replace: true });
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                            className="my-1.5 inline-block size-4"
                        >
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>

                    </label>
                    <div className="px-4 flex-1">Painel Administrativo</div>
                    <button className="btn btn-sm btn-outline mr-3" onClick={handleLogout}>
                        Sair
                    </button>
                </nav>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">

                    <ul className="menu w-full grow">

                        <li>
                            <NavLink
                                to="/admin/dashboard"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Página Inicial"
                            >
                                <span className="is-drawer-close:hidden">Dashboard</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/admin/estados"
                                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                data-tip="Estados"
                            >
                                <span className="is-drawer-close:hidden">Estados</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};