import { useCallback, useEffect, useState } from "react";

const useFetchAll = (promise) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const request = useCallback(async () => {
    try {
      const res = await promise();
      if (res.every((v) => v.status === 200)) {
        const requestData = res.map((v) => v.data);
        setData(requestData);
      }
      console.log(res);
    } catch (e) {
      console.log(e.response);
      setError(e.message);
      throw new Error(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [promise]);

  useEffect(() => {
    request();
  }, [request]);

  return { data, isLoading, error };
};

export default useFetchAll;
