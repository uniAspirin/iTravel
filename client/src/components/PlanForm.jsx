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
        formatFormData()
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
        formatFormData()
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
        `http://localhost:3000/journey-plans/${selectedPlan.id}`
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
    <div className="col-span-2 flex flex-col h-full bg-neutral-700 rounded-xl">
      <div className="flex flex-row justify-between items-center h-15 px-3 shadow-xl/18 text-white">
        <Plus
          onClick={() => setSelectedPlan(null)}
          size={40}
          className="hover:bg-neutral-600/80 p-2 rounded transition duration-175"
        />
        {isUpdating && (
          <X
            color="#ffffff"
            onClick={async () => {
              await handleDelete();
              setFormData(emptyForm);
            }}
            size={40}
            className="hover:bg-neutral-600/80 p-2 rounded transition duration-175"
          />
        )}
      </div>

      <form className="flex flex-col p-4 h-full mt-5">
        <input
          type="text"
          name="name"
          placeholder="Untitled"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
          className="border border-neutral-600 text-gray-50 py-4 px-3 font-bold text-2xl mb-4 focus:outline-none rounded-lg"
        />

        <div className="grid grid-cols-2 gap-x-10 space-y-5 mb-2">
          <div>
            <label
              htmlFor="start_date"
              className="block text-white font-medium text-lg ml-1 mr-4 mb-1"
            >
              Start Date
            </label>
            <input
              type="text"
              name="start_date"
              id="start_date"
              className="w-full border border-neutral-600 rounded px-2 py-2 text-gray-50 focus:outline-none"
              placeholder="2025-04-28"
              autoComplete="off"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="end_date"
              className="block text-white font-medium text-lg ml-1 mr-4 mb-1"
            >
              End Date
            </label>
            <input
              type="text"
              name="end_date"
              id="end_date"
              className="w-full border border-neutral-600 rounded px-2 py-2 text-gray-50 focus:outline-none"
              placeholder="2025-06-10"
              autoComplete="off"
              value={formData.end_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="locations"
              className="block text-white font-medium text-lg ml-1 mr-4 mb-1"
            >
              Locations
            </label>
            <input
              type="text"
              name="locations"
              id="locations"
              className="w-full border border-neutral-600 rounded px-2 py-2 text-gray-50 focus:outline-none"
              placeholder="Dublin, Cork"
              autoComplete="off"
              value={formData.locations}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="activities"
              className="block text-white font-medium text-lg ml-1 mr-4 mb-1"
            >
              Activities
            </label>
            <input
              type="text"
              name="activities"
              id="activities"
              className="w-full border border-neutral-600 rounded px-2 py-2 text-gray-50 focus:outline-none"
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
          className="h-60 text-white border border-neutral-600 rounded-xl p-3 focus:outline-none"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="flex flex-row  gap-x-8 mt-5 justify-between">
          {isUpdating || (
            <button
              type="button"
              onClick={handleCreate}
              className="w-full py-2 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-500 transition duration-175"
            >
              Create
            </button>
          )}
          {isUpdating && (
            <button
              type="button"
              onClick={handleUpdate}
              className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-300 font-semibold transition duration-175"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
