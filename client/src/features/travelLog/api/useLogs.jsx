import { useQuery } from "@tanstack/react-query";
import { api } from "../../../axiosInstance";

export const useLogs = () => {
  return useQuery({
    queryKey: ["logs"],
    queryFn: () => api.get("/travel-logs"),
  });
};
