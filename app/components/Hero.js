import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-[#367DC1] text-white min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left - Text */}
        <div className="text-center lg:text-left max-w-xl">
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

        {/* Right - Image */}
        <div className="w-full max-w-sm">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/orthopedic-product.jpg" // ganti path sesuai gambar kamu
              alt="Orthopedic Implant"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
