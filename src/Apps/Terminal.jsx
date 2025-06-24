import React, { useState, useEffect, useRef } from "react";
import "./WindowAnimations.css";
import "./MacOSAnimations.css";

export default function Terminal(Params) {
  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Estados para la funcionalidad del terminal
  const [history, setHistory] = useState([
    "Welcome to Terminal - macOS Simulator",
    "Type 'help' for available commands",
    "",
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentPath, setCurrentPath] = useState("~");
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Comandos disponibles
  const commands = {
    help: () => [
      "Available commands:",
      "  ls       - List directory contents",
      "  pwd      - Print working directory",
      "  cd       - Change directory",
      "  clear    - Clear terminal",
      "  date     - Show current date",
      "  echo     - Echo text",
      "  whoami   - Show current user",
      "  uname    - System information",
      "",
    ],
    ls: () => [
      "Applications",
      "Documents",
      "Downloads",
      "Desktop",
      "Pictures",
      "",
    ],
    pwd: () => [`/Users/user${currentPath === "~" ? "" : currentPath}`, ""],
    clear: () => {
      setHistory([]);
      return [];
    },
    date: () => [new Date().toString(), ""],
    whoami: () => ["user", ""],
    uname: () => ["macOS Simulator (Darwin Kernel)", ""],
    cd: (args) => {
      if (!args || args === "~") {
        setCurrentPath("~");
        return [""];
      }
      setCurrentPath(args);
      return [""];
    },
    echo: (args) => [args || "", ""],
  };

  // Ejecutar comando
  const executeCommand = (input) => {
    const [cmd, ...args] = input.trim().split(" ");
    const command = commands[cmd.toLowerCase()];

    if (command) {
      const output = command(args.join(" "));
      return output;
    } else if (input.trim()) {
      return [`command not found: ${cmd}`, ""];
    }
    return [""];
  };

  // Manejar envío de comando
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const promptLine = `user@macbook:${currentPath}$ ${currentInput}`;
    const output = executeCommand(currentInput);

    setHistory((prev) => [...prev, promptLine, ...output]);
    setCurrentInput("");
  };

  // Auto-scroll al final
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus en input cuando se abre
  useEffect(() => {
    if (Params.isOpen?.has("Terminal") && inputRef.current) {
      inputRef.current.focus();
    }
  }, [Params.isOpen]);

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
      Params.handleAppClick("Terminal");
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
      className={`${Params.isOpen?.has("Terminal") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 left-8 z-50"
      }`}
    >
      <div
        className={`bg-black rounded-2xl shadow-2xl select-none ${
          isDragging
            ? "macOS-dragging macOS-window-dragging"
            : "macOS-smooth macOS-window-shadow"
        } ${isExpanded ? "w-full h-full" : "w-[600px] h-[400px]"} ${
          isMinimized ? "h-8" : ""
        } ${
          Params.appTransitions?.Terminal === "macOS-opening"
            ? "macOS-opening"
            : Params.appTransitions?.Terminal === "macOS-closing"
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
          className="h-8 bg-gray-800 rounded-t-2xl flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Window Controls */}
          <div className="window-controls flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-black text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                ×
              </span>
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-black text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                -
              </span>
            </button>
            <button
              onClick={handleExpand}
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-black text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                +
              </span>
            </button>
          </div>

          {/* Window Title */}
          <div className="text-gray-300 text-sm font-medium">Terminal</div>

          {/* Spacer */}
          <div className="w-16"></div>
        </div>

        {/* Terminal Content */}
        {!isMinimized && (
          <div className="flex flex-col h-full p-4 bg-black rounded-b-2xl">
            {/* Terminal Display */}
            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto text-green-400 font-mono text-sm bg-black p-2 rounded-lg"
            >
              {history.map((line, index) => (
                <div
                  key={index}
                  className="whitespace-pre-wrap"
                >
                  {line}
                </div>
              ))}
              {/* Current Input Line */}
              <div className="flex items-center">
                <span className="text-green-400">
                  user@macbook:{currentPath}${" "}
                </span>
                <form
                  onSubmit={handleSubmit}
                  className="flex-1"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    className="bg-transparent text-green-400 font-mono text-sm outline-none flex-1 w-full"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
