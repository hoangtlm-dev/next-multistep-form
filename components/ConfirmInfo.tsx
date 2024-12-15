import { FormDataSchema } from '@/lib/schema'
import React from 'react'
import { z } from 'zod'

type Inputs = z.infer<typeof FormDataSchema>

interface ConfirmInfoProps {
  data: Inputs
  onCancel: () => void
  onConfirm: () => void
}

const ConfirmInfo = ({ data, onCancel, onConfirm }: ConfirmInfoProps) => {
  return (
    <div>
      <h2 className='mb-4 text-lg font-bold'>Confirm Your Information</h2>
      <div className='space-y-2'>
        <p>
          <strong>First Name:</strong> {data.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {data.lastName}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Country:</strong> {data.country}
        </p>
        <p>
          <strong>Street:</strong> {data.street}
        </p>
        <p>
          <strong>City:</strong> {data.city}
        </p>
        <p>
          <strong>State:</strong> {data.state}
        </p>
        <p>
          <strong>Zip:</strong> {data.zip}
        </p>
      </div>
      <div className='mt-4 flex space-x-4'>
        <button
          type='button'
          onClick={onCancel}
          className='rounded-md bg-gray-300 px-4 py-2'
        >
          Cancel
        </button>
        <button
          type='button'
          onClick={onConfirm}
          className='rounded-md bg-blue-600 px-4 py-2 text-white'
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default ConfirmInfo
