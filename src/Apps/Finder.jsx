import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";
import "./MacOSAnimations.css";

export default function Finder(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados del Finder
  const [currentPath, setCurrentPath] = useState("Home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list, icon, column

  // Estructura de archivos simulada
  const fileSystem = {
    Home: {
      type: "folder",
      children: {
        Documents: {
          type: "folder",
          icon: "📁",
          children: {
            Projects: {
              type: "folder",
              icon: "📁",
              children: {
                MacSimulator: { type: "folder", icon: "📁", children: {} },
                Website: { type: "folder", icon: "📁", children: {} },
              },
            },
            "Resume.pdf": { type: "file", icon: "📄", size: "245 KB" },
            "Notes.txt": { type: "file", icon: "📝", size: "12 KB" },
          },
        },
        Downloads: {
          type: "folder",
          icon: "📁",
          children: {
            "VSCode.dmg": { type: "file", icon: "💾", size: "95.2 MB" },
            "Screenshot.png": { type: "file", icon: "🖼️", size: "1.3 MB" },
            "Music.mp3": { type: "file", icon: "🎵", size: "8.5 MB" },
          },
        },
        Desktop: {
          type: "folder",
          icon: "📁",
          children: {
            Shortcuts: { type: "folder", icon: "📁", children: {} },
            "temp_file.txt": { type: "file", icon: "📄", size: "2 KB" },
          },
        },
        Pictures: {
          type: "folder",
          icon: "📁",
          children: {
            Vacation: { type: "folder", icon: "📁", children: {} },
            Family: { type: "folder", icon: "📁", children: {} },
            "photo1.jpg": { type: "file", icon: "🖼️", size: "2.1 MB" },
            "photo2.jpg": { type: "file", icon: "🖼️", size: "1.8 MB" },
          },
        },
        Applications: {
          type: "folder",
          icon: "📁",
          children: {
            "Calculator.app": { type: "app", icon: "🧮", size: "12 MB" },
            "VSCode.app": { type: "app", icon: "💻", size: "250 MB" },
            "Chrome.app": { type: "app", icon: "🌐", size: "180 MB" },
          },
        },
      },
    },
  };

  const sidebarItems = [
    { name: "Favorites", type: "section" },
    { name: "Home", type: "location", icon: "🏠" },
    { name: "Desktop", type: "location", icon: "🖥️" },
    { name: "Documents", type: "location", icon: "📁" },
    { name: "Downloads", type: "location", icon: "📥" },
    { name: "Pictures", type: "location", icon: "🖼️" },
    { name: "Applications", type: "location", icon: "📱" },
    { type: "separator" },
    { name: "iCloud", type: "section" },
    { name: "iCloud Drive", type: "location", icon: "☁️" },
    { type: "separator" },
    { name: "Locations", type: "section" },
    { name: "Macintosh HD", type: "location", icon: "💾" },
  ];

  const getCurrentFolder = () => {
    let current = fileSystem;
    const pathParts = currentPath.split("/").filter((p) => p);

    for (const part of pathParts) {
      if (current[part] && current[part].children) {
        current = current[part].children;
      }
    }
    return current;
  };

  const navigateToFolder = (folderName) => {
    if (folderName === "Home") {
      setCurrentPath("Home");
    } else if (
      sidebarItems.find(
        (item) => item.name === folderName && item.type === "location"
      )
    ) {
      setCurrentPath(`Home/${folderName}`);
    } else {
      setCurrentPath((prev) => `${prev}/${folderName}`);
    }
    setSelectedItem(null);
  };

  const goBack = () => {
    const pathParts = currentPath.split("/");
    if (pathParts.length > 1) {
      pathParts.pop();
      setCurrentPath(pathParts.join("/"));
      setSelectedItem(null);
    }
  };

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
      Params.handleAppClick("Finder");
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

  const currentFolder = getCurrentFolder();
  const folderEntries = Object.entries(currentFolder);

  return (
    <div
      className={`${Params.isOpen?.has("Finder") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-16 z-50"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl select-none ${
          isDragging
            ? "macOS-dragging macOS-window-dragging"
            : "macOS-smooth macOS-window-shadow"
        } ${isExpanded ? "w-full h-full" : "w-[950px] h-[650px]"} ${
          isMinimized ? "h-8" : ""
        } ${
          Params.appTransitions?.Finder === "macOS-opening"
            ? "macOS-opening"
            : Params.appTransitions?.Finder === "macOS-closing"
            ? "macOS-closing"
            : ""
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
          <div className="text-gray-700 text-sm font-medium">Finder</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Finder Content */}
        {!isMinimized && (
          <div className="flex h-full rounded-b-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-52 bg-gray-50 border-r border-gray-200 flex flex-col">
              <div className="flex-1 overflow-y-auto py-4">
                {sidebarItems.map((item, index) => {
                  if (item.type === "separator") {
                    return (
                      <div
                        key={index}
                        className="border-b border-gray-300 my-2 mx-4"
                      ></div>
                    );
                  }

                  if (item.type === "section") {
                    return (
                      <div
                        key={index}
                        className="px-4 py-1"
                      >
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {item.name}
                        </h3>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => navigateToFolder(item.name)}
                      className={`w-full text-left px-4 py-1 text-sm transition-colors duration-150 flex items-center space-x-2 ${
                        currentPath.includes(item.name)
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Toolbar */}
              <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 space-x-3">
                <button
                  onClick={goBack}
                  disabled={currentPath === "Home"}
                  className={`p-1 rounded transition-colors duration-150 ${
                    currentPath === "Home"
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  ◀
                </button>

                <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-sm text-gray-600">
                  {currentPath.replace(/\//g, " › ")}
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => setViewMode("icon")}
                    className={`p-1 rounded transition-colors duration-150 ${
                      viewMode === "icon"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 rounded transition-colors duration-150 ${
                      viewMode === "list"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    ☰
                  </button>
                  <button
                    onClick={() => setViewMode("column")}
                    className={`p-1 rounded transition-colors duration-150 ${
                      viewMode === "column"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    |||
                  </button>
                </div>
              </div>

              {/* File List */}
              <div className="flex-1 overflow-y-auto p-4">
                {viewMode === "list" && (
                  <div className="space-y-1">
                    {folderEntries.map(([name, item]) => (
                      <div
                        key={name}
                        onClick={() => {
                          if (item.type === "folder") {
                            navigateToFolder(name);
                          } else {
                            setSelectedItem(name);
                          }
                        }}
                        className={`flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-150 ${
                          selectedItem === name
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900">
                            {name}
                          </span>
                          {item.size && (
                            <span className="text-xs text-gray-500 ml-2">
                              {item.size}
                            </span>
                          )}
                        </div>
                        {item.type === "folder" && (
                          <span className="text-gray-400">›</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === "icon" && (
                  <div className="grid grid-cols-6 gap-4">
                    {folderEntries.map(([name, item]) => (
                      <div
                        key={name}
                        onClick={() => {
                          if (item.type === "folder") {
                            navigateToFolder(name);
                          } else {
                            setSelectedItem(name);
                          }
                        }}
                        className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors duration-150 ${
                          selectedItem === name
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="text-4xl mb-2">{item.icon}</div>
                        <span className="text-xs text-center text-gray-900 truncate w-full">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div className="h-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-500">
                <span>{folderEntries.length} items</span>
                <span>{currentPath.split("/").pop() || "Home"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
