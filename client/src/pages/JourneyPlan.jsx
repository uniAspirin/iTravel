import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PlanList from "../components/PlanList";
import PlanForm from "../components/PlanForm";
import axios from "../axiosInstance";

export default function JourneyPlan() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAllPlans = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/journey-plans");
      console.log("Get all travellogs", res.data);
      setPlans(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div
        className="grid grid-cols-3 space-x-5 mt-5"
        style={{ height: "calc(100vh - 20rem)" }}
      >
        <PlanList plans={plans} setSelectedPlan={setSelectedPlan} />
        <PlanForm
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          getAllPlans={getAllPlans}
        />
      </div>
    </>
  );
}
