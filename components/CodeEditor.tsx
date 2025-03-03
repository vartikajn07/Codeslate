"use client";
import { fetchRandomImages } from "@/services/imageService";
import useCanvasStore from "@/store/canvasStore";
import React, { useEffect } from "react";
import AceEditor from "react-ace";
import html2canvas from "html2canvas";

const CodeEditor = () => {
  const {
    code,
    setCodeWithPhotoCredit,
    photoCredit,
    setPhotoCredit,
    setCode,
    theme,
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
      const images = await fetchRandomImages();
      if (images.length > 0) {
        setPhotoCredit(images[0].user.name);
      }
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

  return (
    <div className="mt-6 w-[50rem] h-[35rem] relative border border-1 border-white">
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
        className="code-block  h-[30rem] p-5 m-10 border border-1 border-slate-300 rounded-lg"
      >
        <div className=" border-b-1 border-slate-400">
          <div className="dots flex items-center gap-[6px]">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a] "></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772] "></div>
          </div>
          <div
            className={`${
              backgroundType === "image"
                ? "backdrop-blur-sm bg-black bg-opacity-40 rounded-md"
                : ""
            }`}
          >
            <AceEditor
              mode={language.toLocaleLowerCase()}
              theme={theme}
              onChange={handleCodeChange}
              value={code}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              width="100%"
              style={{ height: "25rem" }}
              // fontSize={fontSize}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              fontSize={16}
              showGutter={false}
              wrapEnabled={true}
              showPrintMargin={false}
              highlightActiveLine={false}
              className="ace-editor"
            />
          </div>
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
