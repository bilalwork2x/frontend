"use client"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/ui/button';
import TextFormInput from '@components/form-input/TextFormInput';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Form } from '@components/ui/form';
import useLogin from './useLogin';
import Loader from '@components/ui/loader';
import { useRouter } from 'next/navigation';
import { setAPIAuthToken } from '@utils/api';

export const LoginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email("This is not a valid email."),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const methods = useForm<LoginFormFields>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutate(data, {
      onSuccess: (data) => {
        setAPIAuthToken(data.access_token);
        router.push('/')
      },
      onError: (err) => {
        if(err.response?.status === 401) {
          toast.error('Invalid email or password');
        } else {
          toast.error('Login failed. Please try again.');

        }
      }
    })
  });

  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        <TextFormInput name='email' placeholder='Email address' />
        <TextFormInput name='password' placeholder='Password' type='password' />
        <Button type="submit" className="w-full" disabled={isPending} > {isPending && <Loader />}Login</Button>
      </form>
      <div className="mt-5 text-sm">Don't have account? <Link href={'/auth/register'} className="text-blue-800">Sign up</Link></div>
    </Form>
  );
}
