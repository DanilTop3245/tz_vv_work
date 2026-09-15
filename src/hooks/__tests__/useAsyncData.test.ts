import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAsyncData } from '../useAsyncData';

describe('useAsyncData', () => {
  it('loads data successfully', async () => {
    const fetchMock = vi.fn().mockResolvedValue(['test item']);
    const { result } = renderHook(() => useAsyncData(fetchMock));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(['test item']);
    expect(result.current.error).toBeNull();
  });

  it('handles errors gracefully', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Помилка сервера'));
    const { result } = renderHook(() => useAsyncData(fetchMock));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Помилка сервера');
  });

  it('refetches data when refetch is called', async () => {
    let callCount = 0;
    const fetchMock = vi.fn().mockImplementation(async () => {
      callCount++;
      return `result ${callCount}`;
    });

    const { result } = renderHook(() => useAsyncData(fetchMock));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe('result 1');

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toBe('result 2');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
