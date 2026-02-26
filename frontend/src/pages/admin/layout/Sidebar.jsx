import { NavLink } from "react-router-dom";

const Icon = ({ children }) => (
    <span className="app-sidebar-icon" aria-hidden="true">
        {children}
    </span>
);

const menuItems = [
    {
        to: "/admin/dashboard",
        label: "Dashboard",
        icon: (
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 13h7V4H4zM13 20h7v-7h-7zM13 11h7V4h-7zM4 20h7v-5H4z" />
                </svg>
            </Icon>
        ),
    },
    {
        to: "/admin/estados",
        label: "Estados",
        icon: (
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7.5 12 4l8 3.5-8 3.5L4 7.5Z" />
                    <path d="M4 12l8 3.5 8-3.5" />
                    <path d="M4 16.5 12 20l8-3.5" />
                </svg>
            </Icon>
        ),
    },
    {
        to: "/admin/cidades",
        label: "Cidades",
        icon: (
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 21h18" />
                    <path d="M5 21V9l4-2v14" />
                    <path d="M15 21V5l4 2v14" />
                    <path d="M9 21v-9h6v9" />
                </svg>
            </Icon>
        ),
    },
    {
        to: "/admin/categorias",
        label: "Categorias",
        icon: (
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7h16M4 12h16M4 17h10" />
                </svg>
            </Icon>
        ),
    },
    {
        to: "/admin/marcas",
        label: "Marcas",
        icon: (
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 12h16" />
                    <path d="M12 4v16" />
                    <circle cx="12" cy="12" r="8" />
                </svg>
            </Icon>
        ),
    },
    {
        to: "/admin/produtos",
        label: "Produtos",
        icon: (
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 7.5 12 3l9 4.5L12 12 3 7.5Z" />
                    <path d="M3 7.5V16.5L12 21l9-4.5V7.5" />
                    <path d="M12 12v9" />
                </svg>
            </Icon>
        ),
    },
    {
        to: "/admin/clientes",
        label: "Clientes",
        icon: (
            <Icon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c1.5-3 4-5 8-5s6.5 2 8 5" />
                </svg>
            </Icon>
        ),
    },
];

export const Sidebar = ({ collapsed, mobileOpen, onToggle, onClose }) => {
    return (
        <>
            {mobileOpen && <button className="app-sidebar-overlay" type="button" aria-label="Fechar menu" onClick={onClose} />}

            <aside className={`app-sidebar ${collapsed ? "app-sidebar-collapsed" : ""} ${mobileOpen ? "app-sidebar-mobile-open" : ""}`}>
                <div className="app-sidebar-header">
                    <h2 className="text-lg font-semibold text-secondary">Menu</h2>
                    <button
                        className="app-btn app-btn-neutral app-btn-sm app-sidebar-toggle"
                        type="button"
                        onClick={onToggle}
                        aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}

                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d={collapsed ? "m8 5 8 7-8 7" : "m16 5-8 7 8 7"} />
                        </svg>
                    </button>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `app-sidebar-link ${isActive ? "app-sidebar-link-active" : ""}`
                            }
                        >
                            {item.icon}
                            <span className="app-sidebar-label">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};