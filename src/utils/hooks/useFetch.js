import { useEffect, useState } from "react";

const useFetch = (promise) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch
    promise()
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((e) => {
        throw new Error(e);
      });
    setIsLoading(false);
  }, []);
  return { isLoading };
};

export default useFetch;
