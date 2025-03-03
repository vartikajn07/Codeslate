"use client";
import { create } from "zustand";
import ace from "ace-builds";
import { useEffect } from "react";

export interface CanvasState {
  code: string;
  theme: string;
  language: string;
  padding: number;
  fontSize: number;
  color: string;
  backgroundImage: string | null;
  backgroundType: "color" | "image";
  unsplashImages: string[];
  isUnsplashLoading: boolean;
  photoCredit: string;
  triggerDownload: boolean;
  setPhotoCredit: (credit: string) => void;
  setCode: (code: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  setPadding: (padding: number) => void;
  setLanguage: (language: string) => void;
  setColor: (color: string) => void;
  setBackgroundImage: (imageUrl: string | null) => void;
  setBackgroundType: (type: "color" | "image") => void;
  setUnsplashImages: (images: string[]) => void;
  setIsUnsplashLoading: (isLoading: boolean) => void;
  setCodeWithPhotoCredit: (photoCredit: string) => void;
  setTriggerDownload: (value: boolean) => void;
}

// aceImports.js
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-typescript";

// Import themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";

// Ace builds extensions
import "ace-builds/src-noconflict/ext-language_tools";

//custom hook
const useCanvasStore = create<CanvasState>((set) => ({
  photoCredit: "",
  code: "",
  setCodeWithPhotoCredit: (photoCredit: string) =>
    set((state) => ({
      code: `function guessMyNumber() {
        const userGuess = prompt("Guess a number between 1 and 10:");
        const secretNumber = Math.ceil(Math.random() * 10);
      
        if (parseInt(userGuess) === secretNumber) {
          return "Wow, you must be a psychic!";
        } else {
          return \`Nope, the number was \${secretNumber}. Better luck next time!\`;
        }
      } 

      ${photoCredit ? `// Photo by ${photoCredit} on Usplash` : ""}`,
    })),

  setPhotoCredit: (credit) => set({ photoCredit: credit }),
  triggerDownload: false,
  setTriggerDownload: (value) => set({ triggerDownload: value }),
  theme: "monokai",
  language: "javascript",
  padding: 16,
  fontSize: 14,
  color: "",
  backgroundImage: null,
  backgroundType: "color",
  unsplashImages: [],
  isUnsplashLoading: false,
  setCode: (code) => set({ code }),
  setTheme: (theme) => set({ theme }),
  setFontSize: (size) => set({ fontSize: size }),
  setPadding: (padding) => set({ padding }),
  setLanguage: (language) => set({ language }),
  setColor: (color) => set({ color }),
  setBackgroundImage: (imageUrl) => set({ backgroundImage: imageUrl }),
  setBackgroundType: (type) => set({ backgroundType: type }),
  setUnsplashImages: (images) => set({ unsplashImages: images }),
  setIsUnsplashLoading: (isLoading) => set({ isUnsplashLoading: isLoading }),
}));

export default useCanvasStore;

// // ace setup
export const useAceConfig = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ace.config.set("basePath", "/ace-builds/src-noconflict/");
      ace.config.setModuleUrl(
        "ace/mode/javascript_worker",
        "/node_modules/ace-builds/src-noconflict/worker-javascript.js"
      );
      ace.config.setModuleUrl(
        "ace/mode/html_worker",
        "/node_modules/ace-builds/src-noconflict/worker-html.js"
      );
      ace.config.setModuleUrl(
        "ace/mode/css_worker",
        "/node_modules/ace-builds/src-noconflict/worker-css.js"
      );
      ace.config.setModuleUrl(
        "ace/mode/python_worker",
        "/node_modules/ace-builds/src-noconflict/worker-python.js"
      );
      ace.config.setModuleUrl(
        "ace/mode/java_worker",
        "/node_modules/ace-builds/src-noconflict/worker-java.js"
      );
      ace.config.setModuleUrl(
        "ace/mode/typescript_worker",
        "/node_modules/ace-builds/src-noconflict/worker-typescript.js"
      );
    }
  }, []);
};
