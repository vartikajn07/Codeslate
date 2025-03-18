"use client";
import CodeEditor from "@/components/CodeEditor";
import ColorSelector from "@/components/ColorSelector";
// import ImagePicker from "@/components/ImageSelector";
import LanguageSelector from "@/components/LanguageSelector";
import PaddingSelector from "@/components/PaddingSelector";
import ThemeSelector from "@/components/ThemeSelector";
import useCanvasStore from "@/store/canvasStore";
import { Download, Info, LucideCopy, Share } from "lucide-react";
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
import { motion, useScroll, useTransform } from "framer-motion";

//dark/light mode for code editor
//Integrating AI in this:
//1. refactoring code that user pasted -> can the AI shorten that code,
// suggest better variable/function names
//color- [#6f6e6e]
// debouncing  to ensure that a function is not called too frequently,
// in this case searching frequently for unsplash image
//could limit the no of api calls
//export button animation filling

export default function Home() {
  const { code, setTriggerDownload } = useCanvasStore();
  const { scrollY } = useScroll();

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

  // Define transformations
  const yBackground = useTransform(scrollY, [0, 500], ["0%", "-20%"]); // Moves up faster

  return (
    <div className="w-full h-full overflow-hidden">
      <motion.div style={{ y: yBackground }} className="rounded-lg" />
      <div className="relative flex flex-col items-center gap-10 w-full rounded-lg">
        <CodeEditor />
        {/* navbar */}
        <div className="fixed z-20 flex justify-between bg-[#181818] w-full py-4 px-16">
          <h1 className="text-white text-md">codeslate</h1>
          <Dialog>
            <DialogTrigger className="flex gap-2 items-center text-white text-md">
              <Info className="w-4 h-4" />
              About
            </DialogTrigger>
            <DialogContent className="h-[30rem] border-[#3c3c3c] bg-[#181818] text-white">
              <DialogHeader>
                <DialogTitle className="text-white text-md">About</DialogTitle>
                <DialogDescription className="text-white pt-5 mr-24 font-sesame">
                  Codeslate is a tool to create beautiful screenshots of your
                  code. <br /> <br />
                  Pick a theme from a range of colors and backgrounds the
                  language of your code or choose the kind of image you want as
                  background. <br /> <br />
                  Customize the padding and when you are ready, click export in
                  the bottom tab to save the image as png.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {/* tab of tools */}
        <div className=" bg-[#191919] z-50  bottom-0 border-[1px]  border-[#3c3c3c] text-white rounded-lg px-6 py-4 flex items-center gap-6">
          <LanguageSelector />
          <ThemeSelector />
          <PaddingSelector />
          <ColorSelector />
          <ImageSelectorNew />
          <button onClick={copyContent}>
            <LucideCopy />
          </button>
          {/* <Share /> how to incorporate this, will think */}
          <div
            onClick={() => setTriggerDownload(true)}
            className="flex items-center gap-2 bg-[#3e1c1c]  border-[1px] border-[#ff6161] px-3 py-1 rounded-md cursor-pointer"
          >
            <Download stroke="#ff6161" className="w-5 h-5" />
            <h1 className="font-sesame text-sm text-[#ff6161]">Export image</h1>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* Succeeding Div */}
      <motion.div className="relative left-0 w-full h-[15rem] ">
        <video autoPlay loop muted className="h-[15rem] w-full object-cover">
          <source src="/UpdateFade_smaller.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2   flex items-center justify-center text-white text-2xl ">
          Go touch some grass, anon.
        </div>
      </motion.div>
    </div>
  );
}
