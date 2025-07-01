import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-24"
      style={{
        backgroundImage: "url('/img/hero-bg.png')", // replace with your image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-80"></div>

      {/* Content */}
      <div className="text-center relative z-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {t('title1')}<br />
          {t('title2')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">
        {t('subtitle')}
        </p>
        <a
          href="#about"
          className="inline-block bg-[#367DC1] text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 hover:text-white transition"
        >
          {t('learn-more')}
        </a>
      </div>
    </section>
  );
}
