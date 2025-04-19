import { ClipboardCopy, Share2 } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { uploadImageToSupabase } from "@/utils/supabaseUpload";
import { useToast } from "@/hooks/use-toast";
import reddit from "../public/social.png";
import Image from "next/image";

const Share = ({
  imageFile,
  disabled,
}: {
  imageFile: File | null;
  disabled: boolean;
}) => {
  const [shareUrl, setShareUrl] = useState("");
  const { toast } = useToast();

  const handleGetLink = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied to clipboard",
      });
      return;
    }
    try {
      const url = await uploadImageToSupabase(imageFile as File);
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied to clipboard.",
      });
    } catch (err: unknown) {
      toast({
        title: `Failed to generate link. ${(err as Error).message || err}`,
      });
    }
  };

  if (!imageFile) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" disabled={disabled}>
        <Share2 />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[12rem] h-[5rem] py-1 px-2 border dark:border-[#303030] dark:bg-[#191919] dark:text-white font-sesame font-light">
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-[#10B981]">
            Share this beautiful snippet
          </h1>
          <div className="icons flex items-center justify-between">
            <button
              onClick={handleGetLink}
              className="bg-gray-500 rounded-3xl py-[6px] px-3"
            >
              <ClipboardCopy className="w-5 h-5" />
            </button>
            {shareUrl && (
              <>
                <button
                  className="dark:bg-white bg-gray-300 rounded-2xl py-1 px-[10px]"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                      )}&text=Check%20out%20this%20code%20snippet!`,
                      "_blank"
                    )
                  }
                >
                  <Image src="/twitter.svg" alt="X-icon" className="w-6 h-6" />
                </button>
                <div
                  className="bg-[#FF4500] cursor-pointer rounded-3xl px-2"
                  onClick={() =>
                    window.open(
                      `https://www.reddit.com/submit?url=${encodeURIComponent(
                        shareUrl
                      )}&title=Check%20out%20this%20code%20snippet!`,
                      "_blank"
                    )
                  }
                >
                  <Image
                    src={reddit}
                    alt="reddit-icon"
                    width={500}
                    height={500}
                    className="w-8 h-8"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Share;
