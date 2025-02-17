"use client";
import CodeEditor from "@/components/CodeEditor";
import ThemeSelector from "@/components/ThemeSelector";
import { useAceConfig } from "@/store/canvasStore";

export default function Home() {
  useAceConfig();
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="mt-36 flex flex-col items-center gap-10 w-full ">
        <div className=" flex flex-col items-center justify-center">
          <h1 className="text-white">codeslate</h1>
          <h1 className="text-white">
            Create and share beautiful images of your source code.
          </h1>
        </div>
        <div className="border border-1 border-white text-white rounded-lg px-16 py-3 flex gap-10">
          <h1>language</h1>
          <ThemeSelector />
          <h1>code colors</h1>
          <h1>padding</h1>
          <h1>copy</h1>
          <h1>export</h1>
        </div>

        <CodeEditor />
      </div>
    </div>
  );
}
