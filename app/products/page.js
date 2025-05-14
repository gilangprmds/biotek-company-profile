import Footer2 from "../components/Footer2";
import Navbar2 from "../components/Navbar2";
import Products from "../components/products/Products";

export default function Page(){
    return(
<>
    
    <Navbar2 />
  <main class="main relative">
    <Products />
  </main>
  <Footer2 />
</>    );
}