import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../assets/icons';

export default function Home() {
  const navigate = useNavigate();
  const [homeSearch, setHomeSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const handleHomeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (homeSearch.trim()) {
      params.set('search', homeSearch.trim());
    }
    navigate(params.toString() ? `/partners/all?${params.toString()}` : '/partners/all');
  };

  return (
    <main className="w-full pt-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex-1 transition-colors duration-200">
      <div className="flex flex-col w-full">
        
        <section className="w-full bg-slate-100 dark:bg-slate-900/70 py-3 px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-800 px-3 py-0.5 rounded-full shadow-xs border border-slate-200/60 dark:border-slate-700/60">
                <Icon name="verified" className="text-[15px]" />
                100% легальне оформлення
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                <Icon name="savings" className="text-[15px]" />
                Безкоштовно для шукачів (оплачує роботодавець ЄС)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-900 dark:text-slate-300">
                <Icon name="handshake" className="text-[15px] text-blue-600 dark:text-blue-400" />
                Прямі роботодавці ЄС
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ліцензія Мінсоцполітики: <strong className="text-slate-900 dark:text-white">№1428/2021</strong></span>
            </div>
          </div>
        </section>

        <section className="w-full relative overflow-hidden bg-white dark:bg-slate-950 pt-16 pb-16 px-4 md:px-8 transition-colors">
          <div className="absolute -top-24 right-10 w-96 h-96 bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -left-20 w-80 h-80 bg-slate-200/40 dark:bg-slate-800/30 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full mb-4 shadow-xs font-semibold border border-slate-200/50 dark:border-slate-700/50">
                <Icon name="verified_user" className="text-[16px]" />
                Офіційний європейський оператор працевлаштування
              </div>
              <h1 className="text-3xl md:text-5xl text-slate-900 dark:text-white tracking-tight font-extrabold mb-4 leading-tight">
                Знайди роботу. Працюй у Європі безпечно.
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Платформа для пошуку роботи та працівників у Європі. Прямий найм, офіційне оформлення у Польщі, Німеччині, Нідерландах, Чехії.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/60 dark:bg-blue-950/30 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Icon name="person_search" className="text-[24px]" />
                      </div>
                      <div>
                        <h2 className="text-lg text-slate-900 dark:text-white font-bold">Шукаєте роботу?</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Підбір вакансій із прямим контрактом та житлом</p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs rounded-full font-semibold border border-blue-200/50 dark:border-blue-800/50">
                      3 420+ вакансій
                    </span>
                  </div>

                  <form className="space-y-4 mt-4" onSubmit={handleHomeSearch}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      <div className="md:col-span-7 relative">
                        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[20px]" />
                        <input 
                          className="w-full h-11 pl-10 pr-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 border border-transparent dark:border-slate-700/60 transition-all" 
                          id="job-search-input" 
                          placeholder="Посада або спеціальність..." 
                          aria-label="Посада або спеціальність"
                          type="text" 
                          value={homeSearch}
                          onChange={(e) => setHomeSearch(e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-5 relative">
                        <Icon name="location_on" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[20px]" />
                        <select 
                          className="w-full h-11 pl-10 pr-8 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 appearance-none border border-transparent dark:border-slate-700/60 transition-all cursor-pointer" 
                          id="country-select"
                          aria-label="Країна пошуку"
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                          <option value="all">Усі країни Європи</option>
                          <option value="pl">🇵🇱 Польща (1 240)</option>
                          <option value="de">🇩🇪 Німеччина (1 120)</option>
                          <option value="nl">🇳🇱 Нідерланди (620)</option>
                          <option value="cz">🇨🇿 Чехія (440)</option>
                        </select>
                        <Icon name="expand_more" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none text-[20px]" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1.5 font-medium">Швидкі фільтри:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700 dark:text-slate-300 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800/80 px-3 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-transparent dark:border-slate-700/40">
                          <input defaultChecked className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer" type="checkbox" />
                          <span>З проживанням</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800/80 px-3 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-transparent dark:border-slate-700/40">
                          <input defaultChecked className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer" type="checkbox" />
                          <span>Без досвіду</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-100 dark:bg-slate-800/80 px-3 py-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors border border-transparent dark:border-slate-700/40">
                          <input defaultChecked className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer" type="checkbox" />
                          <span>Без знання мови</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button 
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-xs hover:shadow-md hover:shadow-blue-500/25 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Знайти роботу (3 420+ вакансій)</span>
                        <Icon name="arrow_forward" className="text-[18px]" />
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Icon name="shield" className="text-[16px] text-emerald-600 dark:text-emerald-400" />
                    Прямі трудові договори без прихованих комісій
                  </span>
                  <Link className="text-blue-600 dark:text-blue-400 font-semibold hover:underline" to="/partners/all">Переглянути всі вакансії →</Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden border border-slate-700/80 dark:border-slate-800">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center">
                        <Icon name="corporate_fare" className="text-[24px]" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">Потрібні працівники?</h2>
                        <p className="text-xs text-slate-300">Комплексний рекрутинг для бізнесу</p>
                      </div>
                    </div>
                    <span className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-400/20">
                      VV Work B2B
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    Швидкий підбір та масштабування персоналу під ваші виробничі потужності у країнах ЄС.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <Icon name="schedule" className="text-[20px] text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-white">Закриваємо потреби за 48 годин</div>
                        <div className="text-xs text-slate-300">Оперативне надання перших перевірених резюме під запит.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <Icon name="gavel" className="text-[20px] text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-white">A1 / ВНЖ / повна легалізація</div>
                        <div className="text-xs text-slate-300">Підготовка офіційних сертифікатів, віз і дозволів на роботу в ЄС.</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                      <Icon name="thumb_up" className="text-[20px] text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-white">98% успішних кейсів</div>
                        <div className="text-xs text-slate-300">Гарантія безкоштовної заміни спеціаліста протягом 90 днів.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60">
                  <Link 
                    to="/контакти"
                    className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 inline-flex items-center justify-center gap-2"
                  >
                    <span>Знайти працівника</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="deferred-section w-full py-16 px-4 md:px-8 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">Галузі та спеціальності</span>
                <h2 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-bold tracking-tight mt-1">Популярні категорії вакансій</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Оберіть сферу діяльності для швидкого переходу до актуальних пропозицій</p>
              </div>
              <Link className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline" to="/partners/all">
                Всі пропозиції на сторінці партнера
                <Icon name="east" className="text-[18px]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to={`/partners/all?category=${encodeURIComponent('Будівництво')}`}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon name="construction" className="text-[28px]" />
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Будівництво</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Муляри, монтажники, плиточники, арматурники</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">740 вакансій</span>
                  <Icon name="arrow_forward" className="text-slate-400 group-hover:translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 text-[20px]" />
                </div>
              </Link>

              <Link 
                to={`/partners/all?category=${encodeURIComponent('Виробництво')}`}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon name="precision_manufacturing" className="text-[28px]" />
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Виробництво</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Оператори верстатів, зварювальники, збирачі ліній</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">890 вакансій</span>
                  <Icon name="arrow_forward" className="text-slate-400 group-hover:translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 text-[20px]" />
                </div>
              </Link>

              <Link 
                to={`/partners/all?category=${encodeURIComponent('Логістика')}`}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon name="inventory_2" className="text-[28px]" />
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Логістика &amp; Склад</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Сортувальники, пакувальники, навантажувачі</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">610 вакансій</span>
                  <Icon name="arrow_forward" className="text-slate-400 group-hover:translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 text-[20px]" />
                </div>
              </Link>

              <Link 
                to={`/partners/all?category=${encodeURIComponent('HoReCa')}`}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon name="restaurant" className="text-[28px]" />
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Готельно-ресторанна сфера / HoReCa</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Кухарі, персонал кухні, покоївки, офіціанти</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">315 вакансій</span>
                  <Icon name="arrow_forward" className="text-slate-400 group-hover:translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 text-[20px]" />
                </div>
              </Link>

              <Link 
                to={`/partners/all?category=${encodeURIComponent('Інші')}`}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon name="terminal" className="text-[28px]" />
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">IT &amp; Технічні</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Інженери, системні адміністратори, розробники</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">185 вакансій</span>
                  <Icon name="arrow_forward" className="text-slate-400 group-hover:translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 text-[20px]" />
                </div>
              </Link>

              <Link 
                to={`/partners/all?category=${encodeURIComponent('Водії')}`}
                className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon name="local_shipping" className="text-[28px]" />
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Водії C+E</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Міжнародні перевезення ЄС, тенти, рефрижератори</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">420 вакансій</span>
                  <Icon name="arrow_forward" className="text-slate-400 group-hover:translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 text-[20px]" />
                </div>
              </Link>

              <Link 
                to={`/partners/all?category=${encodeURIComponent('Інші')}`}
                className="group lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 mb-4">
                    <Icon name="work_history" className="text-[28px]" />
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Інші спеціальності</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Агросектор, теплиці, догляд, прибирання об'єктів, сезонні роботи у Німеччині, Польщі та Нідерландах</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">260 вакансій</span>
                  <Icon name="arrow_forward" className="text-slate-400 group-hover:translate-x-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 text-[20px]" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="deferred-section w-full py-16 px-4 md:px-8 bg-white dark:bg-slate-950 transition-colors">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs font-semibold mb-1">
                  <Icon name="local_fire_department" className="text-[16px]" />
                  Гарячі перевірені пропозиції
                </div>
                <h2 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-bold tracking-tight">Термінові вакансії з окладами в євро та злотих</h2>
              </div>
              <Link className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-semibold transition-colors" to="/partners/all">
                <span>Усі гарячі пропозиції</span>
                <Icon name="arrow_forward" className="text-[18px]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-l-4 border-emerald-500 border border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-200/50 dark:border-emerald-800/50">
                      <Icon name="verified" className="text-[14px]" />
                      Перевірено VV WORK
                    </span>
                    <span className="text-xs text-slate-400">Терміново</span>
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-bold mb-1">
                    Оператор виробничої лінії на автозавод
                  </h3>
                  <div className="text-blue-600 dark:text-blue-400 text-lg font-bold mb-1">
                    €2,800 – €3,200 <span className="text-slate-500 dark:text-slate-400 font-normal text-xs">/міс нетто</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mb-4">
                    ~ 12 000 – 14 000 PLN (або еквівалент у євро)
                  </div>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-sm">
                      VW
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-900 dark:text-white font-semibold truncate">Volkswagen Group</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <span>🇩🇪 Лейпциг, Німеччина</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs flex items-center gap-1">
                      <Icon name="home" className="text-[14px] text-blue-600 dark:text-blue-400" /> Житло надається
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                      Без досвіду
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                      Офіційний договір
                    </span>
                  </div>
                </div>
                <Link to="/контакти" className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  <span>Подати заявку</span>
                  <Icon name="send" className="text-[16px]" />
                </Link>
              </article>

              <article className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-l-4 border-emerald-500 border border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-200/50 dark:border-emerald-800/50">
                      <Icon name="verified" className="text-[14px]" />
                      Перевірено VV WORK
                    </span>
                    <span className="text-xs text-slate-400">Гаряча вакансія</span>
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-bold mb-1">
                    Комплектувальник на логістичні склади
                  </h3>
                  <div className="text-blue-600 dark:text-blue-400 text-lg font-bold mb-1">
                    6,200 – 7,800 PLN <span className="text-slate-500 dark:text-slate-400 font-normal text-xs">/міс нетто</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mb-4">
                    ~ €1,450 – €2,100 (бонуси за переробки)
                  </div>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-sm">
                      DP
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-900 dark:text-white font-semibold truncate">DPD Logistics Hub</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <span>🇵🇱 Вроцлав, Польща</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs flex items-center gap-1">
                      <Icon name="commute" className="text-[14px] text-blue-600 dark:text-blue-400" /> Доїзд безкоштовний
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                      Без знання мови
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                      Комфортне житло
                    </span>
                  </div>
                </div>
                <Link to="/контакти" className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  <span>Подати заявку</span>
                  <Icon name="send" className="text-[16px]" />
                </Link>
              </article>

              <article className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-l-4 border-emerald-500 border border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-200/50 dark:border-emerald-800/50">
                      <Icon name="verified" className="text-[14px]" />
                      Перевірено VV WORK
                    </span>
                    <span className="text-xs text-slate-400">Набір відкритий</span>
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white font-bold mb-1">
                    Працівник у сучасні тепличні комплекси
                  </h3>
                  <div className="text-blue-600 dark:text-blue-400 text-lg font-bold mb-1">
                    €2,250 – €2,600 <span className="text-slate-500 dark:text-slate-400 font-normal text-xs">/міс нетто</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mb-4">
                    ~ 9 800 – 11 500 PLN (щотижневі виплати)
                  </div>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-sm">
                      AG
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-900 dark:text-white font-semibold truncate">AgroFlora Westland</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <span>🇳🇱 Роттердам, Нідерланди</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs flex items-center gap-1">
                      <Icon name="apartment" className="text-[14px] text-blue-600 dark:text-blue-400" /> Сімейні кімнати
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                      Офіційний BSN та контракт
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                      Без мови та досвіду
                    </span>
                  </div>
                </div>
                <Link to="/контакти" className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  <span>Подати заявку</span>
                  <Icon name="send" className="text-[16px]" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="deferred-section w-full py-16 px-4 md:px-8 bg-slate-100 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">Чому обирають нас</span>
              <h2 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-bold tracking-tight mt-1">Переваги роботи з VV WORK</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Ми створюємо захищене середовище для українців та гарантуємо стандарти європейського працевлаштування</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mb-4">
                  <Icon name="verified_user" className="text-[32px]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">100% легальне оформлення</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Працюємо тільки з офіційними трудовими договорами ЄС (Umowa o pracę, Arbeitsvertrag). Допомагаємо отримати робочі візи, параграф 24, прописку, страхування та сертифікати A1.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Icon name="savings" className="text-[32px]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Безкоштовно для шукачів</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Усі послуги з підбору вакансії, оформлення документів та консультації є на 100% безкоштовними для кандидатів. Наші послуги повністю оплачує прямий роботодавець ЄС.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Icon name="domain_verification" className="text-[32px]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Прямі роботодавці ЄС</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Жодних сумнівних посередників або субпідрядників. Прямі домовленості з перевіреними підприємствами Польщі, Німеччини, Нідерландів та Чехії з гарантованою ставкою.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="deferred-section w-full py-16 px-4 md:px-8 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="bg-gradient-to-r from-blue-950/40 to-transparent p-6 md:p-8 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/5">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 bg-blue-600/30 text-blue-300 text-xs px-3 py-1 rounded-full mb-4 border border-blue-400/20">
                  <Icon name="headset_mic" className="text-[16px]" />
                  Служба координації VV WORK онлайн
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                  Потрібна консультація щодо роботи або підбору персоналу?
                </h2>
                <p className="text-base text-slate-300 leading-relaxed">
                  Зателефонуйте нашим фахівцям або напишіть нам на гарячу лінію. Ми проведемо безкоштовний аудит документів і запропонуємо актуальні контракти.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 w-full sm:w-auto">
                <a className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 text-sm font-bold rounded-xl shadow-lg text-center transition-all flex items-center justify-center gap-2" href="tel:+380443902144">
                  <Icon name="phone_in_talk" className="text-[20px]" />
                  <span>+380 (44) 390-21-44</span>
                </a>
                <a className="px-6 py-3 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-white text-sm font-bold rounded-xl shadow-md border border-slate-700 text-center transition-all duration-200 flex items-center justify-center gap-2" href="mailto:support@vvwork.eu">
                  <Icon name="mail" className="text-[20px]" />
                  <span>support@vvwork.eu</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}