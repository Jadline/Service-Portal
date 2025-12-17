import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom"; 

export default function Step4ReviewSubmit({ setCurrentStep, formData }) {
  const navigate = useNavigate(); 

  const onBack = () => setCurrentStep(3);

  const onSubmit = async () => {
    try {
      const { data, error } = await supabase.from("requests").insert([
        {
          step1: formData.step1 || {},
          step2: formData.step2 || {},
          step3: formData.step3 || {},
        },
      ]);

      if (error) throw error;

    
      navigate("/", { state: { successMessage: "Form submitted successfully!" } });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form, check console.");
    }
  };

  return (
    <div className="w-full px-4 mt-10 flex justify-center">
      <div className="w-full max-w-4xl sm:max-w-2xl md:max-w-xl lg:max-w-lg rounded-xl bg-white/5 p-8 ring-1 ring-white/10">
        <h2 className="text-lg font-semibold text-white">Review & Submit</h2>
        <p className="mt-1 text-sm text-gray-400">
          Review all your entries before submitting.
        </p>

        <div className="mt-6 space-y-4 text-white">
          <div>
            <h3 className="font-medium">Requesting Company</h3>
            <p>Company Name: {formData?.step1?.companyName || "-"}</p>
            <p>Company Email: {formData?.step1?.companyEmail || "-"}</p>
            <p>Contact Name: {formData?.step1?.contactName || "-"}</p>
            <p>Contact Email: {formData?.step1?.contactEmail || "-"}</p>
          </div>

          <div>
            <h3 className="font-medium">Service Provider</h3>
            <p>Provider Name: {formData?.step2?.providerName || "-"}</p>
            <p>Provider Email: {formData?.step2?.providerEmail || "-"}</p>
          </div>

          <div>
            <h3 className="font-medium">Request Details</h3>
            <p>Title: {formData?.step3?.requestTitle || "-"}</p>
            <p>Description: {formData?.step3?.requestDescription || "-"}</p>
          </div>
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
            type="button"
            onClick={onSubmit}
            className="rounded-md bg-green-500 px-6 py-2 text-sm font-semibold text-white hover:bg-green-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
