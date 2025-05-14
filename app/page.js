import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonial";
import Footer2 from "./components/Footer2";
import Contact from "./components/Contact";
import OurWork from "./components/OurWork";
import Hero2 from "./components/Hero2";
import Navbar2 from "./components/Navbar2";

export default function Home() {
  return (
    <>
    
        <Navbar2 />
      <main class="main relative">
        <Hero />
        <About />
        <Services />
        <OurWork />
        <Testimonials />
        <Contact />
      </main>
      <Footer2 />
    </>
  );
}
