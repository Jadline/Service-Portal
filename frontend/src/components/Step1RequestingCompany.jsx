import { useForm } from "react-hook-form";

export default function Step1RequestingCompany({ setCurrentStep, formData, setFormData }) {
  const { register, handleSubmit } = useForm({
    defaultValues: formData?.step1 || {},
  });

  const onNext = (data) => {
    setFormData((prev) => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  return (
    <div className="w-full px-4 mt-10 flex justify-center">
      <div className="w-full max-w-4xl sm:max-w-2xl md:max-w-xl lg:max-w-lg rounded-xl bg-white/5 p-8 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold text-white">Requesting Company</h2>
        <p className="mt-1 text-sm text-gray-400">
          Information about the company requesting consulting services.
        </p>

        <form onSubmit={handleSubmit(onNext)} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">Company Name</label>
            <input
              {...register("companyName", { required: "Company name is required" })}
              className="mt-2 block w-full rounded-md bg-white/10 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Company Email</label>
            <input
              type="email"
              {...register("companyEmail", { required: "Company email is required" })}
              className="mt-2 block w-full rounded-md bg-white/10 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white">Contact Person</label>
              <input
                {...register("contactName")}
                className="mt-2 block w-full rounded-md bg-white/10 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Contact Email</label>
              <input
                type="email"
                {...register("contactEmail")}
                className="mt-2 block w-full rounded-md bg-white/10 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              Continue →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
