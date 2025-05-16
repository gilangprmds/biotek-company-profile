import Image from "next/image";
import Link from "next/link";

export default function Services() {
    return(
        <section id="services" className="section-area">
        <div className="container">
          <div className="scroll-revealed text-center max-w-[550px] mx-auto mb-12" data-aos="fade-up">
            <h6 className="mb-2 block text-lg font-semibold text-primary">
              What we Serve
            </h6>
            <h2 className="mb-6">Our Best Services</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>

          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8"  data-aos="fade-up">
            <Link href={{ pathname: "/products", query: { category: "Hip Stem" } }}>
                <div className="bg-white p-8 shadow-xl rounded-md text-center group hover:-translate-y-3">
                <div
                  className="w-[70px] h-[70px] justify-self-center rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-white text-primary-color"
                >
                  <Image
                src="/img/hip.png"
                alt="Company Logo"
                width={100} // atur sesuai ukuran yang kamu inginkan
                height={100}
                className="w-full h-auto fill-primary-color"
                  />
                </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">HIP STEM</h3>
                    <p className="text-gray-600">Partial hip surgery is a procedure in which half of the hip joint
                    is replaced with a prosthetic or artificial joint, especially at the hip joint (femoral head).</p>
                </div>
              </Link>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8"  data-aos="fade-up">
            <Link href={{ pathname: "/products", query: { category: "Knee Stem" } }}>
                <div className="bg-white p-8 shadow-xl rounded-md text-center group hover:-translate-y-3">
                <div
                  className="w-[72px] h-[72px] justify-self-center rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-white text-primary-color"
                >
                  <Image
                src="/img/knee-stem.png"
                alt="Company Logo"
                width={100} // atur sesuai ukuran yang kamu inginkan
                height={100}
                className="w-full h-auto fill-primary-color"
                  />
                </div>                    <h3 className="text-xl font-bold text-gray-800 mb-2">Knee Stem</h3>
                    <p className="text-gray-600">Knee replacement, also known as knee arthroplasty, is a surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.</p>
                </div>
              </Link>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8" data-aos="fade-up">
            <Link href={{ pathname: "/products", query: { category: "Others" } }}>
                <div className="bg-white p-8 shadow-xl rounded-md text-center group hover:-translate-y-3" >
                <div
                  className="w-[70px] h-[70px] justify-self-center rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-white text-primary-color"
                >
                  <Image
                src="/img/rapid-test.png"
                alt="Company Logo"
                width={100} // atur sesuai ukuran yang kamu inginkan
                height={100}
                className="w-full h-auto fill-primary-color"
                  />
                </div>                    <h3 className="text-xl font-bold text-gray-800 mb-2">Rapid Test</h3>
                    <p className="text-gray-600">Rapid test is one of the methods used to detect infection for the detection of SARS-CoV-2, the virus that causes COVID-19 in the human body.</p>
                </div>
              </Link>
            </div>
        </div>

          {/* <div className="row">
            <div className="bg-primary text-white rounded-xl py-3 scroll-revealed col-12 sm:col-6 lg:col-4">
              <div className=" group hover:-translate-y-1">
                <div
                  className="w-[70px] h-[70px] justify-self-center rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-white text-primary-color"
                >
                  <Image
                src="/img/hip.png"
                alt="Company Logo"
                width={100} // atur sesuai ukuran yang kamu inginkan
                height={100}
                className="w-full h-auto fill-primary-color"
                  />
                </div>
                <div className="w-full">
                  <h4 className="text-[1.25rem]/tight text-center font-semibold mb-5">
                    HIP STEM
                  </h4>
                  <p className="text-center">
                  Partial hip surgery is a procedure in which half of the hip joint
                    is replaced with a prosthetic or artificial joint, especially at the hip joint (femoral head).
                  </p>
                </div>
              </div>
            </div>

            <div className="scroll-revealed col-12 sm:col-6 lg:col-4">
              <div className="group hover:-translate-y-1">
                <div
                  className="w-[70px] h-[70px] justify-self-center rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-primary text-primary-color"
                >
                  <i className="lni lni-tailwindcss"></i>
                </div>
                <div className="w-full">
                  <h4 className="text-[1.25rem]/tight text-center font-semibold mb-5">
                    KNEE STEM
                  </h4>
                  <p className="text-center">
                  Knee replacement, also known as knee arthroplasty, is a surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.
                  </p>
                </div>
              </div>
            </div>

            <div className="scroll-revealed col-12 sm:col-6 lg:col-4">
              <div className="group hover:-translate-y-1">
                <div
                  className="w-[70px] h-[70px] justify-self-center rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-primary text-primary-color"
                >
                  <i className="lni lni-gift"></i>
                </div>
                <div className="w-full">
                  <h4 className="text-[1.25rem]/tight text-center font-semibold mb-5">
                    RAPID TETS
                  </h4>
                  <p className="text-center">
                  Rapid test is one of the methods used to detect infection for the detection of SARS-CoV-2, the virus that causes COVID-19 in the human body.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    );
}