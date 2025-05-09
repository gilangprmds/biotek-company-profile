'use client'

import { useState } from 'react';
import { products } from "@/lib/products/products";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from '../Breadcrumb';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  // const totalPages = Math.ceil(products.length / productsPerPage);


  // const currentProducts = products.slice(
  //   (currentPage - 1) * productsPerPage,
  //   currentPage * productsPerPage
  // );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 pb-20 pt-32 text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Orthopedic Products</h1>
    <p className="text-gray-600 text-lg">Complete solutions for implant and bone health needs.</p>
    </section>
    <div className="max-w-7xl mx-auto p-4">
    <Breadcrumb />
      {/* Filter/Search Section */}
      <section className=" max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 rounded-xl shadow-sm">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset halaman saat search berubah
          }}
          className="w-full md:w-1/3 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
        />
          <select className="w-full md:w-1/4 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition">
            <option>All Categories</option>
            <option>Hip Stem</option>
            <option>Knee Stem</option>
            <option>Plates & Screws</option>
            <option>Rapid Test</option>
          </select>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <div 
              key={product.slug}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="relative h-60 rounded-lg overflow-hidden">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="pt-4 min-h-[80px] content-center">
                {/* <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span> */}
                <p className="text-base font-bold text-gray-800 mb-2">{product.name}</p>
              </div>
              <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center text-center w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-800 hover:text-white transition-colors duration-200"
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
            Tidak ada produk yang ditemukan untuk pencarian tersebut.
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i+1}
              onClick={() => setCurrentPage(i+1)}
              className={`px-4 py-2 text-sm font-medium ${
                currentPage === i+1 
                  ? 'text-white bg-blue-600' 
                  : 'text-gray-500 bg-white hover:bg-gray-100'
              } border rounded-lg`}
            >
              {i+1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </section>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Professional Guidance?
          </h2>
          <p className="text-blue-50 mb-8">
            Our orthopedic specialists are ready to assist you in selecting the perfect solution
          </p>
          <a 
            href="/kontak"
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