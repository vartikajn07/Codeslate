import useCanvasStore from "@/store/canvasStore";
import { themes } from "@/utils/utilities";
import { ChevronUp, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";

const ThemeSelector = () => {
  const { theme, setTheme } = useCanvasStore();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <h1 className="text-sm font-sesame ">Theme</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="dropdown-title focus:outline-none font-sesame flex gap-2 items-center text-sm ">
          {theme} <ChevronUp className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#191919] text-white">
          {themes.map((theme, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => handleThemeChange(theme)}
              className="font-sesame"
            >
              {theme}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSelector;
