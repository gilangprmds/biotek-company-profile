'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isFading, setIsFading] = useState(false);
  const t = useTranslations('About');

  // Fungsi untuk mendapatkan konten tab
  const getTabContent = (tabId) => {
    const content = t.raw(`${tabId}.content`);
    return content.map((paragraph, index) => (
      <p key={index} className="mb-3">{paragraph}</p>
    ));
  };

  const handleTabChange = (id) => {
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(id);
      setIsFading(false);
    }, 200);
  };

  // Daftar tab dengan data yang diambil dari terjemahan
  const tabs = [
    {
      id: 'profile',
      label: t('profile.label'),
      image: '/img/about.png',
    },
    {
      id: 'vision',
      label: t('vision.label'),
      image: '/img/about2.png',
    },
    {
      id: 'history',
      label: t('history.label'),
      image: '/img/about3.png',
    },
  ];

  return (
    <section id="about" className="section-area py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 items-center">
          <div className="w-full max-w-[480px] mx-auto" data-aos="fade-right">
            <Image
              src={tabs.find((tab) => tab.id === activeTab)?.image || '/img/about.png'}
              alt="About image"
              width={480}
              height={400}
              className={`rounded-xl w-full h-auto transition-opacity duration-300 ${
                isFading ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>

          <div className="w-full">
            <h6 className="mb-2 text-lg font-semibold text-primary" data-aos="fade-up">{t('title1')}</h6>
            <h2 className="mb-6 text-2xl font-bold" data-aos="fade-up">
              {t('title')}
            </h2>

            <nav className="flex flex-wrap gap-4 my-8" role="tablist" aria-label="About us tabs" data-aos="fade-up">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`tabs-link inline-block py-2 px-4 rounded-md font-medium ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <div data-aos="fade-up">
              <div
                className={`relative min-h-[300px] transition-opacity duration-300 ease-in-out ${
                  isFading ? 'opacity-0' : 'opacity-100'
                }`}
                role="tabpanel"
              >
                {getTabContent(activeTab)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// import Image from "next/image";

// export default function About () {
// return(
//     <section id="about" className="section-area">
//         <div className="container">
//           <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
//             <div className="w-full">
//               <figure className="scroll-revealed max-w-[480px] mx-auto">
//                 <Image
//                   src="/img/about.png"
//                   alt="About image"
//                   width={500} // atur sesuai ukuran yang kamu inginkan
//                   height={700}
//                   className="rounded-xl"
//                 />
//               </figure>
//             </div>

//             <div className="w-full">
//               <div className="scroll-revealed">
//                 <h6 className="mb-2 block text-lg font-semibold text-primary">
//                   About Us
//                 </h6>
//                 <h2 className="mb-6">
//                     The Best Implant Orthopedic Distributor Company
//                 </h2>
//               </div>

//               <div className="tabs scroll-revealed">
//                 <nav
//                   className="tabs-nav flex flex-wrap gap-4 my-8"
//                   role="tablist"
//                   aria-label="About us tabs"
//                 >
//                   <button
//                     type="button"
//                     className="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
//                     data-web-toggle="tabs"
//                     data-web-target="tabs-panel-profile"
//                     id="tabs-list-profile"
//                     role="tab"
//                     aria-controls="tabs-panel-profile"
//                   >
//                     Our Profile
//                   </button>

//                   <button
//                     type="button"
//                     className="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
//                     data-web-toggle="tabs"
//                     data-web-target="tabs-panel-vision"
//                     id="tabs-list-vision"
//                     role="tab"
//                     aria-controls="tabs-panel-vision"
//                   >
//                     Our Vision
//                   </button>

//                   <button
//                     type="button"
//                     className="tabs-link inline-block py-2 px-4 rounded-md text-body-light-12 dark:text-body-dark-12 bg-body-light-12/10 dark:bg-body-dark-12/10 text-inherit font-medium hover:bg-primary hover:text-primary-color focus:bg-primary focus:text-primary-color"
//                     data-web-toggle="tabs"
//                     data-web-target="tabs-panel-history"
//                     id="tabs-list-history"
//                     role="tab"
//                     aria-controls="tabs-panel-history"
//                   >
//                     Our History
//                   </button>
//                 </nav>

//                 <div
//                   className="tabs-content mt-4"
//                   id="tabs-panel-profile"
//                   tabindex="-1"
//                   role="tabpanel"
//                   aria-labelledby="tabs-list-profile"
//                 >
//                   <p>
//                   We are the best orthopedic implant distributor company in Indonesia 
//                   that has collaborated with more than 100 hospitals throughout Indonesia.
//                   </p>
//                   <p>
//                   Our tools already have a distribution permit certificate from the authorized agency, so they are legal to distribute. 
//                   Our sales data has reached above 5000 pcs, which makes our company reliable to complete global demand.
//                   </p>
//                   <p>
//                   These orthopedic implants can prevent and diagnose and relieve disease, treat the sick, 
//                   restore health to humans, and/or shape structures body function.
//                   </p>
//                 </div>

//                 <div
//                   className="tabs-content mt-4"
//                   id="tabs-panel-vision"
//                   tabindex="-1"
//                   role="tabpanel"
//                   aria-labelledby="tabs-list-vision"
//                 >
//                   <p>
//                     It is a long established fact that a reader will be
//                     distracted by the readable content of a page when looking at
//                     its layout. The point of using Lorem Ipsum is that it has a
//                     more-or-less normal distribution of letters, look like
//                     readable English.
//                   </p>
//                   <p>
//                     There are many variations of passages of Lorem Ipsum
//                     available, but the majority have in some form, by injected
//                     humour.
//                   </p>
//                 </div>

//                 <div
//                   className="tabs-content mt-4"
//                   id="tabs-panel-history"
//                   tabindex="-1"
//                   role="tabpanel"
//                   aria-labelledby="tabs-list-history"
//                 >
//                   <p>
//                     It is a long established fact that a reader will be
//                     distracted by the readable content of a page when looking at
//                     its layout. The point of using Lorem Ipsum is that it has a
//                     more-or-less normal distribution of letters, look like
//                     readable English.
//                   </p>
//                   <p>
//                     There are many variations of passages of Lorem Ipsum
//                     available, but the majority have in some form, by injected
//                     humour.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
// );
// }