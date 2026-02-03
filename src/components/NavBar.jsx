import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-black">CrtrsHub</h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-10 items-center">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="font-medium text-black hover:text-blue-600 cursor-pointer transition-colors"
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <button className="border border-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Sign in
            </button>
            <button className="bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-800 transition-colors">
              Sign up
            </button>
          </div>

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
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
            <button className="w-full border border-blue-400 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Sign in
            </button>
            <button className="w-full bg-blue-700 px-4 py-3 rounded-lg text-white font-semibold hover:bg-blue-800 transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
