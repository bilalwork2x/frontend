"use client"
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/ui/button';
import TextFormInput from '@components/form-input/TextFormInput';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { setAPIAuthToken } from '@utils/api';
import { useRouter } from 'next/navigation';
import useRegister from './useRegister';
import Loader from '@components/ui/loader';
import PasswordChecklist from './PasswordChecklist';

export const RegisterFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email("This is not a valid email."),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(1, '').min(8, '')
  .regex( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^~`&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, ''),
  confirmPassword: z.string({
    required_error: 'Confirm password is required'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterFormFields = z.infer<typeof RegisterFormSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const { mutate, isPending } = useRegister();

  const methods = useForm<RegisterFormFields>({
    mode: 'onSubmit',
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutate(data, {
      onSuccess: (data) => {
        setAPIAuthToken(data.access_token);
        router.push('/')
      },
      onError: (err) => {
        if(err.response?.status === 409) {
          toast.error('Email already exist');
        } else {
          toast.error('Register failed. Please try again.');

        }
      }
    })
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        <TextFormInput name='name' placeholder='Name' className='w-full' />
        <TextFormInput name='email' placeholder='Email address' className='w-full' />
        <TextFormInput name='password' placeholder='Password' type='password' className='w-full'></TextFormInput>
        <PasswordChecklist/>
        <TextFormInput name='confirmPassword' placeholder='Confirm password' type='password' className='w-full'></TextFormInput>
        <Button type="submit" className="w-full" disabled={isPending} > {isPending && <Loader/>}Register</Button>
        <p className="text-blue-600 mt-5 text-sm"><Link href={'/auth/login'} >Sign in</Link></p>
      </form>
    </FormProvider>
  );
}
