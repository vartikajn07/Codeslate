//bg color
"use client";
import useCanvasStore from "@/store/canvasStore";
import { Palette } from "lucide-react";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import OutsideClickHandler from "react-outside-click-handler";

const ColorSelector = () => {
  const { color, setColor } = useCanvasStore();
  const [dropDown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropDown);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
      <Palette className="w-6 h-6 cursor-pointer" onClick={handleDropdown} />

      {dropDown && (
        <div className="absolute z-10 bottom-16">
          <HexColorPicker
            color={color || "#1e1e1e"}
            onChange={setColor}
            className="w-36 h-36 rounded-lg border-2 border-white"
          />
        </div>
      )}
    </OutsideClickHandler>
  );
};

export default ColorSelector;
