import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Intro from "./components/Intro";
import Portfolio from "./components/Portofolio";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main class="main relative">
        <Hero />
        <About />
        <Services />
        <Intro />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}
