import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto relative">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Shop Info */}
          <div>
            <h3 className="text-red-400 text-2xl font-bold uppercase tracking-wide mb-4">
              Global IT Zone
            </h3>
            <p className="leading-7 opacity-90">
              Trusted Computer Repair & Sales Shop in Bhubaneswar. We provide
              high-quality repair, genuine accessories, and reliable IT
              solutions for home & business.
            </p>
            <div className="flex gap-4 mt-6">
              {["📘", "📷", "💼"].map((icon, idx) => (
                <span
                  key={idx}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 text-gray-200 text-lg rounded-full"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4 relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-red-400">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Laptop & Desktop Repair",
                "Data Recovery",
                "Virus Removal",
                "Custom PC Build",
                "Networking Solutions",
              ].map((item, idx) => (
                <li key={idx} className="hover:text-red-400 transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4 relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-red-400">
              Products
            </h4>
            <ul className="space-y-3">
              {[
                "Laptops & Desktops",
                "Computer Accessories",
                "Printers & Scanners",
                "Networking Devices",
                "Software Licenses",
              ].map((item, idx) => (
                <li key={idx} className="hover:text-red-400 transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4 relative inline-block pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-red-400">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <p className="hover:text-white transition">📞 +91 72056 91103</p>
              <p className="hover:text-white transition">
                📍  Plot number 269, near Hotel Empire, E-Block, Saheed Nagar, Bhubaneswar, Odisha 751007 ,India.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full bg-black/40 border-t text-center border-gray-700 py-6">
          <p className="opacity-80 text-sm">
            &copy; {new Date().getFullYear()} Global IT Zone. All rights
            reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
