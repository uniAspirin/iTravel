import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../axiosInstance";
import Swal from "sweetalert2";

export const useUpdateLog = () => {
  const queryClient = useQueryClient();

  const formatLog = (log) => {
    const parseField = (field) =>
      typeof field === "string"
        ? field.split(",").map((loc) => loc.trim())
        : field;
    return {
      ...log,
      tags: parseField(log.tags),
    };
  };

  return useMutation({
    mutationFn: (log) => {
      api.put(`/travel-logs/${log.id}`, formatLog(log));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      Swal.fire({
        title: "Successfully updated",
        icon: "success",
        text: " ",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};
