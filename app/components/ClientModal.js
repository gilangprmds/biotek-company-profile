import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ClientModal({ client, onClose }) {
  return (
    <Transition show={!!client} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-4">
          {/* Background Overlay dengan Transition */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* Modal content */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6 shadow-lg z-10" data-aos="zoom-in">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-2xl font-semibold">{client.title}</h2>
                <button onClick={onClose} className="text-xl font-bold">&times;</button>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img src={client.image} alt={client.title} className="w-40 h-40 object-contain" />
                </div>
                <div className="text-gray-700">
                  <p>{client.description || "No description available."}</p>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
