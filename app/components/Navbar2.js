"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(pathname === '/' ? 'home' : '');
  const router = useRouter();
  const [isSticky, setIsSticky] =  useState(pathname !== '/' ? true : false);



  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Sticky navbar handler
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        setIsSticky(window.scrollY >= 72);

        const sections = ['home', 'about', 'services', 'contact'];
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Scroll into view if needed when navigating from another page
  useEffect(() => {
    const target = localStorage.getItem('scrollTarget');
    if (pathname === '/' && target) {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(target);
        localStorage.removeItem('scrollTarget');
      }
    }
  }, [pathname]);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      localStorage.setItem('scrollTarget', sectionId);
      router.push('/');
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
    { name: 'Products', path: '/products' },
    { name: 'Partners', path: '/partners' },
  ];

  return (
    <header
      className={`ic-navbar z-40 left-0 w-full transition-all duration-300 ${
        isSticky
          ? 'fixed bg-white dark:bg-black/90 border-b border-gray-200 dark:border-gray-800 shadow-lg bg-opacity-85 backdrop-blur-sm'
          : 'absolute bg-transparent'
      }`}
      role="banner"
      aria-label="Navigation bar"
    >
      <div className="container">
        <div className="flex items-center justify-between h-[72px] px-4">

          {/* Logo */}
          <div className="w-60 lg:w-56 max-w-full px-6">
            <Link href="/" className="ic-navbar-logo block w-full py-5 text-primary-color">
              <Image
                src="/img/logo.png"
                alt="Company Logo"
                width={150}
                height={50}
                className="w-full h-auto"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-gray-700 dark:text-white"
            aria-label="Toggle menu"
          >
            <i className={`lni ${isMenuOpen ? 'lni-close' : 'lni-menu'}`}></i>
          </button>

          {/* Navigation Links */}
          <nav
            className={`fixed lg:static top-[72px] right-0 w-64 h-screen lg:h-auto lg:w-auto lg:flex items-center bg-primary-light-1 dark:bg-primary-dark-1 lg:bg-transparent lg:dark:bg-transparent z-50 transition-transform duration-300 lg:translate-x-0 ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
            }`}
          >
            <ul className="flex flex-col lg:flex-row gap-6 px-6 py-10 lg:py-0 lg:px-0">
              {navItems.map(({ name, id, path }) => (
                <li key={name}>
                  {id ? (
                    <a
                      href={`#${id}`}
                      onClick={(e) => handleSectionClick(e, id)}
                      className={`relative group text-lg font-medium transition-colors duration-300 hover:text-body-dark-5 ${
                        activeSection === id ? 'text-body-dark-5 dark:text-blue-400' : 'text-body-dark-5 dark:text-body-dark-12'
                      }`}
                    >
                      {name}
                      <span
                        className={`absolute left-1/2 -bottom-2 h-[2px] bg-blue-700 transform -translate-x-1/2 origin-center transition-all duration-700 ease-in-out ${
                          activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </a>
                  ) : (
                    <Link
                      href={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`relative group text-lg font-medium transition-colors duration-300 hover:text-body-dark-5 ${
                        pathname === path ? 'text-body-dark-5 dark:text-blue-400' : 'text-body-dark-5 dark:text-body-dark-12'
                      }`}
                    >
                      {name}
                      <span
                        className={`absolute left-1/2 -bottom-2 h-[2px] bg-blue-700 transform -translate-x-1/2 origin-center transition-all duration-700 ease-in-out ${
                          pathname === path ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  )}
                </li>
              ))}

              {/* Mobile Only CTA */}
              <li className="lg:hidden">
                <a
                  href="#contact"
                  onClick={(e) => handleSectionClick(e, 'contact')}
                  className="block w-full text-center px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 hover:text-white transition"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-4 pr-4">

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleSectionClick(e, 'contact')}
              className="ml-3 px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 hover:text-white transition"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
