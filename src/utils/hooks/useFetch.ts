import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useFetch = <T>(promise: () => Promise<AxiosResponse<T>>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await promise();

        if (res.status === 200) {
          setData(res.data);
          console.log(res);
        }
        setIsLoading(false);
      } catch (e: any) {
        console.log(e.response);
        setError(e.message);
        setIsLoading(false);
        throw new Error(e.message);
      }
    }
    getData();
  }, [promise]);

  return { isLoading, data, error };
};

export default useFetch;
