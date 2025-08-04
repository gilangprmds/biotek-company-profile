'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from '../Breadcrumb';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Product2() {
  const t = useTranslations('Products');
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  const categoryQuery = searchParams.get("category") || "All Product";
  const subCategoryQuery = searchParams.get("subCategory") || "";
  const [expandedCategories, setExpandedCategories] = useState({});

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryQuery);
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const productsPerPage = 6;

  useEffect(() => {
    fetch('http://152.42.244.64:8080/product-category')
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          const allCategories = [{ id: 0, name: "All Product", subCategories: [] }];
          setCategories([...allCategories, ...data.data]);
        }
      })
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("name", searchQuery);
    if (selectedCategory !== "All Product") params.append("category", selectedCategory);
    if (selectedSubCategory) params.append("subCategory", selectedSubCategory);
    params.append("page", currentPage - 1);
    params.append("size", productsPerPage);

    fetch(`http://152.42.244.64:8080/product?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data ? data.data.products : []);
        setTotalPages(data.data ? data.data.totalPages : 1);
        setTotalProducts(data.data.totalItems);
      })
      .catch(err => console.error("Failed to fetch products", err));
  }, [searchQuery, selectedCategory, selectedSubCategory, currentPage]);

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory("");
    setCurrentPage(1);
    
    // Tutup semua kategori yang diperluas kecuali yang dipilih
    setExpandedCategories(prev => {
      const newState = {};
      newState[categoryName] = prev[categoryName]; // Pertahankan state kategori yang dipilih
      return newState;
    });
  };

  const handleCategoryClick = (categoryName) => {
    handleCategoryChange(categoryName);
    
    // Periksa apakah kategori memiliki subkategori
    const category = categories.find(cat => cat.name === categoryName);
    if (category?.subCategories?.length > 0) {
      toggleCategory(categoryName);
    }
  };

  // Fungsi untuk menangani pemilihan subkategori
  const handleSubCategorySelect = (categoryName, subCatName) => {
    // Pastikan kategori yang sesuai dipilih
    setSelectedCategory(categoryName);
    setSelectedSubCategory(subCatName);
    setCurrentPage(1);
  };
   
  return (
    <div>
      <section className="bg-gray-100 pb-20 pt-32 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4" data-aos="fade-up">{t('banner.title')}</h1>
        {/* <p className="text-gray-600 text-lg" data-aos="fade-up">{t('banner.subtitle')}</p> */}
      </section>

      <div className="max-w-7xl mx-auto p-4">
        <Breadcrumb />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Kategori - Desain Baru */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t('categories')}</h3>
              </div>
              
              <div className="space-y-1">
                {categories.map(category => (
                  <div key={category.name} className="mb-1">
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === category.name
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{category.name}</span>
                      {category.subCategories?.length > 0 && (
                        <svg 
                          className={`w-4 h-4 transition-transform ${
                            expandedCategories[category.name] ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>

                    {expandedCategories[category.name] && category.subCategories?.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {category.subCategories.map(subCat => (
                          <button
                            key={subCat.id}
                            onClick={() => handleSubCategorySelect(category.name, subCat.name)}
                            className={`flex items-center w-full px-3 py-1.5 text-left rounded transition-all duration-200 ${
                              selectedSubCategory === subCat.name && selectedCategory === category.name
                                ? "text-blue-600 font-medium"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                            {subCat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Konten Utama */}
          <section className="md:col-span-3">
            <div className="flex justify-between items-center w-full gap-4 flex-wrap mb-4">
              <div className="w-full md:w-auto mx-4">
                <h5 className="font-semibold" data-aos="zoom-in">
                  {selectedCategory}
                  {selectedSubCategory && ` / ${selectedSubCategory}`}
                </h5>
              </div>

              <div className="relative w-full md:w-72 ml-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

            {products.length > 0 ? (
              <>
                {searchQuery && (
                  <p className="text-sm text-gray-600 mb-2 mx-4">
                    {totalProducts} result{products.length > 1 ? "s" : ""} found for &quot;<span className="font-semibold">{searchQuery}</span>&quot;
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
                  {products.map(product => (
                    <div key={product.slug} className="group bg-white rounded-xl p-6 shadow hover:shadow-lg transition relative overflow-hidden" data-aos="zoom-in">
                      <div className="relative h-60 rounded-lg overflow-hidden">
                        <Image 
                          src={`http://152.42.244.64:8080${product.productImages?.[0]?.urlImage}` || "/default.jpg"} 
                          alt={product.name} 
                          fill 
                          className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                      </div>
                      <div className="pt-4 min-h-[80px] place-content-center">
                        <p className="text-sm text-center font-medium text-gray-800 mb-2">{product.name}</p>
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <div className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                          View Details
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-12">
                {searchQuery ? (
                  `No products found for "${searchQuery}"`
                ) : (
                  `No products found in ${selectedCategory}${selectedSubCategory ? ` / ${selectedSubCategory}` : ''}`
                )}
              </div>
            )}

            <div className="flex justify-center items-center gap-2 mt-12 mb-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50">
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-sm font-medium border rounded-lg ${
                    currentPage === i + 1 ? "text-white bg-blue-600" : "text-gray-500 bg-white hover:bg-gray-100"
                  }`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50">
                Next
              </button>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('footer.title')}</h2>
          <p className="text-blue-50 mb-8">{t('footer.subtitle')}</p>
          <a href="/#contact"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200">
            {t('footer.consult-now')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import Image from "next/image";
// import Link from "next/link";
// import Breadcrumb from '../Breadcrumb';
// import { useSearchParams } from 'next/navigation';

// export default function Product2() {
//   const searchParams = useSearchParams();
//   const initialSearch = searchParams.get('search') || "";
//   const categoryQuery = searchParams.get("category") || "All Product";

//   const [searchQuery, setSearchQuery] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState(["All Product"]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);

//   const productsPerPage = 6;

//   useEffect(() => {
//     fetch('http://152.42.244.64:8080/product-category')
//       .then(res => res.json())
//       .then(data => {
//         const catList = data.data ? data.data.map(c => c.name) : [];
//         setCategories(["All Product", ...catList]);
//       })
//       .catch(err => console.error("Failed to fetch categories", err));
//   }, []);

//   useEffect(() => {
//     const params = new URLSearchParams();
//     if (searchQuery) params.append("name", searchQuery);
//     if (selectedCategory !== "All Product") params.append("category", selectedCategory);
//     params.append("page", currentPage - 1);
//     params.append("size", productsPerPage);

//     fetch(`http://152.42.244.64:8080/product?${params.toString()}`)
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data.data ? data.data.products : []);
//         setTotalPages(data.data ? data.data.totalPages : 1);
//         setTotalProducts(data.data.totalItems);
//       })
//       .catch(err => console.error("Failed to fetch products", err));
//   }, [searchQuery, selectedCategory, currentPage]);
   
//   return (
//     <div>
//       <section className="bg-gray-100 pb-20 pt-32 text-center">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Orthopedic Products</h1>
//         <p className="text-gray-600 text-lg">Complete solutions for implant and bone health needs.</p>
//       </section>

//       <div className="max-w-7xl mx-auto p-4">
//         <Breadcrumb />

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <aside className="md:col-span-1">
//             <div className="bg-white rounded-xl shadow p-4">
//               <h3 className="text-lg font-semibold mb-4">Categories</h3>
//               <ul className="space-y-2">
//                 {categories.map(category => (
//                   <li key={category}>
//                     <button
//                       onClick={() => {
//                         setSelectedCategory(category);
//                         setCurrentPage(1);
//                       }}
//                       className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
//                         selectedCategory === category
//                           ? "bg-blue-600 text-white"
//                           : "text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </aside>

//           <section className="md:col-span-3">
//             <div className="flex justify-between items-center w-full gap-4 flex-wrap mb-4 ">
//               <div className="w-full md:w-auto mx-4">
//                 <h5>{selectedCategory}</h5>
//               </div>

//               <div className="relative w-full md:w-72 ml-auto">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1118 9a7.5 7.5 0 01-1.35 7.65z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={(e) => {
//                     setSearchQuery(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-300 placeholder-gray-400"
//                 />
//               </div>
//             </div>

//             {products.length > 0 ? (
//               <>
//                 {searchQuery && (
//                   <p className="text-sm text-gray-600 mb-2 mx-4">
//                     {totalProducts} result{products.length > 1 ? "s" : ""} found for "<span className="font-semibold">{searchQuery}</span>"
//                   </p>
//                 )}

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
//                   {products.map(product => (
//                     <div key={product.slug} className="group bg-white rounded-xl p-6 shadow hover:shadow-lg transition relative overflow-hidden">
//                       <div className="relative h-60 rounded-lg overflow-hidden">
//                         <Image src={`http://152.42.244.64:8080${product.productImages?.[0]?.urlImage}` || "/default.jpg"} alt={product.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
//                       </div>
//                       <div className="pt-4 min-h-[80px] place-content-center">
//                         <p className="text-sm text-center font-medium text-gray-800 mb-2">{product.name}</p>
//                       </div>
//                       <Link href={`/products/${product.slug}`}>
//                         <div className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors duration-200">
//                           View Details
//                           <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                           </svg>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="text-center text-gray-500 py-12">
//                 No products found for "<span className="font-semibold">{searchQuery}</span>".
//               </div>
//             )}

//             <div className="flex justify-center items-center gap-2 mt-12 mb-2">
//               <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
//                 className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50">
//                 Previous
//               </button>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
//                   className={`px-4 py-2 text-sm font-medium border rounded-lg ${
//                     currentPage === i + 1 ? "text-white bg-blue-600" : "text-gray-500 bg-white hover:bg-gray-100"
//                   }`}>
//                   {i + 1}
//                 </button>
//               ))}
//               <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
//                 className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50">
//                 Next
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>

//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-center mt-20">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Professional Guidance?</h2>
//           <p className="text-blue-50 mb-8">Our orthopedic specialists are ready to assist you in selecting the perfect solution</p>
//           <a href="/#contact"
//             className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200">
//             Consult Now
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// }
