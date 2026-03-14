import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useApp } from "./contexts/AppContext";

export default function ResponsiveNavbar() {
  const { theme, toggleTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Analytics", href: "#analytics" },
    { name: "Settings", href: "#settings" },
  ];

  return (
    <nav
      className={
        theme === "dark"
          ? "bg-[#050A18] text-white shadow-xl"
          : "bg-slate-100 text-slate-800 shadow-sm"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <h1
            className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-blue-800"}`}
          >
            CrtrsHub
          </h1>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-10 items-center">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`font-medium text-xs cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "text-white hover:text-blue-200"
                    : "text-slate-700 hover:text-blue-800"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-1.5 rounded-md transition ${
                theme === "dark"
                  ? "bg-blue-500/20 text-white hover:bg-blue-500/40"
                  : "bg-blue-500/10 text-blue-700 hover:bg-blue-500/20"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>

            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <div className="flex gap-2 items-center text-sm">
                <button
                  className={`cursor-pointer px-2.5 py-1.5 text-xs rounded-xl font-medium transition ${
                    theme === "dark"
                      ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Sign in
                </button>
                <button
                  className={`cursor-pointer px-2.5 py-1.5 text-xs rounded-xl font-semibold transition ${
                    theme === "dark"
                      ? "bg-blue-500/70 text-white hover:bg-blue-500/90"
                      : "bg-blue-700 text-white hover:bg-blue-800"
                  }`}
                >
                  Sign up
                </button>
              </div>
            </NavLink>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
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
        <div
          className={`px-4 pt-2 pb-6 space-y-3 ${theme === "dark" ? "bg-slate-900 border-t border-slate-700" : "bg-white border-t border-slate-200"}`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                theme === "dark"
                  ? "text-white hover:bg-blue-500/20 hover:text-white"
                  : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
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
