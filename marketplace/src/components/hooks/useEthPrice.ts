import useSWR from "swr";

const URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

const COURSE_PRICE = 15;

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    console.log("refetching...", res);
    return res.json();
  });

export const useEthPrice = () => {
  const { data, error } = useSWR(URL, fetcher, {
    refreshInterval: 10000, // 10 seconds
  });

  return {
    ethPrice: data?.ethereum.usd,
    perItemPrice: (data && ( Number(COURSE_PRICE / data.ethereum.usd).toFixed(6)) ) || 0,
    isLoading: !error && !data,
    isError: error,
  };
};
