import React from "react";

function ContentEditor() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Content</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Videos</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upload New
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-16 bg-gray-200 rounded"></div>
                <div>
                  <h3 className="font-semibold">Video Title {item}</h3>
                  <p className="text-sm text-gray-600">Published 2 days ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">12.5K views</p>
                <p className="text-sm text-gray-600">3.2K likes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContentEditor;
