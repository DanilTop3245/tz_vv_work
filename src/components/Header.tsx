import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { Icon } from "../assets/icons";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const pathname = decodeURIComponent(location.pathname);

    const isHome = pathname === "/";
    const isJobs = pathname === "/partners/all" || pathname === "/partners" || pathname === "/partnerjobs" || pathname === "/partnerjobs/all";
    const isPartners = (pathname.startsWith("/partners/") && pathname !== "/partners/all") || (pathname.startsWith("/partnerjobs/") && pathname !== "/partnerjobs/all");
    const isContacts = pathname === "/контакти" || pathname === "/contacts";

    const navLinks = [
        { name: "Головна", to: "/", active: isHome },
        { name: "Знайти роботу", to: "/partners/all", active: isJobs },
        { name: "Партнери", to: "/partners/volkswagen", active: isPartners },
        { name: "Контакти", to: "/контакти", active: isContacts },
    ];

    const getLinkClasses = (active: boolean) =>
        `px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            active
                ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-blue-500/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
        }`;

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
            <div className="h-20 max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                    <Link className="flex items-center group hover:opacity-90 transition-opacity" to="/">
                        <Logo />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className={getLinkClasses(link.active)}
                            >
                                {link.active && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>}
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs"
                        aria-label="Змінити тему"
                        title={theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
                        type="button"
                    >
                        <Icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} className="text-[18px] transition-transform duration-300" />
                    </button>

                    <Link
                        className="hidden sm:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-all duration-200"
                        to="/контакти"
                    >
                        Знайти працівника
                    </Link>

                    <Link 
                        to="/контакти"
                        aria-label="Зв'язатися з персональним координатором"
                        className="relative flex items-center pl-1 cursor-pointer group hover:scale-105 active:scale-95 transition-all duration-200" 
                        title="Зв'язатися з персональним координатором"
                    >
                        <div className="relative">
                            <img
                                alt="Рекрутер VV WORK"
                                width="36"
                                height="36"
                                loading="lazy"
                                decoding="async"
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-600/30 group-hover:ring-blue-500 transition-all"
                                src="/recruiter.jpg"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                        aria-label="Меню"
                        aria-expanded={mobileMenuOpen}
                    >
                        <Icon name={mobileMenuOpen ? "close" : "expand_more"} className="text-[22px]" />
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 py-3 shadow-lg flex flex-col gap-1 animate-slide-down">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={getLinkClasses(link.active)}
                        >
                            {link.active && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>}
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/контакти"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-2 w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                        Знайти працівника
                    </Link>
                </div>
            )}
        </header>
    );
}