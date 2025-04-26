import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";

export const useCreateLog = () => {
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
    mutationFn: (log) => api.post("/travel-logs", formatLog(log)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      Swal.fire({
        title: "Successfully created",
        icon: "success",
        text: " ",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};
