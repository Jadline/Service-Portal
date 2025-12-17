import { CheckIcon } from "@heroicons/react/24/solid";

const steps = [
  { id: 1, label: "01", name: "Requesting Company" },
  { id: 2, label: "02", name: "Service Provider" },
  { id: 3, label: "03", name: "Request Details" },
  { id: 4, label: "04", name: "Review & Submit" },
];

export default function ProgressTracker({ currentStep, setCurrentStep }) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="divide-y divide-white/15 rounded-md border border-white/15 md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => {
          const isComplete = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <li key={step.id} className="relative md:flex md:flex-1">
              <button
                onClick={() => setCurrentStep(step.id)}
                className="group flex w-full items-center text-left"
              >
                {isComplete ? (
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-500">
                      <CheckIcon className="size-6 text-white" />
                    </span>
                    <span className="ml-4 text-white">{step.name}</span>
                  </span>
                ) : isCurrent ? (
                  <span
                    aria-current="step"
                    className="flex items-center px-6 py-4 text-sm font-medium"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-indigo-400">
                      <span className="text-indigo-400">{step.label}</span>
                    </span>
                    <span className="ml-4 text-indigo-400">{step.name}</span>
                  </span>
                ) : (
                  <span className="flex items-center px-6 py-4 text-sm font-medium text-gray-400 group-hover:text-white">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white/15">
                      <span className="text-gray-400">{step.label}</span>
                    </span>
                    <span className="ml-4">{step.name}</span>
                  </span>
                )}
              </button>

             
              {stepIdx !== steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 22 80"
                    preserveAspectRatio="none"
                    className="size-full text-white/15"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentColor"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
