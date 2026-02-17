import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  FileText,
  LayoutGrid,
  CheckSquare,
  Lightbulb,
  MessageSquare,
  PlusCircle,
} from "lucide-react";

function ContentEditor() {
  const [notes, setNotes] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "ideas",
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState(["todo", "ideas", "captions"]);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [activities, setActivities] = useState([]);

  // Color palette for notes
  const noteColors = [
    "bg-green-100 border-green-200",
    "bg-blue-100 border-blue-200",
    "bg-purple-100 border-purple-200",
    "bg-yellow-100 border-yellow-200",
    "bg-pink-100 border-pink-200",
    "bg-indigo-100 border-indigo-200",
  ];

  // Tracking Activities
  useEffect(() => {
    const savedActivities = localStorage.getItem("activities");
    if (savedActivities) setActivities(JSON.parse(savedActivities));
  }, []);

  // Load notes and drafts from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedDrafts = localStorage.getItem("drafts");
    const savedCategories = localStorage.getItem("categories");

    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedDrafts) setDrafts(JSON.parse(savedDrafts));
    if (savedCategories) setCategories(JSON.parse(savedCategories));

    setIsLoaded(true);
  }, []);

  // Save activities when they change

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("activities", JSON.stringify(activities));
    }
  }, [activities, isLoaded]);

  // FUnction that logs activity

  const logActivity = (type, noteTitle, category) => {
    const activity = {
      id: Date.now(),
      type,
      noteTitle,
      category,
      timestamp: new Date().toISOString(),
    };
    setActivities([activity, ...activities].slice(0, 50));
  };

  // Save notes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  // Save drafts to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("drafts", JSON.stringify(drafts));
    }
  }, [drafts, isLoaded]);

  // Save categories to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories, isLoaded]);

  // Auto-save draft as user types
  useEffect(() => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const draftTimer = setTimeout(() => {
        const existingDraftIndex = drafts.findIndex(
          (d) => d.id === "current-draft",
        );
        const draft = {
          id: "current-draft",
          title: newNote.title,
          content: newNote.content,
          category: newNote.category,
          savedAt: new Date().toISOString(),
        };

        if (existingDraftIndex >= 0) {
          const updatedDrafts = [...drafts];
          updatedDrafts[existingDraftIndex] = draft;
          setDrafts(updatedDrafts);
        } else {
          setDrafts([...drafts, draft]);
        }
      }, 1000);

      return () => clearTimeout(draftTimer);
    }
  }, [newNote.title, newNote.content, newNote.category]);

  // Create new note
  const handleNewNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        category: newNote.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([note, ...notes]);
      logActivity("created", note.title || "Untitled", note.category);
      setNewNote({ title: "", content: "", category: "ideas" });
      // Remove draft after publishing
      setDrafts(drafts.filter((d) => d.id !== "current-draft"));
    }
  };

  // Delete note
  const handleDeleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    logActivity(
      "deleted",
      noteToDelete.title || "Untitled",
      noteToDelete.category,
    );
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Update note
  const handleEditNote = (id, editedTitle, editedContent) => {
    const noteToEdit = notes.find((note) => note.id === id);
    logActivity("edited", editedTitle || "Untitled", noteToEdit.category);
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: editedTitle,
              content: editedContent,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
    setEditId(null);
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.toLowerCase())) {
      setCategories([...categories, newCategory.toLowerCase()]);
      setNewCategory("");
      setShowAddCategory(false);
      logActivity("category_added", newCategory);
    }
  };

  // Filter notes by category and search
  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      activeCategory === "all" || note.category === activeCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group notes by month
  const groupNotesByMonth = (notes) => {
    const grouped = {};
    notes.forEach((note) => {
      const date = new Date(note.createdAt);
      const monthYear = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(note);
    });
    return grouped;
  };

  const groupedNotes = groupNotesByMonth(filteredNotes);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with Search */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              My Projects
            </h1>
            <p className="text-gray-700 text-xs">
              {notes.length} projects • {drafts.length} drafts
            </p>
          </div>

          {/* Search Field */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 rounded-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeCategory === "all"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <LayoutGrid size={14} />
            All
          </button>
          {categories.map((cat) => {
            // Icon mapping for each category
            const categoryIcons = {
              todo: <CheckSquare size={14} className="text-red-600" />,
              ideas: <Lightbulb size={14} className="text-yellow-600" />,
              captions: <MessageSquare size={14} className="text-blue-600" />,
            };

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {categoryIcons[cat] || <FileText size={14} />}
                {cat}
              </button>
            );
          })}
          {!showAddCategory ? (
            <button
              onClick={() => setShowAddCategory(true)}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition-all flex items-center gap-1.5"
            >
              <PlusCircle size={14} className="text-green-600" />
              Add Category
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Category name..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                className="px-3 py-1.5 rounded-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              />
              <button
                onClick={handleAddCategory}
                className="px-3 py-1.5 rounded-full bg-green-600 text-white hover:bg-green-700 text-xs"
              >
                ✓
              </button>
              <button
                onClick={() => setShowAddCategory(false)}
                className="px-3 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 text-xs"
              >
                ✗
              </button>
            </div>
          )}
        </div>

        {/* New Note Form */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-300 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
            <Plus size={20} />
            Create New Note
          </h2>

          {/* Category selector for new note */}
          <select
            value={newNote.category}
            onChange={(e) =>
              setNewNote({ ...newNote, category: e.target.value })
            }
            className="w-full mb-3 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize text-xs"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full mb-3 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Note content..."
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            className="w-full mb-3 px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none text-xs"
          />
          <button
            onClick={handleNewNote}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md font-medium text-sm"
          >
            Publish Note
          </button>
        </div>

        {/* Drafts Section */}
        {drafts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={24} />
              Drafts ({drafts.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-amber-50 rounded-xl p-4 border-2 border-amber-300 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-semibold text-amber-900 bg-amber-200 px-2 py-1 rounded-full">
                      DRAFT
                    </span>
                    <span className="text-[10px] text-amber-700">
                      {new Date(draft.savedAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {draft.title || "Untitled Draft"}
                  </h3>
                  <p className="text-gray-700 text-[11px] line-clamp-2">
                    {draft.content || "Empty content"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Grouped by Month */}
        {Object.keys(groupedNotes).length > 0 ? (
          Object.entries(groupedNotes).map(([monthYear, monthNotes]) => (
            <div key={monthYear} className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                {monthYear}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {monthNotes.map((note, index) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    colorClass={noteColors[index % noteColors.length]}
                    isEditing={editId === note.id}
                    onEdit={() => setEditId(note.id)}
                    onSave={(title, content) =>
                      handleEditNote(note.id, title, content)
                    }
                    onCancel={() => setEditId(null)}
                    onDelete={() => handleDeleteNote(note.id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              {searchTerm
                ? "No notes found matching your search"
                : "No notes yet. Create your first note!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function NoteCard({
  note,
  colorClass,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    onSave(editTitle, editContent);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-blue-500">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none text-xs"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium text-xs"
          >
            <Save size={16} />
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 font-medium text-xs"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${colorClass} rounded-xl shadow-md p-5 hover:shadow-xl transition-all border-2 hover:scale-105 transform duration-200`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-semibold text-gray-800 bg-white/70 px-3 py-1 rounded-full capitalize">
          {note.category}
        </span>
        <span className="text-[10px] text-gray-600">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2 text-gray-900">
        {note.title || "Untitled"}
      </h3>
      <p className="text-gray-700 mb-4 line-clamp-3 text-[11px] leading-relaxed">
        {note.content}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-[11px] font-medium"
        >
          <Edit2 size={14} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-[11px] font-medium"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContentEditor;
