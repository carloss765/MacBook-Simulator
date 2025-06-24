import React from "react";

export default function BatteryOptions() {
  return (
    <div className="absolute w-[230px] px-[12px] py-[4px] right-0 top-7 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[16px] font-[Lexend] rounded-lg">
      <h2 className="flex flex-col">
        Battery{" "}
        <span className="font-light text-gray-200 text-[12px]">
          Power Source: Battery
        </span>
        <div className="w-full h-px bg-white/20 my-2" />
        <p className="text-[13px]">Battery Preferences...</p>
      </h2>
    </div>
  );
}
