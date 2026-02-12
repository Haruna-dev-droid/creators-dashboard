import React from "react";

function AiAssistant() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Assistant</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <p className="text-gray-600">
          Detailed analytics and insights about your content performance.
        </p>
        <div className="mt-6 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
}

export default AiAssistant;
