import { useState } from "react";
import Step1RequestingCompany from "./Step1RequestingCompany";
import Step2ServiceProvider from "./Step2ServiceProvider";
import Step3RequestDetails from "./Step3RequestDetails";
import Step4ReviewSubmit from "./Step4ReviewSubmit";

export default function RequestForm({currentStep,setCurrentStep}) {

  const [formData, setFormData] = useState({}); 

  return (
    <div className="mx-auto w-full px-4 mt-10 pb-3">
      {currentStep === 1 && (
        <Step1RequestingCompany
          setCurrentStep={setCurrentStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 2 && (
        <Step2ServiceProvider
          setCurrentStep={setCurrentStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 3 && (
        <Step3RequestDetails
          setCurrentStep={setCurrentStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 4 && (
        <Step4ReviewSubmit
          setCurrentStep={setCurrentStep}
          formData={formData}
        />
      )}
    </div>
  );
}
