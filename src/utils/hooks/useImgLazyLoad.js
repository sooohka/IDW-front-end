import React, { useEffect, useState } from "react";
import spinner from "../../assets/spinner.gif";

const useImgLazyLoad = (imageRef, originalImage, reducedImage) => {
  const [imgSrc, setImgSrc] = useState(reducedImage || spinner);
  const [isObserved, setIsObserved] = useState(false);

  useEffect(() => {
    let observer;

    const callback = (v) => {
      if (v[0].isIntersecting) {
        setIsObserved(true);
        console.log("observed");
        setImgSrc(originalImage);
        observer.disconnect();
      }
    };

    if (!isObserved && imageRef.current) {
      observer = new IntersectionObserver(callback, { root: null, threshold: 0.8 });
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [imageRef]);

  return {
    imgSrc,
  };
};

export default useImgLazyLoad;
