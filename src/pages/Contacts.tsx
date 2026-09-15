import React, { useEffect, useState } from 'react';
import { validateName, validateContact, validateMessage } from '../utils/validation';
import { submitContactForm } from '../services/api';

export default function Contacts() {
  useEffect(() => {
    if (document.querySelector('link[data-material-symbols]')) return;

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
    stylesheet.dataset.materialSymbols = 'true';
    document.head.appendChild(stylesheet);
  }, []);

  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [gdprConsent, setGdprConsent] = useState(true);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedContact, setTouchedContact] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [qaLogs, setQaLogs] = useState<string[]>([
    'Готовий до тестування fetch-обгортки.',
    'Натисніть кнопку нижче для емуляції запиту.'
  ]);
  const [qaStatus, setQaStatus] = useState<string>('IDLE (200 OK)');
  const [qaLatency, setQaLatency] = useState<string>('—');
  const [isQaRunning, setIsQaRunning] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const nameValidation = validateName(clientName);
  const contactValidation = validateContact(clientContact);
  const messageValidation = validateMessage(clientMessage);

  const isNameValid = nameValidation.isValid;
  const isContactValid = contactValidation.isValid;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouchedName(true);
    setTouchedContact(true);

    if (!isNameValid || !isContactValid || !messageValidation.isValid) return;

    setIsSubmitting(true);
    setSubmitStatus('loading');
    setSubmitError(null);

    try {
      await submitContactForm({
        name: clientName,
        contact: clientContact,
        message: clientMessage,
      });
      setSubmitStatus('success');
    } catch (err: unknown) {
      setSubmitStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Помилка мережі при відправці');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          'Запит успішно оброблено кластером VV WORK.'
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
    <main className="w-full pt-20 bg-slate-50 dark:bg-slate-950 flex-1 min-h-screen transition-colors duration-200">
      <div className="flex flex-col w-full">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
          
          <div className="relative mb-12 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-100/40 dark:bg-blue-600/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-100/30 dark:bg-emerald-600/10 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full shadow-xs mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider font-semibold">Європейський координаційний центр VV WORK</span>
              </div>
              <h1 className="text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight mb-3 font-extrabold">
                Контакти та координація — VV WORK
              </h1>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Комплексна допомога з офіційним працевлаштуванням у ЄС, оформленням візових документів, дозволів та надійним житлом. Пряма юридична підтримка кожного кандидата.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Ліцензія Мінсоцполітики</span>
                  <span className="text-lg text-emerald-700 dark:text-emerald-400 font-bold">№1428</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Плата з шукача</span>
                  <span className="text-lg text-blue-600 dark:text-blue-400 font-bold">0 ₴ Безкоштовно</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Офіційні хаби в ЄС</span>
                  <span className="text-lg text-slate-900 dark:text-white font-bold">3 офіси (PL, DE, UA)</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Соціальне страхування</span>
                  <span className="text-lg text-blue-600 dark:text-blue-400 font-bold">ZUS / AOK 100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Зворотний зв'язок</span>
                    <h2 className="text-xl md:text-2xl text-slate-900 dark:text-white font-bold">Залишити запит координатору</h2>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[16px]">verified_user</span>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Безкоштовно для шукача</span>
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm text-slate-900 dark:text-white font-semibold" htmlFor="clientName">
                        Ваше ім'я <span className="text-red-500">*</span>
                      </label>
                      {isNameValid && (
                        <span className="text-xs inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span> Валідно
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        className={`w-full h-11 px-4 rounded-xl text-sm outline-none border transition-all ${
                          touchedName && !isNameValid 
                            ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-slate-900 dark:text-white' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border-transparent focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900'
                        }`}
                        id="clientName" 
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        onBlur={() => setTouchedName(true)}
                        placeholder="Введіть ваше ім'я (мінімум 2 символи)" 
                        type="text" 
                      />
                      {isNameValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-emerald-600 dark:text-emerald-400">done_all</span>}
                      {touchedName && !isNameValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-red-500">priority_high</span>}
                    </div>
                    {touchedName && !isNameValid && (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">error</span>
                        <span>Ім'я має містити щонайменше 2 символи</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm text-slate-900 dark:text-white font-semibold" htmlFor="clientContact">
                        Номер телефону або Telegram <span className="text-red-500">*</span>
                      </label>
                      {isContactValid && (
                        <span className="text-xs inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span> Формат коректний
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input 
                        className={`w-full h-11 px-4 rounded-xl text-sm outline-none border transition-all ${
                          touchedContact && !isContactValid 
                            ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-slate-900 dark:text-white' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border-transparent focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900'
                        }`}
                        id="clientContact" 
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        onBlur={() => setTouchedContact(true)}
                        placeholder="+380XXXXXXXXX або @username" 
                        type="text" 
                      />
                      {isContactValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-emerald-600 dark:text-emerald-400">check_circle</span>}
                      {touchedContact && !isContactValid && <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-red-500">error</span>}
                    </div>
                    <div className="flex items-center justify-between mt-1.5">
                      {touchedContact && !isContactValid ? (
                        <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">error</span>
                          <span>Вкажіть телефон у форматі +380... або Telegram-нікнейм через @username</span>
                        </p>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500">Приклади: +380671234567 або @vv_candidate</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm text-slate-900 dark:text-white font-semibold" htmlFor="clientMessage">
                        Повідомлення чи бажана вакансія <span className="text-slate-400 dark:text-slate-500 font-normal text-xs">(опційно)</span>
                      </label>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{clientMessage.length} / 500</span>
                    </div>
                    <textarea 
                      className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none border border-transparent focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none transition-all"
                      id="clientMessage" 
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      maxLength={500} 
                      placeholder="Наприклад: 'Цікавить вакансія водія CE або склад у Варшаві. Є біометрія, потрібна допомога з житлом.'" 
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <input 
                      className="mt-1 w-4 h-4 rounded text-blue-600 bg-white dark:bg-slate-900 focus:ring-blue-600 border-slate-300 dark:border-slate-700 cursor-pointer" 
                      id="gdprConsent" 
                      type="checkbox" 
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                    />
                    <label className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer leading-relaxed" htmlFor="gdprConsent">
                      Згоден(на) на обробку даних згідно з регламентом GDPR та Законом України про захист персональних даних для підбору легальної вакансії.
                    </label>
                  </div>

                  <div>
                    <button 
                      className={`w-full h-12 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                        isSubmitting ? 'bg-blue-400 dark:bg-blue-500/50 cursor-not-allowed' : submitStatus === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
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

                {submitStatus !== 'idle' && (
                  <div className={`mt-6 p-4 rounded-xl shadow-xs border ${
                    submitStatus === 'error' ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60' : 'bg-slate-50 dark:bg-slate-800/80 border-blue-600/20 dark:border-blue-500/30'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        submitStatus === 'success' ? 'bg-emerald-600 text-white' : submitStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        <span className={`material-symbols-outlined text-[16px] ${submitStatus === 'loading' ? 'animate-spin' : ''}`}>
                          {submitStatus === 'success' ? 'check' : submitStatus === 'error' ? 'error' : 'sync'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-bold ${submitStatus === 'error' ? 'text-red-700 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                            {submitStatus === 'loading' ? 'Оптимістичний UI активовано' : submitStatus === 'error' ? 'Помилка відправки заявки' : 'Заявку успішно прийнято!'}
                          </span>
                          <span className={`text-xs font-semibold ${submitStatus === 'success' ? 'text-emerald-700 dark:text-emerald-400' : submitStatus === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {submitStatus === 'loading' ? 'Черга відправки' : submitStatus === 'error' ? '500 Network Error' : 'Синхронізовано 200 OK'}
                          </span>
                        </div>
                        <p className={`text-xs mt-0.5 ${submitStatus === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-300'}`}>
                          {submitStatus === 'loading'
                            ? 'Запит локально прийнято, синхронізуємо з сервером VV WORK...'
                            : submitStatus === 'error'
                            ? (submitError || 'Не вдалося відправити дані. Спробуйте ще раз.')
                            : 'Координатор зв’яжеться з вами найближчим часом за вказаним контактом.'}
                        </p>
                      </div>
                    </div>
                    {submitStatus === 'error' && (
                      <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-900/60 flex justify-end">
                        <button
                          type="button"
                          onClick={handleFormSubmit}
                          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">refresh</span>
                          <span>Спробувати знову (Retry)</span>
                        </button>
                      </div>
                    )}
                    {submitStatus !== 'error' && (
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-4">
                        <div className={`bg-blue-600 h-full transition-all duration-700 ${submitStatus === 'success' ? 'w-full' : 'w-2/5'}`}></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl flex items-center gap-3 text-slate-600 dark:text-slate-400 text-xs border border-transparent dark:border-slate-800">
                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[20px]">verified</span>
                <span>Ліцензія Мінсоцполітики України №1428. 0 ₴ плати з шукачів за працевлаштування.</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[22px]">hub</span>
                    <h3 className="text-lg text-slate-900 dark:text-white font-bold">Стенд QA: Монітор API та Retry</h3>
                  </div>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                    ТЗ: Fetch-обгортка
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl mb-4 border border-blue-600/10 dark:border-blue-500/20 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Згідно з ТЗ розробника:</strong> Дані завантажуються через fetch-обгортку, що симулює реальний API: випадкова затримка <strong>300–800мс</strong>, випадкова помилка 1 з 5 (<strong>~15-20%</strong>), retry-механізм з <strong>експоненційним бекоффом</strong>.
                </div>

                <div className="bg-slate-100 dark:bg-slate-800/60 p-3 rounded-xl space-y-1 mb-4 font-mono text-[12px] text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span>Latency Range:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">300ms – 800ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fail Rate:</span>
                    <span className="font-semibold text-red-500 dark:text-red-400">~15–20% (1 з 5)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retry Strategy:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Exponential Backoff (x2)</span>
                  </div>
                </div>

                <div className="bg-[#0f172a] dark:bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[12px] space-y-2 mb-4 min-h-[140px] flex flex-col justify-between border border-slate-800">
                  <div>
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 mb-2">
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
                  className={`w-full h-11 text-white text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                    isQaRunning ? 'bg-slate-700 dark:bg-slate-800 cursor-not-allowed opacity-70' : 'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700'
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

              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px]">support_agent</span>
                    <h3 className="text-lg text-slate-900 dark:text-white font-bold">Служба підтримки та координатори</h3>
                  </div>
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between items-center py-2 bg-slate-50 dark:bg-slate-800/60 px-3 rounded-xl">
                      <span className="font-semibold text-slate-900 dark:text-white">Понеділок – П'ятниця</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">08:00 – 20:00 (CET)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3">
                      <span className="text-slate-600 dark:text-slate-400">Субота (Черговий рекрутер)</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400">09:00 – 16:00 (CET)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3">
                      <span className="text-slate-600 dark:text-slate-400">Неділя</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400">Автоматичний розподіл анкет</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-sm text-slate-900 dark:text-white font-semibold">Гаряча лінія трансферу та житла</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Супровід куратора 24/7 під час перетину кордону, заселення в гуртожиток або договірної реєстрації.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Географія присутності</span>
                <h2 className="text-2xl md:text-3xl text-slate-900 dark:text-white font-bold">Мережа хабів та офісів VV WORK у ЄС</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mt-2 md:mt-0 leading-relaxed">
                Особистий прийом кандидатів, оформлення польських декларацій, віз Ван дер Ельста та підписання оригіналів трудових угод.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group border border-slate-200 dark:border-slate-800 hover:border-blue-500/40">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <span className="text-[18px]">🇵🇱</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Польща</span>
                    </div>
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-3 py-0.5 rounded-full">Центральний хаб</span>
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white mb-1 font-bold">Хаб у Варшаві</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1 mb-4">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[18px] mt-0.5">location_on</span>
                    <span>Al. Jerozolimskie 142B, 02-305 Warszawa</span>
                  </p>
                  <div className="space-y-1 mb-4">
                    <a className="text-lg text-blue-600 dark:text-blue-400 font-bold block hover:underline" href="tel:+48224198200">+48 22 419 82 00</a>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">warszawa@vvwork.eu</span>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium pt-1">
                      <span className="material-symbols-outlined text-[14px] align-middle text-blue-600 dark:text-blue-400">schedule</span> Пн-Пт: 08:30 - 18:30
                    </div>
                  </div>
                </div>
                <div className="w-full h-40 bg-cover bg-center rounded-xl shadow-inner mt-4 border border-slate-200 dark:border-slate-800" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuqskxdnqTUrpbz5Vzab3by-JtGwe1lCMr2DXwGO4io1x5Hep6pcCuhsO2fn5vNx9sYXdUUsnVsFpG-LGx9rjgB4sS0o1o8k1J_-di0tvP_szjygS_Ecg_ymiwSrQxBoJcx2TDDEEZuqha6Z05g-qxm5NehGv2FXHGAsUEULZzaYE5ieVsFRMRtALlev6L98FCxbVlVC353H0Wlpgoi57JTa68mMl7Q2XexcCoc4gfTzOZy-BtMx5O')` }}></div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group border border-slate-200 dark:border-slate-800 hover:border-blue-500/40">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <span className="text-[18px]">🇩🇪</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Німеччина</span>
                    </div>
                    <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-3 py-0.5 rounded-full">Візовий хаб</span>
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white mb-1 font-bold">Хаб у Берліні</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1 mb-4">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[18px] mt-0.5">location_on</span>
                    <span>Friedrichstraße 95, 10117 Berlin</span>
                  </p>
                  <div className="space-y-1 mb-4">
                    <a className="text-lg text-blue-600 dark:text-blue-400 font-bold block hover:underline" href="tel:+49305201430">+49 30 520 14 30</a>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">berlin@vvwork.eu</span>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium pt-1">
                      <span className="material-symbols-outlined text-[14px] align-middle text-blue-600 dark:text-blue-400">schedule</span> Пн-Пт: 09:00 - 18:00
                    </div>
                  </div>
                </div>
                <div className="w-full h-40 bg-cover bg-center rounded-xl shadow-inner mt-4 border border-slate-200 dark:border-slate-800" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPPFsvXrfs7RzO_b_S7Wunxe0kvoCzo6AoBiRWV_vdCI9w_xpdiN3xXyllzI9Iy6l3jLm0k0CGFwh7fNfgfESmBYMBUy57kMR4cH_DNionTfwgUwFtTDlFRrPnMXxrVOf7CXHiiYuG1CMgqQyZWGPFJvK1ipM3GOpACEuG0TPUNqEWo98cNnrHsM9lOrBqKYN72Wz0DDXh8eSnJlmGuFAxl5eyYYUi9UrPqO9cqblvnTtq8aeCd9z1')` }}></div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xs hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group border border-slate-200 dark:border-slate-800 hover:border-blue-500/40">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <span className="text-[18px]">🇺🇦</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Україна</span>
                    </div>
                    <span className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-0.5 rounded-full">Головний центр</span>
                  </div>
                  <h3 className="text-base text-slate-900 dark:text-white mb-1 font-bold">Хаб у Києві</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1 mb-4">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[18px] mt-0.5">location_on</span>
                    <span>вул. Велика Васильківська, 72, 03150 Київ</span>
                  </p>
                  <div className="space-y-1 mb-4">
                    <a className="text-lg text-blue-600 dark:text-blue-400 font-bold block hover:underline" href="tel:+380442908811">+380 44 290 88 11</a>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">kyiv@vvwork.eu</span>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium pt-1">
                      <span className="material-symbols-outlined text-[14px] align-middle text-blue-600 dark:text-blue-400">schedule</span> Пн-Пт: 09:00 - 19:00, Сб: 10:00 - 15:00
                    </div>
                  </div>
                </div>
                <div className="w-full h-40 bg-cover bg-center rounded-xl shadow-inner mt-4 border border-slate-200 dark:border-slate-800" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcUlDAYLa_yIupNoY8D4KC1YU1SHztfxqbTwsPGeTKyHshbSn_gyJyuddlhtSC1-iEF_JDIO5-rtchxmJVSkLbzmezQ578rzMeOlFk9dtjaXzoWVbDMxTZGuifw1pHxL2xO9X6hKsmUQvv2W8FDSFwgD5KUvWp8MBKmIN6LlDzZ1v4HPFo9fGi7rbU2wtryPsWjaYoCd20vZbbZSiOCIWt134aYiYHsv6MDWDj0WjQHaN_iCIDcDOT')` }}></div>
              </div>

            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-12 transition-colors">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Правовий захист</span>
              <h2 className="text-xl md:text-2xl text-slate-900 dark:text-white font-bold">FAQ та юридичні гарантії VV WORK</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Офіційні стандарти роботи міжнародної платформи працевлаштування відповідно до Ліцензії Мінсоцполітики №1428.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/40 transition-all duration-300">
                <button 
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer select-none hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors" 
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  type="button"
                >
                  <span className="text-base text-slate-900 dark:text-white font-semibold">
                    Чи законно брати кошти з шукача за працевлаштування?
                  </span>
                  <span className={`material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px] transform transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : 'rotate-0'}`}>
                    expand_more
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === 1 ? 'max-h-96 opacity-100 px-6 pb-6' : 'max-h-0 opacity-0 px-6 pb-0'}`}>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Категорично ні — 0 грн плати з шукача.</strong> Відповідно до Закону України «Про зайнятість населення» та норм Ліцензії Мінсоцполітики №1428, а також Директив Європейського Парламенту, будь-яка плата з працівника за вакансію заборонена. Послуги рекрутингу та підготовки документів повністю сплачує ліцензований роботодавець ЄС.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/40 transition-all duration-300">
                <button 
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer select-none hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors" 
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  type="button"
                >
                  <span className="text-base text-slate-900 dark:text-white font-semibold">
                    Яке медичне та пенсійне страхування надається працівникам?
                  </span>
                  <span className={`material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px] transform transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : 'rotate-0'}`}>
                    expand_more
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === 2 ? 'max-h-96 opacity-100 px-6 pb-6' : 'max-h-0 opacity-0 px-6 pb-0'}`}>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Кожен кандидат укладає прямий трудовий договір (Umowa o pracę / Arbeitsvertrag). З першого робочого дня діє повне державне страхування: <strong>ZUS (Zakład Ubezpieczeń Społecznych)</strong> у Польщі або <strong>AOK / Barmer</strong> у Німеччині. Це гарантує безкоштовне медичне обслуговування, лікарняні виплати та офіційний трудовий стаж.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800 hover:border-blue-500/40 transition-all duration-300">
                <button 
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer select-none hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors" 
                  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  type="button"
                >
                  <span className="text-base text-slate-900 dark:text-white font-semibold">
                    Як перевірити дозвільні документи та договір перед виїздом?
                  </span>
                  <span className={`material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px] transform transition-transform duration-300 ${openFaq === 3 ? 'rotate-180' : 'rotate-0'}`}>
                    expand_more
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === 3 ? 'max-h-96 opacity-100 px-6 pb-6' : 'max-h-0 opacity-0 px-6 pb-0'}`}>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    До моменту перетину кордону ви отримуєте оригінали чи верифіковані електронні копії дозволів (Oświadczenie / Zezwolenie або Vorabzustimmung від Федерального агентства праці Німеччини), зареєстровані у реєстрах воєводств або Arbeitsagentur. Координатор VV WORK перевіряє код роботодавця у базі KRS або Handelsregister.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 dark:from-slate-900 dark:to-slate-900 border border-transparent dark:border-slate-800 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Потрібна миттєва перевірка документів або консультація?
              </h3>
              <p className="text-sm text-slate-300 dark:text-slate-400 max-w-xl leading-relaxed">
                Підключіться до офіційного бота VV WORK Support у Telegram для швидкого замовлення консультації, перевірки візових коридорів та нових вакансій 24/7.
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <a className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm" href="https://t.me" rel="noopener noreferrer" target="_blank">
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Підключитись у Telegram</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}