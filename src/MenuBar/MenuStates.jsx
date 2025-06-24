import { React, useState, useEffect } from "react";
import battery from "../assets/Icons/charging.png";
import control from "../assets/Icons/control_center.gif";
import { BiWifi } from "react-icons/bi";
import { LuSearch } from "react-icons/lu";
import { getCurrentDate, getCurrentTime } from "./Date";
import BatteryOptions from "./Options/BatteryOptions";
import ControlOptions from "./Options/ControlOptions";
import DateOptions from "./Options/DateOptions";
import "./Options/Options.css";

export default function MenuStates({ handleActive }) {
  const buttonsStyle =
    "flex justify-center items-center h-[26px] px-2 text-white text-[14px] font-[Lexend] cursor-pointer";

  const optionsStyle =
    "absolute z-10 top-10 left-0 w-full h-[26px] px-2 text-white text-[14px] font-[Lexend]";

  const activeStyle = "bg-white/20 transition-all duration-150 rounded-sm";

  const [active, setActive] = useState("");

  const handleClick = (menuName) => {
    setActive((prev) => (prev === menuName ? null : menuName));
    const exportActive = active === menuName ? menuName : null;
    handleActive(exportActive);
  };

  // Estado para controlar la visibilidad y animación de DateOptions
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [dateAnimation, setDateAnimation] = useState({
    slideIn: false,
    slideOut: false,
  });

  // Manejar las transiciones de DateOptions
  useEffect(() => {
    if (active === "date") {
      // Abrir: mostrar componente y activar animación de entrada
      setShowDateOptions(true);
      setDateAnimation({ slideIn: true, slideOut: false });
    } else if (showDateOptions) {
      // Cerrar: activar animación de salida
      setDateAnimation({ slideIn: false, slideOut: true });
      // Ocultar componente después de que termine la animación
      const timer = setTimeout(() => {
        setShowDateOptions(false);
        setDateAnimation({ slideIn: false, slideOut: false });
      }, 200); // Duración de la animación
      return () => clearTimeout(timer);
    }
  }, [active, showDateOptions]);

  const [date, setDate] = useState(getCurrentDate());
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getCurrentDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-end items-center w-full h-full gap-2 pr-4">
      {/* Battery */}
      <div
        onClick={() => handleClick("battery")}
        className="relative"
      >
        <button
          className={`${buttonsStyle} ${
            active === "battery" ? activeStyle : null
          }`}
        >
          <img
            src={battery}
            alt="Icono de Bateria"
            className="flex justify-center items-center size-[14px]"
          />
        </button>
        {active === "battery" && <BatteryOptions className={optionsStyle} />}
      </div>

      {/* Wifi */}
      <button className={buttonsStyle}>
        <BiWifi className="size-[19.2px]" />
      </button>

      {/* Search */}
      <div
        onClick={() => handleClick("search")}
        className="relative"
      >
        <button
          className={`${buttonsStyle} ${
            active === "search" ? activeStyle : null
          }`}
        >
          <LuSearch className="size-[17px]" />
        </button>
      </div>

      {/* Control */}
      <div
        onMouseEnter={() => handleClick("control")}
        className="relative"
      >
        <button className={buttonsStyle}>
          <img
            src={control}
            alt="Icono de Control"
            className="flex justify-center items-center w-[25.6px] h-[15.2px]"
          />
        </button>
        {active === "control" && <ControlOptions className={optionsStyle} />}
      </div>

      {/* Date */}
      <div
        onClick={() => handleClick("date")}
        className="relative"
      >
        <button className={buttonsStyle}>
          <span className={buttonsStyle}>{date}</span>
          <span className={buttonsStyle}>{time}</span>
        </button>
        {showDateOptions && (
          <DateOptions
            className={optionsStyle}
            slideIn={dateAnimation.slideIn}
            slideOut={dateAnimation.slideOut}
          />
        )}
      </div>
    </div>
  );
}
