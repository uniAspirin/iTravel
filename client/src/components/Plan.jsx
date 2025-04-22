import axios from "../axiosInstance";
import { X } from "lucide-react";

export default function Plan({ plan, setSelectedPlan }) {
  return (
    <div
      className="flex flex-col justify-around w-full px-4 py-2 text-white hover:bg-neutral-600 rounded-2xl"
      onClick={() => {
        setSelectedPlan(plan);
      }}
    >
      <p className="text-lg font-medium ">{plan.name}</p>
      <p className="text-sm font-mono text-gray-100">
        {plan.start_date} to {plan.end_date}
      </p>
    </div>
  );
}
