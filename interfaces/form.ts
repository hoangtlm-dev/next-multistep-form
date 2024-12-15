// Libs
import { Control, FormState, FieldValues } from 'react-hook-form'

export interface StepFormSection<T extends FieldValues> {
  control: Control<T>
  formState: FormState<T>
  onPrev?: () => void
  onNext?: () => void
}
