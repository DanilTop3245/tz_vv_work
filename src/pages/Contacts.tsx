import React, { useState } from 'react';

export default function Contacts() {
  // Стейт для форми зворотного зв'язку
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [gdprConsent, setGdprConsent] = useState(true);

  // Валідаційні стани
  const [touchedName, setTouchedName] = useState(false);
  const [touchedContact, setTouchedContact] = useState(false);

  // Стани оптимістичного UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Стани QA стенду
  const [qaLogs, setQaLogs] = useState<string[]>([
    '// Готовий до тестування fetch-обгортки.',
    '// Натисніть кнопку нижче для емуляції запиту.'
  ]);
  const [qaStatus, setQaStatus] = useState<string>('IDLE (200 OK)');
  const [qaLatency, setQaLatency] = useState<string>('—');
  const [isQaRunning, setIsQaRunning] = useState(false);

  // Стани FAQ акордеону
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  // Регулярні вирази за ТЗ
  const phoneRegex = /^\+380\d{9}$/;
  const tgRegex = /^@[a-zA-Z0-9_]{4,32}$/;

  const isNameValid = clientName.trim().length >= 2;
  const isContactValid = phoneRegex.test(clientContact.trim()) || tgRegex.test(clientContact.trim());

  // Обробник сабміту форми
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedName(true);
    setTouchedContact(true);

    if (!isNameValid || !isContactValid) return;

    setIsSubmitting(true);
    setSubmitStatus('loading');

    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
    }, 900);
  };

  // Емуляція API-обгортки та Retry (за ТЗ)
  const runQaApiSimulation = async () => {
    setIsQaRunning(true);
    setQaLogs(['[Attempt #1] POST /api/v1/leads ...']);
    
    const maxRetries = 3;
    let attempt = 1;
    let backoffDelay = 400;

    const simulateFetch = async () => {
      const delay = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
      await new Promise(r => setTimeout(r, delay));
      const isError = Math.random() < 0.20;
      return { ok: !isError, status: isError ? 504 : 200, statusText: isError ? 'Gateway Timeout' : 'OK', latency: delay };
    };

    while (attempt <= maxRetries) {
      if (attempt > 1) {
        setQaLogs(prev => [...prev, `[Attempt #${attempt}] POST /api/v1/leads ...`]);
      }

      const res = await simulateFetch();
      setQaLatency(`${res.latency}ms`);

      if (res.ok) {
        setQaLogs(prev => [
          ...prev, 
          `[Success #${attempt}] Status: 200 OK (${res.latency}ms)`,
          `// Запит успішно оброблено кластером VV WORK.`
        ]);
        setQaStatus('200 OK');
        break;
      } else {
        setQaLogs(prev => [
          ...prev, 
          `[Error #${attempt}] Status: ${res.status} ${res.statusText} (${res.latency}ms)`
        ]);
        setQaStatus(`${res.status} Error`);

        if (attempt < maxRetries) {
          setQaLogs(prev => [...prev, `[Exponential Backoff] Очікування ${backoffDelay}ms перед ретраєм #${attempt + 1}...`]);
          await new Promise(r => setTimeout(r, backoffDelay));
          backoffDelay *= 2;
          attempt++;
        } else {
          setQaLogs(prev => [...prev, `[Abort] Вичерпано максимальну кількість спроб (${maxRetries}). Переведено в офлайн-чергу.`]);
          break;
        }
      }
    }
    setIsQaRunning(false);
  };

  return (
    <main className="w-full pt-20 bg-slate-50 flex-1">
      <div className="flex flex-col w-full">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
          
          {/* Заголовок сторінки VV WORK */}
          <div className="relative mb-12 overflow-hidden rounded-xl bg-white p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-100/30 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full shadow-sm mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-slate-700 uppercase tracking-wider font-semibold">Європейський координаційний центр VV WORK</span>
              </div>
              <h1 className="text-3xl md:text-4xl text-slate-900 tracking-tight mb-3 font-extrabold">
                Контакти та координація — VV WORK
              </h1>
              <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
                Комплексна допомога з офіційним працевлаштуванням у ЄС, оформленням візових документів, дозволів та надійним житлом. Пряма юридична підтримка кожного кандидата.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100">
                  <span className="text-xs text-slate-500 block">Ліцензія Мінсоцполітики</span>
                  <span className="text-lg text-emerald-800 font-bold">№1428</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100">
                  <span className="text-xs text-slate-500 block">Плата з шукача</span>
                  <span className="text-lg text-blue-600 font-bold">0 ₴ Безкоштовно</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100">
                  <span className="text-xs text-slate-500 block">Офіційні хаби в ЄС</span>
                  <span className="text-lg text-slate-900 font-bold">3 офіси (PL, DE, UA)</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100">
                  <span className="text-xs text-slate-500 block">Соціальне страхування</span>
                  <span className="text-lg text-blue-600 font-bold">ZUS / AOK 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Секція форми та стенду QA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* ФОРМА ЗВОРОТНОГО ЗВ'ЯЗКУ */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Зворотний зв'язок</span>
                    <h2 className="text-xl md:text-2xl text-slate-900 font-bold">Залишити запит координатору</h2>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-blue-600 text-[16px]">verified_user</span>
                    <span className="text-xs text-slate-600 font-medium">Безкоштовно для шукача</span>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
                  
                  {/* 1. Ім'я */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm text-slate-900 font-semibold" htmlFor="clientName">
                        Ваше ім'я <span className="text-red-500">*</span>
                      </label>
                      {isNameValid && (
                        <span className="text-xs inline-flex items-center gap-1 font-semibold text-emerald-800">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span> Валідно
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        className={`w-full h-11 px-4 rounded-lg bg-slate-100 text-slate-900 text-sm outline-none border transition-all ${
                          touchedName && !isNameValid ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-blue-600 focus:bg-white'
                        }`}
                        id="clientName" 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        onBlur={() => setTouchedName(true)}
                        placeholder="Введіть ваше ім'я (мінімум 2 символи)" 
                        type="text" 
                      />
                      {isNameValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-emerald-800">done_all</span>}
                      {touchedName && !isNameValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-red-500">priority_high</span>}
                    </div>
                    {touchedName && !isNameValid && (
                      <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">error</span>
                        <span>Ім'я має містити щонайменше 2 символи</span>
                      </p>
                    )}
                  </div>

                  {/* 2. Контакт */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm text-slate-900 font-semibold" htmlFor="clientContact">
                        Номер телефону або Telegram <span className="text-red-500">*</span>
                      </label>
                      {isContactValid && (
                        <span className="text-xs inline-flex items-center gap-1 font-semibold text-emerald-800">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span> Формат коректний
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        className={`w-full h-11 px-4 rounded-lg bg-slate-100 text-slate-900 text-sm outline-none border transition-all ${
                          touchedContact && !isContactValid ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-blue-600 focus:bg-white'
                        }`}
                        id="clientContact" 
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        onBlur={() => setTouchedContact(true)}
                        placeholder="+380XXXXXXXXX або @username" 
                        type="text" 
                      />
                      {isContactValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-emerald-800">check_circle</span>}
                      {touchedContact && !isContactValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-red-500">error</span>}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      {touchedContact && !isContactValid ? (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">error</span>
                          <span>Вкажіть телефон у форматі +380... або Telegram-нікнейм через @username</span>
                        </p>
                      ) : (
                        <span className="text-xs text-slate-400">Приклади: +380671234567 або @vv_candidate</span>
                      )}
                    </div>
                  </div>

                  {/* 3. Повідомлення */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm text-slate-900 font-semibold" htmlFor="clientMessage">
                        Повідомлення чи бажана вакансія <span className="text-slate-400 font-normal text-xs">(опційно)</span>
                      </label>
                      <span className="text-xs text-slate-400 font-mono">{clientMessage.length} / 500</span>
                    </div>
                    <textarea 
                      className="w-full p-4 rounded-lg bg-slate-100 text-slate-900 text-sm outline-none border border-transparent focus:border-blue-600 focus:bg-white resize-none transition-all"
                      id="clientMessage" 
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      maxLength={500} 
                      placeholder="Наприклад: 'Цікавить вакансія водія CE або склад у Варшаві. Є біометрія, потрібна допомога з житлом.'" 
                      rows={3}
                    ></textarea>
                  </div>

                  {/* GDPR згода */}
                  <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <input 
                      className="mt-1 w-4 h-4 rounded text-blue-600 bg-white focus:ring-blue-600 border-slate-300 cursor-pointer" 
                      id="gdprConsent" 
                      type="checkbox" 
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                    />
                    <label className="text-xs text-slate-600 cursor-pointer leading-relaxed" htmlFor="gdprConsent">
                      Згоден(на) на обробку даних згідно з регламентом GDPR та Законом України про захист персональних даних для підбору легальної вакансії.
                    </label>
                  </div>

                  {/* Кнопка сабміту */}
                  <div>
                    <button 
                      className={`w-full h-12 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md transition-all ${
                        isSubmitting ? 'bg-blue-400 cursor-not-allowed' : submitStatus === 'success' ? 'bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      id="submitBtn" 
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                          <span>Відправка запиту...</span>
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <span className="material-symbols-outlined text-[20px]">check_circle</span>
                          <span>Консультацію замовлено</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[20px]">send</span>
                          <span>Замовити консультацію</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>

                {/* Оптимістичний UI блок */}
                {submitStatus !== 'idle' && (
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg shadow-sm border border-blue-600/20">
                    <div className="flex items-center gap-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${submitStatus === 'success' ? 'bg-emerald-700 text-white' : 'bg-blue-600 text-white'}`}>
                        <span className={`material-symbols-outlined text-[16px] ${submitStatus === 'loading' ? 'animate-spin' : ''}`}>
                          {submitStatus === 'success' ? 'check' : 'sync'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600 font-bold">
                            {submitStatus === 'loading' ? 'Оптимістичний UI активовано' : 'Заявку успішно прийнято!'}
                          </span>
                          <span className={`text-xs font-semibold ${submitStatus === 'success' ? 'text-emerald-800' : 'text-slate-500'}`}>
                            {submitStatus === 'loading' ? 'Черга відправки' : 'Синхронізовано 200 OK'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {submitStatus === 'loading' ? 'Запит локально прийнято, синхронізуємо з сервером VV WORK...' : 'Координатор зв’яжеться з вами найближчим часом за вказаним контактом.'}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-4">
                      <div className={`bg-blue-600 h-full transition-all duration-700 ${submitStatus === 'success' ? 'w-full' : 'w-2/5'}`}></div>
                    </div>
                  </div>
                )}

              </div>

              <div className="mt-8 p-3 bg-slate-100 rounded-lg flex items-center gap-3 text-slate-600 text-xs">
                <span className="material-symbols-outlined text-emerald-800 text-[20px]">verified</span>
                <span>Ліцензія Мінсоцполітики України №1428. 0 ₴ плати з шукачів за працевлаштування.</span>
              </div>
            </div>

            {/* ІНТЕРАКТИВНИЙ СТЕНД QA / МОНІТОР API ТА RETRY */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-[22px]">hub</span>
                    <h3 className="text-lg text-slate-900 font-bold">Стенд QA: Монітор API та Retry</h3>
                  </div>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    ТЗ: Fetch-обгортка
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg mb-4 border border-blue-600/10 text-xs text-slate-600 leading-relaxed">
                  <strong>Згідно з ТЗ розробника:</strong> Дані завантажуються через fetch-обгортку, що симулює реальний API: випадкова затримка <strong>300–800мс</strong>, випадкова помилка 1 з 5 (<strong>~15-20%</strong>), retry-механізм з <strong>експоненційним бекоффом</strong>.
                </div>

                <div className="bg-slate-100 p-3 rounded-lg space-y-1 mb-4 font-mono text-[12px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Latency Range:</span>
                    <span className="font-semibold text-slate-900">300ms – 800ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fail Rate:</span>
                    <span className="font-semibold text-red-500">~15–20% (1 з 5)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retry Strategy:</span>
                    <span className="font-semibold text-blue-600">Exponential Backoff (x2)</span>
                  </div>
                </div>

                {/* Термінал логів */}
                <div className="bg-[#0f172a] text-slate-200 p-4 rounded-lg font-mono text-[12px] space-y-2 mb-4 min-h-[140px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-700 pb-1 mb-2">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> TERMINAL / API MONITOR</span>
                      <span>POST /api/v1/leads</span>
                    </div>
                    <div className="space-y-1">
                      {qaLogs.map((log, idx) => (
                        <p key={idx} className="text-slate-300" dangerouslySetInnerHTML={{ __html: log }}></p>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                    <span>Останній статус: <span className="text-emerald-400 font-bold">{qaStatus}</span></span>
                    <span>Latency: {qaLatency}</span>
                  </div>
                </div>

                <button 
                  className={`w-full h-11 text-white text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm ${
                    isQaRunning ? 'bg-slate-700 cursor-not-allowed opacity-70' : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                  onClick={runQaApiSimulation}
                  type="button"
                  disabled={isQaRunning}
                >
                  <span className={`material-symbols-outlined text-[18px] ${isQaRunning ? 'animate-spin' : ''}`}>
                    {isQaRunning ? 'progress_activity' : 'replay'}
                  </span>
                  <span>{isQaRunning ? 'Виконання запиту...' : 'Зробити тестовий сабміт з ретраєм'}</span>
                </button>
              </div>

              {/* Служба підтримки */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-blue-600 text-[24px]">support_agent</span>
                    <h3 className="text-lg text-slate-900 font-bold">Служба підтримки та координатори</h3>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between items-center py-1.5 bg-slate-50 px-3 rounded-lg">
                      <span className="font-semibold text-slate-900">Понеділок – П'ятниця</span>
                      <span className="font-mono text-blue-600 font-bold">08:00 – 20:00 (CET)</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3">
                      <span className="text-slate-600">Субота (Черговий рекрутер)</span>
                      <span className="font-mono text-slate-400">09:00 – 16:00 (CET)</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3">
                      <span className="text-slate-600">Неділя</span>
                      <span className="font-mono text-slate-400">Автоматичний розподіл анкет</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-sm text-slate-900 font-semibold">Гаряча лінія трансферу та житла</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Супровід куратора 24/7 під час перетину кордону, заселення в гуртожиток або договірної реєстрації.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* МЕРЕЖА ХАБІВ ТА ОФІСІВ VV WORK У ЄС */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Географія присутності</span>
                <h2 className="text-2xl md:text-3xl text-slate-900 font-bold">Мережа хабів та офісів VV WORK у ЄС</h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
                Особистий прийом кандидатів, оформлення польських декларацій, віз Ван дер Ельста та підписання оригіналів трудових угод.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Варшава */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                      <span className="text-[18px]">🇵🇱</span>
                      <span className="text-sm font-bold text-slate-900">Польща</span>
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-0.5 rounded-full">Центральний хаб</span>
                  </div>
                  <h3 className="text-base text-slate-900 mb-1 font-bold">Хаб у Варшаві</h3>
                  <p className="text-xs text-slate-600 flex items-start gap-1 mb-4">
                    <span className="material-symbols-outlined text-slate-400 text-[18px] mt-0.5">location_on</span>
                    <span>Al. Jerozolimskie 142B, 02-305 Warszawa</span>
                  </p>
                  <div className="space-y-1 mb-4">
                    <a className="text-lg text-blue-600 font-bold block hover:underline" href="tel:+48224198200">+48 22 419 82 00</a>
                    <span className="text-xs text-slate-400 block">warszawa@vvwork.eu</span>
                    <div className="text-xs text-slate-600 font-medium pt-1">
                      <span className="material-symbols-outlined text-[14px] align-middle text-blue-600">schedule</span> Пн-Пт: 08:30 - 18:30
                    </div>
                  </div>
                </div>
                <div className="w-full h-40 bg-cover bg-center rounded-lg shadow-inner mt-4 border border-slate-200" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuqskxdnqTUrpbz5Vzab3by-JtGwe1lCMr2DXwGO4io1x5Hep6pcCuhsO2fn5vNx9sYXdUUsnVsFpG-LGx9rjgB4sS0o1o8k1J_-di0tvP_szjygS_Ecg_ymiwSrQxBoJcx2TDDEEZuqha6Z05g-qxm5NehGv2FXHGAsUEULZzaYE5ieVsFRMRtALlev6L98FCxbVlVC353H0Wlpgoi57JTa68mMl7Q2XexcCoc4gfTzOZy-BtMx5O')` }}></div>
              </div>

              {/* Берлін */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                      <span className="text-[18px]">🇩🇪</span>
                      <span className="text-sm font-bold text-slate-900">Німеччина</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-0.5 rounded-full">Візовий хаб</span>
                  </div>
                  <h3 className="text-base text-slate-900 mb-1 font-bold">Хаб у Берліні</h3>
                  <p className="text-xs text-slate-600 flex items-start gap-1 mb-4">
                    <span className="material-symbols-outlined text-slate-400 text-[18px] mt-0.5">location_on</span>
                    <span>Friedrichstraße 95, 10117 Berlin</span>
                  </p>
                  <div className="space-y-1 mb-4">
                    <a className="text-lg text-blue-600 font-bold block hover:underline" href="tel:+49305201430">+49 30 520 14 30</a>
                    <span className="text-xs text-slate-400 block">berlin@vvwork.eu</span>
                    <div className="text-xs text-slate-600 font-medium pt-1">
                      <span className="material-symbols-outlined text-[14px] align-middle text-blue-600">schedule</span> Пн-Пт: 09:00 - 18:00
                    </div>
                  </div>
                </div>
                <div className="w-full h-40 bg-cover bg-center rounded-lg shadow-inner mt-4 border border-slate-200" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPPFsvXrfs7RzO_b_S7Wunxe0kvoCzo6AoBiRWV_vdCI9w_xpdiN3xXyllzI9Iy6l3jLm0k0CGFwh7fNfgfESmBYMBUy57kMR4cH_DNionTfwgUwFtTDlFRrPnMXxrVOf7CXHiiYuG1CMgqQyZWGPFJvK1ipM3GOpACEuG0TPUNqEWo98cNnrHsM9lOrBqKYN72Wz0DDXh8eSnJlmGuFAxl5eyYYUi9UrPqO9cqblvnTtq8aeCd9z1')` }}></div>
              </div>

              {/* Київ */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                      <span className="text-[18px]">🇺🇦</span>
                      <span className="text-sm font-bold text-slate-900">Україна</span>
                    </div>
                    <span className="bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-0.5 rounded-full">Головний центр</span>
                  </div>
                  <h3 className="text-base text-slate-900 mb-1 font-bold">Хаб у Києві</h3>
                  <p className="text-xs text-slate-600 flex items-start gap-1 mb-4">
                    <span className="material-symbols-outlined text-slate-400 text-[18px] mt-0.5">location_on</span>
                    <span>вул. Велика Васильківська, 72, 03150 Київ</span>
                  </p>
                  <div className="space-y-1 mb-4">
                    <a className="text-lg text-blue-600 font-bold block hover:underline" href="tel:+380442908811">+380 44 290 88 11</a>
                    <span className="text-xs text-slate-400 block">kyiv@vvwork.eu</span>
                    <div className="text-xs text-slate-600 font-medium pt-1">
                      <span className="material-symbols-outlined text-[14px] align-middle text-blue-600">schedule</span> Пн-Пт: 09:00 - 19:00, Сб: 10:00 - 15:00
                    </div>
                  </div>
                </div>
                <div className="w-full h-40 bg-cover bg-center rounded-lg shadow-inner mt-4 border border-slate-200" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcUlDAYLa_yIupNoY8D4KC1YU1SHztfxqbTwsPGeTKyHshbSn_gyJyuddlhtSC1-iEF_JDIO5-rtchxmJVSkLbzmezQ578rzMeOlFk9dtjaXzoWVbDMxTZGuifw1pHxL2xO9X6hKsmUQvv2W8FDSFwgD5KUvWp8MBKmIN6LlDzZ1v4HPFo9fGi7rbU2wtryPsWjaYoCd20vZbbZSiOCIWt134aYiYHsv6MDWDj0WjQHaN_iCIDcDOT')` }}></div>
              </div>

            </div>
          </div>

          {/* FAQ ТА ЮРИДИЧНІ ГАРАНТІЇ */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 mb-12">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Правовий захист</span>
              <h2 className="text-xl md:text-2xl text-slate-900 font-bold">FAQ та юридичні гарантії VV WORK</h2>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Офіційні стандарти роботи міжнародної платформи працевлаштування відповідно до Ліцензії Мінсоцполітики №1428.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* FAQ 1 */}
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 transition-all">
                <button 
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer select-none" 
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  type="button"
                >
                  <span className="text-base text-slate-900 font-semibold">
                    Чи законно брати кошти з шукача за працевлаштування?
                  </span>
                  <span className="material-symbols-outlined text-blue-600">
                    {openFaq === 1 ? 'expand_circle_up' : 'expand_circle_down'}
                  </span>
                </button>
                {openFaq === 1 && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <strong>Категорично ні — 0 грн плати з шукача.</strong> Відповідно до Закону України «Про зайнятість населення» та норм Ліцензії Мінсоцполітики №1428, а також Директив Європейського Парламенту, будь-яка плата з працівника за вакансію заборонена. Послуги рекрутингу та підготовки документів повністю сплачує ліцензований роботодавець ЄС.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 transition-all">
                <button 
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer select-none" 
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  type="button"
                >
                  <span className="text-base text-slate-900 font-semibold">
                    Яке медичне та пенсійне страхування надається працівникам?
                  </span>
                  <span className="material-symbols-outlined text-slate-400">
                    {openFaq === 2 ? 'expand_circle_up' : 'expand_circle_down'}
                  </span>
                </button>
                {openFaq === 2 && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Кожен кандидат укладає прямий трудовий договір (Umowa o pracę / Arbeitsvertrag). З першого робочого дня діє повне державне страхування: <strong>ZUS (Zakład Ubezpieczeń Społecznych)</strong> у Польщі або <strong>AOK / Barmer</strong> у Німеччині. Це гарантує безкоштовне медичне обслуговування, лікарняні виплати та офіційний трудовий стаж.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 transition-all">
                <button 
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer select-none" 
                  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  type="button"
                >
                  <span className="text-base text-slate-900 font-semibold">
                    Як перевірити дозвільні документи та договір перед виїздом?
                  </span>
                  <span className="material-symbols-outlined text-slate-400">
                    {openFaq === 3 ? 'expand_circle_up' : 'expand_circle_down'}
                  </span>
                </button>
                {openFaq === 3 && (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      До моменту перетину кордону ви отримуєте оригінали чи верифіковані електронні копії дозволів (Oświadczenie / Zezwolenie або Vorabzustimmung від Федерального агентства праці Німеччини), зареєстровані у реєстрах воєводств або Arbeitsagentur. Координатор VV WORK перевіряє код роботодавця у базі KRS або Handelsregister.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* БАНЕР ТЕЛЕГРАМ-БОТА VV WORK */}
          <div className="rounded-xl bg-slate-900 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Потрібна миттєва перевірка документів або консультація?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Підключіться до офіційного бота VV WORK Support у Telegram для швидкого замовлення консультації, перевірки візових коридорів та нових вакансій 24/7.
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <a className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm" href="https://t.me" rel="noopener noreferrer" target="_blank">
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Підключитись у Telegram</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};