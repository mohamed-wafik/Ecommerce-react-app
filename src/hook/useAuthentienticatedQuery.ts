import { useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import axiosInstance from "../config/axiosInstance";

interface IUseAuthentienticatedQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

const useAuthentienticatedQuery = ({
  queryKey,
  url,
  config,
}: IUseAuthentienticatedQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(url, config);
      return data;
    },
  });
};

export default useAuthentienticatedQuery;
