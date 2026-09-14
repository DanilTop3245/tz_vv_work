import React from 'react';
import logo from "../assets/logo.svg"
import { Link } from "react-router-dom"
import { Icon } from './Icon';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="h-20 max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">

                <div className="flex items-center gap-6">
                    <Link className="flex items-center gap-2 group" to="/">
                        <img src={logo} alt="Logo" className="h-9 w-auto object-contain" />
                        <span className="text-xl text-slate-900 tracking-tight font-extrabold hidden sm:inline-block">
                            VV <span className="text-blue-600">WORK</span>
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        <Link className="px-4 py-2 text-sm text-blue-600 font-semibold bg-slate-100 rounded-lg transition-colors" to="/">
                            Знайти роботу
                        </Link>
                        <Link to="/partnerjobs" className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                            Знайти працівника
                        </Link>
                        <a className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="#">
                            Про нас
                        </a>
                        <a className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" href="#">
                            Партнери
                        </a>
                        <Link className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" to="/contacts">
                            Контакти
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                    <button
                        className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                        type="button"
                    >
                        <span className="text-sm font-semibold">🇺🇦 UA</span>
                        <Icon name="expand_more" className="text-slate-500 text-[18px]" />
                    </button>

                    <a
                        className="hidden sm:inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-[0_1px_3px_rgba(0,81,213,0.15)] transition-colors"
                        href="#"
                    >
                        Знайти працівника
                    </a>

                    <div className="relative flex items-center pl-1 cursor-pointer group" title="Ваш персональний рекрутер онлайн">
                        <div className="relative">
                            <img
                                alt="Рекрутер VV WORK"
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-600/20"
                                src="https://lh3.googleusercontent.com/aida/AEtjO1Ucpe9dSOBMGu68H_TVArwnMyv3OY4vdI9KI-jzProzJvHMSXW5IL1Gu5KEMshB3IiRkafJDqS3O-b1YMcFgJpk8G65bCJj9_8pIEkWwgtVyUtYUn6Qo4bcEaSc99hCFjFRkUc1TyUkh3qDAMnp-YZigemgjrU9HracQMlYtg1VCEWL4znLmW-TarDNi8Z-GD8i1zO46THlb4qqBoMghwxa8KkbODNTyp4JPVjsTVn9-T4ywFl9Avv_mEs"
                            />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
                        </div>
                    </div>

                </div>

            </div>
        </header>
    );
};