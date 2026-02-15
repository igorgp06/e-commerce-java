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
        <aside className="bg-base-100 border-r border-base-300 w-full lg:w-64">
            <h2 className="p-4 text-lg font-semibold">Menu</h2>
            <nav className="p-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-md ${isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};