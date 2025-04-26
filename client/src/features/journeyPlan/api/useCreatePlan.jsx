import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../axiosInstance";
import Swal from "sweetalert2";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  const formatFormData = (data) => {
    const parseField = (field) =>
      typeof field === "string"
        ? field.split(",").map((loc) => loc.trim())
        : field;
    return {
      ...data,
      locations: parseField(data.locations),
      activities: parseField(data.activities),
    };
  };

  return useMutation({
    mutationFn: (plan) => {
      const formatPlan = formatFormData(plan);
      api.post("/journey-plans", formatPlan);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
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
