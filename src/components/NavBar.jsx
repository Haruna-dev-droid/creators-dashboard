import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Analytics", href: "#analytics" },
    { name: "Settings", href: "#settings" },
  ];

  return (
    <nav className="bg-blue-500/90 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-black">CrtrsHub</h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-10 items-center">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="font-medium text-white text-sm hover:text-blue-900 cursor-pointer transition-colors"
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="hidden md:flex gap-4 items-center text-sm">
              <button
                className="cursor-pointer px-5 py-2 rounded-xl 
  bg-white/10 backdrop-blur-md 
  border border-white/20 
  text-white font-medium
  shadow-lg shadow-blue-500/10
  hover:bg-white/20 hover:shadow-blue-500/20
  transition-all duration-300"
              >
                Sign in
              </button>

              <button
                className="cursor-pointer px-5 py-2 rounded-xl 
  bg-blue-500/70 backdrop-blur-md 
  border border-blue-300/30 
  text-white font-semibold
  shadow-lg shadow-blue-500/20
  hover:bg-blue-500/30 hover:shadow-blue-500/40
  transition-all duration-300"
              >
                Sign up
              </button>
            </div>
          </NavLink>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 bg-white border-t border-gray-100">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-4 py-3 rounded-lg font-medium text-black hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {/* Mobile Auth Buttons */}
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <button
                className="cursor-pointer px-5 py-2 rounded-xl 
  bg-blue-500/70 backdrop-blur-md 
  border border-white/20 
  text-white font-medium
  shadow-lg shadow-blue-500/10
  hover:bg-white/20 hover:shadow-blue-500/20
  transition-all duration-300"
              >
                Sign in
              </button>

              <button
                className="cursor-pointer px-5 py-2 rounded-xl 
  bg-blue-500 backdrop-blur-md 
  border border-blue-300/30 
  text-white font-semibold
  shadow-lg shadow-blue-500/20
  hover:bg-blue-500/30 hover:shadow-blue-500/40
  transition-all duration-300"
              >
                Sign up
              </button>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
