import { useState } from "react";
import { Link, Menu, X } from "lucide-react";

function NewNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full z-50 animate-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
                BuildTech
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "allReport", "uploadReport", "Contact"].map((item) => (
                <Link
                  key={item}
                  link={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-blue-900 relative group transition-colors duration-300"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <Link
                className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
                to="/profile"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-900 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-64 opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="py-4 space-y-4 bg-white">
              {["Home", "Services", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="px-4 py-2">
                <button className="w-full bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NewNavbar;
