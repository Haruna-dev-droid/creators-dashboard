import React, { useState } from "react";
import { Routes, Route, Link, useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileEdit,
  BarChart3,
  Sparkles,
  ClipboardCheck,
  Settings,
  Users,
  FileText,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/ContextAuth";
import Dashboard from "../pages/Dashboard";
import ContentEditor from "../pages/ContentEditor";
import Analytics from "../pages/Analytics";
import AiAssistant from "../pages/AiAssistant";
import Todo from "../pages/Todo";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const user = currentUser;
  const navItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboardrouter",
    },
    {
      id: "contenteditor",
      name: "Content Editor",
      icon: FileEdit,
      path: "/dashboardrouter/contenteditor",
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: BarChart3,
      path: "/dashboardrouter/analytics",
    },

    {
      id: "todo",
      name: "Todo",
      icon: ClipboardCheck,
      path: "/dashboardrouter/todo",
    },

    {
      id: "aiassistant",
      name: "AI Assistant",
      icon: Sparkles,
      path: "/dashboardrouter/aiassistant",
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-blue-600/10 text-slate-950 transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between ">
        {isOpen && <h1 className="text-xl font-bold">CreatorHub</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 text-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-slate-950 ${
                isActive
                  ? "bg-blue-600 text-slate-950"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {isOpen && (
        <div className="p-4 ">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="font-semibold">
                {user?.name?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-sm">{user?.name || "User"}</p>
              <p className="text-xs text-gray-400">Creator</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

function DashboardRouter() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/contenteditor" element={<ContentEditor />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/aiassistant" element={<AiAssistant />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardRouter;
