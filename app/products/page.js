import Footer2 from "../components/Footer2";
import Navbar from "../components/Navbar";
import Products from "../components/products/Products";

export default function Page(){
    return(
<>
    
    <Navbar />
  <main class="main relative">
    <Products />
  </main>
  <Footer2 />
</>    );
}