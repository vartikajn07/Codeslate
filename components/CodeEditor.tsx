"use client";
import { fetchRandomImages, UnsplashImage } from "@/services/imageService";
import useCanvasStore from "@/store/canvasStore";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import html2canvas from "html2canvas";
import { Image } from "lucide-react";

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const CodeEditor = ({
  setImageFile,
}: {
  setImageFile: (file: File) => void;
}) => {
  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [height] = React.useState<number | null>(500);
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
    language,
    color,
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
    const fetchImage = async () => {
      const fetchedImage = await fetchRandomImages();
      setImage(fetchedImage);
    };

    fetchImage();
  }, []);

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

  useEffect(() => {
    if (triggerDownload && image) {
      handleDownload(image);
      setTriggerDownload(false);
    }
  }, [triggerDownload, image, setTriggerDownload]);

  const handleDownload = async (image: UnsplashImage) => {
    if (!image) {
      return;
    }
    //notifying unsplash for download triggering
    if (image.downloadLocation) {
      await fetch(`${image.downloadLocation}&client_id=${UNSPLASH_ACCESS_KEY}`);
    }
    const codeSlate = document.getElementById("codeSlate");
    if (!codeSlate) return;

    //downloading image,sharing logic
    html2canvas(codeSlate, {
      useCORS: true,
      allowTaint: false,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const file = new File([blob], "codeslate.png", {
          type: "image/png",
          lastModified: Date.now(),
        });
        setImageFile(file);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = "codeslate.png";
        link.click();
      });
    });
  };

  //popup on download
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
        }}
        className={`code-block mt-[90px] w-[40rem] h-[30rem] relative flex flex-col items-center transition-opacity duration-200 ease-in-out ${
          hideEditor ? "opacity-0" : "opacity-100"
        }  `}
      >
        <div
          className={`code-title w-[31.3rem] mt-10 ${
            padding === 32 ? "mt-12" : ""
          } ${padding === 64 ? "mt-16" : ""} ${
            backgroundType === "image"
              ? "bg-black bg-opacity-80"
              : "bg-[#292A30]"
          }  border-t-[2px] border-l-[2px] border-r-[2px] border-[rgba(249,249,249,0.08)] rounded-t-lg relative `}
        >
          <div className="dots flex items-center gap-[6px] p-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a] "></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772] "></div>
          </div>
        </div>

        <AceEditor
          mode={language.toLocaleLowerCase()}
          theme={theme}
          onChange={handleCodeChange}
          value={code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          style={{
            height: `calc(${height}px - ${padding * 4}px  - 120px)`,
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
          className={`overflow-auto text-[${fontSize}px] rounded-b-lg ${
            backgroundType === "image"
              ? "bg-[rgba(0,0,0,0.5)] bg-opacity-80"
              : "bg-[#292A30]"
          }`}
        />
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
