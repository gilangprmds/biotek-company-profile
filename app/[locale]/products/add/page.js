// pages/add-product.js

import Footer2 from "@/app/components/Footer2";
import Navbar2 from "@/app/components/Navbar2";
import AddProduct from "@/app/components/products/AddProduct";

export default function AddProductPage(){
  return(
<>
  
  {/* <Navbar2 /> */}
<main class="main relative">
 <AddProduct />
</main>
<Footer2 />
</>    );
}


// "use client"
// import { useState, useRef, useEffect } from 'react';
// import { FiEdit2, FiRotateCw, FiZoomIn, FiZoomOut, FiCheck, FiTrash2, FiX, FiMove } from 'react-icons/fi';

// export default function AddProductPage() {
//   const [categories, setCategories] = useState([]);
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/product-category');
//         const data = await response.json();
//         setCategories(data.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
    
//     fetchCategories();
//   }, []);

//   // State untuk data produk
//   const [productData, setProductData] = useState({
//     name: '',
//     productCategory: '',
//     description: '',
//     noProduct: '',
//     modelOrType: '',
//     unitsOfMeasurement: '',
//     kbkiCode: '',
//     permitToCirculateNumber: '',
//     factoryName: '',
//     productValidityPeriod: '',
//   });
  
//   // State untuk gambar
//   const [images, setImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);
  
//   // State untuk editor gambar
//   const [showEditor, setShowEditor] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(null);
//   const [originalImage, setOriginalImage] = useState(null);
//   const [editedImage, setEditedImage] = useState(null);
//   const [scale, setScale] = useState(1);
//   const [rotation, setRotation] = useState(0);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
//   const fileInputRef = useRef(null);
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);

