import { products } from '@/lib/products/products';
import ProductDetail from '@/app/components/products/ProductDetail';
import Navbar from '@/app/components/Navbar';
import Footer2 from '@/app/components/Footer2';
import Breadcrumb from '@/app/components/Breadcrumb';

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function Page({ params }) {
  return (
  <>
        <Navbar />
        <main class="main relative">
        <ProductDetail slug={params.slug} products={products} />
        </main>
      <Footer2 />
  </>
    );
}
