'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';


export default function Contact() {
  const t = useTranslations('Contact');

  const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
const [loading, setLoading] = useState(false);
const [feedback, setFeedback] = useState({ type: '', message: '' });

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const message = e.target.message.value;

  try {
    const res = await fetch('https://biotek.co.id/api/contact/send/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

  if (res.ok) {
        setFeedback({ type: 'success', message: 'Message sent successfully!' });
        e.target.reset(); // clear form
      } else {
        setFeedback({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedback({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='contact' className="section-area text-gray-600 body-font relative">
  <div className="container px-5 mx-auto flex flex-col-reverse lg:flex-row gap-10">
    {/* Map Section */}
    <div className="lg:w-2/3 md:w-1/2 bg-white  rounded-lg overflow-hidden sm:mr-10 relative min-h-[400px] sm:min-h-[400px]" data-aos="zoom-in">
      <iframe
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        title="map"
        marginHeight={0}
        marginWidth={0}
        scrolling="no"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.74072120031!2d106.81693477409554!3d-6.165466460421341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d84021ff11%3A0x2567547e744b87f7!2sPT.%20Biotek%20Inti%20Korporindo!5e0!3m2!1sid!2sid!4v1746438348432!5m2!1sid!2sid"
        style={{ filter: '' }}
      ></iframe>

      {/* Floating Info Box */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 bg-white rounded-lg shadow-lg p-4 w-[70%] sm:w-[400px] z-10">
      <div>
          <h2 className="font-semibold text-xs text-gray-900 tracking-widest">ADDRESS</h2>
          <p className="mt-1 text-sm">
            Komp. Pertokoan Duta Merlin, Jl. Gajah Mada No.3-5 2, RT.2/RW.8, Petojo Utara, Kecamatan Gambir, Jakarta Pusat 10130
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-xs text-gray-900 tracking-widest">EMAIL</h2>
          <a href="mailto:biotek.inti.korporindo@gmail.com" className="text-indigo-500 text-sm leading-relaxed">
            cs@biotek.co.id
          </a>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-xs text-gray-900 tracking-widest">PHONE</h2>
          <p className="text-sm leading-relaxed">(021) 633-4009</p>
        </div>
      </div>
    </div>

    {/* Contact Form */}
  
    <form onSubmit={handleSubmit} className="lg:w-1/3 bg-none flex flex-col w-full md:py-8 mt-8 md:mt-0">
      <h2 className="text-gray-900 mb-1 font-bold title-font" data-aos="fade-up">{t('title')}</h2>
      <p className="leading-relaxed mb-5 text-gray-600" data-aos="fade-up">{t('subtitle')}</p>

      <div className="relative mb-4" data-aos="fade-up">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">{t('form.name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4" data-aos="fade-up">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">{t('form.email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4" data-aos="fade-up">
        <label htmlFor="message" className="leading-7 text-sm text-gray-600">{t('form.message')}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
              <label htmlFor="message" className="leading-7 text-xs pb-1 italic text-gray-600">{t('form.submitMessage')}</label>
      <button 
      type='submit'
      disabled={loading}
      className="text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded text-lg" 
      data-aos="fade-up">
      {loading ? t('form.sending') : t('form.submit')}
      </button>
     {feedback.message && (
          <p className={feedback.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {feedback.message}
          </p>
        )}
      </form>
    </div>
</section>
  );
}
