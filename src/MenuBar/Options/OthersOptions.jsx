import React from "react";

export default function OthersOptions() {
  const buttonsStyle =
    "flex items-center h-[26px] w-full px-2 text-white text-[14px] text-start font-[Lexend] hover:bg-blue-500 transition-all duration-150 rounded-sm cursor-pointer";

  return (
    <div className="absolute  w-[208px] p-[4px] top-7 bg-white/40 backdrop-blur-md text-white text-[14px] font-[Lexend] rounded-md">
      <a className={`${buttonsStyle}`} href="https://github.com/carloss765/MacBook-Simulator">About This Mac</a>
      <div className="w-full h-px bg-black/10 my-1" />
      <button className={buttonsStyle}>System Preferences</button>
      <div className="w-full h-px bg-black/10 my-1" />
      <button className={buttonsStyle}>Recent Items</button>
      <div className="w-full h-px bg-black/10 my-1" />
      <button className={buttonsStyle}>Force Quit Finder</button>
      <div className="w-full h-px bg-black/10 my-1" />
      <button className={buttonsStyle}>Sleep</button>
      <button className={buttonsStyle}>Restart...</button>
      <button className={buttonsStyle}>Shutdown...</button>
      <div className="w-full h-px bg-black/10 my-1" />
      <button className={buttonsStyle}>Lock Screen</button>
      <button className={buttonsStyle}>Log Out</button>
    </div>
  );
}
