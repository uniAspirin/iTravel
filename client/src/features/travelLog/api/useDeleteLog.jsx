import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../axiosInstance";
import Swal from "sweetalert2";

export const useDeleteLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (log) => api.delete(`/travel-logs/${log.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      Swal.fire({
        title: "Successfully Deleted",
        icon: "success",
        text: " ",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};
