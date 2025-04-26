import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../axiosInstance";
import Swal from "sweetalert2";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (plan) => api.delete(`/journey-plans/${plan.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
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
