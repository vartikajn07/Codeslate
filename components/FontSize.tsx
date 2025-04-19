import React from "react";
import { Slider } from "./ui/slider";
import useCanvasStore from "@/store/canvasStore";

const FontSize = () => {
  const { fontSize, setFontSize } = useCanvasStore();
  return (
    <div className="flex flex-col items-start gap-2">
      <h1
        onClick={() => setFontSize(17)}
        className="cursor-pointer text-xs tracking-wide font-bold font-sesame text-gray-500 uppercase"
      >
        Font size
      </h1>
      <div className="flex gap-2">
        <Slider
          className="cursor-grab"
          defaultValue={[fontSize]}
          max={30}
          step={1}
          onValueChange={(value) => setFontSize(value[0])}
        />
        <h1 className="text-[#6f6e6e] font-sesame text-sm font-semibold ">
          {fontSize}
        </h1>
      </div>
    </div>
  );
};

export default FontSize;
