"use client";
import { fetchRandomImages } from "@/services/imageService";
import useCanvasStore from "@/store/canvasStore";
import { CircleX, Image, RefreshCw, Trash, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loader from "./Loader";

const ImageSelectorNew = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    backgroundImage,
    setBackgroundImage,
    setBackgroundType,
    unsplashImage,
    setUnsplashImage,
    isUnsplashLoading,
    setIsUnsplashLoading,
    photoCredit,
    photoCreditLink,
    setPhotoCredit,
  } = useCanvasStore();

  useEffect(() => {
    fetchUnsplashImages();
  }, []);

  const fetchUnsplashImages = async () => {
    setIsUnsplashLoading(true);
    try {
      const image = await fetchRandomImages();
      if (image) {
        setUnsplashImage(image?.url, image.user.name, image.user.link);
      }
    } finally {
      setIsUnsplashLoading(false);
    }
  };
  const selectUnsplashImage = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    setBackgroundType("image");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUnsplashImages();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setBackgroundImage(imageUrl);
        setBackgroundType("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setBackgroundImage(null);
    setBackgroundType("color");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Image />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[17rem] h-[20.5rem] py-3 px-2 bg-[#191919] text-white font-sesame font-light">
        {backgroundImage ? (
          <div className="relative flex flex-col items-start gap-1">
            <h1 className="text-[12px]">Background Image</h1>
            <img
              src={backgroundImage}
              alt="Selected Background"
              className="w-full h-[260px] object-cover rounded-md"
            />
            {backgroundImage === unsplashImage &&
              photoCredit &&
              photoCreditLink && (
                <h1 className="text-[10px]">
                  Photo by{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferer"
                    href={photoCreditLink}
                    className="underline"
                  >
                    {photoCredit}
                  </a>
                </h1>
              )}
            <CircleX
              onClick={removeImage}
              className="w-4 h-4 absolute top-0 right-0 cursor-pointer"
            />
          </div>
        ) : (
          <div>
            <h1 className="text-[12px]">Upload a background image:</h1>{" "}
            <button
              onClick={handleButtonClick}
              className="bg-white text-[#191919] my-3 px-3 py-1 w-full rounded-md flex items-center justify-center gap-1 font-sesame text-[12px]"
            >
              <Upload size={12} />
              Upload Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
            <DropdownMenuSeparator className="my-2" />
            <div className="my-2">
              <h1 className="text-[12px]">
                Or try a random{" "}
                <a className="underline" href="https://unsplash.com/">
                  Unsplash
                </a>{" "}
                image:
              </h1>
              {isUnsplashLoading ? (
                <Loader />
              ) : (
                <div className="my-2">
                  {unsplashImage && (
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between mb-1">
                        <button
                          className="text-[12px]"
                          onClick={() => selectUnsplashImage(unsplashImage)}
                        >
                          use image
                        </button>
                        <button className="text-[12px]" onClick={handleSearch}>
                          try another
                        </button>
                      </div>
                      <img
                        src={unsplashImage}
                        alt={`Unsplash image`}
                        className="w-full h-[150px] object-cover"
                      />
                      {photoCredit && photoCreditLink && (
                        <h1 className="text-[10px] mt-1">
                          Photo by{" "}
                          <a
                            href={photoCreditLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {photoCredit}
                          </a>
                        </h1>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImageSelectorNew;

// const handleImageUpload = (e: React.ChangeEvent) => {
//   const file = e.target.files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const imageUrl = event.target?.result as string;
//       setBackgroundImage(imageUrl);
//       setBackgroundType("image");
//     };
//     reader.readAsDataURL(file);
//   }
// };

// const handleButtonClick = () => {
//   fileInputRef.current?.click();
// };

// const removeImage = () => {
//   setBackgroundImage(null);
//   setBackgroundType("color");
//   if (fileInputRef.current) {
//     fileInputRef.current.value = "";
//   }
// };
