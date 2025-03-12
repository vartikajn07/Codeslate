"use client";
import { fetchRandomImages } from "@/services/imageService";
import useCanvasStore from "@/store/canvasStore";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import html2canvas from "html2canvas";

const CodeEditor = () => {
  const [height, setHeight] = React.useState<number | null>(500);
  const [title, setTitle] = useState("Untitled-1");
  const {
    code,
    setCodeWithPhotoCredit,
    photoCredit,
    setPhotoCredit,
    setCode,
    theme,
    fontSize,
    padding,
    setPadding,
    setTheme,
    language,
    color,
    setColor,
    backgroundImage,
    backgroundType,
    triggerDownload,
    setTriggerDownload,
  } = useCanvasStore();

  const handleCodeChange = (newCode: string | undefined) => {
    if (newCode !== undefined) {
      setCode(newCode);
    }
  };

  useEffect(() => {
    const getPhotoCredit = async () => {
      const image = await fetchRandomImages();
      setPhotoCredit(image?.user.name);
    };
    getPhotoCredit();
  }, []);

  useEffect(() => {
    if (photoCredit) {
      setCodeWithPhotoCredit(photoCredit);
    }
  }, [photoCredit]);

  console.log(photoCredit);

  useEffect(() => {
    if (triggerDownload) {
      handleDownload();
      setTriggerDownload(false);
    }
  }, [triggerDownload, setTriggerDownload]);

  const handleDownload = () => {
    const codeSlate = document.getElementById("codeSlate");
    if (!codeSlate) return;

    html2canvas(codeSlate).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "codeslate.png";
      link.click();
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div
      id="codeSlate"
      style={{
        backgroundImage:
          backgroundType === "image" && backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: backgroundType === "color" ? color : undefined,
        padding: `${padding}px`,
      }}
      className="code-block mt-20 w-[50rem] h-[35rem] relative border border-1 border-white p-5 rounded-lg"
    >
      <div className="code-title mt-12 bg-black bg-opacity-80 rounded-t-lg relative ">
        <div className="dots flex items-center gap-[6px] p-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbc6a] "></div>
          <div className="w-3 h-3 rounded-full bg-[#67f772] "></div>
        </div>
        <div className="w-full absolute z-5 top-3 ">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="w-full text-white  font-medium 
                text-center bg-transparent"
          />
        </div>
        <div
          className={`${
            backgroundType === "image" ? "backdrop-blur-sm rounded-lg" : ""
          }`}
        >
          <AceEditor
            mode={language.toLocaleLowerCase()}
            theme={theme}
            onChange={handleCodeChange}
            value={code}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            style={{
              height: `calc(${height}px - ${padding * 2}px  - 80px)`,
              width: "100%",
            }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            fontSize={fontSize}
            showGutter={false}
            wrapEnabled={true}
            showPrintMargin={false}
            // highlightActiveLine={true}
            // vScrollBarAlwaysVisible={false}
            className=" mt-2 pt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

// const handleColorChange = (newColor: string | undefined) => {
//   if (newColor !== undefined) {
//     setColor(newColor);
//   }
// };

// // Generate the appropriate background style
// const backgroundStyle = () => {
//   if (backgroundType === "image" && backgroundImage) {
//     return {
//       backgroundImage: `url(${backgroundImage})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//     };
//   } else {
//     return { backgroundColor: color || undefined };
//   }
// };
