import { NavLink } from "react-router-dom";

const menuItems = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/estados", label: "Estados" },
    { to: "/admin/cidades", label: "Cidades" },
    { to: "/admin/categorias", label: "Categorias" },
    { to: "/admin/marcas", label: "Marcas" },
    { to: "/admin/produtos", label: "Produtos" },
    { to: "/admin/clientes", label: "Clientes" },
];

export const Sidebar = () => {
    return (
        <aside className="app-sidebar w-full lg:w-64">
            <h2 className="px-4 pb-4 text-lg font-semibold text-secondary">Menu</h2>
            <nav className="space-y-1 px-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `app-sidebar-link ${isActive ? "app-sidebar-link-active" : ""}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};