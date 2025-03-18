"use client";
import { fetchRandomImages } from "@/services/imageService";
import useCanvasStore from "@/store/canvasStore";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import html2canvas from "html2canvas";
import { Image } from "lucide-react";
import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";

const CodeEditor = () => {
  const [height, setHeight] = React.useState<number | null>(500);
  const [title, setTitle] = useState("Untitled-1");
  const [popup, setPopup] = useState(false); //popup
  const [hideEditor, setHideEditor] = useState(false); //triggering download hiding editor

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

    html2canvas(codeSlate, {
      useCORS: true,
      allowTaint: false,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "codeslate.png";
      link.click();
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //popup
  useEffect(() => {
    if (triggerDownload) {
      setHideEditor(true);
      setTimeout(() => setHideEditor(false), 1100);
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        setTriggerDownload(false);
      }, 1150);
    }
  }, [triggerDownload]);

  return (
    <div className="">
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
          // paddingBottom: `${padding}px`,
        }}
        className={`code-block mt-[90px] w-[40rem] h-[30rem] relative flex flex-col items-center transition-opacity duration-200 ease-in-out ${
          hideEditor ? "opacity-0" : "opacity-100"
        }  `}
      >
        <div className="code-title w-[31.3rem] mt-6 bg-black border-t-[1px] border-l-[1px] border-r-[1px] border-[#3c3c3c] bg-opacity-80 rounded-t-lg relative ">
          <div className="dots flex items-center gap-[6px] p-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a] "></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772] "></div>
          </div>
          <div className="w-full absolute top-3">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              // style={{
              //   lineHeight: "1.8rem",
              // }}
              className="w-full focus:outline-none font-sesame text-white font-medium 
                text-center text-sm bg-transparent"
            />
          </div>
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
              height: `calc(${height}px - ${padding * 4}px  - 80px)`,
              // width: "87%",
            }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              scrollPastEnd: true,
            }}
            highlightActiveLine={false}
            fontSize={fontSize}
            showGutter={false}
            wrapEnabled={true}
            showPrintMargin={false}
            // highlightActiveLine={true}
            className=" overflow-auto"
          />
        </div>
      </div>
      {popup && (
        <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <h1 className="flex items-center gap-3 rounded-lg font-sesame px-4 py-2 bg-[#191919] text-white">
            <Image className="w-4 h-5" stroke="white" />
            Exporting png
          </h1>
        </div>
      )}
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
