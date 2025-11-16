import React from "react";
import {
  Monitor,
  Wrench,
  ShieldCheck,
  HardDrive,
  Bug,
  Cpu,
  Zap,
  Camera,
  ShoppingCart,
  RefreshCw,
  Headphones,
  Box,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Monitor,
      title: "Windows OS Installation",
      description:
        "Professional installation of Windows 10/11 with full driver setup and optimization.",
      features: [
        "Genuine Windows License",
        "Driver Installation",
        "System Optimization",
      ],
    },
    {
      icon: Wrench,
      title: "Hardware Repair",
      description:
        "Expert repair services for motherboards, RAM, graphics cards, and all PC components.",
      features: [
        "Diagnostic Testing",
        "Component Level Repair",
        "Same Day Service",
      ],
    },
    {
      icon: ShieldCheck,
      title: "90 Days Warranty",
      description:
        "Comprehensive warranty coverage on all repairs and installations with free support.",
      features: ["Parts & Labor Coverage", "Free Technical Support", "Priority Service"],
    },
    {
      icon: HardDrive,
      title: "Data Recovery",
      description:
        "Advanced data recovery from damaged hard drives, SSDs, and USB devices with high success rate.",
      features: [
        "Deleted File Recovery",
        "Formatted Drive Recovery",
        "Corrupted Data Repair",
      ],
    },
    {
      icon: Bug,
      title: "Virus & Malware Removal",
      description:
        "Complete system cleanup and protection setup against viruses, ransomware, and spyware.",
      features: ["Deep System Scan", "Real-time Protection", "Security Hardening"],
    },
    {
      icon: Cpu,
      title: "Custom PC Build & Upgrade",
      description:
        "High-performance custom builds for gaming, workstations, and professional use with expert consultation.",
      features: ["Component Selection", "Performance Testing", "Cable Management"],
    },

    // NEW / ADDED CARDS START HERE
    {
      icon: ShoppingCart,
      title: "Buy New Laptops & Desktops",
      description:
        "Wide selection of brand-new laptops and desktop PCs — gaming, ultrabooks, and business machines.",
      features: [
        "Latest Models In Stock",
        "Manufacturer Warranty",
        "Configuration & Demo",
      ],
    },
    {
      icon: RefreshCw,
      title: " Second-hand Laptops / Desktops",
      description:
        "Trusted buyback  — we test, refurbish and provide warranty on certified pre-owned machines.",
      features: [
        "Certified Refurbished Units",
        "Fair Valuation & Buyback",
        "Affordable Upgrades",
      ],
    },
    {
      icon: Camera,
      title: "CCTV Sales & Installation",
      description:
        "CCTV cameras, NVR/DVR systems and professional installation for homes and businesses.",
      features: [
        "IP & Analog Cameras",
        "Remote Viewing Setup",
        "Professional Cable Management",
      ],
    },
    {
      icon: Headphones,
      title: "Laptop & Desktop Accessories",
      description:
        "All essential accessories — bags, mice, keyboards, headsets, adapters and more from top brands.",
      features: [
        "Genuine Branded Accessories",
        "Warranty on Selected Items",
        "Compatibility Advice",
      ],
    },
    {
      icon: Box,
      title: "On-site Installation & Setup",
      description:
        "We come to you — on-site assembly, networking, data migration and full device setup.",
      features: [
        "Home & Office Visits",
        "Network & Wi-Fi Setup",
        "Data Migration & Backup",
      ],
    },
    // NEW / ADDED CARDS END HERE
  ];

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-gradient-to-br  from-gray-900 via-gray-800 to-gray-900 text-gray-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-12 mb-4">
              Our <span className="italic text-red-500">Services</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6"></div>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Professional IT solutions delivered with expertise and precision.
            From system installations to complex repairs, we've got you covered.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-600/40 overflow-hidden"
              >
                <div className="p-8">
                  <div
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-orange-500 
                                  flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-300"
                      >
                        <Zap className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* optional quick action buttons for certain cards (keeps UI intact) */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate("/contact")}
                      className="px-4 py-2 bg-gray-900/30 text-sm rounded-md border border-gray-600/30 hover:bg-gray-900/40 transition"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-lg p-8 border border-gray-600/40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Need Emergency Support?
                </h3>
                <p className="text-gray-400">
                  Get instant help with our 24/7 emergency support service
                </p>
              </div>
              <div>
                <button
                  onClick={() => navigate("/contact")}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition duration-300"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
