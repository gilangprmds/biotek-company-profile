import Partner from "../../components/Partner";
import Footer2 from "../../components/Footer2";
import Navbar2 from "../../components/Navbar2";

export const metadata = {
  title: 'Partners | Biotek Inti Korporindo',
  description: 'Explore our best partners',
};

export default function PartnerPage(){
    return(
<>
    
    <Navbar2 />
  <main className="main relative">
   <Partner />
  </main>
  <Footer2 />
</>    );
}