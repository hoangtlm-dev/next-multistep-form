// Libs
import { Controller } from 'react-hook-form'

// Interfaces
import { StepFormSection } from '@/interfaces/form'
import { User } from '@/interfaces/user'

const AddressForm = ({
  control,
  formState: { errors, isDirty, isValid },
  onNext
}: StepFormSection<User>) => (
  <>
    <div>
      <label htmlFor='country' className='block text-sm font-medium'>
        Country
      </label>
      <Controller
        name='country'
        control={control}
        render={({ field }) => (
          <input
            id='country'
            {...field}
            className='block w-full rounded-md border py-2'
          />
        )}
      />
      {errors.country && (
        <p className='mt-2 text-sm text-red-400'>{errors.country.message}</p>
      )}
    </div>

    <div>
      <label htmlFor='state' className='block text-sm font-medium'>
        State
      </label>
      <Controller
        name='state'
        control={control}
        render={({ field }) => (
          <input
            id='state'
            {...field}
            className='block w-full rounded-md border py-2'
          />
        )}
      />
      {errors.state && (
        <p className='mt-2 text-sm text-red-400'>{errors.state.message}</p>
      )}
    </div>

    <div>
      <label htmlFor='city' className='block text-sm font-medium'>
        City
      </label>
      <Controller
        name='city'
        control={control}
        render={({ field }) => (
          <input
            id='city'
            {...field}
            className='block w-full rounded-md border py-2'
          />
        )}
      />
      {errors.city && (
        <p className='mt-2 text-sm text-red-400'>{errors.city.message}</p>
      )}
    </div>

    <div>
      <label htmlFor='street' className='block text-sm font-medium'>
        Street
      </label>
      <Controller
        name='street'
        control={control}
        render={({ field }) => (
          <input
            id='street'
            {...field}
            className='block w-full rounded-md border py-2'
          />
        )}
      />
      {errors.street && (
        <p className='mt-2 text-sm text-red-400'>{errors.street.message}</p>
      )}
    </div>

    <div>
      <label htmlFor='zip' className='block text-sm font-medium'>
        Zip
      </label>
      <Controller
        name='zip'
        control={control}
        render={({ field }) => (
          <input
            id='zip'
            {...field}
            className='block w-full rounded-md border py-2'
          />
        )}
      />
      {errors.zip && (
        <p className='mt-2 text-sm text-red-400'>{errors.zip.message}</p>
      )}
    </div>

    {/* Continue Button */}
    <button
      type='button'
      disabled={!isDirty || !isValid}
      className='mt-8 min-w-[80px] bg-red-400 p-4 hover:opacity-80 disabled:pointer-events-none disabled:opacity-50'
      onClick={onNext}
    >
      Continue
    </button>
  </>
)

export default AddressForm
