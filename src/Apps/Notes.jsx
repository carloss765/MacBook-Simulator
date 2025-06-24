import React, { useState, useEffect, useRef } from "react";
import "./WindowAnimations.css";

export default function Notes(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados para las notas
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Welcome to Notes",
      content:
        "This is your first note!\n\nYou can create, edit and organize your thoughts here.\n\nClick the + button to create a new note.",
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: "macOS Simulator",
      content:
        "This is a note created in the macOS simulator.\n\nIt works just like the real Notes app!",
      date: new Date().toLocaleDateString(),
    },
  ]);
  const [selectedNote, setSelectedNote] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const textareaRef = useRef(null);

  // Filtrar notas según búsqueda
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener nota actual
  const currentNote = notes.find((note) => note.id === selectedNote);

  // Crear nueva nota
  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled",
      content: "",
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote.id);
  };

  // Actualizar contenido de nota
  const updateNoteContent = (content) => {
    setNotes(
      notes.map((note) =>
        note.id === selectedNote
          ? {
              ...note,
              content,
              title: content.split("\n")[0].slice(0, 30) || "Untitled",
              date: new Date().toLocaleDateString(),
            }
          : note
      )
    );
  };

  // Eliminar nota
  const deleteNote = (noteId) => {
    if (notes.length <= 1) return; // No eliminar la última nota

    setNotes(notes.filter((note) => note.id !== noteId));
    if (selectedNote === noteId) {
      setSelectedNote(
        notes.find((note) => note.id !== noteId)?.id || notes[0]?.id
      );
    }
  };

  // Focus en textarea cuando se selecciona una nota
  useEffect(() => {
    if (textareaRef.current && Params.isOpen?.has("Notes")) {
      textareaRef.current.focus();
    }
  }, [selectedNote, Params.isOpen]);

  // Manejar inicio de arrastre
  const handleMouseDown = (e) => {
    if (e.target.closest(".window-controls")) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Manejar arrastre
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    });
  };

  // Finalizar arrastre
  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Event listeners para el drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp, { passive: false });
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
        document.body.style.webkitUserSelect = "";
      };
    }
  }, [isDragging, dragStart, position]);

  // Función para cerrar la aplicación
  const handleClose = () => {
    if (Params.handleAppClick) {
      Params.handleAppClick("Notes");
    }
  };

  // Función para minimizar
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Función para expandir
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // When expanding to fullscreen, reset position to cover entire screen except navbar
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div
      className={`${Params.isOpen?.has("Notes") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 right-8 z-50"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl select-none window-shadow ${
          isDragging ? "window-dragging" : "window-normal"
        } ${isExpanded ? "w-full h-full" : "w-[700px] h-[500px]"} ${
          isMinimized ? "h-8" : ""
        }`}
        style={{
          transform: isExpanded
            ? "none"
            : `translate3d(${position.x}px, ${position.y}px, 0)`,
          cursor: isDragging ? "grabbing" : "grab",
          willChange: isDragging ? "transform" : "auto",
        }}
      >
        {/* Window Header */}
        <div
          className="h-8 bg-gray-100 rounded-t-2xl flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none border-b border-gray-200"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Window Controls */}
          <div className="window-controls flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                ×
              </span>
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                -
              </span>
            </button>
            <button
              onClick={handleExpand}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-white text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                +
              </span>
            </button>
          </div>

          {/* Window Title */}
          <div className="text-gray-700 text-sm font-medium">Notes</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Notes Content */}
        {!isMinimized && (
          <div className="flex h-full bg-white rounded-b-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
              {/* Search Bar */}
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* New Note Button */}
              <div className="p-3 border-b border-gray-200">
                <button
                  onClick={createNewNote}
                  className="w-full px-3 py-2 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors duration-150"
                >
                  + New Note
                </button>
              </div>

              {/* Notes List */}
              <div className="flex-1 overflow-y-auto">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note.id)}
                    className={`p-3 cursor-pointer border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150 ${
                      selectedNote === note.id
                        ? "bg-blue-100 border-blue-300"
                        : ""
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {note.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {note.date}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {note.content.split("\n")[1] ||
                        note.content.split("\n")[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {currentNote && (
                <>
                  {/* Note Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        {currentNote.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {currentNote.date}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNote(currentNote.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors duration-150"
                      disabled={notes.length <= 1}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Note Content */}
                  <div className="flex-1 p-4">
                    <textarea
                      ref={textareaRef}
                      value={currentNote.content}
                      onChange={(e) => updateNoteContent(e.target.value)}
                      placeholder="Start writing your note..."
                      className="w-full h-full resize-none border-none outline-none text-gray-900 font-mono text-sm leading-relaxed"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
