import React, { useState } from "react";
import { IoLogoApple } from "react-icons/io";
import OthersOptions from "./Options/OthersOptions";
import FileOptions from "./Options/FileOptions";
// Importar iconos de las aplicaciones
import Finder from "../assets/Icons/dock/finder.png";
import AppStore from "../assets/Icons/dock/appstore.png";
import Messages from "../assets/Icons/dock/message.png";
import Music from "../assets/Icons/dock/music.png";
import Vscode from "../assets/Icons/dock/vscode.svg";
import Mail from "../assets/Icons/dock/mail.png";
import Photos from "../assets/Icons/dock/photos.png";
import Calculator from "../assets/Icons/dock/calculator.png";
import Notes from "../assets/Icons/dock/notes.png";
import Terminal from "../assets/Icons/dock/terminal.png";
import Preferences from "../assets/Icons/dock/preferences.png";

export default function MenuApps({ openApps = new Set(), handleAppClick }) {
  const buttonsStyle =
    "flex justify-center items-center h-[26px] px-2 text-white text-[14px] font-[Lexend] hover:bg-white/20 transition-all duration-150 rounded-sm cursor-pointer";

  const optionsStyle =
    "absolute z-10 top-10 left-0 w-full h-[26px] px-2 text-white text-[14px] font-[Lexend]";

  const [active, setActive] = useState(null);

  // Configuración de aplicaciones con sus iconos
  const appIcons = {
    Finder: Finder,
    "App Store": AppStore,
    Messages: Messages,
    Music: Music,
    VSCode: Vscode,
    Mail: Mail,
    Photos: Photos,
    Calculator: Calculator,
    Notes: Notes,
    Terminal: Terminal,
    Preferences: Preferences,
  };

  // Obtener array de aplicaciones abiertas
  const openAppsArray = Array.from(openApps);

  const handleMouseEnter = (menuName) => {
    setActive(menuName);
  };

  const handleMouseLeave = () => {
    setActive(null);
  };

  return (
    <div className="flex justify-start items-center w-full h-full gap-2 pl-1">
      {/* Contenedor para el icono de Apple y el menú desplegable */}
      <div
        onMouseEnter={() => handleMouseEnter("apple")}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <button className={buttonsStyle}>
          <IoLogoApple className="flex justify-center items-center size-[18px]" />
        </button>
        {active === "apple" && <OthersOptions className={optionsStyle} />}
      </div>

      {/* Aplicaciones abiertas */}
      {openAppsArray.length > 0 && (
        <>
          {/* Separador visual */}
          <div className="w-px h-4 bg-white/30 mx-2" />

          {/* Lista de aplicaciones abiertas */}
          {openAppsArray.map((appName) => (
            <div
              key={appName}
              className="flex items-center gap-1 px-2 h-[26px] hover:bg-white/20 transition-all duration-150 rounded-sm cursor-pointer"
              onClick={() => handleAppClick && handleAppClick(appName)}
              title={`Switch to ${appName}`}
            >
              {/* Icono de la aplicación */}
              {appIcons[appName] && (
                <img
                  src={appIcons[appName]}
                  alt={appName}
                  className="w-4 h-4 object-contain"
                />
              )}
              {/* Nombre de la aplicación */}
              <span className="text-white text-[13px] font-[Lexend] max-w-20 truncate">
                {appName}
              </span>
            </div>
          ))}
        </>
      )}
      
      {/* File */}
      <div
        onMouseEnter={() => handleMouseEnter("file")}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <button className={buttonsStyle}>File</button>
        {active === "file" && <FileOptions className={optionsStyle} />}
      </div>

      {/* Edit */}
      <button className={buttonsStyle}>Edit</button>

      {/* View */}
      <button className={buttonsStyle}>View</button>

      {/* Go */}
      <button className={buttonsStyle}>Go</button>

      {/* Tools */}
      <button className={buttonsStyle}>Tools</button>

      {/* Help */}
      <button className={buttonsStyle}>Help</button>

    </div>
  );
}
