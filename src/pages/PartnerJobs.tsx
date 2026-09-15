import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Icon, type IconName } from '../assets/icons';
import type { Job } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { fetchPartnerJobs, MOCK_JOBS } from '../services/api';
import { JobCardSkeleton } from '../components/Skeleton';

const CATEGORIES = ['Усі категорії', 'Будівництво', 'Виробництво', 'Логістика', 'HoReCa', 'Водії', 'Інші'];

const CATEGORY_ICONS: Record<string, IconName> = {
    'Будівництво': 'construction',
    'Виробництво': 'precision_manufacturing',
    'Логістика': 'inventory_2',
    'HoReCa': 'restaurant',
    'Водії': 'local_shipping',
    'Інші': 'work_history',
};

const getInitialJobs = (partnerSlug?: string) => {
    if (partnerSlug && partnerSlug !== 'all') {
        return MOCK_JOBS.filter((j) => j.company.toLowerCase().includes(partnerSlug.toLowerCase()));
    }
    return MOCK_JOBS;
};

export default function PartnerJobs() {
    const { slug } = useParams<{ slug: string }>();
    const [searchParams, setSearchParams] = useSearchParams();

    const [jobs, setJobs] = useState<Job[]>(() => getInitialJobs(slug));
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const prevSlugRef = useRef<string | undefined>(slug);

    const initialSearch = searchParams.get('search') || '';
    const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
    const debouncedSearch = useDebounce(searchQuery, 400);

    const initialCategory = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState<string>(
        initialCategory && CATEGORIES.includes(initialCategory) ? initialCategory : 'Усі категорії'
    );

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat && CATEGORIES.includes(cat)) {
            setSelectedCategory(cat);
        } else if (!cat) {
            setSelectedCategory('Усі категорії');
        }
        const s = searchParams.get('search');
        if (s !== null) {
            setSearchQuery(s);
        }
    }, [searchParams]);

    const fetchPartnerData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchPartnerJobs(slug);
            setJobs(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Сталася непередбачувана помилка мережі.';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        if (prevSlugRef.current !== slug) {
            prevSlugRef.current = slug;
            setJobs(getInitialJobs(slug));
            fetchPartnerData();
        }
    }, [slug, fetchPartnerData]);

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                job.company.toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchesCategory = selectedCategory === 'Усі категорії' || job.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [jobs, debouncedSearch, selectedCategory]);

    const handleCategorySelect = (cat: string) => {
        setSelectedCategory(cat);
        const nextParams = new URLSearchParams(searchParams);
        if (cat === 'Усі категорії') {
            nextParams.delete('category');
        } else {
            nextParams.set('category', cat);
        }
        setSearchParams(nextParams, { replace: true });
    };

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        const nextParams = new URLSearchParams(searchParams);
        if (val.trim()) {
            nextParams.set('search', val);
        } else {
            nextParams.delete('search');
        }
        setSearchParams(nextParams, { replace: true });
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('Усі категорії');
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete('category');
        nextParams.delete('search');
        setSearchParams(nextParams, { replace: true });
    };

    return (
        <main className="w-full pt-20 bg-slate-50 dark:bg-slate-950 flex-1 min-h-screen transition-colors duration-200">
            <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                            <Icon name="verified" className="text-[16px]" />
                            Офіційний партнер VV WORK
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Вакансії компанії: <span className="text-blue-600 dark:text-blue-400 capitalize">{slug || 'Партнер'}</span>
                        </h1>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                            Обирайте перевірені пропозиції з прямим контрактом, соціальним пакетом та житлом.
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl transition-all duration-200"
                    >
                        <Icon name="arrow_back" className="text-[18px]" />
                        На головну
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between transition-colors">
                    <div className="relative w-full lg:w-96">
                        <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-[18px]" />
                        <input
                            id="partner-search-input"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Пошук вакансії за назвою..."
                            aria-label="Пошук вакансії за назвою"
                            className="w-full h-11 pl-10 pr-10 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-900 dark:text-white text-sm placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-600 border border-transparent dark:border-slate-700/60 transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => handleSearchChange('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1.5 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-all"
                                aria-label="Очистити пошук"
                            >
                                <Icon name="close" className="text-[16px]" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategorySelect(cat)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 hover:scale-105 active:scale-95 ${selectedCategory === cat
                                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-slate-700/40'
                                    }`}
                            >
                                {CATEGORY_ICONS[cat] && <Icon name={CATEGORY_ICONS[cat]} className="text-[14px]" />}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <JobCardSkeleton key={n} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-red-100 dark:border-red-900/40 max-w-xl mx-auto space-y-4">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/50 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                            <Icon name="error" className="text-[32px]" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Помилка завантаження даних</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
                        <button
                            onClick={fetchPartnerData}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                            <Icon name="refresh" className="text-[18px]" />
                            Спробувати знову (Retry)
                        </button>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-3">
                    <div className="flex justify-center">
1                            <Icon name="search_off" className="text-[48px] text-slate-400 dark:text-slate-600" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Вакансій не знайдено</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Спробуйте змінити параметри пошуку або скинути фільтри категорії.</p>
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                            Скинути фільтри
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <article key={job.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 group">
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                            {CATEGORY_ICONS[job.category] && <Icon name={CATEGORY_ICONS[job.category]} className="text-[13px]" />}
                                            {job.category}
                                        </span>
                                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{job.type}</span>
                                    </div>

                                    <h2 className="text-base text-slate-900 dark:text-white font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                        {job.title}
                                    </h2>

                                    <div className="text-blue-600 dark:text-blue-400 text-base font-bold mb-3">
                                        {job.salary}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <Icon name="location_on" className="text-[16px] text-blue-600 dark:text-blue-400" />
                                        <span className="truncate">{job.location}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/контакти"
                                    className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98]"
                                >
                                    <span>Відгукнутися</span>
                                    <Icon name="send" className="text-[16px] group-hover:translate-x-0.5 transition-transform duration-200" />
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}