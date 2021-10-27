import React, { useEffect, useState } from "react";

const useWindowResize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const resizeHandler = () => {
      console.log("resizing");
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
  return { size };
};

export default useWindowResize;
