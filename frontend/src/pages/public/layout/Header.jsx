import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { Menu, X } from "lucide-react";

const menuItems = [
    { to: "/", label: "Início" },
    { to: "/produtos", label: "Produtos" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
];

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);


    return (
        <>
            <header className={cn("public-header", isScrolled && "public-header-scrolled")}>
                <div className="container public-header-inner">
                    <Link to="/" className="public-header-brand" onClick={() => setIsMenuOpen(false)}>
                        Ecommerce Java
                    </Link>

                    <nav className="public-header-nav" aria-label="Navegação principal">
                        {menuItems.map((item) => (

                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => cn("public-header-link", isActive && "public-header-link-active")}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header >

            <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="public-header-mobile-toggle"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className={cn("public-header-mobile-menu", isMenuOpen && "public-header-mobile-menu-open")}>
                <nav className="public-header-mobile-nav" aria-label="Navegação mobile">
                    {menuItems.map((item) => (

                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => cn("public-header-mobile-link", isActive && "public-header-mobile-link-active")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}[]
                </nav>
            </div>
        </>
    );
};
