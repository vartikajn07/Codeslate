"use client";
import useCanvasStore from "@/store/canvasStore";
import { languages } from "@/utils/utilities";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const LanguageSelector = () => {
  const { language, setLanguage } = useCanvasStore();

  const [dropDown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropDown);
  };

  const handleLangChange = (newLang: string) => {
    setLanguage(newLang);
    setDropdown(!dropDown);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
      <div className="dropdown-title flex items-center">
        <div
          onClick={handleDropdown}
          className="flex gap-2 capitalize w-[100px] hover:text-slate-50 transition-all duration-300 ease-in-out"
        >
          {language}
          <ChevronDown />
        </div>

        {dropDown && (
          <div className="dropdown-menu z-10 w-[120px] bottom-[70px]">
            {languages.map((lang, i) => {
              return (
                <div key={i}>
                  <button
                    className="dropdown-item text-left hover:text-slate-50 transition-all duration-300 ease-in-out"
                    onClick={() => handleLangChange(lang.name)}
                  >
                    {lang.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default LanguageSelector;
