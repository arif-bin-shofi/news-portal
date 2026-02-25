import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState("idle"); // idle, loading, success, error

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscriptionStatus("loading");

    setTimeout(() => {
      setSubscriptionStatus("success");
      setEmail("");
      setTimeout(() => setSubscriptionStatus("idle"), 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
      url: "https://facebook.com",
      color: "hover:bg-blue-600",
    },
    {
      name: "Twitter",
      icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
      url: "https://twitter.com",
      color: "hover:bg-sky-500",
    },
    {
      name: "Instagram",
      icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z",
      url: "https://instagram.com",
      color: "hover:bg-pink-600",
    },
    {
      name: "LinkedIn",
      icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 110 4 2 2 0 010-4z",
      url: "https://linkedin.com",
      color: "hover:bg-blue-700",
    },
    {
      name: "YouTube",
      icon: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z",
      url: "https://youtube.com",
      color: "hover:bg-red-600",
    },
  ];

  const quickLinks = [
    {
      name: "Home",
      path: "/",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "News",
      path: "/news",
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    },
    {
      name: "About Us",
      path: "/about",
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      name: "Privacy Policy",
      path: "/privacy",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
  ];

  const categories = [
    {
      name: "Technology",
      path: "/news?category=technology",
      color: "bg-blue-500",
      count: 245,
    },
    {
      name: "Sports",
      path: "/news?category=sports",
      color: "bg-green-500",
      count: 189,
    },
    {
      name: "Business",
      path: "/news?category=business",
      color: "bg-purple-500",
      count: 156,
    },
    {
      name: "Entertainment",
      path: "/news?category=entertainment",
      color: "bg-pink-500",
      count: 203,
    },
    {
      name: "Politics",
      path: "/news?category=politics",
      color: "bg-red-500",
      count: 178,
    },
    {
      name: "Health",
      path: "/news?category=health",
      color: "bg-emerald-500",
      count: 134,
    },
    {
      name: "Science",
      path: "/news?category=science",
      color: "bg-indigo-500",
      count: 98,
    },
  ];

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-white mt-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800">
        <div className="container-custom py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4 bg-linear-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Stay Updated with NewsPortal
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter and get the latest news delivered
              directly to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  required
                />
                {subscriptionStatus === "success" && (
                  <div className="absolute -top-10 left-0 right-0 bg-green-500 text-white text-sm py-2 px-4 rounded-lg shadow-lg">
                    ✓ Successfully subscribed!
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={subscriptionStatus === "loading"}
                className="px-6 py-3 bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary-500/25"
              >
                {subscriptionStatus === "loading" ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-bold bg-linear-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                NewsPortal
              </h2>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Delivering accurate, timely, and impactful news from around the
              globe. Our commitment is to keep you informed with quality
              journalism.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color} hover:scale-110`}
                  aria-label={social.name}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* App Store Badges */}
            <div className="flex space-x-3 pt-4">
              <a
                href="#"
                className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-xl transition-all hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-xl transition-all hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186 18.217 12 3.608 1.814z" />
                </svg>
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-primary-500 to-purple-500"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white group"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600 group-hover:text-primary-500 transition-all group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={link.icon}
                      />
                    </svg>
                    <span className="transition-all group-hover:translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Popular Categories
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-primary-500 to-purple-500"></span>
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="group flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/60 rounded-xl transition-all hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${category.color} group-hover:animate-pulse`}
                    ></div>
                    <span className="text-gray-300 group-hover:text-white text-sm">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-primary-500 to-purple-500"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email Us</p>
                 
                  <a
                    href="mailto:support@newsportal.com"
                    className="text-white hover:text-primary-400 transition text-sm"
                  >
                    support@newsportal.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Call Us</p>
                  <a
                    href="tel:+1234567890"
                    className="text-white hover:text-primary-400 transition"
                  >
                   
                   +8801722559872
                  </a>
                  
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Visit Us</p>
                  <p className="text-white">
                    Rangpur
              
                    <br />
                   Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Bottom Bar */}
<div className="relative border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
  <div className="container-custom py-6">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <p className="text-gray-400 text-sm">
        © {currentYear} NewsPortal. All rights reserved.
      </p>

      <div className="flex space-x-6 text-sm">
        <Link
          to="/privacy"
          className="text-gray-400 hover:text-white transition flex items-center space-x-1 group"
        >
          <span>Privacy Policy</span>
          <svg
            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
        
        <Link
          to="/terms"
          className="text-gray-400 hover:text-white transition flex items-center space-x-1 group"
        >
          <span>Terms of Service</span>
          <svg
            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
        
        <Link
          to="/cookies"
          className="text-gray-400 hover:text-white transition flex items-center space-x-1 group"
        >
          <span>Cookie Policy</span>  {/* এখানে "Privacy Policy" থেকে "Cookie Policy" করা হয়েছে */}
          <svg
            className="w-3 h-3 opacity-0 group-hover:opacity-100 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="flex space-x-3">
        <span className="text-gray-500 text-sm">Made with</span>
        <svg
          className="w-4 h-4 text-red-500 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-500 text-sm">in Bangladesh</span>
      </div>
    </div>
  </div>
</div>
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 z-50 animate-bounce"
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
