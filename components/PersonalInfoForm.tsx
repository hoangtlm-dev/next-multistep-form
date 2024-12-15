// Libs
import { Controller } from 'react-hook-form'

// Interfaces
import { StepFormSection } from '@/interfaces/form'
import { User } from '@/interfaces/user'

const PersonalInfoForm = ({
  control,
  formState: { errors, isDirty, isValid },
  onNext
}: StepFormSection<User>) => (
  <>
    <div>
      <label htmlFor='firstName' className='block text-sm font-medium'>
        First Name
      </label>
      <Controller
        name='firstName'
        control={control}
        render={({ field }) => (
          <input
            id='firstName'
            className='block w-full rounded-md border py-2'
            {...field}
          />
        )}
      />
      {errors.firstName && (
        <p className='mt-2 text-sm text-red-400'>{errors.firstName.message}</p>
      )}
    </div>

    <div>
      <label htmlFor='lastName' className='block text-sm font-medium'>
        Last Name
      </label>
      <Controller
        name='lastName'
        control={control}
        render={({ field }) => (
          <input
            id='lastName'
            className='block w-full rounded-md border py-2'
            {...field}
          />
        )}
      />
      {errors.lastName && (
        <p className='mt-2 text-sm text-red-400'>{errors.lastName.message}</p>
      )}
    </div>

    <div>
      <label htmlFor='email' className='block text-sm font-medium'>
        Email
      </label>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <input
            id='email'
            className='block w-full rounded-md border py-2'
            {...field}
          />
        )}
      />
      {errors.email && (
        <p className='mt-2 text-sm text-red-400'>{errors.email.message}</p>
      )}
    </div>

    <button
      type='button'
      className='mt-8 min-w-[80px] bg-red-400 p-4 hover:opacity-80 disabled:pointer-events-none disabled:opacity-50'
      disabled={!isDirty || !isValid}
      onClick={onNext}
    >
      Continue
    </button>
  </>
)

export default PersonalInfoForm
