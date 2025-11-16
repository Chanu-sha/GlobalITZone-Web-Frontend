import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logoSrc from "../assets/Global-IT-Zone.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled ? "shadow-lg py-1.5 px-6" : "py-1.5 px-6 lg:py-1.5 lg:px-8"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-3 no-underline"
          aria-label="Global IT Zone Home"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={logoSrc}
            alt="Global IT Zone logo"
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />

          <span
            className="hidden sm:inline-block text-2xl font-bold leading-none"
            style={{ WebkitBackgroundClip: "text" }}
          >
            <span className="bg-clip-text text-transparent italic bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400">
              Global IT Zone
            </span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl border transition ${
                  item.label === "Contact"
                    ? "bg-red-500 text-white border-red-600 shadow-md"
                    : isActive
                    ? "border-red-500 bg-red-100 text-red-600 font-semibold"
                    : "border-red-300 text-gray-800 bg-red-50 hover:text-red-600 hover:border-red-500 "
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMenuOpen((s) => !s)}
          className="lg:hidden flex flex-col space-y-1.5 p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-transform duration-200 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-opacity duration-200 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-transform duration-200 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col py-1.5 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg text-left transition border ${
                  item.label === "Contact"
                    ? "bg-red-500 text-white border-red-600 shadow-md"
                    : isActive
                    ? "border-red-500 bg-red-100 text-red-600 font-semibold"
                    : "border-red-300 bg-red-50 text-gray-800 hover:text-red-600 hover:border-red-500 "
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
