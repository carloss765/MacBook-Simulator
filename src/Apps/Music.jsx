import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";

export default function Music(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados del Music Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [activeTab, setActiveTab] = useState("library");

  // Playlist simulada
  const playlist = [
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55",
      cover: "🎵",
    },
    {
      id: 2,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: "6:30",
      cover: "🎸",
    },
    {
      id: 3,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: "8:02",
      cover: "🎼",
    },
    {
      id: 4,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: "3:07",
      cover: "🎹",
    },
    {
      id: 5,
      title: "Sweet Child O' Mine",
      artist: "Guns N' Roses",
      album: "Appetite for Destruction",
      duration: "5:03",
      cover: "🎤",
    },
  ];

  const categories = [
    { id: "library", name: "Library", icon: "📚" },
    { id: "playlists", name: "Playlists", icon: "📋" },
    { id: "radio", name: "Radio", icon: "📻" },
    { id: "browse", name: "Browse", icon: "🔍" },
  ];

  // Simular progreso de reproducción
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const previousSong = () => {
    setCurrentSong((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
    setProgress(0);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev < playlist.length - 1 ? prev + 1 : 0));
    setProgress(0);
  };

  const selectSong = (index) => {
    setCurrentSong(index);
    setProgress(0);
    setIsPlaying(true);
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
      Params.handleAppClick("Music");
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

  const currentTrack = playlist[currentSong];

  return (
    <div
      className={`${Params.isOpen?.has("Music") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-64 z-50"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl select-none window-shadow ${
          isDragging ? "window-dragging" : "window-normal"
        } ${isExpanded ? "w-full h-full" : "w-[850px] h-[600px]"} ${
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
          className="h-8 bg-black/20 rounded-t-2xl flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none border-b border-white/10"
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
          <div className="text-white text-sm font-medium">Music</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Music Content */}
        {!isMinimized && (
          <div className="flex h-full rounded-b-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 bg-black/20 border-r border-white/10 flex flex-col">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Music</h3>

                {/* Navigation */}
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center space-x-2 ${
                        activeTab === category.id
                          ? "bg-white/20 text-white"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Your Library
                </h1>
                <p className="text-gray-300">Recently played music</p>
              </div>

              {/* Playlist */}
              <div className="flex-1 overflow-auto p-6">
                <div className="space-y-2">
                  {playlist.map((song, index) => (
                    <div
                      key={song.id}
                      onClick={() => selectSong(index)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors duration-150 flex items-center space-x-4 ${
                        currentSong === index
                          ? "bg-white/20 text-white"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="text-2xl">{song.cover}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{song.title}</h4>
                        <p className="text-sm opacity-75">{song.artist}</p>
                      </div>
                      <div className="text-sm opacity-75">{song.duration}</div>
                      {currentSong === index && isPlaying && (
                        <div className="text-green-400">♪</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Controls */}
              <div className="p-6 bg-black/30 border-t border-white/10">
                {/* Now Playing Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{currentTrack?.cover}</div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {currentTrack?.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {currentTrack?.artist}
                      </p>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <span className="text-white">🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-600 rounded-full h-1">
                    <div
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0:00</span>
                    <span>{currentTrack?.duration}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={previousSong}
                    className="text-white hover:text-gray-300 transition-colors duration-150"
                  >
                    ⏮️
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-150"
                  >
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>
                  <button
                    onClick={nextSong}
                    className="text-white hover:text-gray-300 transition-colors duration-150"
                  >
                    ⏭️
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
