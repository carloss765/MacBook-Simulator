import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";

export default function Photos(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados de Photos
  const [selectedAlbum, setSelectedAlbum] = useState("All Photos");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid, slideshow

  // Albums y fotos simuladas
  const albums = [
    { name: "All Photos", count: 24, icon: "📷" },
    { name: "Favorites", count: 8, icon: "❤️" },
    { name: "Screenshots", count: 12, icon: "📱" },
    { name: "Videos", count: 6, icon: "🎬" },
    { name: "Selfies", count: 15, icon: "🤳" },
    { name: "Travel", count: 32, icon: "✈️" },
    { name: "Family", count: 18, icon: "👨‍👩‍👧‍👦" },
  ];

  const photos = [
    {
      id: 1,
      title: "Mountain Sunset",
      date: "Dec 15, 2023",
      type: "photo",
      emoji: "🏔️",
      album: "Travel",
    },
    {
      id: 2,
      title: "Beach Day",
      date: "Dec 14, 2023",
      type: "photo",
      emoji: "🏖️",
      album: "Travel",
    },
    {
      id: 3,
      title: "City Lights",
      date: "Dec 13, 2023",
      type: "photo",
      emoji: "🌃",
      album: "All Photos",
    },
    {
      id: 4,
      title: "Coffee Morning",
      date: "Dec 12, 2023",
      type: "photo",
      emoji: "☕",
      album: "All Photos",
    },
    {
      id: 5,
      title: "Coding Session",
      date: "Dec 11, 2023",
      type: "screenshot",
      emoji: "💻",
      album: "Screenshots",
    },
    {
      id: 6,
      title: "Nature Walk",
      date: "Dec 10, 2023",
      type: "video",
      emoji: "🌲",
      album: "Videos",
    },
    {
      id: 7,
      title: "Birthday Party",
      date: "Dec 9, 2023",
      type: "photo",
      emoji: "🎂",
      album: "Family",
    },
    {
      id: 8,
      title: "Morning Selfie",
      date: "Dec 8, 2023",
      type: "photo",
      emoji: "😊",
      album: "Selfies",
    },
    {
      id: 9,
      title: "Workout Time",
      date: "Dec 7, 2023",
      type: "photo",
      emoji: "💪",
      album: "All Photos",
    },
    {
      id: 10,
      title: "Guitar Practice",
      date: "Dec 6, 2023",
      type: "video",
      emoji: "🎸",
      album: "Videos",
    },
    {
      id: 11,
      title: "Sunset Drive",
      date: "Dec 5, 2023",
      type: "photo",
      emoji: "🚗",
      album: "Travel",
    },
    {
      id: 12,
      title: "Food Experiment",
      date: "Dec 4, 2023",
      type: "photo",
      emoji: "🍳",
      album: "All Photos",
    },
  ];

  const getFilteredPhotos = () => {
    if (selectedAlbum === "All Photos") return photos;
    if (selectedAlbum === "Screenshots")
      return photos.filter((p) => p.type === "screenshot");
    if (selectedAlbum === "Videos")
      return photos.filter((p) => p.type === "video");
    if (selectedAlbum === "Favorites") return photos.slice(0, 8);
    return photos.filter((p) => p.album === selectedAlbum);
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
      Params.handleAppClick("Photos");
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

  const filteredPhotos = getFilteredPhotos();

  return (
    <div
      className={`${Params.isOpen?.has("Photos") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-32 z-50"
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
          <div className="text-gray-700 text-sm font-medium">Photos</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Photos Content */}
        {!isMinimized && (
          <div className="flex h-full rounded-b-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-60 bg-gray-50 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Library</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {albums.map((album) => (
                    <button
                      key={album.name}
                      onClick={() => setSelectedAlbum(album.name)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-colors duration-150 flex items-center justify-between ${
                        selectedAlbum === album.name
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{album.icon}</span>
                        <span className="font-medium">{album.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {album.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {selectedAlbum}
                    </h1>
                    <p className="text-gray-500">
                      {filteredPhotos.length} photos
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors duration-150 ${
                        viewMode === "grid"
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      ⊞
                    </button>
                    <button
                      onClick={() => setViewMode("slideshow")}
                      className={`p-2 rounded-lg transition-colors duration-150 ${
                        viewMode === "slideshow"
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      🎞️
                    </button>
                  </div>
                </div>
              </div>

              {/* Photos Grid */}
              {viewMode === "grid" && (
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-4 gap-4">
                    {filteredPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => setSelectedPhoto(photo)}
                        className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center justify-center group relative overflow-hidden"
                      >
                        <div className="text-6xl">{photo.emoji}</div>
                        {photo.type === "video" && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">▶</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <p className="text-white text-sm font-medium truncate">
                            {photo.title}
                          </p>
                          <p className="text-white/80 text-xs">{photo.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slideshow View */}
              {viewMode === "slideshow" && selectedPhoto && (
                <div className="flex-1 flex items-center justify-center bg-black relative">
                  <div className="text-9xl">{selectedPhoto.emoji}</div>

                  {/* Photo Info */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-semibold">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-gray-300">{selectedPhoto.date}</p>
                  </div>

                  {/* Navigation */}
                  <button
                    onClick={() => {
                      const currentIndex = filteredPhotos.findIndex(
                        (p) => p.id === selectedPhoto.id
                      );
                      const prevPhoto =
                        filteredPhotos[currentIndex - 1] ||
                        filteredPhotos[filteredPhotos.length - 1];
                      setSelectedPhoto(prevPhoto);
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = filteredPhotos.findIndex(
                        (p) => p.id === selectedPhoto.id
                      );
                      const nextPhoto =
                        filteredPhotos[currentIndex + 1] || filteredPhotos[0];
                      setSelectedPhoto(nextPhoto);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                  >
                    ›
                  </button>

                  {/* Close Slideshow */}
                  <button
                    onClick={() => setViewMode("grid")}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
