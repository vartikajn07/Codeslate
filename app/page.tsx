"use client";
import CodeEditor from "@/components/CodeEditor";
import ColorSelector from "@/components/ColorSelector";
import ImagePicker from "@/components/ImageSelector";
import LanguageSelector from "@/components/LanguageSelector";
import PaddingSelector from "@/components/PaddingSelector";
import ThemeSelector from "@/components/ThemeSelector";
import useCanvasStore from "@/store/canvasStore";
import { Download, LucideCopy, Share } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//implement a loader here just like carbon
export default function Home() {
  const { code, setTriggerDownload } = useCanvasStore();

  const copyContent = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast.success("Code copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Failed to copy!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="mt-36 flex flex-col items-center gap-10 w-full ">
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-white">codeslate</h1>
          <h1 className="text-white">
            Create and share beautiful images of your source code.
          </h1>
        </div>
        <div className="border border-1 border-white text-white rounded-lg px-16 py-3 flex items-center gap-10">
          <LanguageSelector />
          <ThemeSelector />
          <ColorSelector />
          <ImagePicker />
          <PaddingSelector />

          <button onClick={copyContent}>
            <LucideCopy />
          </button>
          {/* <Share /> how to incorporate this, will think */}
          <div onClick={() => setTriggerDownload(true)} className="flex gap-1">
            <h1>export</h1>
            <Download />
          </div>
        </div>

        <CodeEditor />
      </div>
      <ToastContainer />
    </div>
  );
}
