import { api } from "../../../axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: () => api.get("/journey-plans"),
  });
};
