import React, { useState } from "react";
import {
  LuSearch,
  LuFolder,
  LuFile,
  LuSettings,
  LuCalculator,
  LuCalendar,
} from "react-icons/lu";
import { BsApple } from "react-icons/bs";

export default function SearchOptions({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Simulamos resultados de búsqueda típicos de Spotlight
  const mockResults = [
    {
      icon: <LuFolder className="text-blue-400" />,
      title: "Documents",
      description: "Folder",
      type: "folder",
    },
    {
      icon: <LuFile className="text-gray-400" />,
      title: "README.md",
      description: "Markdown Document",
      type: "file",
    },
    {
      icon: <LuCalculator className="text-orange-400" />,
      title: "Calculator",
      description: "Application",
      type: "app",
    },
    {
      icon: <LuCalendar className="text-red-400" />,
      title: "Calendar",
      description: "Application",
      type: "app",
    },
    {
      icon: <LuSettings className="text-gray-400" />,
      title: "System Preferences",
      description: "Application",
      type: "app",
    },
  ];

  // Filtramos resultados basados en el término de búsqueda
  const filteredResults = searchTerm
    ? mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockResults;

  // Función para manejar el clic en el overlay (cerrar cuando se hace clic fuera)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // Función para manejar la tecla Escape
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && onClose) {
      onClose();
    }
  };

  return (
    // Overlay con fondo semi-transparente
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-[10%]"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Contenedor principal del Spotlight */}
      <div className="w-[640px] max-w-[90vw] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
        {/* Barra de búsqueda */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200/50">
          <LuSearch className="text-gray-500 text-xl mr-3" />
          <input
            type="text"
            placeholder="Spotlight Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-gray-800 text-lg placeholder-gray-500 outline-none font-[Lexend]"
            autoFocus
          />
        </div>

        {/* Resultados de búsqueda */}
        <div className="max-h-[400px] overflow-y-auto">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div
                key={index}
                className={`flex items-center px-6 py-3 hover:bg-blue-500/10 cursor-pointer transition-colors duration-150 ${
                  index === 0 ? "bg-blue-500/10" : ""
                }`}
              >
                {/* Icono del resultado */}
                <div className="text-2xl mr-4">{result.icon}</div>

                {/* Información del resultado */}
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium text-[16px] font-[Lexend]">
                    {result.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] font-[Lexend]">
                    {result.description}
                  </p>
                </div>

                {/* Indicador de tipo */}
                <div className="text-gray-400 text-[12px] font-[Lexend] uppercase tracking-wide">
                  {result.type}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <div className="text-gray-400 text-lg mb-2">
                <LuSearch className="mx-auto mb-3 text-3xl" />
              </div>
              <p className="text-gray-500 font-[Lexend]">
                No results found for "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Footer con información adicional */}
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-[12px] text-gray-500 font-[Lexend]">
            <span className="flex items-center">
              <BsApple className="mr-1" />
              Spotlight Search
            </span>
            <span>Press ⌘Space to search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
