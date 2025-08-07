import Footer2 from "../../components/Footer2";
import Navbar2 from "../../components/Navbar2";
import Product2 from "../../components/products/Product2";
import Products from "../../components/products/Products";
import { useTranslations } from 'next-intl';

export const metadata = {
  title: 'Products | Biotek Inti Korporindo',
  description: 'Explore our top-quality products',
};

export default function Page(){
    return(
<>
    
    <Navbar2 />
  <main className="main relative">
    {/* <Products /> */}
    <Product2 />
  </main>
  <Footer2 />
</>    );
}