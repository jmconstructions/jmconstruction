/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Phone, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function ContactSection() {
  const [isVisible, setIsVisible] = useState({});
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(firstName, lastName, email, message);
      /* const { data } = axios.post(
        "http://localhost:/api/v1/user",
        { firstName, lastName, email, message },
        config
      ); */
      if (data.status == "success") {
        setShowSuccesAlert(true);
        setTimeout(() => setShowSuccesAlert(false), 1000);
      }
    } catch (error) {
      console.log(erorr);
    }
  };
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
  return (
    <div
      id="contact-us"
      className={`py-20 bg-white animate-on-scroll ${
        isVisible["contact-us"] ? "animate-fadeIn" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Ready to start your project? Contact us for a free consultation.
            </p>
            <div className="space-y-4">
              {[
                { Icon: Phone, text: "+1 (555) 123-4567" },
                { Icon: Mail, text: "contact@buildtech.com" },
                {
                  Icon: MapPin,
                  text: "123 Construction Ave, City, State 12345",
                },
              ].map(({ Icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center hover:translate-x-2 transition-transform duration-300"
                >
                  <Icon className="text-blue-900 mr-4" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                required
                type="text"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transform hover:scale-101 transition-transform duration-300"
              />
              <input
                required
                type="text"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transform hover:scale-101 transition-transform duration-300"
              />
            </div>
            <input
              required
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transform hover:scale-101 transition-transform duration-300"
            />
            <textarea
              required
              placeholder="Your Message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 transform hover:scale-101 transition-transform duration-300"
            />
            <button className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transform hover:scale-102 transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
