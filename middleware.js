// middleware.js
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false // Nonaktifkan deteksi bahasa otomatis
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};