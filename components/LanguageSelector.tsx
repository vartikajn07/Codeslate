"use client";
import useCanvasStore from "@/store/canvasStore";
import { languages } from "@/utils/utilities";
import { ChevronUp } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector = () => {
  const { language, setLanguage } = useCanvasStore();

  const [dropDown, setDropdown] = useState(false);

  const handleLangChange = (newLang: string) => {
    setLanguage(newLang);
    setDropdown(!dropDown);
  };

  return (
    <div className="flex flex-col items-start gap-[2px]">
      <h1 className="text-xs tracking-wide font-bold font-sesame text-gray-500 uppercase">
        Language
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md px-2 py-1 dark:bg-[#19191a] border dark:border-[#303030] text-black dark:text-white focus:outline-none font-sesame flex gap-2 items-center text-sm ">
          {language} <ChevronUp className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dark:bg-[#191919] bg-white text-black dark:text-white">
          {languages.map((lang, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => handleLangChange(lang.name)}
              className="font-sesame"
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
