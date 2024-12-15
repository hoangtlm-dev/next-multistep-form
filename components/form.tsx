'use client'

// Libs
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Interfaces
import { User } from '@/interfaces/user'

// Components
import PersonalInfoForm from '@/components/PersonalInfoForm'
import AddressForm from '@/components/AddressForm'
import ConfirmInfo from '@/components/ConfirmInfo'

// Schemas
import { AddressSchema, PersonalInfoSchema } from '@/lib/schema'

// Hooks
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
    id: 'Step 3',
    name: 'Confirm Information'
  },
  { id: 'Step 4', name: 'Complete' }
]

export default function Form() {
  const { currentStep, nextStep, prevStep, reset } = useMultistepForm({ steps })

  const schemas = [PersonalInfoSchema, AddressSchema]
  const currentSchema = schemas[currentStep - 1]

  const { control, getValues, watch, formState } = useForm<User>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      state: '',
      city: '',
      street: '',
      zip: ''
    },
    mode: 'all'
  })

  const allFields = watch()

  const handleCancel = () => {
    prevStep()
  }

  const handleConfirm = () => {
    const { firstName, lastName, email, country, state, city, street, zip } =
      allFields
    const personalInfo = { firstName, lastName, email }
    const address = { country, state, city, street, zip }

    console.log('Personal info: ', personalInfo)
    console.log('Address: ', address)
    nextStep()
  }

  return (
    <section className='absolute inset-0 flex flex-col p-24'>
      {/* Steps Navigation */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              <div
                className={`group flex w-full flex-col ${
                  currentStep === index + 1
                    ? 'border-l-4 border-sky-600'
                    : 'border-l-4 border-gray-200'
                } py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4`}
                aria-current={currentStep === index + 1 ? 'step' : undefined}
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
      <form className='mt-12 py-12'>
        <motion.div
          key={currentStep}
          initial={{ x: 100, opacity: 0 }} // Slide from right and fade in
          animate={{ x: 0, opacity: 1 }} // Slide in and fade in
          exit={{ x: -100, opacity: 0 }} // Slide out to left and fade out
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.5
          }}
        >
          {currentStep === 1 && (
            <PersonalInfoForm
              control={control}
              formState={formState}
              onNext={() => nextStep()}
            />
          )}

          {currentStep === 2 && (
            <AddressForm
              control={control}
              formState={formState}
              onNext={() => nextStep()}
            />
          )}

          {currentStep == 3 && (
            <ConfirmInfo
              data={getValues()}
              onCancel={handleCancel}
              onConfirm={handleConfirm}
            />
          )}

          {currentStep === 4 && <h3>Completed</h3>}
        </motion.div>
      </form>
    </section>
  )
}
