import { describe, it, expect, vi } from 'vitest';
import {
  mockFetch,
  fetchPartnerJobs,
  submitContactForm,
  MOCK_JOBS,
} from '../api';

describe('API service and network simulation', () => {
  it('resolves data successfully when error rate is 0', async () => {
    const data = { test: 'value' };
    const result = await mockFetch(data, 0);
    expect(result).toEqual(data);
  });

  it('rejects with error when error rate is 1', async () => {
    await expect(mockFetch({ test: 'fail' }, 1)).rejects.toThrow(
      'Помилка сервера: не вдалося завантажити дані.'
    );
  });

  it('returns all mock jobs when slug is all or undefined', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const jobs = await fetchPartnerJobs();
    expect(jobs).toHaveLength(MOCK_JOBS.length);
    vi.restoreAllMocks();
  });

  it('submits contact form and returns generated ID', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const response = await submitContactForm({
      name: 'Данило',
      contact: '+380509876543',
      message: 'Запит на вакансію',
    });
    expect(response.success).toBe(true);
    expect(response.id).toContain('lead_');
    vi.restoreAllMocks();
  });

  it('handles retry pattern until successful response', async () => {
    let attempts = 0;
    const maxRetries = 3;

    const resilientFetch = async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error('Network timeout');
      }
      return { status: 200, data: 'ok' };
    };

    let result = null;
    for (let i = 0; i < maxRetries; i++) {
      try {
        result = await resilientFetch();
        break;
      } catch {
        continue;
      }
    }

    expect(attempts).toBe(3);
    expect(result).toEqual({ status: 200, data: 'ok' });
  });
});
