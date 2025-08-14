import { FaShieldAlt, FaLock, FaUserCheck, FaInfoCircle } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto mt-5 px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-900 p-4 rounded-full" data-aos="fade-up">
              <FaShieldAlt className="text-4xl" />
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
                {t('intro')}
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6" data-aos="fade-up">
                <p className="flex items-start">
                  <FaInfoCircle className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                  <span>{t('policyScope')}</span>
                </p>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="space-y-12">
              <section>
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-4" data-aos="fade-up">
                    <FaLock className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800" data-aos="fade-up">{t('informationCollection.title')}</h2>
                </div>
                <p data-aos="fade-up">{t('informationCollection.intro')}</p>
                <ul className="list-disc pl-6 mt-2 space-y-2" data-aos="fade-up">
                  <li><strong>{t('informationCollection.personalData.title')}:</strong> {t('informationCollection.personalData.description')}</li>
                  <li><strong>{t('informationCollection.derivativeData.title')}:</strong> {t('informationCollection.derivativeData.description')}</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-4" data-aos="fade-up">
                    <FaUserCheck className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800" data-aos="fade-up">{t('informationUse.title')}</h2>
                </div>
                <p data-aos="fade-up">{t('informationUse.intro')}</p>
                <ul className="list-disc pl-6 mt-2 space-y-2" data-aos="fade-up">
                  <li>{t('informationUse.purposes.1')}</li>
                  <li>{t('informationUse.purposes.2')}</li>
                  <li>{t('informationUse.purposes.3')}</li>
                  <li>{t('informationUse.purposes.4')}</li>
                  <li>{t('informationUse.purposes.5')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">{t('informationSharing.title')}</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <p className="mb-4 text-gray-600" data-aos="fade-up">
                    {t('informationSharing.intro')}
                  </p>
                  <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2" data-aos="fade-up">
                    <li><span className="font-medium">{t('informationSharing.cases.1.title')}:</span> {t('informationSharing.cases.1.description')}</li>
                    <li><span className="font-medium">{t('informationSharing.cases.2.title')}:</span> {t('informationSharing.cases.2.description')}</li>
                    <li><span className="font-medium">{t('informationSharing.cases.3.title')}:</span> {t('informationSharing.cases.3.description')}</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">{t('dataSecurity.title')}</h2>
                <p data-aos="fade-up">
                  {t('dataSecurity.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">{t('thirdPartyWebsites.title')}</h2>
                <p className="mb-4 text-gray-600" data-aos="fade-up">
                  {t('thirdPartyWebsites.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">{t('policyChanges.title')}</h2>
                <p className="mb-4 text-gray-600" data-aos="fade-up">
                  {t('policyChanges.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6" data-aos="fade-up">{t('contact.title')}</h2>
                <p className="mb-4 text-gray-600" data-aos="fade-up">
                  {t('contact.intro')}
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2" data-aos="fade-up">
                  <li>{t('contact.email')}: cs@biotek.co.id</li>
                  <li>{t('contact.phone')}: (021) 633-4005</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}