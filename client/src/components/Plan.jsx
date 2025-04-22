import axios from "../axiosInstance";
import { X } from "lucide-react";

export default function Plan({ plan, setSelectedPlan }) {
  return (
    <div
      className="flex w-full flex-col justify-around rounded-2xl px-4 py-2 text-white transition duration-175 hover:bg-neutral-600"
      onClick={() => {
        setSelectedPlan(plan);
      }}
    >
      <p className="text-lg font-medium">{plan.name}</p>
      <p className="font-mono text-sm text-gray-100">
        {plan.start_date} to {plan.end_date}
      </p>
    </div>
  );
}
