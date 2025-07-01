// src/i18n.js
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'id'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Validasi locale
  if (!locales.includes(locale)) notFound();

  // Load messages secara manual
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    console.error(`Error loading messages for ${locale}:`, error);
    notFound();
  }
});