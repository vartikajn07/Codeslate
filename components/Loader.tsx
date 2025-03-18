import React from "react";
import loaderAnimation from "../public/LoaderAnimation.json";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center ">
      <Lottie animationData={loaderAnimation} loop={true} className="" />
    </div>
  );
};

export default Loader;
