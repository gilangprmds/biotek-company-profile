// pages/add-product.js
"use client"
import { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiRotateCw, FiZoomIn, FiZoomOut, FiCheck, FiTrash2, FiX, FiMove } from 'react-icons/fi';
import Cropper from 'react-easy-crop';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/product-category');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  // State untuk data produk
  const [productData, setProductData] = useState({
    name: '',
    productCategory: '',
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
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
// State untuk editor gambar (dengan react-easy-crop)
const [showEditor, setShowEditor] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(null);
const [originalImage, setOriginalImage] = useState(null);
const [crop, setCrop] = useState({ x: 0, y: 0 });
const [zoom, setZoom] = useState(1);
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Handle perubahan input text
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  // Handle pemilihan gambar
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Batasi jumlah gambar
    if (files.length + images.length > 9) {
      alert('Maksimal 9 gambar');
      return;
    }

    // Buka editor untuk setiap gambar yang diupload
    // files.forEach(file => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       setCurrentImageIndex(e.target.result);
    //       setRotation(0);
    //       setShowEditor(true);
    //     };
    //     reader.readAsDataURL(file);
    //   });
    
    
    // Buat preview gambar
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    
    setImages([...images, ...files]);
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  // Hapus gambar
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

// Fungsi untuk buka editor
const openImageEditor = (index) => {
  setCurrentImageIndex(index);
  setOriginalImage(previewImages[index]);
  setCrop({ x: 0, y: 0 });
  setZoom(1);
  setCroppedAreaPixels(null);
  setShowEditor(true);
};


  // Fungsi untuk menyimpan area crop
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Fungsi untuk menghasilkan gambar yang di-crop
  const getCroppedImg = async () => {
    if (!originalImage || !croppedAreaPixels) return null;
    
    const image = new Image();
    image.src = originalImage;
    
    await new Promise((resolve) => {
      image.onload = resolve;
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set ukuran canvas sesuai dengan area crop
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    
    // Gambar di crop
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
  const saveEditedImage = async () => {
    try {
      const croppedBlob = await getCroppedImg();
      
      if (croppedBlob) {
        const croppedUrl = URL.createObjectURL(croppedBlob);
        
        // Update preview images
        const newPreviews = [...previewImages];
        newPreviews[currentImageIndex] = croppedUrl;
        setPreviewImages(newPreviews);
        
        // Update images
        const newImages = [...images];
        newImages[currentImageIndex] = new File(
          [croppedBlob], 
          `cropped-${Date.now()}.jpg`, 
          { type: 'image/jpeg' }
        );
        setImages(newImages);
      }
      
      setShowEditor(false);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };


  // Kirim data ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi
    if (!productData.name || !productData.productCategory) {
      setSubmitStatus({ type: 'error', message: 'Nama produk dan kategori wajib diisi' });
      return;
    }
    
    if (images.length < 1) {
      setSubmitStatus({ type: 'error', message: 'Minimal 1 gambar produk diperlukan' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const formData = new FormData();
      
      // Tambahkan data produk sebagai JSON
      formData.append('data', new Blob([JSON.stringify(productData)], { type: 'application/json' } ));
        //   formData.append('data', new Blob([JSON.stringify(form)], { type: 'application/json' }));

      
      // Tambahkan gambar
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      
      // Kirim ke API backend
      const response = await fetch('http://localhost:8080/product/save', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        console.log(formData.get('data'));
        console.log(formData.get('images'));
        setSubmitStatus({ type: 'success', message: `Product ${productData.name} added successfully !` });
        // Reset form
        setProductData({
          name: '',
          productCategory: '',
          description: '',
          noProduct: '',
          modelOrType: '',
          unitsOfMeasurement: '',
          kbkiCode: '',
          permitToCirculateNumber: '',
          factoryName: '',
          productValidityPeriod: '',
        });
        setImages([]);
        setPreviewImages([]);
      } else {
        const errorData = await response.json();
        setSubmitStatus({ type: 'error', message: errorData.message || 'Failed to add product' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Internal Server Error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-primary py-4 px-6">
            <h1 className="text-2xl font-bold text-white">Add New Product</h1>
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
                <h2 className="text-lg font-semibold mb-4">Product Picture</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-yellow-700 text-sm">
                    <span className="font-medium">Image format must be: JPG, JPEG, PNG and mini size. 300×300 px.</span>
                  </p>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                For optimal images, use the min size. 1200×1200 px. Select product photos or drag and drop up to 9 photos at once here. Upload min. 1 photos .                </p>
                
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
                    <p className="mt-2 font-medium text-gray-700">Click for upload or drag & drop</p>
                    <p className="text-sm text-gray-500 mt-1">Format .jpg .jpeg .png (max 10MB/file)</p>
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
                    <h3 className="text-md font-medium mb-3">Product Picture ({previewImages.length}/9)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="relative aspect-square">
                            <img 
                              src={preview} 
                              alt={`Preview ${index}`} 
                              className="w-full h-full object-cover rounded-lg border"
                            />
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
                <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Product Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Product Name*</label>
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
  <label className="block text-sm font-medium text-gray-700">Product Categories*</label>
  <select
    name="productCategory"
    value={productData.productCategory}
    onChange={handleInputChange}
    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    required
  >
    <option value="">Select Category</option>
    {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}
  </select>
</div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">No Product</label>
                    <input
                      type="text"
                      name="noProduct"
                      value={productData.noProduct}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Model/Type</label>
                    <input
                      type="text"
                      name="modelOrType"
                      value={productData.modelOrType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Units Of Measurement</label>
                    <select
                      name="unitsOfMeasurement"
                      value={productData.unitsOfMeasurement}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Units</option>
                      <option value="pcs">Pcs</option>
                      <option value="kg">Kg</option>
                      <option value="liter">Liter</option>
                      <option value="pack">Pack</option>
                      <option value="set">Set</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">KBKI Code</label>
                    <input
                      type="text"
                      name="kbkiCode"
                      value={productData.kbkiCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
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
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Legal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Permit To Circulate Number</label>
                    <input
                      type="text"
                      name="permitToCirculateNumber"
                      value={productData.permitToCirculateNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Factory Name</label>
                    <input
                      type="text"
                      name="factoryName"
                      value={productData.factoryName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Product Validity Period</label>
                    <input
                      type="date"
                      name="productValidityPeriod"
                      value={productData.productValidityPeriod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tombol Submit */}
              <div className="flex justify-between pt-4 border-t">
              <button
                  type="button"
                  onClick={() => router.push('/products/manage-products')}
                  className="px-6 py-3 font-medium text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                Kembali
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || images.length < 1}
                  className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${
                    images.length < 1 
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
                  ) : 'Simpan Produk'}
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
                onClick={() => setShowEditor(false)}
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
                  aspect={1} // Rasio 1:1
                  cropShape="rect"
                  showGrid={true}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
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
                    onClick={() => setShowEditor(false)}
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

