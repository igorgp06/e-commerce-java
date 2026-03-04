import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { Menu, X } from "lucide-react";

const menuItems = [
    { to: "/",
    label: "Início",
    },
    {
        to: "/produtos",
        label: "Produtos",
    },
    {
        to: "/sobre",
        label: "Sobre",
    },
    {
        to: "/contato",
        label: "Contato",
    }
]

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    })

    return (
        <>
            <nav
                className={cn(
                    "fixed w-full top-0 left-0 z-40 transition-all duration-300",
                    isScrolled ? "py-3 color-background/80 backdrop-blur-md shadow-md" : "py-5"
                )}
            >

                <div className="container flex items-center justify-between">
                    <Link
                        to="/"
                        className={cn("text-xl font-bold color-primary flex items-center transition-all", "duration-300 hover:opacity-80 hover:text-primary-foreground hover:text-glow")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="relative z-10 text-2xl font-bold">
                            Ecommerce Java
                        </span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {menuItems.map((item, key) => (
                            <NavLink
                                key={key}
                                to={item.to}
                                className={cn(
                                    "text-lg font-medium transition-all duration-300",
                                    "hover:opacity-80 hover:text-primary-foreground hover:text-glow"
                                )}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>

            <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="md:hidden fixed top-2 right-4 z-50 p-2 rounded-md color-background/90 backdrop-blur-md shadow-md hover:opacity-80 transition-all duration-300"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div
                className={cn(
                    "fixed inset-0 bg-background/90 backdrop-blur-md z-49 flex flex-col",
                    "item-center justify-center transition-all duration-300 md:hidden",
                    isMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >

                <div className="flex flex-col space-y-8 text-xl text-foreground w-full h-full justify-center">
                    {menuItems.map((item, key) => (
                        <NavLink
                            key={key}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "text-center font-medium transition-all duration-300",
                                    isActive
                                        ? "text-primary-foreground underline"
                                        : "hover:opacity-80 hover:text-primary-foreground hover:text-glow"
                                )
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
};