//   // Handle perubahan input text
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({
//       ...productData,
//       [name]: value
//     });
//   };

//   // Handle pemilihan gambar
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Batasi jumlah gambar
//     if (files.length + images.length > 9) {
//       alert('Maksimal 9 gambar');
//       return;
//     }

//     // Buka editor untuk setiap gambar yang diupload
//     // files.forEach(file => {
//     //     const reader = new FileReader();
//     //     reader.onload = (e) => {
//     //       setCurrentImageIndex(e.target.result);
//     //       setRotation(0);
//     //       setShowEditor(true);
//     //     };
//     //     reader.readAsDataURL(file);
//     //   });
    
    
//     // Buat preview gambar
//     const newPreviewImages = files.map(file => URL.createObjectURL(file));
    
//     setImages([...images, ...files]);
//     setPreviewImages([...previewImages, ...newPreviewImages]);
//   };

//   // Hapus gambar
//   const removeImage = (index) => {
//     const newImages = [...images];
//     const newPreviews = [...previewImages];
    
//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);
    
//     setImages(newImages);
//     setPreviewImages(newPreviews);
//   };

//   // Buka editor gambar
//   const openImageEditor = (index) => {
//     setCurrentImageIndex(index);
//     const imgUrl = previewImages[index];
//     setOriginalImage(imgUrl);
//     setEditedImage(imgUrl);
//     setScale(1);
//     setRotation(0);
//     setPosition({ x: 0, y: 0 });
//     setShowEditor(true);
//   };

//   // Crop gambar menjadi rasio 1:1
//   const cropTo1x1 = () => {
//     if (!canvasRef.current) return;
    
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const sourceCanvas = canvasRef.current;
    
//     // Ukuran untuk crop 1:1 (ambil sisi terkecil)
//     const size = Math.min(sourceCanvas.width, sourceCanvas.height);
//     canvas.width = size;
//     canvas.height = size;
    
//     // Hitung posisi crop
//     const sx = (sourceCanvas.width - size) / 2;
//     const sy = (sourceCanvas.height - size) / 2;
    
//     // Lakukan crop
//     ctx.drawImage(
//       sourceCanvas, 
//       sx, sy, size, size, 
//       0, 0, size, size
//     );
    
//     return canvas.toDataURL('image/jpeg');
//   };

//   // Simpan hasil edit gambar
//   const saveEditedImage = () => {
//     const croppedImage = cropTo1x1();
    
//     if (croppedImage) {
//       // Update preview gambar
//       const newPreviews = [...previewImages];
//       newPreviews[currentImageIndex] = croppedImage;
//       setPreviewImages(newPreviews);
      
//       // Konversi data URL ke Blob
//       fetch(croppedImage)
//         .then(res => res.blob())
//         .then(blob => {
//           // Update gambar asli
//           const newImages = [...images];
//           newImages[currentImageIndex] = new File([blob], `cropped-${Date.now()}.jpg`, { type: 'image/jpeg' });
//           setImages(newImages);
//         });
//     }
    
//     setShowEditor(false);
//   };

//   // Render gambar di canvas untuk editing
//   useEffect(() => {
//     if (showEditor && editedImage && canvasRef.current) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       const img = new Image();
      
//       img.src = originalImage;
//       img.onload = () => {
//         // Set ukuran canvas untuk menampung gambar yang diubah
//         canvas.width = img.width;
//         canvas.height = img.height;
        
//         // Clear canvas
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
        
//         // Simpan state transformasi
//         ctx.save();
        
//         // Pindah ke tengah canvas
//         ctx.translate(canvas.width / 2, canvas.height / 2);
        
//         // Rotasi
//         ctx.rotate((rotation * Math.PI) / 180);
        
//         // Skala
//         ctx.scale(scale, scale);
        
//         // Posisi (drag)
//         ctx.translate(position.x, position.y);
        
//         // Gambar ulang
//         ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
        
//         // Restore state
//         ctx.restore();
//       };
//     }
//   }, [editedImage, scale, rotation, position, showEditor]);

//   // Handle drag untuk menggeser gambar
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStart({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
    
//     const newX = e.clientX - dragStart.x;
//     const newY = e.clientY - dragStart.y;
    
//     // Batasi pergerakan agar gambar tidak keluar terlalu jauh
//     const maxMove = 200;
//     setPosition({
//       x: Math.max(Math.min(newX, maxMove), -maxMove),
//       y: Math.max(Math.min(newY, maxMove), -maxMove)
//     });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Kirim data ke backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validasi
//     if (!productData.name || !productData.productCategory) {
//       setSubmitStatus({ type: 'error', message: 'Nama produk dan kategori wajib diisi' });
//       return;
//     }
    
//     if (images.length < 1) {
//       setSubmitStatus({ type: 'error', message: 'Minimal 1 gambar produk diperlukan' });
//       return;
//     }
    
//     setIsSubmitting(true);
//     setSubmitStatus(null);
    
//     try {
//       const formData = new FormData();
      
//       // Tambahkan data produk sebagai JSON
//       formData.append('data', new Blob([JSON.stringify(productData)], { type: 'application/json' } ));
//         //   formData.append('data', new Blob([JSON.stringify(form)], { type: 'application/json' }));

      
//       // Tambahkan gambar
//       images.forEach((image, index) => {
//         formData.append(`images`, image);
//       });
      
//       // Kirim ke API backend
//       const response = await fetch('http://localhost:8080/product/save', {
//         method: 'POST',
//         body: formData,
//       });
      
//       if (response.ok) {
//         setSubmitStatus({ type: 'success', message: `Product ${productData.name} added successfully !` });
//         // Reset form
//         setProductData({
//           name: '',
//           productCategory: '',
//           description: '',
//           noProduct: '',
//           modelOrType: '',
//           unitsOfMeasurement: '',
//           kbkiCode: '',
//           permitToCirculateNumber: '',
//           factoryName: '',
//           productValidityPeriod: '',
//         });
//         setImages([]);
//         setPreviewImages([]);
//       } else {
//         const errorData = await response.json();
//         setSubmitStatus({ type: 'error', message: errorData.message || 'Failed to add product' });
//       }
//     } catch (error) {
//       setSubmitStatus({ type: 'error', message: 'Internal Server Error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="bg-primary py-4 px-6">
//             <h1 className="text-2xl font-bold text-white">Add New Product</h1>
//           </div>
          
//           <div className="p-6">
//             {submitStatus && (
//               <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
//                 {submitStatus.message}
//               </div>
//             )}
            
//             <form onSubmit={handleSubmit}>
//               {/* Bagian Upload Gambar */}
//               <div className="mb-8">
//                 <h2 className="text-lg font-semibold mb-4">Product Picture</h2>
//                 <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
//                   <p className="text-yellow-700 text-sm">
//                     <span className="font-medium">Image format must be: JPG, JPEG, PNG and mini size. 300×300 px.</span>
//                   </p>
//                 </div>
                
//                 <p className="text-gray-600 text-sm mb-4">
//                 For optimal images, use the min size. 1200×1200 px. Select product photos or drag and drop up to 9 photos at once here. Upload min. 1 photos .                </p>
                
//                 <div 
//                   className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
//                   onClick={() => fileInputRef.current.click()}
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//                       handleImageChange({ target: { files: e.dataTransfer.files } });
//                     }
//                   }}
//                   onDragOver={(e) => e.preventDefault()}
//                 >
//                   <div className="flex flex-col items-center justify-center">
//                     <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
//                     </svg>
//                     <p className="mt-2 font-medium text-gray-700">Click for upload or drag & drop</p>
//                     <p className="text-sm text-gray-500 mt-1">Format .jpg .jpeg .png (max 10MB/file)</p>
//                   </div>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </div>
                
//                 {/* Preview Gambar */}
//                 {previewImages.length > 0 && (
//                   <div className="mt-6">
//                     <h3 className="text-md font-medium mb-3">Product Picture ({previewImages.length}/9)</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//                       {previewImages.map((preview, index) => (
//                         <div key={index} className="relative group">
//                           <div className="relative aspect-square">
//                             <img 
//                               src={preview} 
//                               alt={`Preview ${index}`} 
//                               className="w-full h-full object-cover rounded-lg border"
//                             />
//                           </div>
//                           <div className="absolute top-2 right-2 flex gap-1">
//                             <button
//                               type="button"
//                               className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                               onClick={() => openImageEditor(index)}
//                               title="Edit gambar"
//                             >
//                               <FiEdit2 size={14} />
//                             </button>
//                             <button
//                               type="button"
//                               className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                               onClick={() => removeImage(index)}
//                               title="Hapus gambar"
//                             >
//                               <FiTrash2 size={14} />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Informasi Produk */}
//               <div className="mb-8">
//                 <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Product Information</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Product Name*</label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={productData.name}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//   <label className="block text-sm font-medium text-gray-700">Product Categories*</label>
//   <select
//     name="productCategory"
//     value={productData.productCategory}
//     onChange={handleInputChange}
//     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//     required
//   >
//     <option value="">Select Category</option>
//     {categories.map((category) => (
//       <option key={category.id} value={category.name}>
//         {category.name}
//       </option>
//     ))}
//   </select>
// </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">No Product</label>
//                     <input
//                       type="text"
//                       name="noProduct"
//                       value={productData.noProduct}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Model/Type</label>
//                     <input
//                       type="text"
//                       name="modelOrType"
//                       value={productData.modelOrType}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Units Of Measurement</label>
//                     <select
//                       name="unitsOfMeasurement"
//                       value={productData.unitsOfMeasurement}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Select Units</option>
//                       <option value="pcs">Pcs</option>
//                       <option value="kg">Kg</option>
//                       <option value="liter">Liter</option>
//                       <option value="pack">Pack</option>
//                       <option value="set">Set</option>
//                     </select>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">KBKI Code</label>
//                     <input
//                       type="text"
//                       name="kbkiCode"
//                       value={productData.kbkiCode}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>
                
//                 <div className="mt-6 space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Deskripsi Produk</label>
//                   <textarea
//                     name="description"
//                     value={productData.description}
//                     onChange={handleInputChange}
//                     rows="4"
//                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Deskripsi lengkap produk, fitur, bahan, ukuran, dll."
//                   ></textarea>
//                 </div>
//               </div>
              
//               {/* Informasi Legal */}
//               <div className="mb-8">
//                 <h2 className="text-lg font-semibold mb-6 pb-2 border-b">Legal Information</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Permit To Circulate Number</label>
//                     <input
//                       type="text"
//                       name="permitToCirculateNumber"
//                       value={productData.permitToCirculateNumber}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Factory Name</label>
//                     <input
//                       type="text"
//                       name="factoryName"
//                       value={productData.factoryName}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">Product Validity Period</label>
//                     <input
//                       type="date"
//                       name="productValidityPeriod"
//                       value={productData.productValidityPeriod}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Tombol Submit */}
//               <div className="flex justify-end pt-4 border-t">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || images.length < 1}
//                   className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${
//                     images.length < 5 
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                       : 'bg-blue-600 text-white hover:bg-blue-700'
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Menyimpan...
//                     </>
//                   ) : 'Simpan Produk'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
      
//       {/* Modal Editor Gambar */}
//       {showEditor && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl w-full max-w-4xl overflow-hidden">
//             <div className="bg-gray-800 text-white py-3 px-4 flex justify-between items-center">
//               <h3 className="text-lg font-medium">Editor Gambar</h3>
//               <button 
//                 onClick={() => setShowEditor(false)}
//                 className="text-white hover:text-gray-300"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>
            
//             <div className="p-4">
//               <div className="flex flex-col lg:flex-row gap-6">
//                 <div className="flex-1">
//                   <h4 className="font-medium mb-3">Edit Gambar</h4>
//                   <div 
//                     className="border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center relative"
//                     ref={containerRef}
//                     onMouseDown={handleMouseDown}
//                     onMouseMove={handleMouseMove}
//                     onMouseUp={handleMouseUp}
//                     onMouseLeave={handleMouseUp}
//                   >
//                     <div className="relative" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
//                       <canvas 
//                         ref={canvasRef}
//                         className="max-w-full max-h-[400px]"
//                       />
//                       <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
//                         <FiMove /> Geser gambar
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     <button
//                       onClick={() => setRotation(rotation + 90)}
//                       className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
//                     >
//                       <FiRotateCw /> Rotasi 90°
//                     </button>
                    
//                     <button
//                       onClick={() => setScale(scale + 0.1)}
//                       disabled={scale >= 2}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md ${
//                         scale >= 2 
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                           : 'bg-gray-200 hover:bg-gray-300'
//                       }`}
//                     >
//                       <FiZoomIn /> Perbesar
//                     </button>
                    
//                     <button
//                       onClick={() => setScale(Math.max(0.1, scale - 0.1))}
//                       disabled={scale <= 0.2}
//                       className={`flex items-center gap-2 px-3 py-2 rounded-md ${
//                         scale <= 0.2 
//                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//                           : 'bg-gray-200 hover:bg-gray-300'
//                       }`}
//                     >
//                       <FiZoomOut /> Perkecil
//                     </button>
                    
//                     <button
//                       onClick={() => {
//                         setScale(1);
//                         setRotation(0);
//                         setPosition({ x: 0, y: 0 });
//                       }}
//                       className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="lg:w-80">
//                   <h4 className="font-medium mb-3">Hasil Crop 1:1</h4>
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                     <div className="flex items-center justify-center mb-3">
//                       <div className="relative">
//                         {editedImage && (
//                           <img 
//                             src={cropTo1x1()} 
//                             alt="Preview hasil crop" 
//                             className="w-48 h-48 object-contain border border-blue-300 rounded-lg"
//                           />
//                         )}
//                         <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-lg pointer-events-none"></div>
//                       </div>
//                     </div>
//                     <p className="text-sm text-blue-700 text-center">
//                       Gambar akan di-crop menjadi rasio 1:1 (persegi) saat disimpan
//                     </p>
//                   </div>
                  
//                   <h4 className="font-medium mb-3">Tips</h4>
//                   <ul className="text-sm space-y-2 mb-6">
//                     <li className="flex items-start gap-2">
//                       <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">1</div>
//                       <span>Atur posisi produk di dalam area persegi</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">2</div>
//                       <span>Gunakan rotasi untuk memperbaiki orientasi gambar</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">3</div>
//                       <span>Perbesar gambar untuk fokus pada detail produk</span>
//                     </li>
//                   </ul>
                  
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => setShowEditor(false)}
//                       className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg"
//                     >
//                       Batal
//                     </button>
//                     <button
//                       onClick={saveEditedImage}
//                       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
//                     >
//                       <FiCheck /> Simpan Perubahan
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

