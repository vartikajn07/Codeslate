import useCanvasStore from "@/store/canvasStore";
import { themes } from "@/utils/utilities";
import { ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

const ThemeSelector = () => {
  const { theme, setTheme } = useCanvasStore();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className="flex flex-col items-start gap-[2px]">
      <h1 className="text-xs tracking-wide font-bold font-sesame text-gray-500 uppercase">
        Theme
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger className=" rounded-md px-2 py-1 dark:bg-[#19191a] border dark:border-[#303030] text-black dark:text-white focus:outline-none font-sesame flex gap-2 items-center text-sm">
          {theme} <ChevronUp className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" dark:bg-[#191919] bg-white text-black dark:text-white">
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
