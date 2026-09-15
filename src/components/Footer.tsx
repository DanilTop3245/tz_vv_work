import Logo from "./Logo";
import { Link } from 'react-router-dom';
import { Icon } from '../assets/icons';

export default function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-slate-950 shadow-[0_-1px_8px_rgba(0,0,0,0.02)] mt-auto border-t border-slate-100 dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="inline-flex items-center group hover:opacity-90 transition-opacity">
                            <Logo />
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
                            Платформа для пошуку роботи та працівників у Європі. Прямий найм, офіційне оформлення у Польщі, Німеччині, Нідерландах, Чехії.
                        </p>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1">
                            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                <Icon name="verified" className="text-[16px] text-emerald-600 dark:text-emerald-400" />
                                Ліцензія Мінсоцполітики №1428/2021
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300">
                                Офіційне посередництво у працевлаштуванні за кордоном відповідно до чинного законодавства.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Про компанію</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/">Про VV WORK</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/partners/all">Партнери</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/контакти">Сертифікація та ліцензії</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/">Відгуки шукачів</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Для кандидатів</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/partners/all">Знайти роботу</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/partners/all">Популярні категорії</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/partners/all">Гарячі вакансії</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/контакти">Гайд з легалізації в ЄС</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Для роботодавців</h3>
                        <ul className="space-y-2 text-sm mb-6">
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/контакти">Знайти працівника</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/контакти">B2B рекрутинг за 48 годин</Link></li>
                            <li><Link className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/контакти">A1 та легалізація</Link></li>
                        </ul>

                        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Контакти</h3>
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1.5">
                            <a className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="tel:+380443902144">
                                <Icon name="phone" className="text-[16px] text-blue-600 dark:text-blue-400" />
                                +380 (44) 390-21-44
                            </a>
                            <a className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="mailto:support@vvwork.eu">
                                <Icon name="mail" className="text-[16px] text-blue-600 dark:text-blue-400" />
                                support@vvwork.eu
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <p>© 2025 VV WORK Europe Sp. z o.o. Всі права захищено.</p>
                    <div className="flex items-center gap-6 flex-wrap">
                        <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/контакти">Політика конфіденційності</Link>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <Link className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" to="/контакти">Умови використання</Link>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Ліцензія №1428/2021
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}