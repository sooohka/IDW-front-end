import { useEffect, useState } from "react";

const useFetch = (promise) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // fetch
    promise
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }

        return res;
      })
      .catch((e) => {
        console.log(e.response);

        throw new Error(e.message);
      });
    setIsLoading(false);
  }, []);

  return { isLoading, data };
};

export default useFetch;
