// components/products/ProductDetail.jsx
import { notFound } from 'next/navigation';
import Breadcrumb from '../Breadcrumb';

export default function ProductDetail({ slug, products }) {
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <div>
      {/* Hero Section */}
    <section className="bg-gray-100 pb-20 pt-32 text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Orthopedic Products</h1>
    <p className="text-gray-600 text-lg">Complete solutions for implant and bone health needs.</p>
    </section>
    <div className="max-w-7xl mx-auto p-4">
    <Breadcrumb />
    <div className="py-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.name} className="rounded-xl shadow" />
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="mb-4 text-gray-700">{product.description}</p>

        <table className="w-full border border-gray-200 mb-6 text-sm">
          <tbody>
            <tr className="bg-gray-100">
              <td className="p-2 font-medium w-1/3">No Product:</td>
              <td className="p-2">{product.noProduct}</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Model/Type:</td>
              <td className="p-2">{product.modelOrType}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2 font-medium">Unit of Measurement:</td>
              <td className="p-2">{product.unitsOfMeasurement}</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">KBKI Code:</td>
              <td className="p-2">{product.kbkiCode}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2 font-medium">Permit to Circulate Number:</td>
              <td className="p-2">{product.permitToCirculateNumber}</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Factory Name:</td>
              <td className="p-2">{product.factoryName}</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="p-2 font-medium">Product Validity Period:</td>
              <td className="p-2">{product.productValidityPeriod}</td>
            </tr>
          </tbody>
        </table>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
          INQUIRY NOW
        </button>
      </div>
    </div>
    
    <section className='grid'>
    <form className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto mt-12">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">Leave a Message</h2>
  <p className="text-gray-600 mb-6">
    Interested in this product? Send us your inquiry and we’ll get back to you shortly.
  </p>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
    <div className="bg-gray-100 rounded-md px-4 py-2 text-blue-600 font-semibold">
    {product.name}
    </div>
  </div>

  <div className="grid md:grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
      <input
        type="email"
        placeholder="example@email.com"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Tel/WhatsApp</label>
      <input
        type="tel"
        placeholder="+62..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
    <textarea
      rows="4"
      placeholder="Enter product details, model, specifications, materials, etc."
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    ></textarea>
  </div>

  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition">
    Submit
  </button>
</form>

    </section>
    </div>
        
    </div>
    
  );
}
