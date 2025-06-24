import React from "react";


export default function DateOptions( Params ) {
  const scheduleItems = [
    {
      id: 1,
      title: "Listen podcast",
      time: "2:30 - 3:00 PM",
      color: "#283646",
    },
    {
      id: 2,
      title: "English class",
      time: "4:00 - 4:45 PM",
      color: "#422948",
    },
    {
      id: 3,
      title: "Stand-up meeting",
      time: "6:15 - 5:30 PM",
      color: "#2d402e",
    },
  ];

  // Función para obtener la paleta de colores de cada card
  const getCardStyle = (color) => {
    switch (color) {
      case "#283646":
        return " bg-[#283646] bg-opacity-90 border-cyan-400 text-cyan-600";
      case "#422948":
        return "bg-[#422948] bg-opacity-90 border-purple-400 text-purple-600";
      case "#2d402e":
        return "bg-[#2d402e] bg-opacity-90 border-green-400 text-green-600";
      default:
        return "bg-black/20 border-white/10";
    }
  };

  const getIndicatorStyle = (color) => {
    switch (color) {
      case "#283646":
        return "bg-cyan-600";
      case "#422948":
        return "bg-purple-600";
      case "#2d402e":
        return "bg-green-600";
      default:
        return "bg-gray-400";
    }
  };

  const today = new Date();
  const dayNumber = today.getDate();
  const dayName = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  return (
    <div
      className={`${
        Params.slideIn ? "slideIn" : Params.slideOut ? "slideOut" : ""
      } absolute right-0 w-[192px] h-[258px] translate-y-3 rounded-2xl shadow-2xl border border-white/20 before:absolute before:inset-0 before:bg-white/0 before:backdrop-blur-sm before:saturate-60 before:rounded-2xl before:z-0`}
    >
      {/* Contenido sin filtro */}
      <div className="relative z-10 p-1 text-white h-full">
        {/* Date Header - Centrado */}
        <div className="flex items-center justify-center gap-2 text-center p-3">
          <div className="text-5xl font-bold leading-none">{dayNumber}</div>
          <div className="text-xs font-semibold tracking-widest opacity-90 mt-3">
            {dayName}
          </div>
        </div>
        {/* Schedule Items - Mejor espaciado */}
        <div className="space-y-2 h-full w-full">
          {scheduleItems.map((item) => (
            <div
              key={item.id}
              className="flex h-12 w-full items-center gap-1 justify-start"
            >
              {/* Color indicator - Fuera de la card */}
              <div className={`w-2 h-11 ${getIndicatorStyle(item.color)} rounded-full`}></div>

              {/* Content card con paleta de colores */}
              <div
                className={`flex h-12 w-39 items-center rounded-md px-2 ${getCardStyle(
                  item.color
                )}`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className={`font-semibold text-md leading-tight ${getCardStyle(item.color)}`}>
                    {item.title}
                  </div>
                  <div className={`text-md font-semibold ${getCardStyle(item.color)}`}>
                    {item.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
