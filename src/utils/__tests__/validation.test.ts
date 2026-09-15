import { describe, it, expect } from 'vitest';
import {
  validateName,
  validateContact,
  validateMessage,
  validateContactForm,
} from '../validation';

describe('validation utils', () => {
  describe('validateName', () => {
    it('returns invalid for empty name', () => {
      const res = validateName('');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Ім'я є обов'язковим для заповнення");
    });

    it('returns invalid for single character name', () => {
      const res = validateName('А');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Ім'я має містити щонайменше 2 символи");
    });

    it('returns valid for name with 2 or more characters', () => {
      expect(validateName('Олег').isValid).toBe(true);
      expect(validateName('Олена Шевченко').isValid).toBe(true);
    });

    it('handles whitespace properly', () => {
      expect(validateName('   ').isValid).toBe(false);
      expect(validateName('  Олег  ').isValid).toBe(true);
    });
  });

  describe('validateContact', () => {
    it('returns invalid for empty contact', () => {
      const res = validateContact('');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Контактні дані є обов'язковими");
    });

    it('validates Ukrainian phone number format (+380XXXXXXXXX)', () => {
      expect(validateContact('+380501234567').isValid).toBe(true);
      expect(validateContact('+380970000000').isValid).toBe(true);
      expect(validateContact('0501234567').isValid).toBe(false);
      expect(validateContact('+3801234').isValid).toBe(false);
      expect(validateContact('+48123456789').isValid).toBe(false);
    });

    it('validates Telegram handle format (@username)', () => {
      expect(validateContact('@oleg_recruiter').isValid).toBe(true);
      expect(validateContact('@anna123').isValid).toBe(true);
      expect(validateContact('@vv_work').isValid).toBe(true);
      expect(validateContact('oleg_recruiter').isValid).toBe(false);
      expect(validateContact('@a').isValid).toBe(false);
      expect(validateContact('@very_long_invalid_telegram_username_exceeding_thirty_two_symbols').isValid).toBe(false);
    });

    it('returns invalid for random text', () => {
      expect(validateContact('hello world').isValid).toBe(false);
      expect(validateContact('test@example.com').isValid).toBe(false);
    });
  });

  describe('validateMessage', () => {
    it('allows empty optional message', () => {
      expect(validateMessage('').isValid).toBe(true);
    });

    it('allows message under 500 characters', () => {
      expect(validateMessage('Цікавить вакансія оператора виробництва.').isValid).toBe(true);
    });

    it('rejects message exceeding 500 characters', () => {
      const longMessage = 'A'.repeat(501);
      const res = validateMessage(longMessage);
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Повідомлення не повинно перевищувати 500 символів');
    });
  });

  describe('validateContactForm', () => {
    it('validates a complete valid form object', () => {
      const result = validateContactForm({
        name: 'Михайло',
        contact: '+380671112233',
        message: 'Добрий день',
      });
      expect(result.isValid).toBe(true);
      expect(result.errors.name).toBeNull();
      expect(result.errors.contact).toBeNull();
      expect(result.errors.message).toBeNull();
    });

    it('returns multiple field errors on invalid form', () => {
      const result = validateContactForm({
        name: 'M',
        contact: 'invalid-contact',
        message: 'B'.repeat(501),
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).not.toBeNull();
      expect(result.errors.contact).not.toBeNull();
      expect(result.errors.message).not.toBeNull();
    });
  });
});
