import { useState } from 'react'

interface Step {
  id: string
  name: string
  fields?: string[] // Optional field array
}

interface UseMultistepForm {
  steps: Step[]
  initialStep?: number
}

export function useMultistepForm({ steps, initialStep = 0 }: UseMultistepForm) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const reset = () => {
    setCurrentStep(0)
  }

  const currentFields = steps[currentStep]?.fields ?? [] // Return empty array if fields are not defined

  return {
    currentStep,
    currentStepInfo: steps[currentStep],
    currentFields,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    nextStep,
    prevStep,
    reset
  }
}
