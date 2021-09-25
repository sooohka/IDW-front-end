/* eslint-disable no-param-reassign */
import { useEffect, useState } from "react";
import spinner2 from "../../assets/spinner2.svg";

const useImgLazyLoad = (imageRef, originalImage, lowQualityImage) => {
  const [imgSrc, setImgSrc] = useState(lowQualityImage || spinner2);
  const [isObserved, setIsObserved] = useState(false);

  useEffect(() => {}, [imageRef]);

  useEffect(() => {
    let observer;

    const callback = (v) => {
      if (v[0].isIntersecting) {
        setIsObserved(true);
        setImgSrc(originalImage);
        observer.disconnect();
      }
    };
    if (!isObserved && imageRef.current) {
      observer = new IntersectionObserver(callback, { root: null, threshold: 0.5 });
      observer.observe(imageRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [imageRef, isObserved, originalImage]);

  return {
    imgSrc,
  };
};

export default useImgLazyLoad;
