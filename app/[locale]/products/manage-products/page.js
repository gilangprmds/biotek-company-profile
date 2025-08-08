// pages/manage-product.js
"use client";
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiX, FiCheck, FiChevronDown, FiChevronUp, FiImage } from 'react-icons/fi';
import AddProduct from '@/app/components/products/AddProduct';
import Link from 'next/link';

export default function ManageProduct() {
  const [activeTab, setActiveTab] = useState('products');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [parentCategory, setParentCategory] = useState('');
const [currentSubCategory, setCurrentSubCategory] = useState(null);
  // State untuk filter
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  // State untuk menyimpan jumlah produk per kategori
  const [categoryProductCounts, setCategoryProductCounts] = useState({});

  // Fungsi untuk membuka modal kategori
const openCategoryModal = (category = null) => {
  setCurrentCategory(category);
  setCategoryName(category?.name || '');
  setShowCategoryModal(true);
};

// Fungsi untuk membuka modal subkategori
const openSubCategoryModal = (subCategory = null) => {
  setCurrentSubCategory(subCategory);
  setCategoryName(subCategory?.name || '');
  setParentCategory(subCategory?.productCategoryName || '');
  setShowSubCategoryModal(true);
};

  // Fetch data saat komponen dimuat
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch products with pagination and filters
  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [currentPage, searchTerm, selectedCategory, activeTab]);

  // Hitung jumlah produk per kategori setelah data produk berubah
  useEffect(() => {
    if (products.length > 0) {
      calculateCategoryCounts();
    }
  }, [products]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('https://biotek.co.id/api/product-category');
      const data = await res.json();
      setCategories(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("name", searchTerm);
      
      // Filter berdasarkan kategori atau subkategori
    if (selectedCategory !== 'all') {
      if (selectedSubCategory) {
        params.append("subCategory", selectedSubCategory);
      } else {
        params.append("category", selectedCategory);
      }
    }
      
      params.append("page", currentPage - 1);
      params.append("size", productsPerPage);

      const res = await fetch(`https://biotek.co.id/api/product?${params.toString()}`);
      const data = await res.json();
      
      if (data.data) {
        setProducts(data.data.products);
        setTotalPages(data.data.totalPages);
        setTotalProducts(data.data.totalItems);
      } else {
        setProducts([]);
        setTotalPages(1);
        setTotalProducts(0);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
      setProducts([]);
    }
  };

  // Fungsi untuk menghitung jumlah produk per kategori
  const calculateCategoryCounts = async () => {
    try {
      // Fetch semua produk tanpa pagination untuk menghitung jumlah per kategori
      const res = await fetch('https://biotek.co.id/api/product?size=1000');
      const data = await res.json();
      
      if (data.data && data.data.products) {
        const counts = {};
        
        // Hitung jumlah produk untuk setiap kategori
        data.data.products.forEach(product => {
          const categoryName = product.productSubCategory.name;
          counts[categoryName] = (counts[categoryName] || 0) + 1;
        });
        
        // Simpan hasil perhitungan ke state
        setCategoryProductCounts(counts);
      }
    } catch (error) {
      console.error('Error calculating category counts:', error);
    }
  };

  // Handle kategori
  const handleCategorySubmit = async (e, isSubCategory = false) => {
    e.preventDefault();
    
    let url, body;
    
    if (isSubCategory) {
      // Handle subkategori
      url = currentSubCategory 
        ? `https://biotek.co.id/api/product-sub-category/update/${currentSubCategory.id}`
        : 'https://biotek.co.id/api/product-sub-category/save';
      
      body = JSON.stringify({ 
        name: categoryName,
        productCategory: parentCategory 
      });
    } else {
      // Handle kategori utama
      url = currentCategory 
        ? `https://biotek.co.id/api/product-category/update/${currentCategory.id}`
        : 'https://biotek.co.id/api/product-category/save';
      
      body = JSON.stringify({ name: categoryName });
    }
  
    try {
      const res = await fetch(url, {
        method: currentCategory || currentSubCategory ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body
      });
      
      if (res.ok) {
        fetchCategories();
        setShowCategoryModal(false);
        setShowSubCategoryModal(false);
        setCategoryName('');
        setCurrentCategory(null);
        setCurrentSubCategory(null);
        setParentCategory('');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus?')) return;
    
    try {
      // Cek apakah ini kategori atau subkategori
      const isSubcategory = categories.some(cat => 
        cat.subCategories?.some(sub => sub.id === id)
      );
      
      const url = isSubcategory
        ? `https://biotek.co.id/api/product-sub-category/delete/${id}`
        : `https://biotek.co.id/api/product-category/${id}`;
      
      const res = await fetch(url, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle produk
  const deleteProduct = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    
    try {
      const res = await fetch(`https://biotek.co.id/api/product/delete/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        // Jika ini adalah produk terakhir di halaman, kembali ke halaman sebelumnya
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchProducts();
        }
        
        // Perbarui jumlah produk per kategori setelah perubahan
        calculateCategoryCounts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Komponen Pagination
  const Pagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;
      
      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 bg-white">
        <div className="text-sm text-gray-700">
          Menampilkan <span className="font-medium">{(currentPage-1)*productsPerPage + 1}</span> - <span className="font-medium">
            {Math.min(currentPage * productsPerPage, totalProducts)}
          </span> dari <span className="font-medium">{totalProducts}</span> produk
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev-1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Sebelumnya
          </button>
          {pages}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev+1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
            <h1 className="text-3xl font-bold text-white">Manajemen Produk & Kategori</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8">
          <button
            className={`py-3 px-6 font-medium text-lg flex items-center ${
              activeTab === 'products' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('products')}
          >
            <FiImage className="mr-2" /> Produk
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg flex items-center ${
              activeTab === 'categories' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('categories')}
          >
            <FiChevronDown className="mr-2" /> Kategori
          </button>
        </div>
        
        {/* Tab: Products */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Daftar Produk</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-72 ml-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1118 9a7.5 7.5 0 01-1.35 7.65z" />
                    </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Cari produk..."
                      className="w-full pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                    {/* <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div> */}
                  </div>
                  
                  {/* Dropdown Filter Kategori */}
                  <div className="relative w-full sm:w-48">
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="all">Semua Kategori</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown />
                    </div>
                  </div>
                  <Link href="/products/add">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center whitespace-nowrap"
                  >
                    <FiPlus className="mr-2" /> Tambah Produk
                  </button>
                  </Link>
                  
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 p-8 rounded-xl inline-block">
                    <FiImage className="mx-auto text-gray-400 w-16 h-16 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {selectedCategory === 'all' 
                        ? 'Belum ada produk' 
                        : `Tidak ada produk dalam kategori "${selectedCategory}"`}
                    </h3>
                    <p className="text-gray-500 mb-4">Mulai dengan menambahkan produk baru</p>
                    <Link href="/products/add">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center justify-self-center whitespace-nowrap"
                  >
                    <FiPlus className="mr-2" /> Tambah Produk
                  </button>
                  </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Categori</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Produk</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <>
                            <tr key={product.id} className="hover:bg-gray-50 " 
                            // onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {product.productImages?.[0]?.urlImage && (
                                    <div className="flex-shrink-0 h-20 w-20">
                                      <img className="h-20 w-20 rounded-md object-cover" src={`https://biotek.co.id/api${product.productImages?.[0]?.urlImage}`} alt={product.name} />
                                    </div>
                                  )}
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                    <div className="text-sm text-gray-500">{product.modelOrType || '-'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {product.productSubCategory.name}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.noProduct || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end items-center gap-2">
                                  
                                <Link href={`/products/edit-product/${product.id}`}>
                                <button
                                    className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                    title="Edit produk"
                                  >
                                    <FiEdit size={18} />
                                  </button>
                                </Link>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteProduct(product.id);
                                    }}
                                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                    title="Hapus produk"
                                  >
                                    <FiTrash2 size={18} />
                                  </button>
                                  {/* <button
                                    onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                                    className="ml-2 text-gray-500 hover:text-gray-700"
                                  >
                                    {expandedProduct === product.id ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                                  </button> */}
                                </div>
                              </td>
                            </tr>
                            {/* {expandedProduct === product.id && (
                              <tr className="bg-blue-50">
                                <td colSpan="4" className="px-6 py-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Detail Produk</h4>
                                      <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Deskripsi:</span> {product.description || '-'}</p>
                                        <p><span className="font-medium">Satuan:</span> {product.unitsOfMeasurement || '-'}</p>
                                        <p><span className="font-medium">KBKI:</span> {product.kbkiCode || '-'}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">Informasi Legal</h4>
                                      <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Izin Edar:</span> {product.permitToCirculateNumber || '-'}</p>
                                        <p><span className="font-medium">Pabrik:</span> {product.factoryName || '-'}</p>
                                        <p><span className="font-medium">Masa Berlaku:</span> {product.productValidityPeriod || '-'}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Gambar Produk</h4>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                      {product.productImages?.map((img, idx) => (
                                        <img 
                                          key={idx} 
                                          src={`https://biotek.co.id/api${img.urlImage}`} 
                                          alt={`Produk ${idx+1}`} 
                                          className="h-20 w-20 object-cover rounded-md border"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )} */}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination />
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Tab: Categories */}
        {activeTab === 'categories' && (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Daftar Kategori & Subkategori</h2>
          <p className="text-gray-600 mt-1">Kelola hierarki kategori produk Anda</p>
        </div>
        <div className="flex gap-2">
  <button
    onClick={() => openCategoryModal()}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
  >
    <FiPlus className="mr-2" /> Tambah Kategori
  </button>
  <button
    onClick={() => openSubCategoryModal()}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
  >
    <FiPlus className="mr-2" /> Tambah Subkategori
  </button>
</div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 p-8 rounded-xl inline-block">
            <FiChevronDown className="mx-auto text-gray-400 w-16 h-16 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Belum ada kategori</h3>
            <p className="text-gray-500 mb-4">Mulai dengan menambahkan kategori baru</p>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Tambah Kategori
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => setExpandedCategories(prev => ({
                      ...prev,
                      [category.id]: !prev[category.id]
                    }))}
                    className="mr-2 text-gray-500 hover:text-gray-700"
                  >
                    {expandedCategories[category.id] ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <h3 className="font-medium text-lg">{category.name}</h3>
                </div>
                <div className="flex gap-2">
                  {/* Untuk edit kategori */}
                  <button
                    onClick={() => openCategoryModal(category)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50"
                  >
                    <FiEdit size={16} />
                  </button>
                  {category.subCategories.length > 0 ? "" : <button
                    onClick={() => deleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
                  >
                    <FiTrash2 size={16} />
                  </button>}
                </div>
              </div>
              
              {expandedCategories[category.id] && (
                <div className="ml-8 mt-4 space-y-3">
                  {category.subCategories?.map(subCat => (
                    <div key={subCat.id} className="flex justify-between items-center border-l-2 border-gray-200 pl-4 py-2">
                      <span className="text-gray-700">{subCat.name}</span>
                      <div className="mt-2 text-sm text-gray-500">
                        {categoryProductCounts[subCat.name] || 0} produk
                      </div>
                      <div className="flex gap-2">
                        {/* Untuk edit subkategori */}
                        <button
                          onClick={() => openSubCategoryModal(subCat)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50"
                        >
                          <FiEdit size={16} />
                        </button>
                        
                        {categoryProductCounts[subCat.name] > 0 ? "" :(<button
                          onClick={() => deleteCategory(subCat.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
                        >
                          <FiTrash2 size={16} />
                        </button>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}
      </div>
      
      {/* Modal untuk Kategori */}
{showCategoryModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl w-full max-w-md">
      <div className="border-b p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {currentCategory ? 'Edit Kategori' : 'Tambah Kategori'}
        </h3>
        <button onClick={() => setShowCategoryModal(false)} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCategorySubmit(e, false);
      }} className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Kategori
          </label>
          <input
            type="text"
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nama kategori"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowCategoryModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FiCheck className="mr-2" /> {currentCategory ? 'Simpan Perubahan' : 'Tambah'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* Modal untuk Subkategori */}
{showSubCategoryModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl w-full max-w-md">
      <div className="border-b p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {currentSubCategory ? 'Edit Subkategori' : 'Tambah Subkategori'}
        </h3>
        <button onClick={() => setShowSubCategoryModal(false)} className="text-gray-500 hover:text-gray-700">
          <FiX size={24} />
        </button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCategorySubmit(e, true);
      }} className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Subkategori
          </label>
          <input
            type="text"
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukkan nama subkategori"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Induk</label>
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih Kategori Induk</option>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowSubCategoryModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FiCheck className="mr-2" /> {currentSubCategory ? 'Simpan Perubahan' : 'Tambah'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      
      {/* Modal Produk */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-screen overflow-auto">
            <div className="border-b p-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium">
                {currentProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button 
                onClick={() => {
                  setShowProductModal(false);
                  setCurrentProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <AddProduct 
              productToEdit={currentProduct} 
              onClose={() => {
                setShowProductModal(false);
                setCurrentProduct(null);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}