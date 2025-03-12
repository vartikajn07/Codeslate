"use client";
import CodeEditor from "@/components/CodeEditor";
import ColorSelector from "@/components/ColorSelector";
// import ImagePicker from "@/components/ImageSelector";
import LanguageSelector from "@/components/LanguageSelector";
import PaddingSelector from "@/components/PaddingSelector";
import ThemeSelector from "@/components/ThemeSelector";
import useCanvasStore from "@/store/canvasStore";
import { Download, LucideCopy, Share } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageSelectorNew from "@/components/Images";

//implement a loader here just like carbon
//dark/light mode for code editor
//title of the editor
//Integrating AI in this:
//1. refactoring code that user pasted -> can the AI shorten that code,
// suggest better variable/function names
//shadcn

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
      {/* <div onClick={() =>} className="absolute top-10 right-20 text-white">
        <h1>About</h1>
      </div> */}
      <div className="relative flex flex-col items-center gap-10 w-full">
        <div className="fixed z-20 flex justify-between bg-[#181818] w-full py-5 px-10">
          <h1 className="text-white">codeslate</h1>
          <Dialog>
            <DialogTrigger className=" text-white">Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription className="text-white p-20">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Placeat inventore dolorem blanditiis esse nihil minima
                  dignissimos doloribus assumenda, optio ratione vero minus
                  fugit tempora magni repudiandae temporibus quam deserunt sed.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="fixed bg-[#191919] z-20 bottom-0 border-1 border-[#303030] text-white rounded-lg px-10 py-5 flex items-center gap-6">
          <LanguageSelector />
          <ThemeSelector />
          <ColorSelector />
          <ImageSelectorNew />
          {/* <ImagePicker /> */}
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
