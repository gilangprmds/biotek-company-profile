'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const testimonials = [
    {
      text: `"The products that are circulated have met the quality requirements, which are supported by documents such as the production number and distribution permit number."`,
      name: 'Margono Hospital',
      img: '/img/margono.png',
    },
    {
      text: `"PT. Biotek Inti Korporindo prepares the product following the Order Letter provided by the hospital. And send it on time according to the applicable working hours at the hospital."`,
      name: 'RSPAD',
      img: '/img/rspad.png',
    },
    {
      text: `"PT. Biotek Inti Korporindo guarantees that the products sold and delivered are in good condition, not expired, and in the original packaging from the drug, manufacturer concerned."`,
      name: 'Moewardi Hospitals',
      img: '/img/moewardi.png',
    },
    {
      text: `"The products that are circulated have met the quality requirements, which are supported by documents such as the production number and distribution permit number."`,
      name: 'Margono Hospital',
      img: '/img/margono.png',
    },
  ];

  return (
    <section id="testimonials" className="section-area py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-[550px] mx-auto mb-12">
          <h6 className="mb-2 text-lg font-semibold text-primary" data-aos="fade-up">Client Reviews</h6>
          <h2 className="mb-6 text-3xl font-bold" data-aos="fade-up">Our Testimonials</h2>
          <p data-aos="fade-up">
            There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
          </p>
        </div>

        <div className="relative">
          {/* Tombol kiri */}
          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md dark:bg-gray-700"
            data-aos="fade-up"
          >
                      <HiChevronLeft />

            {/* <i className="lni lni-arrow-left text-xl text-primary"></i> */}
          </button>
          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                {/* <div className="rounded-xl  bg-gray-100 px-5 py-8 shadow-md dark:bg-gray-800 sm:px-8">
                  <p className="mb-6 text-base text-gray-700 dark:text-gray-300">{t.text}</p>
                  <figure className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <Image src={t.img} alt={t.name} width={50} height={50} className="object-cover" />
                    </div>
                    <figcaption>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{t.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                    </figcaption>
                  </figure>
                </div> */}
            <div className="rounded-xl min-h-[380px] bg-gray-200 px-5 py-8 shadow-md dark:bg-gray-800 sm:px-8" data-aos="fade-up">
                <div className="h-full text-center">
                <Image width={1000} height={1000} alt={t.name} class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={t.img} />
                <p className="leading-relaxed">{t.text}</p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{t.name}</h2>
                <p className="text-gray-500">{t.role}</p>
                </div>
            </div>
              </SwiperSlide>
            ))}
          </Swiper>

          

          {/* Tombol kanan */}
          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-md dark:bg-gray-700"
            data-aos="fade-up"
          >
            {/* <i className="lni lni-arrow-right text-xl text-primary"></i> */}
            <HiChevronRight />
          </button>
        </div>
      </div>
    </section>
    
  );
}
