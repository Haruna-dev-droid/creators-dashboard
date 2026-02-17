export default function EditorMock() {
  return (
    <div className="h-[420px] grid grid-cols-4">
      {/* Sidebar */}
      <div className="col-span-1 border-r p-4 bg-gray-50">
        <p className="text-sm font-semibold mb-3">Workspace</p>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="font-medium text-black">Drafts</li>
          <li>Ideas</li>
          <li>Scheduled</li>
          <li>Published</li>
        </ul>
      </div>

      {/* Editor */}
      <div className="col-span-3 p-6">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-11/12" />
          <div className="h-3 bg-gray-200 rounded w-10/12" />
          <div className="h-3 bg-gray-200 rounded w-9/12" />
        </div>
      </div>
    </div>
  );
}
