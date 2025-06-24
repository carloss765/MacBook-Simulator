import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";

export default function AppStore(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados del App Store
  const [activeTab, setActiveTab] = useState("discover");
  const [searchTerm, setSearchTerm] = useState("");

  // Apps destacadas simuladas
  const featuredApps = [
    {
      id: 1,
      name: "Xcode",
      category: "Developer Tools",
      rating: 4.5,
      price: "Free",
      icon: "💻",
      description: "Create amazing apps for iOS, macOS, watchOS, and tvOS",
      featured: true,
    },
    {
      id: 2,
      name: "Final Cut Pro",
      category: "Video",
      rating: 4.8,
      price: "$299.99",
      icon: "🎬",
      description: "Revolutionary video editing suite",
      featured: true,
    },
    {
      id: 3,
      name: "Logic Pro",
      category: "Music",
      rating: 4.7,
      price: "$199.99",
      icon: "🎵",
      description: "Professional music production studio",
      featured: true,
    },
  ];

  const popularApps = [
    {
      id: 4,
      name: "Photoshop",
      category: "Graphics & Design",
      rating: 4.6,
      price: "$20.99/mo",
      icon: "🎨",
      description: "Professional image editing",
    },
    {
      id: 5,
      name: "Sketch",
      category: "Graphics & Design",
      rating: 4.4,
      price: "$99.00",
      icon: "📐",
      description: "Digital design toolkit",
    },
    {
      id: 6,
      name: "Figma",
      category: "Graphics & Design",
      rating: 4.8,
      price: "Free",
      icon: "🔷",
      description: "Collaborative interface design",
    },
    {
      id: 7,
      name: "Slack",
      category: "Business",
      rating: 4.3,
      price: "Free",
      icon: "💬",
      description: "Team collaboration hub",
    },
    {
      id: 8,
      name: "Notion",
      category: "Productivity",
      rating: 4.5,
      price: "Free",
      icon: "📝",
      description: "All-in-one workspace",
    },
    {
      id: 9,
      name: "Spotify",
      category: "Music",
      rating: 4.6,
      price: "Free",
      icon: "🎧",
      description: "Music streaming service",
    },
  ];

  const categories = [
    { name: "Developer Tools", icon: "👨‍💻", count: 24 },
    { name: "Graphics & Design", icon: "🎨", count: 156 },
    { name: "Productivity", icon: "📊", count: 89 },
    { name: "Business", icon: "💼", count: 67 },
    { name: "Music", icon: "🎵", count: 43 },
    { name: "Video", icon: "🎬", count: 32 },
    { name: "Games", icon: "🎮", count: 234 },
    { name: "Education", icon: "📚", count: 78 },
  ];

  const tabs = [
    { id: "discover", name: "Discover", icon: "🔍" },
    { id: "arcade", name: "Arcade", icon: "🎮" },
    { id: "work", name: "Work", icon: "💼" },
    { id: "create", name: "Create", icon: "🎨" },
    { id: "develop", name: "Develop", icon: "👨‍💻" },
  ];

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
      Params.handleAppClick("App Store");
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
      className={`${Params.isOpen?.has("App Store") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-72 z-50"
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl select-none window-shadow ${
          isDragging ? "window-dragging" : "window-normal"
        } ${isExpanded ? "w-full h-full" : "w-[1000px] h-[700px]"} ${
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
          <div className="text-gray-700 text-sm font-medium">App Store</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* App Store Content */}
        {!isMinimized && (
          <div className="flex flex-col h-full rounded-b-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 pb-2 border-b-2 transition-colors duration-150 ${
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for apps, games, and more..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Featured Section */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Featured
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {featuredApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                            {app.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{app.name}</h3>
                            <p className="text-blue-100">{app.category}</p>
                          </div>
                        </div>
                        <p className="text-lg mb-4 max-w-md">
                          {app.description}
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-150">
                          {app.price === "Free" ? "Get" : app.price}
                        </button>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Categories
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                    >
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.count} apps
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Apps */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Popular Apps
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {popularApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-150"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                          {app.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {app.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {app.category}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        {app.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm font-medium">
                            {app.rating}
                          </span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-150">
                          {app.price === "Free" ? "Get" : app.price}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
