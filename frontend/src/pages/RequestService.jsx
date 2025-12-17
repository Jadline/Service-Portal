import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PageNav from "../components/PageNav";
import ProgressTracker from "../components/ProgressTracker";
import RequestForm from "../components/RequestForm";
import { useState } from "react";


function RequestServices() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="min-h-screen flex flex-col  text-white ">
      
      <PageNav/>
      <ProgressTracker currentStep={currentStep} setCurrentStep={setCurrentStep}/>
      <RequestForm currentStep={currentStep} setCurrentStep={setCurrentStep}/>
      <Footer/>
      
    </div>
  );
}
export default RequestServices;
