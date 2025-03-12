import React, { useRef, useState, useEffect } from "react";
import useCanvasStore from "@/store/canvasStore";
import { Upload, RefreshCw, X, Loader, Image } from "lucide-react";
import { fetchRandomImages } from "../services/imageService";

const ImagePicker = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    backgroundImage,
    setBackgroundImage,
    setBackgroundType,
    isUnsplashLoading,
    setIsUnsplashLoading,
  } = useCanvasStore();

  const [activeTab, setActiveTab] = useState<"upload" | "unsplash">("upload");

  useEffect(() => {
    if (activeTab === "unsplash" && unsplashImages.length === 0) {
      fetchUnsplashImages();
    }
  }, [activeTab]);

  const fetchUnsplashImages = async () => {
    setIsUnsplashLoading(true);
    try {
      const images = await fetchRandomImages();
      setUnsplashImages(images);
    } finally {
      setIsUnsplashLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const selectUnsplashImage = (imageUrl: string) => {
    setBackgroundImage(imageUrl);
    setBackgroundType("image");
  };

  const removeImage = () => {
    setBackgroundImage(null);
    setBackgroundType("color");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUnsplashImages();
  };

  return (
    <div className="flex gap-3">
      {/* <div>
        <Image />
      </div> */}
      <div className="flex border border-gray-600 rounded-md overflow-hidden mb-2">
        <button
          className={`flex-1 py-2 text-xs ${
            activeTab === "upload"
              ? "bg-gray-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("upload")}
        >
          Upload
        </button>
        <button
          className={`flex-1 py-2 text-xs ${
            activeTab === "unsplash"
              ? "bg-gray-600 text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("unsplash")}
        >
          Unsplash
        </button>
      </div>
      {activeTab === "upload" ? (
        <div className="flex flex-col gap-3">
          <button
            onClick={handleButtonClick}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-md text-sm w-full"
          >
            <Upload size={16} />
            Upload Image
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 z-10 absolute bottom-20">
          <form onSubmit={handleSearch} className="flex gap-2">
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 p-1 rounded-md"
              disabled={isUnsplashLoading}
            >
              {isUnsplashLoading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <RefreshCw size={16} />
              )}
            </button>
          </form>

          {isUnsplashLoading ? (
            <div className="flex justify-center items-center py-4">
              <Loader className="animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 mt-2 max-h-60 overflow-y-auto">
              {unsplashImages?.map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group rounded-md overflow-hidden"
                  onClick={() => selectUnsplashImage(image.url)}
                >
                  <img
                    src={image.thumb}
                    alt={`Unsplash ${index}`}
                    className="w-full h-16 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all">
                      <Upload size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {backgroundImage && (
        <div className="mt-3">
          <p className="text-sm text-white mb-2">Current background:</p>
          <div className="relative">
            <img
              src={backgroundImage}
              alt="Background preview"
              className="w-full h-24 object-cover rounded-md"
            />
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
