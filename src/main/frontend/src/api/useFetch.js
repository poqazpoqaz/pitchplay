import { useEffect, useState } from "react";

/**
 * @param {function} fetcher
 * @returns {{data: Object, refetch: function, isLoading: boolean, error: any}}
 */
const useFetch = (fetcher) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetcher();
        const datas = response.data;
        setData(datas);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      setIsLoading(false);
    };
  }, []);

  const refetch = () => {
    fetcher().then((response) => {
      const datas = response.data;
      setData(datas);
    });
  };

  return { data, refetch, isLoading, error };
};

export default useFetch;
