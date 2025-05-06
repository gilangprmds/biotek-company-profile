export default function Contact2() {
    return(
        <section id="services" className="section-area">
        <div className="container">
          <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12">
            <h6 className="mb-2 block text-lg font-semibold text-primary">
              Services
            </h6>
            <h2 className="mb-6">Contact U</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>

          <div className="row">
          <div className="container px-5 mx-auto flex flex-col lg:flex-row gap-10">
    {/* Map Section */}
    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 relative min-h-[400px] sm:min-h-[400px]">
      <iframe
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        title="map"
        marginHeight={0}
        marginWidth={0}
        scrolling="no"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.74072120031!2d106.81693477409554!3d-6.165466460421341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d84021ff11%3A0x2567547e744b87f7!2sPT.%20Biotek%20Inti%20Korporindo!5e0!3m2!1sid!2sid!4v1746438348432!5m2!1sid!2sid"
        style={{ filter: 'contrast(1.2) opacity(0.4)' }}
      ></iframe>

      {/* Floating Info Box */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 bg-white rounded-lg shadow-lg p-4 w-[70%] sm:w-[300px] z-10">
      <div>
          <h2 className="font-semibold text-xs text-gray-900 tracking-widest">ADDRESS</h2>
          <p className="mt-1 text-sm">
            Komp. Pertokoan Duta Merlin, Jl. Gajah Mada No.3-5 2, RT.2/RW.8, Petojo Utara, Kecamatan Gambir, Jakarta Pusat 10130
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-xs text-gray-900 tracking-widest">EMAIL</h2>
          <a href="mailto:biotek.inti.korporindo@gmail.com" className="text-indigo-500 text-sm leading-relaxed">
            biotek.inti.korporindo@gmail.com
          </a>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-xs text-gray-900 tracking-widest">PHONE</h2>
          <p className="text-sm leading-relaxed">(021) 633-4005</p>
        </div>
      </div>
    </div>

    {/* Contact Form */}
    <div className="lg:w-1/3 bg-none flex flex-col w-full md:py-8 mt-8 md:mt-0">
      <h1 className="text-gray-900 mb-1 font-bold title-font">Contact Us</h1>
      <p className="leading-relaxed mb-5 text-gray-600">If you are interested in our products and want to know more details, please leave a message here, we will reply you as soon as we can.</p>

      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4">
        <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
        <textarea
          id="message"
          name="message"
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>

      <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Submit
      </button>

      <p className="text-xs text-gray-500 mt-3">
        Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
      </p>
    </div>
  </div>
          </div>
        </div>
      </section>
    );
}