import React, { useEffect, useState } from "react";
import spinner from "../../assets/spinner.gif";

const useImgLazyLoad = (imageRef, src) => {
  const [imgSrc, setImgSrc] = useState(spinner);
  const [isObserved, setIsObserved] = useState(false);

  useEffect(() => {
    let observer;

    const callback = (v) => {
      if (v[0].isIntersecting) {
        setIsObserved(true);
        console.log("observed");
        setImgSrc(src);
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
