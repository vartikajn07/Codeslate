//bg color and image selector
"use client";
import useCanvasStore from "@/store/canvasStore";
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
      <h1 onClick={handleDropdown}>Colors</h1>
      {dropDown && (
        <div className="absolute z-10 mt-1">
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
