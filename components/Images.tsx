"use client";
import { fetchRandomImages } from "@/services/imageService";
import useCanvasStore from "@/store/canvasStore";
import { Image, Loader, RefreshCw, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const ImageSelectorNew = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dropdown, setDropdown] = useState(false);
  //   const [activeTab, setActiveTab] = useState<"upload" | "unsplash">("upload");
  const {
    backgroundImage,
    setBackgroundImage,
    setBackgroundType,
    unsplashImage,
    setUnsplashImage,
    isUnsplashLoading,
    setIsUnsplashLoading,
  } = useCanvasStore();

  const handleDropdown = () => {
    setDropdown(!dropdown);
    if (!unsplashImage) {
      fetchUnsplashImages();
    }
  };
  useEffect(() => {
    fetchUnsplashImages();
  });

  const fetchUnsplashImages = async () => {
    setIsUnsplashLoading(true);
    try {
      const image = await fetchRandomImages();
      setUnsplashImage(image?.url);
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

  return (
    <OutsideClickHandler onOutsideClick={() => setDropdown(false)}>
      <Image onClick={handleDropdown} />
      {dropdown && (
        <div className="dropdown-menu relative bottom-[70px] h-[15rem] w-[15rem]">
          <div className="upload flex flex-col gap-2 ">
            <h1 className="text-sm font-light">Upload a background image:</h1>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleButtonClick}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm "
              >
                <Upload size={16} />
                Upload Image
              </button>
            </div>
          </div>
          <hr className="w-full opacity-45 bg-white my-3" />
          <div className="unsplashSection flex flex-col">
            <h1 className="font-sm">Or use a random unsplash image:</h1>
            {isUnsplashLoading ? (
              <div>
                <Loader className="animate-spin text-gray-400" />
              </div>
            ) : (
              <div>
                {unsplashImage && (
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <button
                        onClick={() => selectUnsplashImage(unsplashImage)}
                      >
                        use image
                      </button>
                      <button onClick={handleSearch}>try another</button>
                    </div>
                    <img
                      src={unsplashImage}
                      alt={`Unsplash image`}
                      className="w-full h-16 object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </OutsideClickHandler>
  );
};

export default ImageSelectorNew;
