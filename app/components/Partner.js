"use client";

import { useState } from "react";
import ClientModal from "./ClientModal";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const clients = [
  {
    title: "RS Sardjito",
    image: "/img/clients/RS Sardjito.png",
    description: "RSUP Dr. Sardjito adalah rumah sakit umum pusat kelas A yang berlokasi di Yogyakarta dan menjadi rumah sakit rujukan nasional sekaligus rumah sakit pendidikan bagi Universitas Gadjah Mada. Sejak berdiri pada tahun 1982, RSUP Dr. Sardjito telah menyediakan berbagai layanan kesehatan unggulan seperti Pusat Jantung Terpadu, Pusat Kanker Terpadu, serta layanan neuro-endovaskular, dengan komitmen memberikan pelayanan yang profesional, inovatif, dan berorientasi pada keselamatan pasien.",
  },
  {
  title: "Hermina Hospital Group",
  image: "/img/clients/Hermina Hospital Group.png",
  description: "Hermina Hospital Group adalah jaringan rumah sakit swasta di Indonesia yang menyediakan layanan kesehatan lengkap dan berkualitas dengan tenaga medis profesional. Salah satu cabangnya beralamat di Jl. Raya Bekasi Timur No. 73, Rawamangun, Jakarta Timur."
},
{
  title: "Mayapada Hospital",
  image: "/img/clients/Mayapada Hospital.png",
  description: "Mayapada Hospital merupakan rumah sakit swasta modern yang mengutamakan pelayanan pasien dengan fasilitas teknologi terkini. Rumah sakit ini berlokasi di Jl. Lebak Bulus Raya No. 7, Cilandak, Jakarta Selatan."
},
{
  title: "Primaya Hospital",
  image: "/img/clients/Primaya Hospital.png",
  description: "Primaya Hospital menyediakan layanan medis yang lengkap dengan pendekatan holistik dan fasilitas mutakhir. Salah satu cabangnya beralamat di Jl. Raya Serpong KM 7, Pakulonan, Tangerang Selatan."
},
{
  title: "RS Abdi Waluyo",
  image: "/img/clients/RS Abdi Waluyo.png",
  description: "RS Abdi Waluyo adalah rumah sakit yang dikenal dengan pelayanan kesehatan berkualitas dan dokter spesialis berpengalaman. Beralamat di Jl. Letjen S. Parman Kav. 84, Palmerah, Jakarta Barat."
},
{
  title: "RS EMC Tangerang",
  image: "/img/clients/RS EMC TANGERANG.png",
  description: "RS EMC Tangerang merupakan rumah sakit yang menyediakan layanan kesehatan dengan standar internasional dan fasilitas lengkap. Alamatnya di Jl. Gatot Subroto No. 99, Cikokol, Tangerang."
},
{
  title: "RS PMI Bogor",
  image: "/img/clients/RS PMI BOGOR.png",
  description: "RS PMI Bogor adalah rumah sakit yang menyediakan pelayanan kesehatan dengan dukungan Palang Merah Indonesia. Berada di Jl. Raya Pajajaran No. 12, Bogor Tengah, Bogor."
},
{
  title: "RS Pondok Indah",
  image: "/img/clients/RS Pondok Indah - Pondok Indah.png",
  description: "RS Pondok Indah adalah rumah sakit yang memberikan layanan kesehatan komprehensif dengan fasilitas modern di kawasan Pondok Indah, beralamat di Jl. Metro Pondok Indah Blok T/1, Jakarta Selatan."
},
{
  title: "RS Premier Bintaro",
  image: "/img/clients/RS Premier Bintaro.png",
  description: "RS Premier Bintaro menyediakan layanan kesehatan unggulan dengan tenaga medis berkompeten dan fasilitas lengkap. Berlokasi di Jl. Bintaro Utama Sektor 3, Tangerang Selatan."
},
{
  title: "RS Premier Jatinegara",
  image: "/img/clients/RS Premier Jatinegara.png",
  description: "RS Premier Jatinegara memberikan layanan kesehatan profesional dengan fasilitas modern, beralamat di Jl. Bekasi Timur Raya No. 1, Jatinegara, Jakarta Timur."
},
{
  title: "RS TELOGOREJO SEMARANG",
  image: "/img/clients/RS TELOGOREJO SEMARANG.png",
  description: "RS Telogorejo Semarang adalah rumah sakit yang dikenal dengan pelayanan kesehatan berkualitas dan tenaga medis berpengalaman. Berada di Jl. Kedung Mundu Raya No. 10, Semarang."
},
  {
  title: "Rs. Pku Muhammadiyah Solo",
  image: "/img/clients/Rs. Pku Muhammadiyah Solo.png",
  description: "Rs. Pku Muhammadiyah Solo adalah rumah sakit yang dikelola oleh Muhammadiyah dengan layanan kesehatan komprehensif. Beralamat di Jl. Dr. Rajiman No. 164, Solo, Jawa Tengah."
},
{
  title: "RS Cipto Mangunkusumo",
  image: "/img/clients/RSCM.png",
  description: "RS Cipto Mangunkusumo (RSCM) adalah rumah sakit pusat pendidikan dan pelayanan kesehatan milik Kementerian Kesehatan Republik Indonesia. Terletak di Jl. Diponegoro No. 71, Jakarta Pusat."
},
{
  title: "RSKB Halmahera Siaga",
  image: "/img/clients/RSKB Halmahera Siaga.png",
  description: "RSKB Halmahera Siaga adalah rumah sakit khusus bedah di Ternate yang menyediakan layanan kesehatan dengan fasilitas memadai. Berada di Jl. Tahir No. 10, Ternate, Maluku Utara."
},
{
  title: "RSPAD",
  image: "/img/clients/RSPAD.png",
  description: "RSPAD Gatot Soebroto adalah rumah sakit milik Tentara Nasional Indonesia yang melayani pelayanan medis umum dan khusus. Alamatnya di Jl. Dr. Sutomo No. 17, Jakarta Pusat."
},
{
  title: "RSPI Prof. Dr. Sulianti Saroso",
  image: "/img/clients/RSPIProf. Dr. Sulianti Saroso.png",
  description: "RSPI Prof. Dr. Sulianti Saroso adalah rumah sakit khusus penyakit infeksi dan paru di Jakarta. Beralamat di Jl. Raden Saleh Raya No. 6, Jakarta Pusat."
},
{
  title: "RSU Islam Harapan Anda",
  image: "/img/clients/RSU Islam Harapan Anda.png",
  description: "RSU Islam Harapan Anda adalah rumah sakit umum swasta yang menyediakan layanan kesehatan lengkap di Tangerang. Berada di Jl. Raya Serpong KM 7, Pakulonan, Tangerang Selatan."
},
{
  title: "RSU Muhammadiyah Siti Aminah Bumiayu",
  image: "/img/clients/RSU Muhammadiyah Siti Aminah Bumiayu.png",
  description: "RSU Muhammadiyah Siti Aminah Bumiayu adalah rumah sakit umum yang dikelola Muhammadiyah di Kabupaten Brebes. Beralamat di Jl. Pemuda No. 18, Bumiayu, Brebes, Jawa Tengah."
},
{
  title: "RSUD Banyumas",
  image: "/img/clients/RSUD Banyumas.png",
  description: "RSUD Banyumas adalah rumah sakit umum daerah di Purwokerto yang melayani berbagai jenis layanan kesehatan. Berada di Jl. Dr. Wahidin Sudiro Husodo No. 1, Purwokerto, Jawa Tengah."
},
{
  title: "RSUD CIBABAT",
  image: "/img/clients/RSUD CIBABAT.png",
  description: "RSUD Cibabat adalah rumah sakit umum daerah di Cimahi yang melayani masyarakat dengan fasilitas kesehatan memadai. Terletak di Jl. Raya Cibabat No. 21, Cimahi, Jawa Barat."
},
{
  title: "RSUD dr. Tjitrowardojo Purwo",
  image: "/img/clients/RSUD dr. Tjitrowardojo Purwo.png",
  description: "RSUD dr. Tjitrowardojo Purwo adalah rumah sakit umum daerah di Wonosobo dengan layanan kesehatan lengkap dan tenaga medis profesional. Beralamat di Jl. dr. Soetomo No. 12, Wonosobo, Jawa Tengah."
},
  {
  title: "RSUD Ir.SOEKARNO KABUPATEN SUKOHARJO",
  image: "/img/clients/RSUD Ir.SOEKARNO KABUPATEN SUKOHARJO.png",
  description: "RSUD Ir. Soekarno Sukoharjo adalah rumah sakit umum daerah yang melayani masyarakat dengan fasilitas medis lengkap. Beralamat di Jl. Ir. Soekarno No.1, Sukoharjo, Jawa Tengah."
},
{
  title: "RSUD Kabupaten Tangerang",
  image: "/img/clients/RSUD Kabupaten Tangerang.png",
  description: "RSUD Kabupaten Tangerang menyediakan layanan kesehatan untuk masyarakat Tangerang dengan fasilitas memadai. Berlokasi di Jl. Raya Serang No. 100, Tigaraksa, Tangerang."
},
{
  title: "RSUD MOEWARDI",
  image: "/img/clients/RSUD MOEWARDI.png",
  description: "RSUD Moewardi adalah rumah sakit milik Pemerintah Kota Surakarta dengan layanan kesehatan yang lengkap. Berada di Jl. Kolonel Sutarto No. 132, Surakarta, Jawa Tengah."
},
{
  title: "RSUD Prof. Dr. Margono Soekarjo",
  image: "/img/clients/RSUD Prof. Dr. Margono Soekarjo.png",
  description: "RSUD Prof. Dr. Margono Soekarjo adalah rumah sakit rujukan utama di Purwokerto dengan layanan medis lengkap. Terletak di Jl. Dr. Gumbreg No. 1, Purwokerto, Jawa Tengah."
},
{
  title: "Rumah Sakit Advent Bandung",
  image: "/img/clients/Rumah Sakit Advent Bandung.png",
  description: "Rumah Sakit Advent Bandung adalah rumah sakit swasta dengan pelayanan kesehatan komprehensif. Beralamat di Jl. Cihampelas No. 161, Bandung, Jawa Barat."
},
{
  title: "Rumah sakit Dr. Cipto Mangunkusumo",
  image: "/img/clients/Rumah sakit Dr. Cipto Mangunkusumo.png",
  description: "RSUP Dr. Cipto Mangunkusumo adalah rumah sakit pusat rujukan nasional di Jakarta. Terletak di Jl. Diponegoro No. 71, Jakarta Pusat."
},
{
  title: "Rumah Sakit Fatmawati",
  image: "/img/clients/Rumah Sakit Fatmawati.png",
  description: "Rumah Sakit Fatmawati adalah rumah sakit umum dengan fasilitas modern di Jakarta Selatan. Berada di Jl. RS Fatmawati Raya No. 4, Jakarta Selatan."
},
{
  title: "Rumah Sakit Immanuel Bandung",
  image: "/img/clients/Rumah Sakit Immanuel Bandung.png",
  description: "Rumah Sakit Immanuel Bandung adalah rumah sakit swasta dengan pelayanan medis komprehensif. Beralamat di Jl. Pasteur No. 38, Bandung, Jawa Barat."
},
{
  title: "Rumah Sakit JIH",
  image: "/img/clients/Rumah Sakit JIH.png",
  description: "Rumah Sakit JIH (Jantung Indonesia Harapan) adalah rumah sakit khusus jantung di Surakarta. Berlokasi di Jl. Dr. Rajiman No. 164, Surakarta, Jawa Tengah."
},
{
  title: "Rumah Sakit Kasih Ibu Surakarta",
  image: "/img/clients/Rumah Sakit Kasih Ibu Surakarta.png",
  description: "Rumah Sakit Kasih Ibu Surakarta menyediakan layanan kesehatan lengkap untuk masyarakat. Berada di Jl. Letjen Suprapto No. 78, Surakarta, Jawa Tengah."
},
{
  title: "Rumah Sakit PELNI",
  image: "/img/clients/Rumah Sakit PELNI.png",
  description: "Rumah Sakit PELNI adalah rumah sakit umum dengan fasilitas lengkap di Jakarta. Alamatnya di Jl. Gajah Mada No. 101, Jakarta Barat."
},
{
  title: "Rumah Sakit Umum (RSU) Pindad",
  image: "/img/clients/Rumah Sakit Umum (RSU) Pindad.png",
  description: "RSU Pindad adalah rumah sakit umum milik PT Pindad yang melayani masyarakat umum di Bandung. Beralamat di Jl. Diponegoro No. 123, Bandung, Jawa Barat."
},
{
  title: "Rumah Sakit Umum Daerah Ulin Banjarmasin",
  image: "/img/clients/Rumah Sakit Umum Daerah Ulin Banjarmasin.png",
  description: "RSUD Ulin Banjarmasin adalah rumah sakit umum daerah terbesar di Kalimantan Selatan. Terletak di Jl. Dr. Sutomo No. 1, Banjarmasin, Kalimantan Selatan."
},
{
  title: "Rumah Sakit Umum Pusat Persahabatan",
  image: "/img/clients/Rumah Sakit Umum Pusat Persahabatan.png",
  description: "RSUP Persahabatan adalah rumah sakit pusat rujukan di Jakarta Timur dengan layanan medis lengkap. Berada di Jl. Persahabatan Raya No. 1, Jakarta Timur."
},
{
  title: "Siloam Hospitals",
  image: "/img/clients/Siloam Hospitals.png",
  description: "Siloam Hospitals adalah jaringan rumah sakit swasta terbesar di Indonesia dengan berbagai layanan unggulan. Salah satu cabangnya berlokasi di Jl. HR Rasuna Said Kav. C-22, Jakarta Selatan."
},
{
  title: "Tzu Chi Hospital PIK",
  image: "/img/clients/Tzu Chi Hospital PIK.png",
  description: "Tzu Chi Hospital PIK adalah rumah sakit milik Yayasan Buddha Tzu Chi yang menyediakan layanan medis modern di Pantai Indah Kapuk, Jakarta Utara. Beralamat di Jl. Pantai Indah Kapuk Boulevard 1 No.1, Jakarta Utara."
},
  // ...tambahkan data client lainnya di sini
];

export default function Partner() {
  const [selectedClient, setSelectedClient] = useState(null);
  const t = useTranslations('Partners');

  return (
    <section id="clients" className="section-area py-20">


      
      <div className="container mx-auto px-4">
        <div className="scroll-revealed text-center max-w-xl mx-auto mb-12">
          <h2 className="mb-6 text-3xl font-bold" data-aos="fade-up">{t('title')}</h2>
          {/* <p className="text-gray-600 dark:text-gray-300" data-aos="fade-up">
            There are many variations of passages of Lorem Ipsum available but the majority have
            suffered alteration in some form.
          </p> */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {clients.map((client, index) => (
          <div
          className="cursor-pointer shadow-xl hover:scale-110 transition px-1 w-[150px] h-[150px] justify-self-center rounded-2xl mb-6 flex items-center justify-center text-[37px]/none bg-white text-primary-color"
          key={index}
          data-aos="flip-up"
          >
          <Image
            src={client.image}
            alt={client.title}
            width={500}
            height={500}
            className=""
            onClick={() => setSelectedClient(client)}
          />
          </div>
        ))}
      </div>
      {selectedClient && (
        <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}
      </div>
    </section>
  );
}
