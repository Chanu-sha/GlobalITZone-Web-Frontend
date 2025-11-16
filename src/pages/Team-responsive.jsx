import React, { useState, useEffect, useRef } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Award, Users, Star, ChevronRight, X } from "lucide-react";

function Team() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const team = [
    {
      id: 1,
      name: "John Smith",
      role: "Lead Technician",
      department: "technical",
      experience: "12+ years",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: [
        { name: "Engine Diagnostics", level: 95 },
        { name: "Electrical Systems", level: 90 },
        { name: "Customer Service", level: 85 }
      ],
      achievements: [
        "ASE Master Certified",
        "Top Technician Award 2023",
        "15,000+ Repairs Completed"
      ],
      bio: "John brings over a decade of automotive expertise with specialized training in European and Asian vehicles. His diagnostic skills are unmatched.",
      socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 2,
      name: "Alana Vasquez",
      role: "Customer Support Manager",
      department: "support",
      experience: "8+ years",
      email: "alana.vasquez@company.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: [
        { name: "Customer Relations", level: 98 },
        { name: "Problem Solving", level: 92 },
        { name: "Communication", level: 95 }
      ],
      achievements: [
        "Customer Excellence Award",
        "5-Star Rating Maintainer",
        "1000+ Happy Customers"
      ],
      bio: "Alana ensures every customer receives personalized attention and clear communication throughout their service experience.",
      socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 3,
      name: "Andrew Williams",
      role: "IT Specialist",
      department: "technical",
      experience: "6+ years",
      email: "andrew.williams@company.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: [
        { name: "System Diagnostics", level: 93 },
        { name: "Software Development", level: 88 },
        { name: "Data Analysis", level: 85 }
      ],
      achievements: [
        "Certified Automotive IT Professional",
        "Innovation Award 2023",
        "System Uptime: 99.9%"
      ],
      bio: "Andrew specializes in cutting-edge diagnostic technology and software solutions for modern vehicles.",
      socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Senior Mechanic",
      department: "technical",
      experience: "10+ years",
      email: "sarah.johnson@company.com",
      phone: "+1 (555) 456-7890",
      location: "Miami, FL",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: [
        { name: "Engine Repair", level: 96 },
        { name: "Transmission Work", level: 94 },
        { name: "Brake Systems", level: 92 }
      ],
      achievements: [
        "ASE Certified Master Mechanic",
        "12,000+ Successful Repairs"
      ],
      bio: "Sarah is our lead mechanic with expertise in all vehicle systems and a passion for complex repairs.",
      socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "Parts Manager",
      department: "management",
      experience: "7+ years",
      email: "michael.chen@company.com",
      phone: "+1 (555) 567-8901",
      location: "Seattle, WA",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: [
        { name: "Inventory Management", level: 94 },
        { name: "Supplier Relations", level: 91 },
        { name: "Cost Optimization", level: 89 }
      ],
      achievements: [
        "Supply Chain Excellence Award",
        "Zero Stock-out Record",
        "15% Cost Reduction Achievement"
      ],
      bio: "Michael ensures we always have the right parts at the right time while maintaining cost efficiency.",
      socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 6,
      name: "Emily Rodriguez",
      role: "Quality Control Inspector",
      department: "quality",
      experience: "9+ years",
      email: "emily.rodriguez@company.com",
      phone: "+1 (555) 678-9012",
      location: "Denver, CO",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: [
        { name: "Quality Assurance", level: 97 },
        { name: "Detail Orientation", level: 95 },
        { name: "Standards Compliance", level: 93 }
      ],
      achievements: [
        "Quality Excellence Certification",
        "Zero Defect Rate Achievement",
        "ISO Standards Expert"
      ],
      bio: "Emily ensures every repair meets our rigorous quality standards before delivery to customers.",
      socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    }
  ];

  const filteredTeam = filterRole === "all" 
    ? team 
    : team.filter(member => member.department === filterRole);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const openModal = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet Our <span className="text-blue-600">Expert Team</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our certified professionals bring decades of combined experience to deliver exceptional automotive service and customer care.
          </p>
        </div>

        <div className={`mb-12 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => setFilterRole("all")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filterRole === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
          >
            All Team
          </button>
          <button
            onClick={() => setFilterRole("technical")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filterRole === "technical"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
          >
            Technical
          </button>
          <button
            onClick={() => setFilterRole("support")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filterRole === "support"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
          >
            Support
          </button>
          <button
            onClick={() => setFilterRole("management")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filterRole === "management"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
          >
            Management
          </button>
          <button
            onClick={() => setFilterRole("quality")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              filterRole === "quality"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
          >
            Quality
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member, index) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openModal(member)}
            >
              <div className="relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm opacity-90">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-slate-600">{member.experience}</span>
                </div>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                <div className="flex space-x-3">
                  {Object.entries(member.socials).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {platform === 'facebook' && <Facebook className="w-4 h-4" />}
                      {platform === 'twitter' && <Twitter className="w-4 h-4" />}
                      {platform === 'instagram' && <Instagram className="w-4 h-4" />}
                      {platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
              <button
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedMember.img}
                    alt={selectedMember.name}
                    className="w-full rounded-xl"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-slate-500 mr-2" />
                      <span className="text-sm">{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-slate-500 mr-2" />
                      <span className="text-sm">{selectedMember.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-slate-500 mr-2" />
                      <span className="text-sm">{selectedMember.location}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{selectedMember.role}</h4>
                  <p className="text-slate-600 mb-4">{selectedMember.bio}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold mb-2">Key Skills</h5>
                    {selectedMember.skills.map((skill) => (
                      <div key={skill.name} className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h5 className="font-semibold mb-2">Achievements</h5>
                    <ul className="space-y-1">
                      {selectedMember.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Team;
