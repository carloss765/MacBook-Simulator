import { useState } from "react";
import {
  LuWifi,
  LuBluetooth,
  LuShare2,
  LuMonitor,
  LuZap,
} from "react-icons/lu";
import Sun from "../../assets/Icons/Sun.svg";
import Volume from "../../assets/Icons/Volume.svg";
import Music from "../../assets/Icons/dock/music.png";
import PauseIcon from "../../assets/Icons/continue.png";
import NextIcon from "../../assets/Icons/next.png";
import NotDisturb from "../../assets/Icons/doNotDisturb.png";

export default function ControlOptions() {
  const [isActive, setIsActive] = useState("");

  const handleActive = (active) => {
    if (active === isActive) {
      setIsActive("");
    } else {
      setIsActive(active);
    }
  };

  return (
    <div className="absolute w-[412px] h-[404px] p-[12px] top-7 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-md border border-white/20 text-black text-[16px] font-[Lexend] rounded-2xl shadow-2xl">
      <div className="flex flex-row col-start-3 gap-4">
        <div className="flex flex-col w-1/2 h-[145px]  border-1 border-white/20 rounded-xl shadow-2xl">
          <div
            className={`flex flex-row items-center h-full w-full rounded-tl-xl rounded-tr-xl px-4 cursor-pointer ${
              isActive === "wifi"
                ? "bg-blue-500 text-white duration-300"
                : "hover:bg-white/20"
            }`}
            onClick={() => handleActive("wifi")}
          >
            <LuWifi className="text-2xl mr-3" />
            <span className="text-xl font-light">Wi-Fi</span>
          </div>
          <div
            className={`flex flex-row items-center h-full w-full px-4 cursor-pointer ${
              isActive === "airdrop"
                ? "bg-blue-500 text-white duration-300"
                : "hover:bg-white/20"
            }`}
            onClick={() => handleActive("airdrop")}
          >
            <LuShare2 className="text-2xl mr-3" />
            <span className="text-xl font-light">AirDrop</span>
          </div>
          <div
            className={`flex flex-row items-center h-full w-full rounded-bl-xl rounded-br-xl px-4 cursor-pointer ${
              isActive === "bluetooth"
                ? "bg-blue-500 text-white duration-300"
                : "hover:bg-white/20"
            }`}
            onClick={() => handleActive("bluetooth")}
          >
            <LuBluetooth className="text-2xl mr-3" />
            <span className="text-xl font-light">Bluetooth</span>
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-3">
          <button
            className={`group border-1 h-[63.6px] border-white/20 rounded-xl shadow-2xl cursor-pointer ${
              isActive === "not-disturb"
                ? "bg-red-900 text-white duration-300"
                : "hover:bg-white/20"
            }`}
            onClick={() => handleActive("not-disturb")}
          >
            <div className="flex flex-row items-center gap-1">
              <img
                src={NotDisturb}
                alt="Do Not Disturb Icon"
                className="flex justify-center items-center w-8 h-8 ml-3 p-1 bg-red-900 rounded-full"
              />
              <span className="text-xl mr-13 font-light">Do Not Disturb</span>
            </div>
          </button>
          <div className="flex flex-row items-end justify-center gap-3">
            <button
              className={`border-1 w-[85.5px] h-[69.6px] border-white/20 rounded-xl shadow-2xl cursor-pointer flex flex-col items-center justify-center ${
                isActive === "option-1"
                  ? "bg-blue-500 text-white duration-300"
                  : "hover:bg-white/20"
              }`}
              onClick={() => handleActive("option-1")}
            >
              <LuMonitor className="text-2xl mb-1" />
              <span className="text-sm font-light">Monitor</span>
            </button>
            <button
              className={`border-1 w-[85.5px] h-[69.6px] border-white/20 rounded-xl shadow-2xl cursor-pointer flex flex-col items-center justify-center ${
                isActive === "option-2"
                  ? "bg-blue-500 text-white duration-300"
                  : "hover:bg-white/20"
              }`}
              onClick={() => handleActive("option-2")}
            >
              <LuZap className="text-2xl mb-1" />
              <span className="text-sm font-light">Activity</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-[245px] items-center justify-center col-start-3  gap-4">
        <div className="flex flex-col w-full h-full justify-center items-center gap-3">
          <div className="relative w-full h-[63.6px]">
            <img
              src={Sun}
              alt="Sun Icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 ml-3 w-6 h-6 pointer-events-none z-10"
            />
            <input
              type="range"
              className="w-full h-full pl-10 pr-3 border-1 border-white/20 rounded-xl shadow-2xl appearance-none bg-transparent"
              aria-label="Sun brightness"
            />
          </div>

          <div className="relative w-full h-[63.6px]">
            <img
              src={Volume}
              alt="Volume Icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 ml-3 w-6 h-6 pointer-events-none z-10"
            />
            <input
              type="range"
              className="w-full h-full pl-10 pr-3 border-1 border-white/20 rounded-xl shadow-2xl appearance-none bg-transparent"
              aria-label="Volume level"
            />
          </div>

          <div className="flex flex-row items-center w-full h-[63.6px] border-1 border-white/20 rounded-xl shadow-2xl">
            <img
              src={Music}
              alt="Music Icon"
              className="w-12 h-12 ml-3"
            />
            <span className="ml-2 text-white text-xl">Music</span>
            <div className="flex justify-end w-full mr-8">
              <button className="">
                <img
                  src={PauseIcon}
                  alt="Pause Icon"
                  className="w-10 h-10 shadow-3xl"
                />
              </button>
              <button className="">
                <img
                  src={NextIcon}
                  alt="Next Icon"
                  className="w-10 h-10 shadow-3xl"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
