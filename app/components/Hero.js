import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-sky-800 to-blue-900 backdrop-blur-3xl text-white min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden">
      {/* Blurred Shape */}
  <div className="absolute inset-0">
    <div className="absolute -top-32 -left-32 w-[400px] h-[300px] rounded-full bg-sky-100 opacity-40 blur-3xl"></div>
    <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-sky-100 opacity-40 blur-3xl"></div>
  </div>
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left - Text */}
        <div className="text-center lg:text-left max-w-xl" data-aos="fade-right">
          <h1 className="tmb-6 text-3xl font-bold leading-snug text-primary-color sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-tight">
            The Best Choice <br />
            For a Healthier Future
          </h1>
          <p class="mx-auto mb-9 max-w-[600px] text-base text-primary-color sm:text-lg sm:leading-normal"
          >
            Health is a basic human need to be able to live productively. Create your healthy space with our products.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-[#367DC1] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>

        <div className="md:max-w-[520px] max-w-[200px] w-full relative mx-auto">
    <Image
        src="/img/hero2.png"
        alt="Orthopedic Implant"
        width={700}
        height={700}
        className="w-full h-auto object-cover"
    />
</div>
      </div>
      
    </section>
  );
}
