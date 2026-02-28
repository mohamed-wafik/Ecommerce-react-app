import React from "react";
import { Check } from "lucide-react";
interface IProps {
  currentStep: number;
}
export default function StepIndicator({ currentStep }: IProps) {
  const steps = [
    { number: 1, name: "Shipping" },
    { number: 2, name: "Review" },
    { number: 3, name: "Payment" },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep > step.number
                  ? "bg-green-500 text-white"
                  : currentStep === step.number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <span className="text-sm mt-2 font-medium">{step.name}</span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`h-1 w-24 mx-4 ${
                currentStep > step.number ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
