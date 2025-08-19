import Footer2 from "@/app/components/Footer2";
import Navbar2 from "@/app/components/Navbar2";
import PrivacyPolicy from "@/app/components/PrivacyPolicy";
import ScrollToTop from "@/app/components/ScrollToTop";

export const metadata = {
  title: 'Privacy and Policy | Biotek Inti Korporindo',
  description: 'Our commitment to protecting your personal information',
};

export default function Page(){
    return(
<>
    
    <Navbar2 />
  <main className="main relative">
    {/* <Products /> */}
    <PrivacyPolicy />
  </main>
  <ScrollToTop />
  <Footer2 />
</>    
);
}