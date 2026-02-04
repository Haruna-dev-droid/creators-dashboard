import React from "react";

function Dashboard() {
  return (
    <div className=" min-h-screen">
      <div className="text-blue-950 ">
        <h1 className="text-3xl font-bold  mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className=" p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Views</p>
            <p className="text-2xl font-bold ">1.2M</p>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>
          <div className=" p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Subscribers</p>
            <p className="text-2xl font-bold ">45.2K</p>
            <p className="text-sm text-green-600 mt-2">+8% from last month</p>
          </div>
          <div className=" p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Engagement Rate</p>
            <p className="text-2xl font-bold ">6.4%</p>
            <p className="text-sm text-red-600 mt-2">-2% from last month</p>
          </div>
          <div className=" p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Revenue</p>
            <p className="text-2xl font-bold ">$8,420</p>
            <p className="text-sm text-green-600 mt-2">+15% from last month</p>
          </div>
        </div>
        <div className=" p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">
            Your latest content performance and updates will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
