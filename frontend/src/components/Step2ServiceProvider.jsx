import { useForm } from "react-hook-form";

export default function Step2ServiceProvider({ setCurrentStep, formData, setFormData }) {
  const { register, handleSubmit } = useForm({
    defaultValues: formData?.step2 || {},
  });

  const onNext = (data) => {
    setFormData((prev) => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const onBack = () => setCurrentStep(1);

  return (
    <div className="w-full px-4 mt-10 flex justify-center">
      <div className="w-full max-w-4xl sm:max-w-2xl md:max-w-xl lg:max-w-lg rounded-xl bg-white/5 p-8 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold text-white">Service Provider</h2>
        <p className="mt-1 text-sm text-gray-400">
          Fill in the service provider details.
        </p>

        <form onSubmit={handleSubmit(onNext)} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">Provider Name</label>
            <input
              {...register("providerName", { required: "Provider name is required" })}
              className="mt-2 block w-full rounded-md bg-white/10 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Provider Email</label>
            <input
              type="email"
              {...register("providerEmail", { required: "Provider email is required" })}
              className="mt-2 block w-full rounded-md bg-white/10 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onBack}
              className="rounded-md bg-gray-500 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-400"
            >
              ← Back
            </button>

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
