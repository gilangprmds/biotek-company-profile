import Image from "next/image";
import { FaBriefcaseMedical, FaUserMd, FaHospital, FaMapMarkedAlt } from "react-icons/fa";

export default function OurWork() {
    return(
      <section className="bg-white py-16 px-4 md:py-24 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Text Content dengan Gambar */}
        <div className="md:w-1/2 relative" data-aos="fade-right">
          <div className="mb-8">
            <Image
              src="/img/work1.png"  // Ganti dengan path gambar Anda
              alt="Medical Team"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
          
          
        </div>

        {/* Stats Grid dengan Ikon */}
        <div className="md:w-1/2">
        <h2 className="text-blue-600 font-bold uppercase text-lg mb-4" data-aos="fade-up">
            OUR WORK
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-aos="fade-up">
            What We've Done For People
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed" data-aos="fade-up">
            PT. Biotek Inti Korporindo has more than 5 years of experience providing implant 
            products orthopedics for use by Orthopedic and Traumatology Specialists.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <StatCard 
              icon={<FaBriefcaseMedical className="w-full h-full" />}
              number="6578"
              label="Surgery Completed"
            />
            <StatCard 
              icon={<FaUserMd className="w-full h-full" />}
              number="1255"
              label="Orthopedic Specialists"
            />
            <StatCard 
              icon={<FaHospital className="w-full h-full" />}
              number="75"
              label="Hospitals"
            />
            <StatCard 
              icon={<FaMapMarkedAlt className="w-full h-full" />}
              number="1157"
              label="Area Coverage"
            />
          </div>
        </div>
      </div>
    </section>
    );
}

const StatCard = ({icon, number, label}) => {
  return (
    <div className="bg-blue-50 p-6 rounded-xl text-center transition-all hover:bg-blue-100" data-aos="zoom-in">
      <div className="mx-auto mb-4 w-12 h-12 text-blue-600">
        {icon}
      </div>
      <div className="text-blue-600 text-3xl font-bold mb-2">{number}</div>
      <div className="text-gray-600 text-sm uppercase font-medium">{label}</div>
    </div>
  );
};