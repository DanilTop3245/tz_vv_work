export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: "Ім'я є обов'язковим для заповнення" };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: "Ім'я має містити щонайменше 2 символи" };
  }
  return { isValid: true, error: null };
}

export function validateContact(contact: string): ValidationResult {
  const trimmed = contact.trim();
  if (!trimmed) {
    return { isValid: false, error: "Контактні дані є обов'язковими" };
  }
  const phoneRegex = /^\+380\d{9}$/;
  const tgRegex = /^@[a-zA-Z0-9_]{4,32}$/;

  if (!phoneRegex.test(trimmed) && !tgRegex.test(trimmed)) {
    return {
      isValid: false,
      error: "Введіть коректний номер (+380XXXXXXXXX) або Telegram (@username)",
    };
  }
  return { isValid: true, error: null };
}

export function validateMessage(message: string): ValidationResult {
  if (message.length > 500) {
    return { isValid: false, error: "Повідомлення не повинно перевищувати 500 символів" };
  }
  return { isValid: true, error: null };
}

export interface ContactFormData {
  name: string;
  contact: string;
  message: string;
}

export interface FormErrors {
  name: string | null;
  contact: string | null;
  message: string | null;
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: FormErrors;
} {
  const nameRes = validateName(data.name);
  const contactRes = validateContact(data.contact);
  const messageRes = validateMessage(data.message);

  return {
    isValid: nameRes.isValid && contactRes.isValid && messageRes.isValid,
    errors: {
      name: nameRes.error,
      contact: contactRes.error,
      message: messageRes.error,
    },
  };
}
