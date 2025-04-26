import { useState } from "react";
import PlanList from "./components/PlanList";
import PlanForm from "./components/PlanForm";
import { api } from "@/axiosInstance.jsx";
import { usePlans } from "./api/usePlans";

export default function JourneyPlan() {
  const { data: plans, error, isLoading } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <div
        className="mt-5 grid grid-cols-3 space-x-5"
        style={{ height: "calc(100vh - 20rem)" }}
      >
        <PlanList
          plans={plans}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
        <PlanForm
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      </div>
    </>
  );
}
