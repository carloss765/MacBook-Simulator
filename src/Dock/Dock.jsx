import React, { useState } from "react";
import Finder from "../assets/Icons/dock/finder.png";
import Launchpad from "../assets/Icons/dock/launchpad.png";
import AppStore from "../assets/Icons/dock/appstore.png";
import Messages from "../assets/Icons/dock/message.png";
import Music from "../assets/Icons/dock/music.png";
import Vscode from "../assets/Icons/dock/vscode.svg";
import Mail from "../assets/Icons/dock/mail.png";
import Photos from "../assets/Icons/dock/photos.png";
import Maps from "../assets/Icons/dock/maps.png";
import Calculator from "../assets/Icons/dock/calculator.png";
import Notes from "../assets/Icons/dock/notes.png";
import Terminal from "../assets/Icons/dock/terminal.png";
import Preferences from "../assets/Icons/dock/preferences.png";
import Trash from "../assets/Icons/dock/bin.png";

export default function Dock(Params) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Estados recibidos desde Desktop
  const openApps = Params.openApps || new Set();
  const appTransitions = Params.appTransitions || {};

  const dockApps = [
    { icon: Finder, name: "Finder" },
    { icon: Launchpad, name: "Launchpad" },
    { icon: AppStore, name: "App Store" },
    { icon: Messages, name: "Messages" },
    { icon: Music, name: "Music" },
    { icon: Vscode, name: "VSCode" },
    { icon: Mail, name: "Mail" },
    { icon: Photos, name: "Photos" },
    { icon: Maps, name: "Maps" },
    { icon: Calculator, name: "Calculator" },
    { icon: Notes, name: "Notes" },
    { icon: Terminal, name: "Terminal" },
    { icon: Preferences, name: "Preferences" },
    { icon: Trash, name: "Trash" },
  ];

  // Estado para controlar el bounce effect
  const [bouncingApp, setBouncingApp] = useState(null);

  // Función para alternar el estado de una aplicación
  const toggleApp = (appName) => {
    // Aplicar efecto bounce solo si la app no está abierta
    if (!openApps.has(appName)) {
      setBouncingApp(appName);
      setTimeout(() => {
        setBouncingApp(null);
      }, 800); // Duración del bounce
    }

    // Enviar el nombre de la app al Desktop
    if (Params.handleAppClick) {
      Params.handleAppClick(appName);
    }
  };

  // Función para verificar si una app está abierta
  const isAppOpen = (appName) => openApps.has(appName);

  // Función para obtener el estado de transición de una app
  const getTransitionState = (appName) => appTransitions[appName] || null;

  // Función para calcular la escala basada en la distancia del hover
  const getScale = (index) => {
    if (hoveredIndex === null) return 1;

    const distance = Math.abs(index - hoveredIndex);
    const isPreferences = dockApps[index].name === "Preferences";
    const isHoveringTrash = dockApps[hoveredIndex].name === "Trash";

    // Si se está haciendo hover sobre Trash y este es Preferences, no cambiar tamaño
    if (isPreferences && isHoveringTrash) {
      return 1;
    }

    if (distance === 0) return 1.9; // Elemento principal - mucho más grande
    if (distance === 1) return 1.5; // Elementos adyacentes inmediatos
    if (distance === 2) return 1; // Elementos a 2 posiciones
    if (distance === 3) return 1; // Elementos a 3 posiciones
    return 1; // Elementos lejanos (tamaño normal)
  };

  // Función para calcular el tamaño del icono
  const getIconSize = (index) => {
    if (hoveredIndex === null) return "w-15 h-15";

    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return "w-15 h-15"; // Icono principal más grande
    if (distance === 1) return "w-16 h-16"; // Iconos adyacentes más grandes
    if (distance === 2) return "w-15 h-15"; // Iconos a distancia 2
    return "w-15 h-15"; // Tamaño normal
  };

  // Función para calcular el margen basado en la distancia
  const getMarginClass = (index) => {
    if (hoveredIndex === null) return "mx-0";

    const distance = Math.abs(index - hoveredIndex);
    const isPreferences = dockApps[index].name === "Preferences";
    const isHoveringTrash = dockApps[hoveredIndex].name === "Trash";

    // Si se está haciendo hover sobre Trash y este es Preferences, mantener margen normal
    if (isPreferences && isHoveringTrash) {
      return "mx-0";
    }

    if (distance === 0) return "mx-7"; // Elemento principal mx-9
    if (distance === 1) return "mx-4"; // Elementos adyacentes mx-2
    if (distance === 2) return "mx-0"; // Elementos a distancia 2 también con margen
    if (distance >= 3) return "mx-0"; // Elementos a distancia 3+ con movimiento sutil de 1px
    return "mx-0"; // Elementos lejanos sin margen
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-40">
      <div
        className={`flex items-end justify-center h-[70.2px] py-1 bg-white/0 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl transition-all duration-200 ease-out hover:h-[70.2px] ${
          hoveredIndex !== null ? "px-0" : "px-2"
        }`}
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {dockApps.map((app, index) => {
          const scale = getScale(index);
          const iconSize = getIconSize(index);
          const marginClass = getMarginClass(index);
          const isTrash = app.name === "Trash";

          return (
            <React.Fragment key={index}>
              {/* Línea divisoria antes del Trash */}
              {isTrash && (
                <div className="flex items-center mx-2 py-1 z-10">
                  <div
                    className="w-px h-12 bg-white/30 rounded-full transition-opacity duration-200"
                    style={{
                      transform: "scale(1)",
                      transformOrigin: "center",
                    }}
                  ></div>
                </div>
              )}

              <div
                className={`group relative transition-all duration-200 ease-out cursor-pointer ${marginClass}`}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "bottom center",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => toggleApp(app.name)}
                title={app.name}
              >
                {/* Indicador de aplicación abierta */}
                {isAppOpen(app.name) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full app-indicator"></div>
                )}

                <div
                  className={`${iconSize} flex items-end justify-center transition-all duration-200 ease-out ${
                    getTransitionState(app.name) === "macOS-opening"
                      ? "macOS-opening"
                      : getTransitionState(app.name) === "macOS-closing"
                      ? "macOS-closing"
                      : ""
                  } ${bouncingApp === app.name ? "macOS-dock-bouncing" : ""}`}
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className={`max-w-full max-h-full object-contain transition-all duration-200 ease-out drop-shadow-lg z-50 ${
                      app.name === "VSCode" ? "-translate-y-1 w-14 h-14" : ""
                    } ${isAppOpen(app.name) ? "brightness-110" : ""}`}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
