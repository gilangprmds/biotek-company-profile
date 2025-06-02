'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import ProductDetail from "@/app/components/products/ProductDetail";
import Footer2 from "@/app/components/Footer2";

export default function ProductDetailPage() {
  const { slug } = useParams(); // ambil id dari URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const res = await fetch(`http://localhost:8080/product/find-by/${slug}`);
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error("Failed to fetch product detail", err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProductDetail();
    }
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-red-500">Product not found.</div>;
  return (
    <>
      <Navbar />
      <main className="main relative">
        <ProductDetail product={product} />
      </main>
      <Footer2 />
    </>
  );
}



// import { products } from '@/lib/products/products';
// import ProductDetail from '@/app/components/products/ProductDetail';
// import Navbar2 from '@/app/components/Navbar2';
// import Footer2 from '@/app/components/Footer2';
// import Breadcrumb from '@/app/components/Breadcrumb';

// export async function generateStaticParams() {
//   // Ambil data dari API backend berdasarkan slug
//   const res = await fetch(`http://localhost:8080/product/${id}`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     return <div className="p-10 text-center text-red-500">Product not found</div>;
//   }

//   const product = await res.json();
//   return products.map((product) => ({ slug: product.slug }));
// }

// export default function Page({ params }) {
//   return (
//   <>
//         <Navbar2 />
//         <main class="main relative">
//         <ProductDetail slug={params.slug} products={products} />
//         </main>
//       <Footer2 />
//   </>
//     );
// }
