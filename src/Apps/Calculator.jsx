import React, { useState, useEffect } from "react";
import "./WindowAnimations.css";

export default function Calculator(Params) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Estados para el drag del componente
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Formatear números para mostrar en el display
  const formatNumber = (num) => {
    if (num.toString().length > 9) {
      return parseFloat(num).toExponential(2);
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Manejar entrada de números
  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  // Manejar punto decimal
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  // Limpiar todo
  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // Cambiar signo
  const toggleSign = () => {
    if (display !== "0") {
      setDisplay(display.charAt(0) === "-" ? display.substr(1) : "-" + display);
    }
  };

  // Porcentaje
  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  // Realizar operación
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display.replace(/,/g, ""));

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Función de cálculo
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  // Manejar teclas del teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!Params.isOpen.has("Calculator")) return;

      const { key } = e;

      if (key >= "0" && key <= "9") {
        inputNumber(parseInt(key));
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+") {
        performOperation("+");
      } else if (key === "-") {
        performOperation("-");
      } else if (key === "*") {
        performOperation("×");
      } else if (key === "/") {
        e.preventDefault();
        performOperation("÷");
      } else if (key === "=" || key === "Enter") {
        performOperation("=");
      } else if (key === "Escape" || key === "c" || key === "C") {
        clear();
      } else if (key === "%") {
        percentage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand, Params.isOpen]);

  // Manejar inicio de arrastre
  const handleMouseDown = (e) => {
    if (e.target.closest(".window-controls")) return; // No arrastrar si se hace clic en los botones

    e.preventDefault(); // Prevenir selección de texto
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Manejar arrastre - optimizado para tiempo real
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

  // Event listeners para el drag - optimizados
  useEffect(() => {
    if (isDragging) {
      // Usar passive: false para poder usar preventDefault
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp, { passive: false });

      // Prevenir selección de texto durante el arrastre
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        // Restaurar selección de texto
        document.body.style.userSelect = "";
        document.body.style.webkitUserSelect = "";
      };
    }
  }, [isDragging, dragStart, position]);

  // Función para cerrar la aplicación
  const handleClose = () => {
    if (Params.handleAppClick) {
      Params.handleAppClick("Calculator");
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

  // Componente Button
  const Button = ({ onClick, className, children, style }) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-full text-white text-xl font-light transition-all duration-150 active:scale-95 hover:brightness-110 ${className}`}
      style={style}
    >
      {children}
    </button>
  );

  return (
    <div
      className={`${Params.isOpen.has("Calculator") ? "block" : "hidden"} ${
        isExpanded
          ? "fixed inset-0 top-[31.2px] z-[60]"
          : "fixed top-20 right-8 z-50"
      }`}
    >
      <div
        className={`bg-black rounded-2xl shadow-2xl select-none ${
          isDragging
            ? "macOS-dragging macOS-window-dragging"
            : "macOS-smooth macOS-window-shadow"
        } ${isExpanded ? "w-full h-full" : "w-80"} ${
          isMinimized ? "h-8" : ""
        } ${
          Params.appTransitions?.Calculator === "macOS-opening"
            ? "macOS-opening"
            : Params.appTransitions?.Calculator === "macOS-closing"
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
        {/* Window Header/Navbar */}
        <div
          className="h-8 bg-gray-800 rounded-t-2xl flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Window Controls */}
          <div className="window-controls flex items-center space-x-2">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-black text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                ×
              </span>
            </button>

            {/* Minimize Button */}
            <button
              onClick={handleMinimize}
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors duration-150 flex items-center justify-center group"
            >
              <span className="text-black text-xs opacity-0 group-hover:opacity-100 font-bold leading-none">
                -
              </span>
            </button>

            {/* Expand Button */}
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
          <div className="text-gray-300 text-sm font-medium">Calculator</div>

          {/* Spacer to balance the layout */}
          <div className="w-16"></div>
        </div>

        {/* Calculator Content */}
        {!isMinimized && (
          <div className="p-4">
            {/* Display */}
            <div className="h-24 flex items-end justify-end p-4 mb-1">
              <div className="text-white text-right text-4xl font-thin truncate">
                {formatNumber(display)}
              </div>
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 gap-3">
              {/* Primera fila */}
              <Button
                onClick={clear}
                className="bg-gray-500 text-black font-medium"
              >
                C
              </Button>
              <Button
                onClick={toggleSign}
                className="bg-gray-500 text-black font-medium"
              >
                +/-
              </Button>
              <Button
                onClick={percentage}
                className="bg-gray-500 text-black font-medium"
              >
                %
              </Button>
              <Button
                onClick={() => performOperation("÷")}
                className={`${
                  operation === "÷"
                    ? "bg-white text-orange-500"
                    : "bg-orange-500"
                } font-medium`}
              >
                ÷
              </Button>

              {/* Segunda fila */}
              <Button
                onClick={() => inputNumber(7)}
                className="bg-gray-700"
              >
                7
              </Button>
              <Button
                onClick={() => inputNumber(8)}
                className="bg-gray-700"
              >
                8
              </Button>
              <Button
                onClick={() => inputNumber(9)}
                className="bg-gray-700"
              >
                9
              </Button>
              <Button
                onClick={() => performOperation("×")}
                className={`${
                  operation === "×"
                    ? "bg-white text-orange-500"
                    : "bg-orange-500"
                } font-medium`}
              >
                ×
              </Button>

              {/* Tercera fila */}
              <Button
                onClick={() => inputNumber(4)}
                className="bg-gray-700"
              >
                4
              </Button>
              <Button
                onClick={() => inputNumber(5)}
                className="bg-gray-700"
              >
                5
              </Button>
              <Button
                onClick={() => inputNumber(6)}
                className="bg-gray-700"
              >
                6
              </Button>
              <Button
                onClick={() => performOperation("-")}
                className={`${
                  operation === "-"
                    ? "bg-white text-orange-500"
                    : "bg-orange-500"
                } font-medium`}
              >
                -
              </Button>

              {/* Cuarta fila */}
              <Button
                onClick={() => inputNumber(1)}
                className="bg-gray-700"
              >
                1
              </Button>
              <Button
                onClick={() => inputNumber(2)}
                className="bg-gray-700"
              >
                2
              </Button>
              <Button
                onClick={() => inputNumber(3)}
                className="bg-gray-700"
              >
                3
              </Button>
              <Button
                onClick={() => performOperation("+")}
                className={`${
                  operation === "+"
                    ? "bg-white text-orange-500"
                    : "bg-orange-500"
                } font-medium`}
              >
                +
              </Button>

              {/* Quinta fila */}
              <Button
                onClick={() => inputNumber(0)}
                className="bg-gray-700 col-span-2"
                style={{ borderRadius: "50px" }}
              >
                0
              </Button>
              <Button
                onClick={inputDecimal}
                className="bg-gray-700"
              >
                .
              </Button>
              <Button
                onClick={() => performOperation("=")}
                className={`${
                  operation === "="
                    ? "bg-white text-orange-500"
                    : "bg-orange-500"
                } font-medium`}
              >
                =
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
