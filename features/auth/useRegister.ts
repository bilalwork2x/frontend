
import { useMutation } from '@tanstack/react-query';
import api from '@utils/api';
import { AxiosError } from 'axios';


type ApiResponse = {
  access_token: string;
};
type Variables = { email: string; password: string; name: string; };

export default function useRegister() {
  return useMutation<ApiResponse, AxiosError, Variables>({
    mutationFn: async (data) => {
      const response = await api({
        method: 'POST',
        url: '/auth/register',
        data,
      });
      return response.data;
    },

  });
}