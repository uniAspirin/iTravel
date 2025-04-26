import Plan from "./Plan";

export default function PlanList({ plans, selectedPlan, setSelectedPlan }) {
  return (
    <div className="col-span-1 flex h-full flex-col rounded-xl bg-neutral-700 p-2">
      {plans.length > 0 &&
        plans.map((plan) => (
          <Plan
            key={plan.id}
            plan={plan}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        ))}

      <p className="mt-2 border-t border-neutral-600 pt-5 text-center text-lg font-medium text-white">
        {plans.length} results
      </p>
    </div>
  );
}
