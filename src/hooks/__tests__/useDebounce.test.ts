import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 400));
    expect(result.current).toBe('initial');
  });

  it('debounces value updates after specified delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 400 } }
    );

    expect(result.current).toBe('first');

    rerender({ value: 'second', delay: 400 });
    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('second');

    vi.useRealTimers();
  });

  it('keeps only the latest value when rapid updates occur', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'ab' });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('a');

    rerender({ value: 'abc' });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('a');

    rerender({ value: 'abcd' });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('abcd');

    vi.useRealTimers();
  });
});
