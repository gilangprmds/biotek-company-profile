// pages/edit-product/[id].js
"use client"
import { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiRotateCw, FiZoomIn, FiZoomOut, FiCheck, FiTrash2, FiX, FiMove } from 'react-icons/fi';
import Cropper from 'react-easy-crop';
import { useParams, useRouter } from 'next/navigation';

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    productCategory: '',
    productSubCategory: '',
    description: '',
    noProduct: '',
    modelOrType: '',
    unitsOfMeasurement: '',
    kbkiCode: '',
    permitToCirculateNumber: '',
    factoryName: '',
    productValidityPeriod: '',
  });
  
  // State untuk gambar
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [idImagesToDelete, setidImagesToDelete] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [blobUrl, setBlobUrl] = useState(null); // Untuk menyimpan blob URL
  const [updatedImages, setUpdatedImages] = useState([]);
  const [imagesToUpdate, setImagesToUpdate] = useState([]);

  // State untuk editor gambar
  const [showEditor, setShowEditor] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const fileInputRef = useRef(null);

  // Fetch data produk dan kategori
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catResponse = await fetch('http://localhost:8080/product-category');
        const catData = await catResponse.json();
        setCategories(catData.data);

        // Fetch product data
        const prodResponse = await fetch(`http://localhost:8080/product/${id}`);
        const prodData = await prodResponse.json();
        
        if (prodData.data) {
          const product = prodData.data;
          setProductData({
            id: product.id,
            name: product.name,
            productCategory: product.productSubCategory.productCategoryName,
            productSubCategory: product.productSubCategory.name,
            description: product.description,
            noProduct: product.noProduct,
            modelOrType: product.modelOrType,
            unitsOfMeasurement: product.unitsOfMeasurement,
            kbkiCode: product.kbkiCode,
            permitToCirculateNumber: product.permitToCirculateNumber,
            factoryName: product.factoryName,
            productValidityPeriod: product.productValidityPeriod,
          });

          // Set existing images
          if (product.productImages && product.productImages.length > 0) {
            setExistingImages(product.productImages);
            setPreviewImages(product.productImages.map(img => ({
              url: img.urlImage,
              type: 'existing'
            })));
          }
          // Set selected category and subcategories
          const categoryId = product.productSubCategory.productCategoryId;
          setSelectedCategoryId(categoryId);
          const category = catData.data.find(cat => cat.id == categoryId);
          if (category) {
            setSubCategories(category.subCategories || []);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  // Handle perubahan kategori
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    
    // Cari kategori yang dipilih
    const selectedCategory = categories.find(cat => cat.id == categoryId);
    
    // Update nama kategori di productData
    setProductData({
      ...productData,
      productCategory: selectedCategory ? selectedCategory.name : '',
      productSubCategory: '' // Reset subkategori saat ganti kategori
    });
    
    // Set subkategori berdasarkan kategori yang dipilih
    if (selectedCategory) {
      setSubCategories(selectedCategory.subCategories || []);
    } else {
      setSubCategories([]);
    }
  };

  // Handle perubahan subkategori
  const handleSubCategoryChange = (e) => {
    setProductData({
      ...productData,
      productSubCategory: e.target.value
    });
  };
  
  // Handle perubahan input text
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  // Handle pemilihan gambar baru
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Batasi jumlah gambar
    if (files.length + previewImages.length > 9) {
      alert('Maksimal 9 gambar');
      return;
    }

    // Buat preview gambar baru
    const newPreviewImages = files.map(file => ({
      url: URL.createObjectURL(file),
      type: 'new'
    }));
    
    setNewImages([...newImages, ...files]);
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  // Hapus gambar
  const removeImage = (index) => {
    const imageToRemove = previewImages[index];
    
    // Jika gambar berasal dari server
    if (imageToRemove.type === 'existing') {
      const existingImage = existingImages.find(img => img.urlImage === imageToRemove.url);
      if (existingImage) {
        setidImagesToDelete([...idImagesToDelete, existingImage.id]);
      }
      
      // Hapus dari existing images
      setExistingImages(existingImages.filter(img => img.urlImage !== imageToRemove.url));
    } 
    // Jika gambar baru
    else {
      // Temukan file yang sesuai di newImages
      const newIndex = newImages.findIndex((_, i) => {
        const previewIndex = previewImages.findIndex(p => p.type === 'new' && p.url === imageToRemove.url);
        return previewIndex === index;
      });
      
      if (newIndex !== -1) {
        const newNewImages = [...newImages];
        newNewImages.splice(newIndex, 1);
        setNewImages(newNewImages);
      }
    }
    
    // Hapus dari preview
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  // Fungsi untuk buka editor
  const openImageEditor = async (index) => {
    const image = previewImages[index];
    
    try {
      // Hapus blob URL sebelumnya jika ada
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);
      }
      
      let imageUrl;
      if (image.type === 'existing') {
        // Ambil gambar melalui fetch untuk menghindari masalah CORS
        const response = await fetch(`http://localhost:8080${image.url}`);
        const blob = await response.blob();
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        imageUrl = newBlobUrl;
      } else {
        imageUrl = image.url;
      }
      
      setCurrentImageIndex(index);
      setOriginalImage(imageUrl);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setShowEditor(true);
    } catch (error) {
      console.error('Error opening image editor:', error);
      alert('Gagal membuka editor gambar');
    }
  };

  // Fungsi untuk menyimpan area crop
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Fungsi untuk menghasilkan gambar yang di-crop (diperbaiki)
  const getCroppedImg = async () => {
    if (!originalImage || !croppedAreaPixels) return null;
    
    const image = new Image();
    
    // Tambahkan ini untuk mengatasi masalah CORS
    image.crossOrigin = "Anonymous";
    
    image.src = originalImage;
    
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  // Simpan gambar yang telah di-edit
  // Simpan gambar yang telah di-edit (diperbaiki)
  const saveEditedImage = async () => {
    try {
      const croppedBlob = await getCroppedImg();
      
      if (croppedBlob) {
        const croppedUrl = URL.createObjectURL(croppedBlob);
        
        // Update preview images
        setPreviewImages(prev => {
          const newPreviews = [...prev];
          newPreviews[currentImageIndex] = {
            url: croppedUrl,
            type: 'new'
          };
          return newPreviews;
        });
        
        const originalImageData = previewImages[currentImageIndex];
        
        // Jika gambar aslinya adalah existing, tandai untuk dihapus
        if (originalImageData.type === 'existing') {
          const existingImage = existingImages.find(img => 
            img.urlImage === originalImageData.url
          );
          
          if (existingImage) {
            setImagesToUpdate(prev => [...prev, existingImage.urlImage]);
            setExistingImages(prev => prev.filter(img => img.urlImage !== existingImage.urlImage));
          }
          const updatedFile = new File(
            [croppedBlob], 
            `${originalImageData.url}`, 
            { type: 'image/jpeg' }
          );
          setUpdatedImages(prev => [...prev, updatedFile]);
        }else{
          // Tambahkan gambar baru ke newImages
        const newFile = new File(
          [croppedBlob], 
          `cropped-${Date.now()}.jpg`, 
          { type: 'image/jpeg' }
        );
        
        setNewImages(prev => [...prev, newFile]);
        }
      }
      
      // Bersihkan blob URL
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);
      }
      
      setShowEditor(false);
    } catch (error) {
      console.error('Error cropping image:', error);
      alert('Gagal menyimpan gambar yang diedit');
    }
  };

  // Fungsi untuk menutup editor
  const closeEditor = () => {
    // Bersihkan blob URL
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
    }
    setShowEditor(false);
  };

  // Kirim data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi
    if (!productData.name || !productData.productCategory) {
      setSubmitStatus({ type: 'error', message: 'Nama produk dan kategori wajib diisi' });
      return;
    }
    
    if (previewImages.length < 1) {
      setSubmitStatus({ type: 'error', message: 'Minimal 1 gambar produk diperlukan' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const formData = new FormData();
      
      // Tambahkan data produk sebagai JSON
      formData.append('data', new Blob([JSON.stringify({
        ...productData,
        idImagesToDelete: idImagesToDelete,
        imagesToUpdate: imagesToUpdate
      })], { type: 'application/json' }));
      
      // Tambahkan gambar baru
      newImages.forEach((image) => {
        formData.append(`newImages`, image);
      });
      
            // Tambahkan gambar baru
            updatedImages.forEach((image) => {
              formData.append(`updatedImages`, image);
            });

      // Kirim ke API backend
      const response = await fetch(`http://localhost:8080/product/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      
      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: `Produk ${productData.name} berhasil diperbarui!`
        });
        console.log(formData.getAll('data'));
        console.log(formData.getAll('newImages'))
        console.log(formData.getAll('updatedImages'))
        // Redirect setelah 2 detik
        setTimeout(() => {
          router.push('/products/manage-products');
        }, 2000);
      } else {
        const errorData = await response.json();
        setSubmitStatus({ 
          type: 'error', 
          message: errorData.message || 'Gagal memperbarui produk' 
        });
        console.log(formData.get('data'));
        console.log(formData.getAll('newImages'))
        console.log(formData.getAll('updatedImages'))
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Kesalahan server' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-primary py-4 px-6">
            <h1 className="text-2xl font-bold text-white">Edit Produk</h1>
          </div>
          
          <div className="p-6">
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Bagian Upload Gambar */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Gambar Produk</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-yellow-700 text-sm">
                    <span className="font-medium">Format gambar harus: JPG, JPEG, PNG dan ukuran minimal 300×300 px.</span>
                  </p>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  Untuk hasil terbaik, gunakan ukuran min. 1200×1200 px. Pilih foto produk atau drag and drop hingga 9 foto. Minimal 1 foto.
                </p>
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleImageChange({ target: { files: e.dataTransfer.files } });
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    <p className="mt-2 font-medium text-gray-700">Klik untuk upload atau drag & drop</p>
                    <p className="text-sm text-gray-500 mt-1">Format .jpg .jpeg .png (maks 10MB/file)</p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                
                {/* Preview Gambar */}
                {previewImages.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-md font-medium mb-3">
                      Gambar Produk ({previewImages.length}/9)
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        {existingImages.length} gambar tersimpan, {newImages.length} gambar baru
                      </span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="relative aspect-square">
                            <img 
                              src={preview.type === 'existing' 
                                ? `http://localhost:8080${preview.url}` 
                                : preview.url}
                              alt={`Preview ${index}`} 
                              className="w-full h-full object-cover rounded-lg border"
                            />
                            {preview.type === 'existing' && (
                              <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                                Ada
                              </span>
                            )}
                          </div>
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button
                              type="button"
                              className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => openImageEditor(index)}
                              title="Edit gambar"
                            >
                              <FiEdit2 size={14} />
                            </button>
                            <button
                              type="button"
                              className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                              title="Hapus gambar"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Informasi Produk */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Informasi Produk</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nama Produk*</label>
                    <input
                      type="text"
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Kategori Produk*</label>
                    <select
                      name="productCategory"
                      value={selectedCategoryId}
                      onChange={handleCategoryChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Subkategori Produk</label>
                    <select
                      name="productSubCategory"
                      value={productData.productSubCategory}
                      onChange={handleSubCategoryChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!selectedCategoryId}
                    >
                      <option value="">Pilih Subkategori</option>
                      {subCategories.map((subCat) => (
                        <option key={subCat.id} value={subCat.name}>
                          {subCat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nomor Produk</label>
                    <input
                      type="text"
                      name="noProduct"
                      value={productData.noProduct}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Model/Tipe</label>
                    <input
                      type="text"
                      name="modelOrType"
                      value={productData.modelOrType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Satuan Ukur</label>
                    <select
                      name="unitsOfMeasurement"
                      value={productData.unitsOfMeasurement}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih Satuan</option>
                      <option value="pcs">Pcs</option>
                      <option value="kg">Kg</option>
                      <option value="liter">Liter</option>
                      <option value="pack">Pack</option>
                      <option value="set">Set</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Kode KBKI</label>
                    <input
                      type="text"
                      name="kbkiCode"
                      value={productData.kbkiCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div> */}
                </div>
                
                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Deskripsi Produk</label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Deskripsi lengkap produk, fitur, bahan, ukuran, dll."
                  ></textarea>
                </div>
              </div>
              
              {/* Informasi Legal */}
              {/* <div className="mb-8">
                <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Informasi Legal</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nomor Izin Edar</label>
                    <input
                      type="text"
                      name="permitToCirculateNumber"
                      value={productData.permitToCirculateNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nama Pabrik</label>
                    <input
                      type="text"
                      name="factoryName"
                      value={productData.factoryName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Masa Berlaku Produk</label>
                    <input
                      type="date"
                      name="productValidityPeriod"
                      value={productData.productValidityPeriod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div> */}
              
              {/* Tombol Submit */}
              <div className="flex justify-between pt-4 border-t">
                <button
                  type="button"
                  onClick={() => router.push('/products/manage-products')}
                  className="px-6 py-3 font-medium text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || previewImages.length < 1}
                  className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${
                    previewImages.length < 1 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Menyimpan...
                    </>
                  ) : 'Perbarui Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Modal Editor Gambar */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            <div className="bg-gray-800 text-white py-3 px-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Atur Gambar</h3>
              <button 
                onClick={closeEditor}
                className="text-white hover:text-gray-300"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="relative w-full" style={{ height: '400px' }}>
                <Cropper
                  image={originalImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="rect"
                  showGrid={true}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  crossOrigin="anonymous" // Penting untuk CORS
                />
              </div>
              
              <div className="mt-4 flex flex-col items-center">
                <div className="w-full max-w-xs mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zoom: {Math.round(zoom * 100)}%
                  </label>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="flex gap-3 w-full max-w-xs">
                  <button
                    onClick={closeEditor}
                    className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    onClick={saveEditedImage}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <FiCheck /> Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}