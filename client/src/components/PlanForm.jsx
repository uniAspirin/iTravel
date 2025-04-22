import { X, Plus } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import axios from "../axiosInstance";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

export default function PlanForm({
  selectedPlan,
  setSelectedPlan,
  getAllPlans,
}) {
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
  const [formData, setFormData] = useState(emptyForm);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (selectedPlan === null) {
      setFormData(emptyForm);
      setIsUpdating(false);
    } else {
      setFormData(selectedPlan);
      setIsUpdating(true);
    }
  }, [selectedPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const formatFormData = () => {
    const parseField = (field) =>
      typeof field === "string"
        ? field.split(",").map((loc) => loc.trim())
        : field;

    return {
      ...formData,
      locations: parseField(formData.locations),
      activities: parseField(formData.activities),
    };
  };

  const handleCreate = async (e) => {
    try {
      console.log(formatFormData());
      const res = await axios.post(
        "http://localhost:3000/journey-plans",
        formatFormData(),
      );
      console.log("Succefully create a journey plan", res.data);
      getAllPlans();
      setSelectedPlan(null);
      Swal.fire({
        title: "Successfully added",
        icon: "success",
        text: " ",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error creating journey plan");
    }
  };

  const handleUpdate = async (e) => {
    try {
      console.log(formData);
      console.log(selectedPlan.id);

      const res = await axios.put(
        `http://localhost:3000/journey-plans/${selectedPlan.id}`,
        formatFormData(),
      );
      console.log("Succefully updating a journey plan", res.data);
      getAllPlans();
      setSelectedPlan(null);
      Swal.fire({
        title: "Successfully updated",
        icon: "success",
        text: " ",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating journey plan", error);
    }
  };

  const handleDelete = async (e) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/journey-plans/${selectedPlan.id}`,
      );
      console.log("Successfully deleted");
      getAllPlans();
      setSelectedPlan(null);
      Swal.fire({
        title: "Successfully deleted",
        icon: "success",
        text: " ",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Failed to delete journey plan", error);
    }
  };

  return (
    <div className="col-span-2 flex h-full flex-col rounded-xl bg-neutral-700">
      <div className="flex h-15 flex-row items-center justify-between px-3 text-white shadow-xl/18">
        <Plus
          onClick={() => setSelectedPlan(null)}
          size={40}
          className="rounded p-2 transition duration-175 hover:bg-neutral-600/80"
        />
        {isUpdating && (
          <X
            color="#ffffff"
            onClick={async () => {
              await handleDelete();
              setFormData(emptyForm);
            }}
            size={40}
            className="rounded p-2 transition duration-175 hover:bg-neutral-600/80"
          />
        )}
      </div>

      <form className="mt-5 flex h-full flex-col p-4">
        <input
          type="text"
          name="name"
          placeholder="Untitled"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
          className="mb-4 rounded-lg border border-neutral-600 px-3 py-4 text-2xl font-bold text-gray-50 focus:outline-none"
        />

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
              className="w-full rounded border border-neutral-600 px-2 py-2 text-gray-50 focus:outline-none"
              placeholder="2025-04-28"
              autoComplete="off"
              value={formData.start_date}
              onChange={handleChange}
            />
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
              className="w-full rounded border border-neutral-600 px-2 py-2 text-gray-50 focus:outline-none"
              placeholder="2025-06-10"
              autoComplete="off"
              value={formData.end_date}
              onChange={handleChange}
            />
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
              className="w-full rounded border border-neutral-600 px-2 py-2 text-gray-50 focus:outline-none"
              placeholder="Dublin, Cork"
              autoComplete="off"
              value={formData.locations}
              onChange={handleChange}
            />
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
              className="w-full rounded border border-neutral-600 px-2 py-2 text-gray-50 focus:outline-none"
              placeholder="swimming, dancing"
              autoComplete="off"
              value={formData.activities}
              onChange={handleChange}
            />
          </div>
        </div>

        <textarea
          name="description"
          placeholder="description"
          className="h-60 rounded-xl border border-neutral-600 p-3 text-white focus:outline-none"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="mt-5 flex flex-row justify-between gap-x-8">
          {isUpdating || (
            <button
              type="button"
              onClick={handleCreate}
              className="w-full rounded-lg bg-violet-600 py-2 font-semibold text-white transition duration-175 hover:bg-violet-500"
            >
              Create
            </button>
          )}
          {isUpdating && (
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full rounded-lg bg-gray-100 py-2 font-semibold transition duration-175 hover:bg-gray-300"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
