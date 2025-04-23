export default function Plan({ plan, selectedPlan, setSelectedPlan }) {
  const style =
    "flex w-full flex-col justify-around rounded-2xl px-4 py-2 text-white transition duration-175 hover:bg-neutral-600";
  const styleSelected =
    "flex w-full flex-col justify-around rounded-2xl px-4 py-2 text-white transition duration-175 bg-neutral-600";

  return (
    <div
      className={
        selectedPlan && selectedPlan.id === plan.id ? styleSelected : style
      }
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
