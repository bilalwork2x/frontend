
import { useMutation } from '@tanstack/react-query';
import api from '@utils/api';
import { AxiosError } from 'axios';


type ApiResponse = {
  access_token: string;
};
type Variables = { email: string; password: string };

export default function useLogin() {
  return useMutation<ApiResponse, AxiosError, Variables>({
    mutationFn: async (data) => {
      const response = await api({
        method: 'POST',
        url: '/auth/login',
        data,
      });
      return response.data;
    },
  });
}