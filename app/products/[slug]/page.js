import { products } from '@/lib/products/products';
import ProductDetail from '@/app/components/products/ProductDetail';
import Navbar2 from '@/app/components/Navbar2';
import Footer2 from '@/app/components/Footer2';
import Breadcrumb from '@/app/components/Breadcrumb';

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function Page({ params }) {
  return (
  <>
        <Navbar2 />
        <main class="main relative">
        <ProductDetail slug={params.slug} products={products} />
        </main>
      <Footer2 />
  </>
    );
}
