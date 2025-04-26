import { X, Plus } from "lucide-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useCreateLog } from "../api/useCreateLog";
import { useUpdateLog } from "../api/useUpdateLog";
import { useDeleteLog } from "../api/useDeleteLog";

export default function LogForm({ selectedLog, setSelectedLog }) {
  const { user } = useContext(AuthContext);
  const emptyForm = {
    user_id: user.id,
    title: "",
    start_date: "",
    end_date: "",
    post_date: new Date().toISOString().split("T")[0],
    description: "",
    tags: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedLog) {
      reset(selectedLog);
    } else {
      reset(emptyForm);
    }
  }, [selectedLog]);

  const { mutate: handleCreate } = useCreateLog();
  const { mutate: handleUpdate } = useUpdateLog();
  const { mutate: handleDelete } = useDeleteLog();

  return (
    <div className="col-span-2 flex flex-col rounded-xl bg-neutral-700">
      <div className="flex h-15 flex-row items-center justify-between px-3 text-white shadow-xl/18">
        <Plus
          onClick={() => setSelectedLog(null)}
          size={40}
          className="rounded p-2 transition duration-175 hover:bg-neutral-600/80"
        />
        {selectedLog && (
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
            name="title"
            placeholder="Untitled"
            autoComplete="off"
            className={`w-full rounded-lg border px-3 py-4 text-2xl font-bold text-gray-50 focus:outline-none ${errors.name ? "border-red-600" : "border-neutral-600"}`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
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
              className={`${errors.start_date ? "border-red-500" : "border-neutral-600"} w-full rounded border px-2 py-2 text-gray-50 focus:outline-none`}
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
              className={`${errors.end_date ? "border-red-500" : "border-neutral-600"} w-full rounded border px-2 py-2 text-gray-50 focus:outline-none`}
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
        </div>

        <textarea
          name="description"
          placeholder="description"
          className={`${errors.description ? "border-red-600" : "border-neutral-600"} mb-4 h-60 rounded-xl border p-3 text-white focus:outline-none`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}

        <div className="mb-8">
          <label
            htmlFor="tags"
            className="mr-4 mb-1 ml-1 block text-lg font-medium text-white"
          >
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            className={`${errors.tags ? "border-red-500" : "border-neutral-600"} w-full rounded border px-2 py-2 text-gray-50 focus:outline-none`}
            placeholder="IE, UK, FR"
            autoComplete="off"
            {...register("tags", {
              required: "Tags cannot be empty",
            })}
          />
          {errors.tags && (
            <p className="text-sm text-red-500">{errors.tags.message}</p>
          )}
        </div>

        {selectedLog ? (
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
            onClick={handleSubmit(handleCreate)}
            className="w-full rounded-lg bg-violet-600 py-2 font-semibold text-white transition duration-175 hover:bg-violet-500"
          >
            Create
          </button>
        )}
      </form>
    </div>
  );
}
