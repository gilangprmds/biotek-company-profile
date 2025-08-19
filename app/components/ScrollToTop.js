"use client";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-5 z-50 p-2.5 rounded-sm bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <IoIosArrowUp />
    </button>
  );
}
