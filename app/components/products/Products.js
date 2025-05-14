'use client'

import { useState } from 'react';
import { products } from "@/lib/products/products";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from '../Breadcrumb';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const categories = [
    "All Product",
    "Hip Stem",
    "Knee Stem",
    "Plates & Screws",
    "Others"
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All Product" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 pb-20 pt-32 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Orthopedic Products</h1>
        <p className="text-gray-600 text-lg">Complete solutions for implant and bone health needs.</p>
      </section>

      <div className="max-w-7xl mx-auto p-4">
        <Breadcrumb />

        {/* Main Content Area: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Categories */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="md:col-span-3">
            {/* Title/Search Section */}
            <div className='flex justify-between items-center w-full gap-4 flex-wrap mb-4 '>
              <div className="w-full md:w-auto mx-4">
                <h5>{selectedCategory}</h5>
              </div>

                <div className="relative w-full md:w-72 ml-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1118 9a7.5 7.5 0 01-1.35 7.65z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-300 placeholder-gray-400"
                  />
                </div>
            </div>
            
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
                {currentProducts.map((product) => (
                  <div
                    key={product.slug}
                    className="group bg-white rounded-xl p-6 shadow hover:shadow-lg transition relative overflow-hidden"
                    data-aos="flip-up"
                  >
                    <div className="relative h-60 rounded-lg overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-4 min-h-[80px]">
                      <p className="text-base font-bold text-gray-800 mb-2">{product.name}</p>
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors duration-200"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                Tidak ada produk yang ditemukan.
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-12 mb-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-sm font-medium border rounded-lg ${
                    currentPage === i + 1
                      ? "text-white bg-blue-600"
                      : "text-gray-500 bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Professional Guidance?</h2>
          <p className="text-blue-50 mb-8">
            Our orthopedic specialists are ready to assist you in selecting the perfect solution
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Consult Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
