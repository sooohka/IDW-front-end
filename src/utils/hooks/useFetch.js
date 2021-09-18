import { useEffect, useState } from "react";

const useFetch = (promise) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await promise();
        if (res.status === 200) {
          setData(res.data);
        }
        console.log(res);
        return res;
      } catch (e) {
        console.log(e.response);
        setError(e.message);
        throw new Error(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return { isLoading, data, error };
};

export default useFetch;
