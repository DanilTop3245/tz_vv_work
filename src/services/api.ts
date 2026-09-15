import type { Job } from '../types';

export const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Оператор виробничої лінії на автозавод', category: 'Виробництво', salary: '€2,800 – €3,200 /міс нетто', location: '🇩🇪 Лейпциг, Німеччина', company: 'Volkswagen Group', type: 'Повний день' },
  { id: '2', title: 'Комплектувальник на логістичні склади', category: 'Логістика', salary: '6,200 – 7,800 PLN /міс нетто', location: '🇵🇱 Вроцлав, Польща', company: 'DPD Logistics Hub', type: 'З житлом' },
  { id: '3', title: 'Працівник у тепличні комплекси', category: 'Інші', salary: '€2,250 – €2,600 /міс нетто', location: '🇳🇱 Роттердам, Нідерланди', company: 'AgroFlora Westland', type: 'Сезонна' },
  { id: '4', title: 'Муляр-монтажник (Будівництво)', category: 'Будівництво', salary: '7,500 – 9,500 PLN /міс нетто', location: '🇵🇱 Варшава, Польща', company: 'EuroBuild Sp. z o.o.', type: 'Повний день' },
  { id: '5', title: 'Водій міжнародних перевезень C+E', category: 'Водії', salary: '€2,500 – €3,100 /міс нетто', location: '🇪🇺 Міжнародні рейси ЄС', company: 'Global Trans Log', type: 'Вахта' },
  { id: '6', title: 'Кухар / Помічник кухаря (HoReCa)', category: 'HoReCa', salary: '€2,100 – €2,400 /міс нетто', location: '🇩🇪 Мюнхен, Німеччина', company: 'Hotel Bavaria', type: 'Повний день' },
];

export async function mockFetch<T>(data: T, shouldFailRate: number = 0.2): Promise<T> {
  const delay = Math.floor(Math.random() * (800 - 300 + 1)) + 300;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < shouldFailRate) {
    throw new Error('Помилка сервера: не вдалося завантажити дані.');
  }

  return data;
}

export async function fetchWithRetry<T>(fn: () => Promise<T>, retries: number = 2): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function fetchPartnerJobs(slug?: string): Promise<Job[]> {
  const data = slug && slug !== 'all'
    ? MOCK_JOBS.filter((j) => j.company.toLowerCase().includes(slug.toLowerCase()))
    : MOCK_JOBS;
  return fetchWithRetry(() => mockFetch(data.length > 0 ? data : MOCK_JOBS));
}

export interface ContactSubmissionPayload {
  name: string;
  contact: string;
  message?: string;
}

export async function submitContactForm(payload: ContactSubmissionPayload): Promise<{ success: boolean; id: string }> {
  return mockFetch({ success: true, id: `lead_${Date.now()}_${payload.name.length}` }, 0.2);
}
