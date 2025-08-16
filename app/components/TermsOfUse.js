import { FaBalanceScale, FaGavel, FaBook, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function TermsOfUse() {
  const t = useTranslations('TermsOfUse');

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto mt-5 px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-900 p-4 rounded-full" data-aos="fade-up">
              <FaBalanceScale className="text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-50" data-aos="fade-up">{t('title')}</h1>
          <p className="text-xl text-blue-50 max-w-3xl mx-auto" data-aos="fade-up">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="mb-10">
              <p className="text-gray-600 mb-6" data-aos="fade-up">
                {t('lastUpdated')}: August 14, 2025
              </p>
              <p className="mb-6" data-aos="fade-up">
                {t('welcomeMessage')}
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6" data-aos="fade-up">
                <p className="flex items-start">
                  <FaInfoCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>{t('disclaimer')}</span>
                </p>
              </div>
            </div>

            {/* Terms Sections */}
            <div className="space-y-12">
              <section>
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-4" data-aos="fade-up">
                    <FaBook className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800" data-aos="fade-up">1. {t('acceptance.title')}</h2>
                </div>
                <p data-aos="fade-up">
                  {t('acceptance.content')}
                </p>
              </section>

              <section>
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-4" data-aos="fade-up">
                    <FaShieldAlt className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800" data-aos="fade-up">2. {t('ipRights.title')}</h2>
                </div>
                <p data-aos="fade-up">
                  {t('ipRights.content')}
                </p>
                <p className="mt-4" data-aos="fade-up">
                  {t('ipRights.prohibitionsTitle')}
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2" data-aos="fade-up">
                  <li>{t('ipRights.prohibitions.1')}</li>
                  <li>{t('ipRights.prohibitions.2')}</li>
                  <li>{t('ipRights.prohibitions.3')}</li>
                  <li>{t('ipRights.prohibitions.4')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">3. {t('userResponsibilities.title')}</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <p className="mb-4 text-gray-600" data-aos="fade-up">
                    {t('userResponsibilities.intro')}
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2" data-aos="fade-up">
                    <li>{t('userResponsibilities.list.1')}</li>
                    <li>{t('userResponsibilities.list.2')}</li>
                    <li>{t('userResponsibilities.list.3')}</li>
                    <li>{t('userResponsibilities.list.4')}</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-4" data-aos="fade-up">
                    <FaGavel className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800" data-aos="fade-up">4. {t('liability.title')}</h2>
                </div>
                <p data-aos="fade-up">
                  {t('liability.content')}
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2" data-aos="fade-up">
                  <li>{t('liability.list.1')}</li>
                  <li>{t('liability.list.2')}</li>
                  <li>{t('liability.list.3')}</li>
                  <li>{t('liability.list.4')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">5. {t('externalLinks.title')}</h2>
                <p className="mb-4 text-gray-600" data-aos="fade-up">
                  {t('externalLinks.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">6. {t('availability.title')}</h2>
                <p className="mb-4 text-gray-600" data-aos="fade-up">
                  {t('availability.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">7. {t('governingLaw.title')}</h2>
                <p className="mb-4 text-gray-600" data-aos="fade-up">
                  {t('governingLaw.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">8. {t('contact.title')}</h2>
                <p className="mb-4 text-gray-600" data-aos="fade-up">
                  {t('contact.intro')}
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2" data-aos="fade-up">
                  <li>{t('contact.email')}: cs@biotek.co.id</li>
                  <li>{t('contact.phone')}: (021) 633-4009</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}