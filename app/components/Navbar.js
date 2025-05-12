"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('home');
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();
  const [isSticky, setIsSticky] = pathname === '/' ? useState(false) : useState(true);



  // Theme Handler
  useEffect(() => {
    const savedTheme = localStorage.getItem('Inazuma_WebTheme') || 'light';
    setTheme(savedTheme);
    document.documentElement.dataset.webTheme = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('Inazuma_WebTheme', newTheme);
    document.documentElement.dataset.webTheme = newTheme;
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Sticky navbar handler
  useEffect(() => {
    const handleScroll = () => {
        if (pathname === '/'){
          setIsSticky(window.scrollY >= 72);
        }
        
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`ic-navbar absolute left-0 top-0 z-40 flex w-full items-center bg-blue-700 bg-opacity-95 shadow-md transition-all duration-300 ${
        isSticky ? 'sticky' : ''
      }`}
      role="banner"
      aria-label="Navigation bar"
    >
      <div className="container">
        <div className="ic-navbar-container relative -mx-5 flex items-center justify-between">
          <div className="w-60 lg:w-56 max-w-full px-5">
            <Link href="/" className="ic-navbar-logo block w-full py-5 text-primary-color">
              <Image
                src="/img/logo.png"
                alt="Company Logo"
                width={200} // atur sesuai ukuran yang kamu inginkan
                height={50}
                className="w-full h-auto"
              />
            </Link>
          </div>

          <div className="flex w-full items-center justify-between px-5">
            <div>
              <button
                type="button"
                onClick={toggleMenu}
                className="ic-navbar-toggler absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-md px-3 py-[6px] text-[22px]/none text-primary-color ring-primary focus:ring-2 lg:hidden"
                aria-expanded={isMenuOpen}
                aria-label="Toggle navigation menu"
              >
            <i className={isMenuOpen ? "lni lni-close text-2xl" : "lni lni-menu text-2xl"}></i>              </button>

              <nav
                id="navbarMenu"
                className={`ic-navbar-collapse absolute right-4 top-[80px] w-full max-w-[250px] rounded-lg bg-primary-light-1 py-5 shadow-lg dark:bg-primary-dark-1 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6 ${
                  isMenuOpen ? 'block' : 'hidden'
                }`}
              >
                <ul className="block lg:flex space-x-8" role="menu" aria-label="Navigation menu">
                  {['home', 'about', 'services', 'contact'].map(
                    (item) => (
                      <li key={item} className="group relative">
                        <Link
                          href={pathname === '/' ? `#${item}` : `/#${item}`}
                          className="ic-page-scroll mx-8 flex py-2 text-xl font-medium text-body-light-12 group-hover:text-primary dark:text-body-dark-12 lg:mx-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-primary-color lg:dark:text-primary-color lg:group-hover:text-primary-color lg:group-hover:opacity-70"
                          onClick={() => setIsMenuOpen(false)}
                          role="menuitem"
                        >
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Link>
                      </li>
                    )
                  )}
<li className="group relative">
  <Link
    href="/products"
    className="ic-page-scroll mx-8 flex py-2 text-xl font-medium text-body-light-12 group-hover:text-primary dark:text-body-dark-12 lg:mx-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-primary-color lg:dark:text-primary-color lg:group-hover:text-primary-color lg:group-hover:opacity-70"
    onClick={() => setIsMenuOpen(false)}
    role="menuitem"
  >
    Our Product
  </Link>
</li>
<li className="group relative">
  <Link
    href="/partners"
    className="ic-page-scroll mx-8 flex py-2 text-xl font-medium text-body-light-12 group-hover:text-primary dark:text-body-dark-12 lg:mx-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-primary-color lg:dark:text-primary-color lg:group-hover:text-primary-color lg:group-hover:opacity-70"
    onClick={() => setIsMenuOpen(false)}
    role="menuitem"
  >
    Our Partners
  </Link>
</li>
                  
                </ul>
              </nav>
            </div>

            <div className="flex items-center justify-end pr-[52px] lg:pr-0">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center text-primary-color text-[24px]/none hover:text-opacity-75"
              aria-label="Switch theme"
              data-web-trigger="web-theme"
            >
            {theme === 'dark' ? (
            <i className="lni lni-sun"></i>
            ) : (
            <i className="lni lni-moon"></i> // Diubah dari lni-night ke lni-moon
            )}
            </button>
              <div className="hidden sm:flex">
                <Link
                  href="#"
                  className="btn-navbar ml-5 px-6 py-3 rounded-md bg-primary-color bg-opacity-20 text-base font-medium text-primary-color hover:bg-opacity-100 hover:text-primary"
                  role="button"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}