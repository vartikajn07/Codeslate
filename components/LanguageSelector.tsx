"use client";
import useCanvasStore from "@/store/canvasStore";
import { languages } from "@/utils/utilities";
import { ChevronUp } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
    <div className="flex flex-col items-start gap-1">
      <h1 className="text-sm font-sesame ">Language</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="dropdown-title focus:outline-none  font-sesame flex gap-2 items-center text-sm ">
          {language} <ChevronUp className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#191919] text-white">
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
