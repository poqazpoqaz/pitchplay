import { useState } from "react";

/**
 * @param {function} fetcher
 * @returns {{data: Object, mutate: function, isLoading: boolean, error: any}}
 */
const useMutate = (fetcher) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (options) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetcher(options);
      const datas = response.data;
      setData(datas);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return { data, mutate, isLoading, error };
};

export default useMutate;
