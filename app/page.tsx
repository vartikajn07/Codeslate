"use client";
import CodeEditor from "@/components/CodeEditor";
import ColorSelector from "@/components/ColorSelector";
import LanguageSelector from "@/components/LanguageSelector";
import PaddingSelector from "@/components/PaddingSelector";
import ThemeSelector from "@/components/ThemeSelector";
import useCanvasStore from "@/store/canvasStore";
import { Download, Moon, Sun } from "lucide-react";
import ImageSelectorNew from "@/components/Images";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import FontSize from "@/components/FontSize";
import Image from "next/image";
import Codeslate from "../public/Codeslate_logo.png";
import Share from "@/components/Share";
import { useDarkMode } from "@/hooks/useDarkmode";
import Link from "next/link";

// debouncing on api
//text animation using gsap

export default function Home() {
  const { setTriggerDownload } = useCanvasStore();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const containerRef = useRef(null);
  const scrollY = useMotionValue(0);
  const { toggle } = useDarkMode();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    lenis.on("scroll", (e: { scroll: number }) => {
      scrollY.set(e.scroll);
    });

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [scrollY]);

  const scrollYProgress = useTransform(scrollY, [0, 500], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div className="h-[120vh] z-50">
        <motion.div
          style={{ y: translateY }}
          className="relative z-50 dark:bg-[#0d0d0d] bg-[#F5F5F5] flex flex-col items-center gap-10 w-full rounded-b-2xl"
        >
          <CodeEditor setImageFile={setImageFile} />
          {/* navbar */}
          <div className="fixed flex justify-between items-center shadow-2xl dark:bg-[#181818] bg-white w-full py-[6px] px-28">
            <div className="bg-transparent w-10 h-10 p-[1px] shadow-2xl rounded-lg cursor-pointer hover:rotate-6 ease-in-out">
              <Image
                src={Codeslate}
                alt="codeslate"
                width={500}
                height={500}
                className=""
              />
            </div>
            <button onClick={toggle} className="cursor-pointer">
              <Sun className="lucide lucide-sun absolute right-28 top-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon
                stroke="white"
                className="lucide lucide-moon absolute right-28 top-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              />
            </button>
          </div>
          {/* tab of tools */}
          <div className="dark:bg-[#191919] bg-[#FFFFFF] bottom-0 border-[1px] dark:border-[#3c3c3c] border-[#E5E7EB] shadow-2xl dark:text-white text-black rounded-lg px-4 py-4 flex items-center gap-4">
            <LanguageSelector />
            <ThemeSelector />
            <PaddingSelector />
            <FontSize />
            <ColorSelector />
            <ImageSelectorNew />
            <Share imageFile={imageFile} disabled={!imageFile} />
            <div
              onClick={() => setTriggerDownload(true)}
              className="style-button style-button--calypso bg-[#3e1c1c]  border-[1px] border-[#ff6161] px-3 py-1 rounded-md cursor-pointer"
            >
              <span className="flex items-center gap-2 font-sesame text-base text-[#ff6161]">
                <Download stroke="#ff6161" className="w-5 h-5" />
                <h1>Export image</h1>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
      {/* Succeeding Div */}
      <div className="absolute bottom-0 w-full ">
        <motion.footer className="w-full z-0">
          <video autoPlay loop muted className="h-[15rem] w-full object-cover">
            <source src="/UpdateFade_smaller.mp4" type="video/mp4" />
          </video>
          <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center ">
            <h1 className="text-2xl text-white">step outside, anon.</h1>
            <h1 className="text-xs mt-14 font-sesame font-light text-white">
              Made with 🌻 by{" "}
              <Link
                href={"https://bento.me/vartikajain"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Vartika{" "}
              </Link>
            </h1>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
