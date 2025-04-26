import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (log) => api.delete(`//travel-logs/${log.id}`),
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
