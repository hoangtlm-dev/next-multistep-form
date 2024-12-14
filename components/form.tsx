'use client'

import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMultistepForm } from '@/hooks/useMultistepForm'

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'email']
  },
  {
    id: 'Step 2',
    name: 'Address',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  {
    id: 'Confirm',
    name: 'Confirm Information' // Confirmation step
  },
  { id: 'Complete', name: 'Complete' } // Completion step
]

const FormDataSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email address'),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  zip: z.string().optional()
})

type Inputs = z.infer<typeof FormDataSchema>

export default function Form() {
  const {
    currentStep,
    currentStepInfo,
    currentFields,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    reset
  } = useMultistepForm({ steps })

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      state: '',
      city: '',
      street: '',
      zip: ''
    }
  })

  const watchAllFields = watch() // Watch all form data

  const processForm: SubmitHandler<Inputs> = data => {
    console.log('Form Submitted:', data)
    reset()
  }

  const handleNext = async () => {
    if (currentFields?.length) {
      const isValid = await trigger(currentFields as (keyof Inputs)[], {
        shouldFocus: true
      })
      if (!isValid) return
    }

    if (isLastStep) {
      await handleSubmit(processForm)()
    } else {
      nextStep()
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
      {/* Steps Navigation */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              <div
                className={`group flex w-full flex-col ${
                  currentStep === index
                    ? 'border-l-4 border-sky-600'
                    : 'border-l-4 border-gray-200'
                } py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4`}
                aria-current={currentStep === index ? 'step' : undefined}
              >
                <span className='text-sm font-medium text-gray-500'>
                  {step.id}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStepInfo?.id === 'Confirm' ? (
          <motion.div
            initial={{ x: '50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Confirm Your Information
            </h2>
            <ul className='mt-4'>
              {Object.entries(watchAllFields).map(([key, value]) => (
                <li key={key} className='mt-2'>
                  <strong className='capitalize'>{key}:</strong>{' '}
                  {value || 'N/A'}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            initial={{ x: '50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              {currentStepInfo?.name}
            </h2>

            {/* Render fields dynamically */}
            {currentFields.map(field => (
              <div key={field} className='mt-4'>
                <label htmlFor={field} className='block text-sm font-medium'>
                  {field}
                </label>
                <input
                  id={field}
                  {...register(field as keyof Inputs)}
                  className='block w-full rounded-md border py-2'
                />
                {errors[field as keyof Inputs]?.message && (
                  <p className='mt-2 text-sm text-red-400'>
                    {errors[field as keyof Inputs]?.message}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        )}

        <div className='mt-8 flex justify-between'>
          <button
            type='button'
            onClick={prevStep}
            disabled={isFirstStep}
            className='rounded-md bg-gray-300 px-4 py-2'
          >
            Previous
          </button>
          <button
            type='button'
            onClick={handleNext}
            className='rounded-md bg-blue-600 px-4 py-2 text-white'
          >
            {isLastStep ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </section>
  )
}
