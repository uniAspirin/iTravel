import { X, Plus } from "lucide-react";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useCreatePlan } from "../api/useCreatePlan";
import { useUpdatePlan } from "../api/useUpdatePlan";
import { useDeletePlan } from "../api/useDeletePlan";

export default function PlanForm({ selectedPlan, setSelectedPlan }) {
  const { user } = useContext(AuthContext);
  const emptyForm = {
    user_id: user.id,
    name: "",
    start_date: "",
    end_date: "",
    locations: "",
    activities: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: handleCreate } = useCreatePlan();
  const { mutate: handleUpdate } = useUpdatePlan();
  const { mutate: handleDelete } = useDeletePlan();

  useEffect(() => {
    if (selectedPlan) {
      reset(selectedPlan);
    } else {
      reset(emptyForm);
    }
  }, [selectedPlan]);

  const form =
    "w-full rounded border border-neutral-600 px-2 py-2 text-gray-50 focus:outline-none";
  const formAlert =
    "w-full rounded border border-red-500 px-2 py-2 text-gray-50 focus:outline-none";

  return (
    <div className="col-span-2 flex h-full flex-col rounded-xl bg-neutral-700">
      <div className="flex h-15 flex-row items-center justify-between px-3 text-white shadow-xl/18">
        <Plus
          onClick={() => setSelectedPlan(null)}
          size={40}
          className="rounded p-2 transition duration-175 hover:bg-neutral-600/80"
        />
        {selectedPlan && (
          <X
            color="#ffffff"
            onClick={handleSubmit(handleDelete)}
            size={40}
            className="rounded p-2 transition duration-175 hover:bg-neutral-600/80"
          />
        )}
      </div>

      <form className="mt-5 flex h-full flex-col p-4">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Untitled"
            autoComplete="off"
            className={`w-full rounded-lg border px-3 py-4 text-2xl font-bold text-gray-50 focus:outline-none ${errors.name ? "border-red-600" : "border-neutral-600"}`}
            {...register("name", { required: "Title is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-2 grid grid-cols-2 space-y-5 gap-x-10">
          <div>
            <label
              htmlFor="start_date"
              className="mr-4 mb-1 ml-1 block text-lg font-medium text-white"
            >
              Start Date
            </label>
            <input
              type="text"
              name="start_date"
              id="start_date"
              className={errors.start_date ? formAlert : form}
              placeholder="2025-04-28"
              autoComplete="off"
              {...register("start_date", {
                required: "Start date cannot be empty",
                pattern: {
                  value: /\d{4}-\d{2}-\d{2}/,
                  message: "date format should be YYYY-MM-DD",
                },
              })}
            />
            {errors.start_date && (
              <p className="text-sm text-red-500">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="end_date"
              className="mr-4 mb-1 ml-1 block text-lg font-medium text-white"
            >
              End Date
            </label>
            <input
              type="text"
              name="end_date"
              id="end_date"
              className={errors.end_date ? formAlert : form}
              placeholder="2025-06-10"
              autoComplete="off"
              {...register("end_date", {
                required: "End date is required",
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "Date format must be YYYY-MM-DD",
                },
              })}
            />
            {errors.end_date && (
              <p className="text-sm text-red-500">{errors.end_date.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="locations"
              className="mr-4 mb-1 ml-1 block text-lg font-medium text-white"
            >
              Locations
            </label>
            <input
              type="text"
              name="locations"
              id="locations"
              className={errors.locations ? formAlert : form}
              placeholder="Dublin, Cork"
              autoComplete="off"
              {...register("locations", {
                required: "locations are required",
              })}
            />
            {errors.locations && (
              <p className="text-sm text-red-500">{errors.locations.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="activities"
              className="mr-4 mb-1 ml-1 block text-lg font-medium text-white"
            >
              Activities
            </label>
            <input
              type="text"
              name="activities"
              id="activities"
              className={errors.activities ? formAlert : form}
              placeholder="swimming, dancing"
              autoComplete="off"
              {...register("activities", {
                required: "Activities are required",
              })}
            />
            {errors.activities && (
              <p className="text-sm text-red-500">
                {errors.activities.message}
              </p>
            )}
          </div>
        </div>

        <textarea
          name="description"
          placeholder="description"
          className={`h-60 rounded-xl border p-3 text-white focus:outline-none ${errors.description ? "border-red-600" : "border-neutral-600"}`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}

        <div className="mt-5 flex flex-row justify-between gap-x-8">
          {selectedPlan ? (
            <button
              type="button"
              onClick={handleSubmit(handleUpdate)}
              className="w-full rounded-lg bg-gray-100 py-2 font-semibold transition duration-175 hover:bg-gray-300"
            >
              Update
            </button>
          ) : (
            <button
              type="button"
              // onClick={async () => {
              //   await handleSubmit(handleCreate)();
              //   reset(emptyForm);
              // }}
              onClick={handleSubmit(handleCreate)}
              className="w-full rounded-lg bg-violet-600 py-2 font-semibold text-white transition duration-175 hover:bg-violet-500"
            >
              Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
