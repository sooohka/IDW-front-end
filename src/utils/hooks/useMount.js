import { useEffect, useRef } from "react";

const useMount = () => {
  const isMount = useRef(true);
  useEffect(() => {
    if (isMount.current) isMount.current = false;
  });

  return { isMount: isMount.current };
};

export default useMount;
