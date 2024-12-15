// Libs
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

export function useMultistepForm({ steps, initialStep = 1 }: UseMultistepForm) {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const reset = () => {
    setCurrentStep(1)
  }

  const currentFields = steps[currentStep]?.fields ?? [] // Return empty array if fields are not defined

  return {
    currentStep,
    currentStepInfo: steps[currentStep],
    currentFields,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === steps.length,
    nextStep,
    prevStep,
    reset
  }
}
