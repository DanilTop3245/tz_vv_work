import React from 'react';
import logo from "../assets/logo.svg";
import { Icon } from './Icon';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto border-t border-slate-100">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    
                    {/* Brand & License Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
                            <span className="text-xl text-slate-900 font-extrabold tracking-tight">
                                VV <span className="text-blue-600">WORK</span>
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
                            Платформа для пошуку роботи та працівників у Європі. Прямий найм, офіційне оформлення у Польщі, Німеччині, Нідерландах, Чехії.
                        </p>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                                <Icon name="verified" className="text-[16px] text-emerald-600" />
                                Ліцензія Мінсоцполітики №1428/2021
                            </div>
                            <p className="text-xs text-slate-500">
                                Офіційне посередництво у працевлаштуванні за кордоном відповідно до чинного законодавства.
                            </p>
                        </div>
                    </div>

                    {/* About Company */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Про компанію</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Про VV WORK</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Партнери</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Сертифікація та ліцензії</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Відгуки шукачів</a></li>
                        </ul>
                    </div>

                    {/* For Candidates */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Для кандидатів</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Знайти роботу</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Популярні категорії</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Гарячі вакансії</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Гайд з легалізації в ЄС</a></li>
                        </ul>
                    </div>

                    {/* For Employers & Contacts */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Для роботодавців</h4>
                        <ul className="space-y-2 text-sm mb-6">
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">Знайти працівника</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">B2B рекрутинг за 48 годин</a></li>
                            <li><a className="text-slate-600 hover:text-blue-600 transition-colors" href="#">A1 та легалізація</a></li>
                        </ul>

                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Контакти</h4>
                        <div className="text-sm text-slate-600 space-y-1.5">
                            <a className="flex items-center gap-1.5 hover:text-blue-600 transition-colors" href="tel:+380443902144">
                                <Icon name="phone" className="text-[16px] text-blue-600" />
                                +380 (44) 390-21-44
                            </a>
                            <a className="flex items-center gap-1.5 hover:text-blue-600 transition-colors" href="mailto:support@vvwork.eu">
                                <Icon name="mail" className="text-[16px] text-blue-600" />
                                support@vvwork.eu
                            </a>
                        </div>
                    </div>

                </div>

                {/* Legal Bottom Bar */}
                <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>© 2025 VV WORK Europe Sp. z o.o. Всі права захищено.</p>
                    <div className="flex items-center gap-6 flex-wrap">
                        <a className="hover:text-blue-600 transition-colors" href="#">Політика конфіденційності</a>
                        <span className="text-slate-300">•</span>
                        <a className="hover:text-blue-600 transition-colors" href="#">Умови використання</a>
                        <span className="text-slate-300">•</span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Ліцензія №1428/2021
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
};