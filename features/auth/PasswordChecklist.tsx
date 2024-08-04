import { useFormContext } from "react-hook-form"
import { RegisterFormFields } from "./RegisterForm"

export default function PasswordChecklist() {
  const { getValues, watch, formState, getFieldState } = useFormContext<RegisterFormFields>()
  if(!formState.isSubmitted || !getFieldState('password').invalid) {
    return;
  }
  watch('password')
  return (
    <div className="text-sm">
      <ul className="list-disc pl-5 mt-2">
        <li className={getValues('password').length >= 8 ? 'text-green-500' : 'text-red-500'}>
          Password must be at least 8 characters
        </li>
        <li className={/[A-Z]/.test(getValues('password')) ? 'text-green-500' : 'text-red-500'}>
          At least one uppercase letter
        </li>
        <li className={/[a-z]/.test(getValues('password')) ? 'text-green-500' : 'text-red-500'}>
          At least one lowercase letter
        </li>
        <li className={/[0-9]/.test(getValues('password')) ? 'text-green-500' : 'text-red-500'}>
          At least one number
        </li>
        <li className={/[!@#$%^~`&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(getValues('password')) ? 'text-green-500' : 'text-red-500'}>
          At least one special character {'!@#$%^~`&*()_+-=[]{};\':"\\|,.<>/?'}
        </li>
      </ul>
    </div>
  )
}