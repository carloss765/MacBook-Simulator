import { React, useState } from "react";
import background from "../public/iridescence.jpg";
import MenuApps from "./MenuBar/MenuApps.jsx";
import MenuStates from "./MenuBar/MenuStates.jsx";
import SearchOptions from "./MenuBar/Options/SearchOptions.jsx";
import Dock from "./Dock/Dock.jsx";
import Calculator from "./Apps/Calculator.jsx";
import Terminal from "./Apps/Terminal.jsx";
import Notes from "./Apps/Notes.jsx";
import Preferences from "./Apps/Preferences.jsx";
import Finder from "./Apps/Finder.jsx";
import AppStore from "./Apps/AppStore.jsx";
import Messages from "./Apps/Messages.jsx";
import Music from "./Apps/Music.jsx";
import VSCode from "./Apps/VSCode.jsx";
import Mail from "./Apps/Mail.jsx";
import Photos from "./Apps/Photos.jsx";

export default function Desktop() {
  const [active, setActive] = useState(null);

  function handleActive(active) {
    setActive(active);
  }

  // Función para cerrar el Spotlight search
  const closeSearch = () => {
    setActive(null);
  };

  const [openApps, setOpenApps] = useState(new Set());
  const openApp = (appName) => {
    setOpenApps((prev) => new Set([...prev, appName]));
  };

  const closeApp = (appName) => {
    setOpenApps((prev) => {
      const newSet = new Set(prev);
      newSet.delete(appName);
      return newSet;
    });
  };

  // Función para manejar el clic en aplicaciones del Dock
  const handleAppClick = (appName) => {
    console.log(`Aplicación clickeada: ${appName}`);

    // Aquí puedes agregar lógica específica para cada aplicación
    if (openApps.has(appName)) {
      closeApp(appName);
    } else {
      openApp(appName);
    }
  };

  return (
    <div className="relative bg-cover bg-center bg-no-repeat">
      <img
        src={background}
        draggable="false"
        className="w-screen h-screen object-cover cursor-default select-none"
      ></img>
      <nav
        className="flex justify-between items-center absolute top-0 left-0 w-full h-[31.2px]
        backdrop-blur-[200px] bg-transparent saturate-170 shadow-lg gap-2"
      >
        <MenuApps
          openApps={openApps}
          handleAppClick={handleAppClick}
        />
        <MenuStates handleActive={handleActive} />
      </nav>

      {/* Schedule Widget */}
      <div
        onClick={() => handleActive("search")}
        className="absolute top-20 right-8"
      ></div>

      {active === "search" && <SearchOptions onClose={closeSearch} />}
      <Calculator
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Terminal
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Notes
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Preferences
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Finder
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <AppStore
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Messages
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Music
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <VSCode
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Mail
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <Photos
        openApp={openApp}
        isOpen={openApps}
        handleAppClick={handleAppClick}
      />
      <footer>
        <Dock
          openApps={openApps}
          handleAppClick={handleAppClick}
        />
      </footer>
    </div>
  );
}
