import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";

export default function Preferences(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados para las preferencias
  const [activeCategory, setActiveCategory] = useState("general");
  const [settings, setSettings] = useState({
    appearance: "auto", // light, dark, auto
    accentColor: "blue",
    showScrollBars: "auto", // always, auto, never
    clickToShow: true,
    highlightColor: "blue",
    sidebarIconSize: "medium", // small, medium, large
    language: "english",
    region: "unitedStates",
    hotCorners: {
      topLeft: "none",
      topRight: "notificationCenter",
      bottomLeft: "none",
      bottomRight: "desktopPicture",
    },
    dock: {
      size: "medium",
      magnification: true,
      position: "bottom", // left, bottom, right
      minimizeEffect: "genie", // genie, scale
      autohide: false,
    },
    security: {
      requirePassword: "immediately",
      showPasswordHints: true,
      allowAppsFromAppStore: true,
      automaticLogin: false,
    },
  });

  // Categorías de preferencias
  const categories = [
    {
      id: "general",
      name: "General",
      icon: "⚙️",
    },
    {
      id: "desktop",
      name: "Desktop & Screen Saver",
      icon: "🖥️",
    },
    {
      id: "dock",
      name: "Dock & Menu Bar",
      icon: "📱",
    },
    {
      id: "security",
      name: "Security & Privacy",
      icon: "🔒",
    },
  ];

  // Actualizar configuración
  const updateSetting = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const updateTopLevelSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
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
      Params.handleAppClick("Preferences");
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

  // Renderizar contenido según categoría activa
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Appearance
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 w-32">
                    Appearance:
                  </span>
                  <select
                    value={settings.appearance}
                    onChange={(e) =>
                      updateTopLevelSetting("appearance", e.target.value)
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 w-32">
                    Accent color:
                  </span>
                  <select
                    value={settings.accentColor}
                    onChange={(e) =>
                      updateTopLevelSetting("accentColor", e.target.value)
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="pink">Pink</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="graphite">Graphite</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Language & Region
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 w-32">Language:</span>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      updateTopLevelSetting("language", e.target.value)
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Español</option>
                    <option value="french">Français</option>
                    <option value="german">Deutsch</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 w-32">Region:</span>
                  <select
                    value={settings.region}
                    onChange={(e) =>
                      updateTopLevelSetting("region", e.target.value)
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="unitedStates">United States</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="spain">Spain</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "desktop":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Hot Corners
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-700">Top Left:</span>
                  <select
                    value={settings.hotCorners.topLeft}
                    onChange={(e) =>
                      updateSetting("hotCorners", "topLeft", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="missionControl">Mission Control</option>
                    <option value="desktop">Desktop</option>
                    <option value="dashboard">Dashboard</option>
                  </select>
                </div>
                <div>
                  <span className="text-sm text-gray-700">Top Right:</span>
                  <select
                    value={settings.hotCorners.topRight}
                    onChange={(e) =>
                      updateSetting("hotCorners", "topRight", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="notificationCenter">
                      Notification Center
                    </option>
                    <option value="desktop">Desktop</option>
                    <option value="dashboard">Dashboard</option>
                  </select>
                </div>
                <div>
                  <span className="text-sm text-gray-700">Bottom Left:</span>
                  <select
                    value={settings.hotCorners.bottomLeft}
                    onChange={(e) =>
                      updateSetting("hotCorners", "bottomLeft", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="launchpad">Launchpad</option>
                    <option value="desktop">Desktop</option>
                    <option value="screenSaver">Screen Saver</option>
                  </select>
                </div>
                <div>
                  <span className="text-sm text-gray-700">Bottom Right:</span>
                  <select
                    value={settings.hotCorners.bottomRight}
                    onChange={(e) =>
                      updateSetting("hotCorners", "bottomRight", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None</option>
                    <option value="desktopPicture">Desktop Picture</option>
                    <option value="desktop">Desktop</option>
                    <option value="screenSaver">Screen Saver</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case "dock":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Dock</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 w-32">Size:</span>
                  <input
                    type="range"
                    min="small"
                    max="large"
                    value={settings.dock.size}
                    onChange={(e) =>
                      updateSetting("dock", "size", e.target.value)
                    }
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500 w-16">
                    {settings.dock.size}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.dock.magnification}
                    onChange={(e) =>
                      updateSetting("dock", "magnification", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Magnification</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 w-32">Position:</span>
                  <select
                    value={settings.dock.position}
                    onChange={(e) =>
                      updateSetting("dock", "position", e.target.value)
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="left">Left</option>
                    <option value="bottom">Bottom</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.dock.autohide}
                    onChange={(e) =>
                      updateSetting("dock", "autohide", e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Automatically hide and show the Dock
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                General
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 w-48">
                    Require password:
                  </span>
                  <select
                    value={settings.security.requirePassword}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "requirePassword",
                        e.target.value
                      )
                    }
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="immediately">Immediately</option>
                    <option value="5minutes">5 minutes</option>
                    <option value="15minutes">15 minutes</option>
                    <option value="1hour">1 hour</option>
                    <option value="4hours">4 hours</option>
                    <option value="8hours">8 hours</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.security.showPasswordHints}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "showPasswordHints",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Show password hints
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.security.allowAppsFromAppStore}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "allowAppsFromAppStore",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Allow apps downloaded from App Store
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.security.automaticLogin}
                    onChange={(e) =>
                      updateSetting(
                        "security",
                        "automaticLogin",
                        e.target.checked
                      )
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Disable automatic login
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-gray-500">Select a category</div>;
    }
  };

  return (
    <div
      className={`${Params.isOpen?.has("Preferences") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl select-none window-shadow ${
          isDragging ? "window-dragging" : "window-normal"
        } ${isExpanded ? "w-full h-full" : "w-[750px] h-[550px]"} ${
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
          <div className="text-gray-700 text-sm font-medium">
            System Preferences
          </div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Preferences Content */}
        {!isMinimized && (
          <div className="flex h-full bg-white rounded-b-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 bg-gray-50 border-r border-gray-200 p-4">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full p-3 text-left rounded-lg transition-colors duration-150 flex items-center space-x-3 ${
                      activeCategory === category.id
                        ? "bg-blue-100 text-blue-900 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {renderCategoryContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
