/* eslint-disable no-unused-vars */
// HomePage.js
import hero1 from "../assets/Bgimage.jpg";
import hero2 from "../assets/heronew.webp";
import hero3 from "../assets/bgImage1.webp";
import hero4 from "../assets/imageSingin.webp";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import ContactSection from "../components/ContactSection";
import { AnimatedTestimonials } from "../components/HomePage/animated_testimonials";

// Create a separate component for styles
const Styles = () => (
  <style>
    {`
      @keyframes navbar {
        from {
          transform: translateY(-100%);
        }
        to {
          transform: translateY(0);
        }
      }

      @keyframes contentSlide {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes fade {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-navbar {
        animation: navbar 0.5s ease-out;
      }

      .animate-content-slide {
        animation: contentSlide 0.8s ease-out;
      }

      .animate-fade {
        animation: fade 1s ease-out forwards;
      }
    `}
  </style>
);
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const heroImages = [hero1, hero2, hero3, hero4];

  const services = [
    {
      title: "Commercial Construction",
      description:
        "Full-scale construction services for commercial buildings, offices, and retail spaces.",
      image: hero1,
    },
    {
      title: "Residential Projects",
      description: "Custom home building and residential development projects.",
      image: hero2,
    },
    {
      title: "Renovation",
      description:
        "Complete renovation and remodeling services for existing structures.",
      image: hero3,
    },
    {
      title: "Infrastructure",
      description:
        "Major infrastructure projects including roads, bridges, and public facilities.",
      image: hero4,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".animate-on-scroll");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        if (isInView) {
          setIsVisible((prev) => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  return (
    <>
      <Styles /> {/* Add the styles component at the top level */}
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative  overflow-hidden">
          <div className="relative h-screen flex items-center">
            {/* Image Carousel */}
            <div className="absolute inset-0 transition-opacity duration-1000">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentImageIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Construction site ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
              <ChevronRight className="text-white" size={24} />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-white max-w-3xl animate-content-slide">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-purple-200 ">
                  Building Dreams Into Reality
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  Leading the construction industry with innovative solutions
                  and sustainable practices.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transform hover:scale-105 transition-all duration-300">
                    Explore Projects
                  </button>
                  <button
                    className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                    onClick={Navigate("/contact-us")}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Project Section */}
        <div
          id="featured-project"
          className={`relative py-32 bg-gray-900 animate-on-scroll ${
            isVisible["featured-project"] ? "animate-fade" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src={hero1}
                  alt="Featured project"
                  className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6">Featured Project</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Our latest landmark project showcases innovative design and
                  sustainable construction practices, setting new standards in
                  the industry.
                </p>
                <button className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transform hover:scale-105 transition-all duration-300">
                  View Project Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div
          id="services-section"
          className={`py-20 bg-gray-50 animate-on-scroll ${
            isVisible["services-section"] ? "animate-fade" : "opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive construction solutions tailored to your vision
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <button className="text-blue-900 flex items-center group">
                      Learn More
                      <ArrowRight
                        className="ml-2 transform group-hover:translate-x-2 transition-transform"
                        size={16}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <AnimatedTestimonials /> */}

        <ContactSection />

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">BuildTech</h3>
                <p className="text-gray-400">
                  Building excellence through innovation and dedication.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/" className="hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="hover:text-white">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/projects" className="hover:text-white">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Commercial Construction</li>
                  <li>Residential Projects</li>
                  <li>Renovation</li>
                  <li>Infrastructure</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>123 Construction Ave</li>
                  <li>City, State 12345</li>
                  <li>+1 (555) 123-4567</li>
                  <li>contact@buildtech.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 BuildTech. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
