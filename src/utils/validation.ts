// utils/validation.ts

/**
 * Валидация имени
 * @param name - значение имени
 * @returns true, если имя валидное, иначе false
 */
export function validateName(name: string): boolean {
  const nameRegex = /^[A-ZА-Я][a-zа-я-]+$/;
  return nameRegex.test(name);
}

/**
 * Валидация логина
 * @param login - значение логина
 * @returns true, если логин валидный, иначе false
 */
export function validateLogin(login: string): boolean {
  const loginRegex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
  return loginRegex.test(login);
}

/**
 * Валидация email
 * @param email - значение email
 * @returns true, если email валидный, иначе false
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

/**
 * Валидация пароля
 * @param password - значение пароля
 * @returns true, если пароль валидный, иначе false
 */
export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
  return passwordRegex.test(password);
}

/**
 * Валидация телефона
 * @param phone - значение телефона
 * @returns true, если телефон валидный, иначе false
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phone);
}

/**
 * Валидация сообщения
 * @param message - значение сообщения
 * @returns true, если сообщение валидное (не пустое), иначе false
 */
export function validateMessage(message: string): boolean {
  return message.trim().length > 0;
}
