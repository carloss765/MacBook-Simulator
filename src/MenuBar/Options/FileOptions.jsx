import React from 'react'

export default function FileOptions() {
    const buttonsStyle =
    "flex items-center h-[26px] w-full px-2 text-white text-[14px] text-start font-[Lexend] hover:bg-blue-500 transition-all duration-150 rounded-sm cursor-pointer";

    return (
        <div className="absolute  w-[208px] p-[4px] top-7 bg-white/40 backdrop-blur-md text-white text-[14px] font-[Lexend] rounded-md">
          <button className={`${buttonsStyle}`}>New File</button>
          <button className={buttonsStyle}>New Window</button>
          <div className="w-full h-px bg-black/10 my-1" />
          <button className={buttonsStyle}>Open File</button>
          <button className={buttonsStyle}>Open Recent File</button>
          <div className="w-full h-px bg-black/10 my-1" />
          <button className={buttonsStyle}>Save</button>
          <button className={buttonsStyle}>Save as</button>
          <div className="w-full h-px bg-black/10 my-1" />
          <button className={buttonsStyle}>Searching</button>
          <button className={buttonsStyle}>Propertie File</button>
          <div className="w-full h-px bg-black/10 my-1" />
          <button className={buttonsStyle}>Customize</button>
          <div className="w-full h-px bg-black/10 my-1" />  
          <button className={buttonsStyle}>Exit</button>
        </div>
      );
}
