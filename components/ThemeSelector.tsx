import useCanvasStore from "@/store/canvasStore";
import { themes } from "@/utils/utilities";
import { ChevronDown, Palette } from "lucide-react";

import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const ThemeSelector = () => {
  const { theme, setTheme } = useCanvasStore();
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
      <div className="dropdown-title flex items-center gap-3 ">
        <Palette />
        <div
          onClick={handleDropdown}
          className="flex gap-2 capitalize w-[120px] hover:text-slate-50 transition-all duration-300 ease-in-out"
        >
          {theme} <ChevronDown />
        </div>
        {dropdown && (
          <div className="dropdown-menu  relative top-[17.7rem] w-[120px]">
            {themes.map((theme, i) => {
              return (
                <button
                  key={i}
                  onClick={() => handleThemeChange(theme)}
                  className=" capitalize text-left hover:text-slate-50 transition-all duration-300 ease-in-out"
                >
                  {theme}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default ThemeSelector;
