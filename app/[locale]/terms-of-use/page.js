import Footer2 from "@/app/components/Footer2";
import Navbar2 from "@/app/components/Navbar2";
import ScrollToTop from "@/app/components/ScrollToTop";
import TermsOfUse from "@/app/components/TermsOfUse";

export const metadata = {
  title: 'Terms of Use | Biotek Inti Korporindo',
  description: 'Our commitment to protecting your personal information',
};

export default function Page(){
    return(
<>
    
    <Navbar2 />
  <main className="main relative">
    {/* <Products /> */}
    <TermsOfUse />
  </main>
        <ScrollToTop />
  <Footer2 />
</>    
);
}