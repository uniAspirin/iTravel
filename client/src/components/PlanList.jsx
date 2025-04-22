import Plan from "./Plan";

export default function PlanList({ plans, setSelectedPlan }) {
  return (
    <div className="col-span-1 flex flex-col p-2 h-full bg-neutral-700 rounded-xl">
      {plans.length > 0 &&
        plans.map((plan) => (
          <Plan key={plan.id} plan={plan} setSelectedPlan={setSelectedPlan} />
        ))}

      <p className="text-center font-medium text-white text-lg border-t border-neutral-600 pt-5 mt-2">
        {plans.length} results
      </p>
    </div>
  );
}
