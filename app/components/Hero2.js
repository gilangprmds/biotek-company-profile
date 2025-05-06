
export default function Hero2() {
    return(
        <section className="relative overflow-hidden py-32 bg-gradient-to-br from-blue-400 via-sky-300 to-blue-500">
  {/* Blurred Shape */}
  <div className="absolute inset-0">
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-200 opacity-30 blur-3xl"></div>
    <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-sky-100 opacity-40 blur-2xl"></div>
  </div>

  <div className="relative z-10 text-center text-white">
    <h1 className="text-5xl font-bold mb-4">Selamat Datang di PT. Biotek</h1>
    <p className="text-xl">Solusi Teknologi Modern untuk Masa Depan</p>
  </div>
</section>
    );

}