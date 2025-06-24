import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";
import "./MacOSAnimations.css";

export default function VSCode(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados de VSCode
  const [activeFile, setActiveFile] = useState("App.jsx");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Archivos del proyecto simulado
  const files = {
    "App.jsx": {
      language: "javascript",
      content: `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;`,
    },
    "index.js": {
      language: "javascript",
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    },
    "package.json": {
      language: "json",
      content: `{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}`,
    },
  };

  const fileTree = [
    {
      name: "src",
      type: "folder",
      children: [
        { name: "App.jsx", type: "file", icon: "⚛️" },
        { name: "index.js", type: "file", icon: "📄" },
        { name: "App.css", type: "file", icon: "🎨" },
        { name: "index.css", type: "file", icon: "🎨" },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [
        { name: "index.html", type: "file", icon: "🌐" },
        { name: "favicon.ico", type: "file", icon: "🖼️" },
      ],
    },
    { name: "package.json", type: "file", icon: "📦" },
    { name: "README.md", type: "file", icon: "📖" },
    { name: "node_modules", type: "folder", children: [] },
  ];

  // Obtener extensión de archivo para colores
  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    switch (ext) {
      case "jsx":
      case "js":
        return "⚛️";
      case "css":
        return "🎨";
      case "html":
        return "🌐";
      case "json":
        return "📦";
      case "md":
        return "📖";
      default:
        return "📄";
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
      Params.handleAppClick("VSCode");
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

  const renderFileTree = (items, level = 0) => {
    return items.map((item, index) => (
      <div
        key={index}
        style={{ marginLeft: `${level * 16}px` }}
      >
        <div
          className={`flex items-center space-x-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-700 ${
            item.type === "file" && activeFile === item.name
              ? "bg-gray-600"
              : ""
          }`}
          onClick={() =>
            item.type === "file" && files[item.name] && setActiveFile(item.name)
          }
        >
          <span className="text-xs">
            {item.type === "folder"
              ? "📁"
              : item.icon || getFileIcon(item.name)}
          </span>
          <span className="text-gray-300">{item.name}</span>
        </div>
        {item.children && item.children.length > 0 && (
          <div>{renderFileTree(item.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  const currentFile = files[activeFile];

  return (
    <div
      className={`${Params.isOpen?.has("VSCode") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-80 z-50"
      }`}
    >
      <div
        className={`bg-gray-900 rounded-2xl shadow-2xl select-none ${
          isDragging
            ? "macOS-dragging macOS-window-dragging"
            : "macOS-smooth macOS-window-shadow"
        } ${isExpanded ? "w-full h-full" : "w-[1000px] h-[700px]"} ${
          isMinimized ? "h-8" : ""
        } ${
          Params.appTransitions?.VSCode === "macOS-opening"
            ? "macOS-opening"
            : Params.appTransitions?.VSCode === "macOS-closing"
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
          className="h-8 bg-gray-800 rounded-t-2xl flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none border-b border-gray-700"
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
          <div className="text-gray-300 text-sm font-medium">
            Visual Studio Code
          </div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* VSCode Content */}
        {!isMinimized && (
          <div className="flex h-full rounded-b-2xl overflow-hidden">
            {/* Activity Bar */}
            <div className="w-12 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
              <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-150"
              >
                📁
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-150">
                🔍
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-150">
                🔀
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-150">
                🐛
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-150">
                🧩
              </button>
            </div>

            {/* Sidebar */}
            {sidebarVisible && (
              <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-3 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Explorer
                  </h3>
                </div>
                <div className="flex-1 overflow-auto p-2">
                  <div className="text-sm font-medium text-gray-400 mb-2 px-2">
                    MY-REACT-APP
                  </div>
                  {renderFileTree(fileTree)}
                </div>
              </div>
            )}

            {/* Editor */}
            <div className="flex-1 flex flex-col">
              {/* Tabs */}
              <div className="bg-gray-800 border-b border-gray-700 flex">
                {Object.keys(files).map((filename) => (
                  <button
                    key={filename}
                    onClick={() => setActiveFile(filename)}
                    className={`px-4 py-2 text-sm border-r border-gray-700 flex items-center space-x-2 transition-colors duration-150 ${
                      activeFile === filename
                        ? "bg-gray-900 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>{getFileIcon(filename)}</span>
                    <span>{filename}</span>
                    <span className="text-gray-500 hover:text-white">×</span>
                  </button>
                ))}
              </div>

              {/* Editor Content */}
              <div className="flex-1 bg-gray-900 p-4 overflow-auto">
                <div className="font-mono text-sm text-gray-300">
                  {currentFile && (
                    <pre className="whitespace-pre-wrap">
                      <code>{currentFile.content}</code>
                    </pre>
                  )}
                </div>
              </div>

              {/* Status Bar */}
              <div className="h-6 bg-blue-600 flex items-center justify-between px-4 text-xs text-white">
                <div className="flex items-center space-x-4">
                  <span>🔀 main</span>
                  <span>🔄 0 changes</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span>UTF-8</span>
                  <span>LF</span>
                  <span>{currentFile?.language || "JavaScript"}</span>
                  <span>Ln 1, Col 1</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
