import React from "react";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  FileText,
  Calendar,
  Activity,
} from "lucide-react";
import { useAuth } from "../contexts/ContextAuth";
import { useApp } from "../contexts/AppContext";
import { Eye, Users, Heart, DollarSign } from "lucide-react";

function Dashboard() {
  const { notes, activities } = useApp();
  // const [activities, setActivities] = useState([]);
  // const [notes, setNotes] = useState([]);
  const { currentUser } = useAuth();
  const user = currentUser;

  // useEffect(() => {
  //   const savedActivities = localStorage.getItem("activities");
  //   const savedNotes = localStorage.getItem("notes");

  //   if (savedActivities) setActivities(JSON.parse(savedActivities));
  //   if (savedNotes) setNotes(JSON.parse(savedNotes));
  // }, []);

  // Activity type styling
  const getActivityStyle = (type) => {
    switch (type) {
      case "created":
        return "bg-green-100 text-green-800 border-green-300";
      case "edited":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "deleted":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "created":
        return <Plus size={16} />;
      case "edited":
        return <Edit2 size={16} />;
      case "deleted":
        return <Trash2 size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome Back! {user?.name || "Guest"}
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-20 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Total Notes
              </h3>
              <FileText size={24} className="text-blue-400 mb-4" />{" "}
            </div>
            <p className="text-3xl font-bold text-gray-900">{notes.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                This Week
              </h3>
              <Calendar size={24} className="text-blue-400 mb-4" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {
                activities.filter((a) => {
                  const activityDate = new Date(a.timestamp);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return activityDate > weekAgo;
                }).length
              }
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                Total Activities
              </h3>
              <Activity size={24} className="text-blue-400 mb-4" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {activities.length}
            </p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-[18px] font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText size={24} />
            Recent Activities
          </h2>

          {activities.length > 0 ? (
            <div className="space-y-3 text-sm">
              {activities.slice(0, 10).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg border-l-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  style={{
                    borderLeftColor:
                      activity.type === "created"
                        ? "#22c55e"
                        : activity.type === "edited"
                          ? "#3b82f6"
                          : "#ef4444",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-full ${getActivityStyle(activity.type)}`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-[14px]">
                        <span className="capitalize">{activity.type}</span>
                        {activity.noteTitle ? `: ${activity.noteTitle}` : ""}
                      </p>
                      <p className=" text-gray-500 mt-1 text-[10px]">
                        Category:{" "}
                        <span className="font-medium capitalize">
                          {activity.category
                            ? activity.category
                            : activity.todo
                              ? "Todo"
                              : "General"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No activities yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
